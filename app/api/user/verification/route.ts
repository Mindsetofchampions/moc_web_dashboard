import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const document = formData.get('document') as File;

    if (!document) {
      return NextResponse.json(
        { error: 'Document is required' },
        { status: 400 }
      );
    }

    const buffer = await document.arrayBuffer();

    const s3Client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY!,
      },
    });
    
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `verification-docs/${session.user.id}/${Date.now()}_${document.name}`,
      Body: Buffer.from(buffer),
      ContentType: document.type,
    };
    
    await s3Client.send(new PutObjectCommand(uploadParams));
    
    const documentUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

    const verificationDoc = await prisma.verificationDocument.create({
      data: {
        documentUrl,
        uploadedAt: new Date(),
      },
    });

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        verificationDocId: verificationDoc.id,
      },
    });

    const verificationRequest = await prisma.verificationRequest.create({
      data: {
        userId: session.user.id,
        status: 'PENDING',
      },
    });

    return NextResponse.json(
      { 
        message: 'Verification request submitted successfully',
        requestId: verificationRequest.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting verification request:', error);
    return NextResponse.json(
      { error: 'Failed to submit verification request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const verificationRequest = await prisma.verificationRequest.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        verificationDoc: true,
      },
    });

    return NextResponse.json({
      verificationRequest,
      isVerified: user?.isVerified || false,
      verificationDocument: user?.verificationDoc || null,
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching verification status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch verification status' },
      { status: 500 }
    );
  }
}