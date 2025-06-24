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

export async function DELETE(
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

    const userId = params.userId;
    
    // Prevent deleting yourself
    if (session.user.id === userId) {
      return NextResponse.json({ 
        error: 'Cannot delete your own account' 
      }, { status: 403 });
    }

    // Check if user exists
    const userToDelete = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        eventsCreated: true,
        verificationRequests: true,
        verificationDoc: true
      }
    });

    if (!userToDelete) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Prevent deleting other admins
    if (userToDelete.role === 'ADMIN') {
      return NextResponse.json({ 
        error: 'Cannot delete admin users' 
      }, { status: 403 });
    }

    // Start transaction to ensure all deletions succeed or fail together
    const result = await prisma.$transaction(async (prisma) => {
      // 1. Delete verification requests (blocks foreign key)
      await prisma.verificationRequest.deleteMany({
        where: { userId: userId }
      });

      // 2. Handle events created by this user
      // Option A: Delete events (need too confirm))
      await prisma.event.deleteMany({
        where: { organizerId: userId }
      });

      // 3. Handle verification document
      // If it's only used by this user, delete it
      if (userToDelete.verificationDocId) {
        const docUsageCount = await prisma.user.count({
          where: { verificationDocId: userToDelete.verificationDocId }
        });
        
        if (docUsageCount === 1) {
          // Only this user uses this doc, safe to delete
          await prisma.verificationDocument.delete({
            where: { id: userToDelete.verificationDocId }
          });
        }
      }

      // 4. Finally delete the user (Sessions, Accounts, EventRegistrations will cascade)
      const deletedUser = await prisma.user.delete({
        where: { id: userId }
      });

      return deletedUser;
    });

    return NextResponse.json({
      message: 'User deleted successfully',
      deletedUser: {
        id: result.id,
        name: result.name,
        email: result.email
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error deleting user:', error);
    
    // Handle specific Prisma errors
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2003') {
      return NextResponse.json({ 
        error: 'Cannot delete user due to related data. Please contact support.' 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to delete user',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}