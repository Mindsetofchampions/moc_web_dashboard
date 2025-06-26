/* eslint-disable @typescript-eslint/no-explicit-any */
//app/api/user/set-role/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { UserRole } from '@/lib/generated/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email, role } = await request.json();

    if (!email || !role) {
      return NextResponse.json({ error: 'Email and role are required' }, { status: 400 });
    }

    // Validate role (ADMIN is not allowed to be set via this endpoint for security)
    const validRoles = ['VOLUNTEER', 'ORGANIZATION', 'STUDENT'] as const;
    if (!validRoles.includes(role as any)) {
      return NextResponse.json({ 
        error: 'Invalid role. Allowed roles: VOLUNTEER, ORGANIZATION, STUDENT' 
      }, { status: 400 });
    }

    // Create explicit mapping to enum values
    const roleMapping = {
      'VOLUNTEER': UserRole.VOLUNTEER,
      'ORGANIZATION': UserRole.ORGANIZATION,
      'STUDENT': UserRole.STUDENT,
      'ADMIN': UserRole.ADMIN
    } as const;

    const roleEnum = roleMapping[role as keyof typeof roleMapping];

    if (!roleEnum) {
      return NextResponse.json({ 
        error: 'Invalid role mapping' 
      }, { status: 400 });
    }

    // Find and update user role
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: roleEnum },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      user: updatedUser,
      message: `Role set to ${role}` 
    }, { status: 200 });
  } catch (error) {
    console.error('Error setting user role:', error);
    return NextResponse.json({ 
      error: 'Failed to set user role',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
