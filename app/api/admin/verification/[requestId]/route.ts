
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { requestId: string } }) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const verificationRequest = await prisma.verificationRequest.findUnique({
      where: { id: params.requestId },
      include: {
        user: {
          include: { verificationDoc: true }
        }
      }
    });
    
    if (!verificationRequest) {
      return NextResponse.json({ error: 'Verification request not found' }, { status: 404 });
    }
    
    return NextResponse.json(verificationRequest, { status: 200 });
  } catch (error) {
    console.error('Error fetching verification request:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch verification request', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { requestId: string } }) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { status, notes } = await request.json();
    
    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    
    const verificationRequest = await prisma.verificationRequest.findUnique({
      where: { id: params.requestId },
    });
    
    if (!verificationRequest) {
      return NextResponse.json({ error: 'Verification request not found' }, { status: 404 });
    }

    if (verificationRequest.status !== 'PENDING') {
      return NextResponse.json({ 
        error: 'This verification request has already been processed' 
      }, { status: 400 });
    }
    
    const updatedRequest = await prisma.verificationRequest.update({
      where: { id: params.requestId },
      data: {
        status,
        notes: notes || undefined,
        reviewedBy: session.user.id,
        updatedAt: new Date(),
      },
    });
    
    if (status === 'APPROVED') {
      await prisma.user.update({
        where: { id: verificationRequest.userId },
        data: { isVerified: true },
      });
    }
    
    return NextResponse.json({
      message: `Verification request ${status.toLowerCase()} successfully`,
      verificationRequest: updatedRequest,
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating verification request:', error);
    return NextResponse.json({ 
      error: 'Failed to update verification request', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}