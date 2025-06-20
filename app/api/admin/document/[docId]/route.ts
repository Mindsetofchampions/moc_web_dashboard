// app/api/admin/document/[docId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GET(
  request: NextRequest,
  { params }: { params: { docId: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const doc = await prisma.verificationDocument.findUnique({
      where: { id: params.docId },
    });

    if (!doc) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    try {
      const documentUrl = new URL(doc.documentUrl);
      const bucketName = process.env.AWS_BUCKET_NAME || '';
      
      let key = documentUrl.pathname;
      if (key.startsWith('/')) key = key.substring(1);
      
      if (key.startsWith(`${bucketName}/`)) {
        key = key.substring(bucketName.length + 1);
      }

      console.log(`Generating presigned URL for bucket: ${bucketName}, key: ${key}`);

      const s3Client = new S3Client({
        region: process.env.AWS_REGION!,
        credentials: {
          accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY!,
        },
      });
      
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
      });

      // Generate presigned URL (valid for 15 minutes)
      const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });

      return NextResponse.json({ presignedUrl }, { status: 200 });
    } catch (error) {
      console.error('Error generating presigned URL:', error);
      return NextResponse.json(
        { 
          error: 'Failed to generate presigned URL', 
          details: error instanceof Error ? error.message : String(error),
          documentUrl: doc.documentUrl 
        }, 
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error accessing document:', error);
    return NextResponse.json(
      { error: 'Failed to access document', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}