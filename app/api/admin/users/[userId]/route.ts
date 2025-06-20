import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const admin = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });
    
    if (admin?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: params.userId },
      include: {
        verificationRequests: {
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        verificationDoc: true
      }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch user',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const admin = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });
    
    if (admin?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updateData = await request.json();
    
    if (updateData.role) {
      const targetUser = await prisma.user.findUnique({
        where: { id: params.userId },
        select: { role: true }
      });
      
      if (targetUser?.role === 'ADMIN' && session.user.id !== params.userId) {
        return NextResponse.json({ 
          error: 'Cannot modify the role of another admin' 
        }, { status: 403 });
      }
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: params.userId },
      data: updateData
    });
    
    return NextResponse.json({
      message: 'User updated successfully',
      user: updatedUser
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ 
      error: 'Failed to update user',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}