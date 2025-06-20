import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Get total users count
    const totalUsers = await prisma.user.count();
    
    // Get verified users count
    const verifiedUsers = await prisma.user.count({
      where: { isVerified: true },
    });
    
    // Get pending verification requests count
    const pendingVerifications = await prisma.verificationRequest.count({
      where: { status: 'PENDING' },
    });
    
    // Get rejected verification requests count
    const rejectedVerifications = await prisma.verificationRequest.count({
      where: { status: 'REJECTED' },
    });
    
    // Get counts by role
    const volunteerCount = await prisma.user.count({
      where: { role: 'VOLUNTEER' },
    });
    
    const organizationCount = await prisma.user.count({
      where: { role: 'ORGANIZATION' },
    });
    
    const adminCount = await prisma.user.count({
      where: { role: 'ADMIN' },
    });
    
    return NextResponse.json({
      stats: {
        totalUsers,
        verifiedUsers,
        pendingVerifications,
        rejectedVerifications,
      },
      roleCounts: {
        VOLUNTEER: volunteerCount,
        ORGANIZATION: organizationCount,
        ADMIN: adminCount,
      },
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin stats', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}