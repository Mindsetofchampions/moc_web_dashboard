
// app/api/admin/manage/quests/[questId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: { questId: string } }
) {
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
    const questId = (await params).questId;

    const quest = await prisma.quest.update({
      where: { id: questId },
      data: {
        title: questData.title,
        description: questData.description,
        icon: questData.icon,
        type: questData.type,
        difficulty: questData.difficulty,
        attribute: questData.attribute,
        xpReward: questData.xpReward,
        coinReward: questData.coinReward,
        attributeBoost: questData.attributeBoost,
        timeLimit: questData.timeLimit,
        questions: questData.questions,
        minLevel: questData.minLevel,
        requiredQuests: questData.requiredQuests,
        isActive: questData.isActive
      }
    });

    return NextResponse.json({ quest });
  } catch (error) {
    console.error('Error updating quest:', error);
    return NextResponse.json({ error: 'Failed to update quest' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { questId: string } }
) {
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

    const questId = (await params).questId;

    await prisma.quest.delete({
      where: { id: questId }
    });

    return NextResponse.json({ message: 'Quest deleted successfully' });
  } catch (error) {
    console.error('Error deleting quest:', error);
    return NextResponse.json({ error: 'Failed to delete quest' }, { status: 500 });
  }
}