
// // app/api/admin/manage/achievements/[achievementId]/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@/lib/auth';
// import prisma from '@/lib/prisma';

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: Promise<{ achievementId: string }> }
// ) {
//   try {
//     const session = await auth.api.getSession({ headers: request.headers });
    
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }
    
//     const user = await prisma.user.findUnique({
//       where: { id: session.user.id },
//       select: { role: true }
//     });
    
//     if (user?.role !== 'ADMIN') {
//       return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
//     }

//     const achievementData = await request.json();
//     const { achievementId } = await params;

//     const achievement = await prisma.achievement.update({
//       where: { id: achievementId },
//       data: {
//         name: achievementData.name,
//         description: achievementData.description,
//         icon: achievementData.icon,
//         requiredXp: achievementData.requiredXp,
//         requiredLevel: achievementData.requiredLevel,
//         requiredQuests: achievementData.requiredQuests,
//         requiredAttribute: achievementData.requiredAttribute,
//         xpReward: achievementData.xpReward,
//         coinReward: achievementData.coinReward,
//         isActive: achievementData.isActive
//       }
//     });

//     return NextResponse.json({ achievement });
//   } catch (error) {
//     console.error('Error updating achievement:', error);
//     return NextResponse.json({ error: 'Failed to update achievement' }, { status: 500 });
//   }
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: Promise<{ achievementId: string }> }
// ) {
//   try {
//     const session = await auth.api.getSession({ headers: request.headers });
    
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }
    
//     const user = await prisma.user.findUnique({
//       where: { id: session.user.id },
//       select: { role: true }
//     });
    
//     if (user?.role !== 'ADMIN') {
//       return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
//     }

//     const { achievementId } = await params;

//     await prisma.achievement.delete({
//       where: { id: achievementId }
//     });

//     return NextResponse.json({ message: 'Achievement deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting achievement:', error);
//     return NextResponse.json({ error: 'Failed to delete achievement' }, { status: 500 });
//   }
// }


// app/api/admin/manage/achievements/[achievementId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ achievementId: string }> }
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

    const achievementData = await request.json();
    const { achievementId } = await params;

    const achievement = await prisma.achievement.update({
      where: { id: achievementId },
      data: {
        name: achievementData.name,
        description: achievementData.description,
        icon: achievementData.icon,
        requiredXp: achievementData.requiredXp,
        requiredLevel: achievementData.requiredLevel,
        requiredQuests: achievementData.requiredQuests,
        requiredAttribute: achievementData.requiredAttribute,
        xpReward: achievementData.xpReward,
        coinReward: achievementData.coinReward,
        isActive: achievementData.isActive
      }
    });

    return NextResponse.json({ achievement });
  } catch (error) {
    console.error('Error updating achievement:', error);
    return NextResponse.json({ error: 'Failed to update achievement' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ achievementId: string }> }
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

    const { achievementId } = await params;

    await prisma.achievement.delete({
      where: { id: achievementId }
    });

    return NextResponse.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    console.error('Error deleting achievement:', error);
    return NextResponse.json({ error: 'Failed to delete achievement' }, { status: 500 });
  }
}