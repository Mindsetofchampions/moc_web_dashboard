// app/api/admin/manage/quests/route.ts
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

    const quests = await prisma.quest.findMany({
      include: {
        _count: {
          select: {
            completions: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ quests });
  } catch (error) {
    console.error('Error fetching quests:', error);
    return NextResponse.json({ error: 'Failed to fetch quests' }, { status: 500 });
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

    const questData = await request.json();

    const quest = await prisma.quest.create({
      data: {
        title: questData.title,
        description: questData.description,
        icon: questData.icon,
        type: questData.type,
        difficulty: questData.difficulty || 'EASY',
        attribute: questData.attribute,
        xpReward: questData.xpReward || 100,
        coinReward: questData.coinReward || 50,
        attributeBoost: questData.attributeBoost || 5,
        timeLimit: questData.timeLimit,
        questions: questData.questions,
        minLevel: questData.minLevel || 1,
        requiredQuests: questData.requiredQuests || [],
        isActive: questData.isActive !== false
      }
    });

    return NextResponse.json({ quest }, { status: 201 });
  } catch (error) {
    console.error('Error creating quest:', error);
    return NextResponse.json({ error: 'Failed to create quest' }, { status: 500 });
  }
}

