/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function PUT(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const contentType = request.headers.get('content-type') || '';
    
    let userData: Record<string, any> = {};
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      
      userData = {
        name: formData.get('name') as string || undefined,
        dateOfBirth: formData.get('dateOfBirth') && formData.get('dateOfBirth') !== '' 
          ? new Date(formData.get('dateOfBirth') as string) 
          : undefined,
        presentAddress: formData.get('presentAddress') as string || undefined,
        permanentAddress: formData.get('permanentAddress') as string || undefined,
        city: formData.get('city') as string || undefined,
        postalCode: formData.get('postalCode') as string || undefined,
        country: formData.get('country') as string || undefined,
      };

      const profileImage = formData.get('profileImage') as File | null;
      
      if (profileImage && profileImage.size > 0) {
        try {

          const buffer = await profileImage.arrayBuffer();

          const s3Client = new S3Client({
            region: process.env.AWS_REGION!,
            credentials: {
              accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID!,
              secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY!,
            },
          });
          
          const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `profile-images/${session.user.id}/${Date.now()}_${profileImage.name}`,
            Body: Buffer.from(buffer),
            ContentType: profileImage.type,
          };
          
          await s3Client.send(new PutObjectCommand(uploadParams));

          userData.image = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
        } catch (error) {
          console.error('Error uploading profile image to S3:', error);
        }
      }
    } else {
      const data = await request.json();

      userData = {
        name: data.name || undefined,
        dateOfBirth: data.dateOfBirth && data.dateOfBirth !== '' 
          ? new Date(data.dateOfBirth) 
          : undefined,
        presentAddress: data.presentAddress || undefined,
        permanentAddress: data.permanentAddress || undefined,
        city: data.city || undefined,
        postalCode: data.postalCode || undefined,
        country: data.country || undefined,
      };
    }

    Object.keys(userData).forEach(key => {
      if (userData[key] === undefined || userData[key] === '') {
        delete userData[key];
      }
    });

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: userData,
    });

    return NextResponse.json(
      { 
        message: 'Profile updated successfully',
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          image: updatedUser.image,
          dateOfBirth: updatedUser.dateOfBirth,
          presentAddress: updatedUser.presentAddress,
          permanentAddress: updatedUser.permanentAddress,
          city: updatedUser.city,
          postalCode: updatedUser.postalCode,
          country: updatedUser.country,
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile', details: error instanceof Error ? error.message : String(error) },
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
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          isVerified: user.isVerified,
          dateOfBirth: user.dateOfBirth,
          presentAddress: user.presentAddress,
          permanentAddress: user.permanentAddress,
          city: user.city,
          postalCode: user.postalCode,
          country: user.country,
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}