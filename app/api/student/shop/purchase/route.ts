// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // app/api/student/shop/purchase/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@/lib/auth';
// import prisma from '@/lib/prisma';

// export async function POST(request: NextRequest) {
//   try {
//     const session = await auth.api.getSession({ headers: request.headers });
    
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const { itemId, quantity = 1 } = await request.json();

//     if (!itemId) {
//       return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
//     }

//     // Get item details
//     const item = await prisma.shopItem.findUnique({
//       where: { id: itemId }
//     });

//     if (!item || !item.isActive) {
//       return NextResponse.json({ error: 'Item not found or inactive' }, { status: 404 });
//     }

//     // Check stock if limited
//     if (item.isLimited && item.stock !== null) {
//       const totalPurchased = await prisma.studentPurchase.aggregate({
//         where: { itemId },
//         _sum: { quantity: true }
//       });
      
//       const remainingStock = item.stock - (totalPurchased._sum.quantity || 0);
//       if (remainingStock < quantity) {
//         return NextResponse.json({ 
//           error: `Insufficient stock. Only ${remainingStock} remaining.` 
//         }, { status: 400 });
//       }
//     }

//     const totalCost = item.price * quantity;

//     // Use transaction for purchase
//     const result = await prisma.$transaction(async (tx) => {
//       // Get current student profile
//       const studentProfile = await tx.studentProfile.findUnique({
//         where: { userId: session.user.id }
//       });

//       if (!studentProfile) {
//         throw new Error('Student profile not found');
//       }

//       // Check if user has enough coins
//       if (studentProfile.coins < totalCost) {
//         throw new Error(`Insufficient coins. You need ${totalCost} coins but only have ${studentProfile.coins}.`);
//       }

//       // Record purchase
//       const purchase = await tx.studentPurchase.create({
//         data: {
//           userId: session.user.id,
//           itemId: itemId,
//           pricePaid: item.price,
//           quantity: quantity
//         }
//       });

//       // Update student profile
//       let profileUpdates: any = {
//         coins: studentProfile.coins - totalCost
//       };

//       // Apply item effects
//       if (item.attributeBoosts) {
//         const boosts = item.attributeBoosts as any;
//         for (const [attribute, boost] of Object.entries(boosts)) {
//           if (typeof boost === 'number') {
//             const currentValue = studentProfile[attribute as keyof typeof studentProfile] as number;
//             profileUpdates[attribute] = Math.min(100, currentValue + boost);
//           }
//         }
//       }

//       if (item.coinBonus) {
//         profileUpdates.coins += item.coinBonus;
//       }

//       if (item.xpBonus) {
//         const newXp = studentProfile.xp + item.xpBonus;
//         profileUpdates.xp = newXp;
//         profileUpdates.level = Math.floor(newXp / 1000) + 1;
//       }

//       const updatedProfile = await tx.studentProfile.update({
//         where: { userId: session.user.id },
//         data: profileUpdates
//       });

//       return { purchase, updatedProfile };
//     });

//     return NextResponse.json({
//       message: 'Purchase successful',
//       purchase: result.purchase,
//       profile: result.updatedProfile
//     });

//   } catch (error) {
//     console.error('Error processing purchase:', error);
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message }, { status: 400 });
//     }
//     return NextResponse.json({ error: 'Failed to process purchase' }, { status: 500 });
//   }
// }
















// Updated app/api/student/shop/purchase/route.ts with achievement checking
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { AchievementService } from '@/lib/achievementService';

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { itemId, quantity = 1 } = await request.json();

    if (!itemId) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }

    // Get item details
    const item = await prisma.shopItem.findUnique({
      where: { id: itemId }
    });

    if (!item || !item.isActive) {
      return NextResponse.json({ error: 'Item not found or inactive' }, { status: 404 });
    }

    // Check stock if limited
    if (item.isLimited && item.stock !== null) {
      const totalPurchased = await prisma.studentPurchase.aggregate({
        where: { itemId },
        _sum: { quantity: true }
      });
      
      const remainingStock = item.stock - (totalPurchased._sum.quantity || 0);
      if (remainingStock < quantity) {
        return NextResponse.json({ 
          error: `Insufficient stock. Only ${remainingStock} remaining.` 
        }, { status: 400 });
      }
    }

    const totalCost = item.price * quantity;

    // Use transaction for purchase
    const result = await prisma.$transaction(async (tx) => {
      // Get current student profile
      const studentProfile = await tx.studentProfile.findUnique({
        where: { userId: session.user.id }
      });

      if (!studentProfile) {
        throw new Error('Student profile not found');
      }

      // Check if user has enough coins
      if (studentProfile.coins < totalCost) {
        throw new Error(`Insufficient coins. You need ${totalCost} coins but only have ${studentProfile.coins}.`);
      }

      // Record purchase
      const purchase = await tx.studentPurchase.create({
        data: {
          userId: session.user.id,
          itemId: itemId,
          pricePaid: item.price,
          quantity: quantity
        }
      });

      // Update student profile
      let profileUpdates: any = {
        coins: studentProfile.coins - totalCost
      };

      // Apply item effects
      if (item.attributeBoosts) {
        const boosts = item.attributeBoosts as any;
        for (const [attribute, boost] of Object.entries(boosts)) {
          if (typeof boost === 'number') {
            const currentValue = studentProfile[attribute as keyof typeof studentProfile] as number;
            profileUpdates[attribute] = Math.min(100, currentValue + boost);
          }
        }
      }

      if (item.coinBonus) {
        profileUpdates.coins += item.coinBonus;
      }

      if (item.xpBonus) {
        const newXp = studentProfile.xp + item.xpBonus;
        profileUpdates.xp = newXp;
        profileUpdates.level = Math.floor(newXp / 1000) + 1;
      }

      const updatedProfile = await tx.studentProfile.update({
        where: { userId: session.user.id },
        data: profileUpdates
      });

      return { purchase, updatedProfile };
    });

    // Check for achievement unlocks
    const newAchievements = await AchievementService.checkAndUnlockAchievements(
      session.user.id,
      result.updatedProfile
    );

    return NextResponse.json({
      message: 'Purchase successful',
      purchase: result.purchase,
      profile: result.updatedProfile,
      newAchievements: newAchievements
    });

  } catch (error) {
    console.error('Error processing purchase:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to process purchase' }, { status: 500 });
  }
}