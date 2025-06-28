/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/student/quests/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get student profile to check level
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: session.user.id }
    });

    if (!studentProfile) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 });
    }

    // Get available quests (considering level requirements and completion status)
    const completedQuestIds = await prisma.questCompletion.findMany({
      where: { userId: session.user.id },
      select: { questId: true }
    }).then(completions => completions.map(c => c.questId));

    const availableQuests = await prisma.quest.findMany({
      where: {
        isActive: true,
        minLevel: { lte: studentProfile.level },
        // Optionally exclude completed quests - uncomment next line if quests should only be done once
        // id: { notIn: completedQuestIds }
      },
      include: {
        completions: {
          where: { userId: session.user.id }
        }
      }
    });

    // Format quests for frontend
    const formattedQuests = availableQuests.map(quest => ({
      id: quest.id,
      title: quest.title,
      description: quest.description,
      icon: quest.icon,
      type: quest.type,
      difficulty: quest.difficulty,
      attribute: quest.attribute,
      xpReward: quest.xpReward,
      coinReward: quest.coinReward,
      attributeBoost: quest.attributeBoost,
      timeLimit: quest.timeLimit,
      questions: quest.questions,
      minLevel: quest.minLevel,
      completed: quest.completions.length > 0,
      completedAt: quest.completions[0]?.completedAt || null
    }));

    return NextResponse.json({ quests: formattedQuests });
  } catch (error) {
    console.error('Error fetching quests:', error);
    return NextResponse.json({ error: 'Failed to fetch quests' }, { status: 500 });
  }
}