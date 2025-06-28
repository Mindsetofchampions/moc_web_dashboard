// app/api/admin/manage/achievements/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });
    
    if (user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const achievements = await prisma.achievement.findMany({
      include: {
        _count: {
          select: {
            studentAchievements: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ achievements });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });
    
    if (user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const achievementData = await request.json();

    const achievement = await prisma.achievement.create({
      data: {
        name: achievementData.name,
        description: achievementData.description,
        icon: achievementData.icon,
        requiredXp: achievementData.requiredXp,
        requiredLevel: achievementData.requiredLevel,
        requiredQuests: achievementData.requiredQuests || [],
        requiredAttribute: achievementData.requiredAttribute,
        xpReward: achievementData.xpReward || 0,
        coinReward: achievementData.coinReward || 0,
        isActive: achievementData.isActive !== false
      }
    });

    return NextResponse.json({ achievement }, { status: 201 });
  } catch (error) {
    console.error('Error creating achievement:', error);
    return NextResponse.json({ error: 'Failed to create achievement' }, { status: 500 });
  }
}