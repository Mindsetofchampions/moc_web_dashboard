// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // app/api/student/quests/complete/route.ts
// // import { NextRequest, NextResponse } from 'next/server';
// // import { auth } from '@/lib/auth';
// // import prisma from '@/lib/prisma';

// // export async function POST(request: NextRequest) {
// //   try {
// //     const session = await auth.api.getSession({ headers: request.headers });
    
// //     if (!session) {
// //       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
// //     }

// //     const { questId, score, timeSpent } = await request.json();

// //     // Get quest details
// //     const quest = await prisma.quest.findUnique({
// //       where: { id: questId }
// //     });

// //     if (!quest) {
// //       return NextResponse.json({ error: 'Quest not found' }, { status: 404 });
// //     }

// //     const result = await prisma.$transaction(async (tx) => {
// //       // Get current student profile
// //       const studentProfile = await tx.studentProfile.findUnique({
// //         where: { userId: session.user.id }
// //       });

// //       if (!studentProfile) {
// //         throw new Error('Student profile not found');
// //       }

// //       // Calculate rewards based on score/performance
// //       const scorePercentage = Math.min(100, Math.max(0, score)) / 100;
// //       const xpEarned = Math.floor(quest.xpReward * scorePercentage);
// //       const coinsEarned = Math.floor(quest.coinReward * scorePercentage);
// //       const attributeBoost = Math.floor(quest.attributeBoost * scorePercentage);

// //       // Create or update quest completion
// //       const completion = await tx.questCompletion.upsert({
// //         where: {
// //           userId_questId: {
// //             userId: session.user.id,
// //             questId: questId
// //           }
// //         },
// //         update: {
// //           score: score,
// //           timeSpent: timeSpent || 0,
// //           xpEarned: xpEarned,
// //           coinsEarned: coinsEarned,
// //           completedAt: new Date()
// //         },
// //         create: {
// //           userId: session.user.id,
// //           questId: questId,
// //           score: score,
// //           timeSpent: timeSpent || 0,
// //           xpEarned: xpEarned,
// //           coinsEarned: coinsEarned
// //         }
// //       });

// //       // Update student profile
// //       const newXp = studentProfile.xp + xpEarned;
// //       const newLevel = Math.floor(newXp / 1000) + 1;
// //       const newCoins = studentProfile.coins + coinsEarned;

// //       // Update the specific attribute
// //       const attributeUpdates: any = {};
// //       const currentAttributeValue = studentProfile[quest.attribute as keyof typeof studentProfile] as number;
// //       attributeUpdates[quest.attribute] = Math.min(100, currentAttributeValue + attributeBoost);

// //       const updatedProfile = await tx.studentProfile.update({
// //         where: { userId: session.user.id },
// //         data: {
// //           xp: newXp,
// //           level: newLevel,
// //           coins: newCoins,
// //           ...attributeUpdates
// //         }
// //       });

// //       return {
// //         completion,
// //         updatedProfile,
// //         rewards: {
// //           xp: xpEarned,
// //           coins: coinsEarned,
// //           attributeBoost: attributeBoost,
// //           attribute: quest.attribute
// //         }
// //       };
// //     });

// //     return NextResponse.json({
// //       message: 'Quest completed successfully',
// //       completion: result.completion,
// //       profile: result.updatedProfile,
// //       rewards: result.rewards
// //     });

// //   } catch (error) {
// //     console.error('Error completing quest:', error);
// //     if (error instanceof Error) {
// //       return NextResponse.json({ error: error.message }, { status: 400 });
// //     }
// //     return NextResponse.json({ error: 'Failed to complete quest' }, { status: 500 });
// //   }
// // }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// // app/api/student/quests/complete/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@/lib/auth';
// import prisma from '@/lib/prisma';

// export async function POST(request: NextRequest) {
//   try {
//     const session = await auth.api.getSession({ headers: request.headers });
    
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const { questId, score, timeSpent, answers } = await request.json();

//     // Get quest details
//     const quest = await prisma.quest.findUnique({
//       where: { id: questId }
//     });

//     if (!quest) {
//       return NextResponse.json({ error: 'Quest not found' }, { status: 404 });
//     }

//     const result = await prisma.$transaction(async (tx) => {
//       // Get current student profile
//       const studentProfile = await tx.studentProfile.findUnique({
//         where: { userId: session.user.id }
//       });

//       if (!studentProfile) {
//         throw new Error('Student profile not found');
//       }

//       // Calculate score if not provided (for quiz-based quests)
//       let finalScore = score;
//       if (quest.questions && answers && Array.isArray(answers)) {
//         const questions = quest.questions as any[];
//         let correctAnswers = 0;
        
//         answers.forEach((answer: number, index: number) => {
//           if (questions[index] && questions[index].a === answer) {
//             correctAnswers++;
//           }
//         });
        
//         finalScore = Math.round((correctAnswers / questions.length) * 100);
//       }

//       // Calculate rewards based on score/performance
//       const scorePercentage = Math.min(100, Math.max(0, finalScore)) / 100;
//       const xpEarned = Math.floor(quest.xpReward * scorePercentage);
//       const coinsEarned = Math.floor(quest.coinReward * scorePercentage);
//       const attributeBoost = Math.floor(quest.attributeBoost * scorePercentage);

//       // Create or update quest completion
//       const completion = await tx.questCompletion.upsert({
//         where: {
//           userId_questId: {
//             userId: session.user.id,
//             questId: questId
//           }
//         },
//         update: {
//           score: finalScore,
//           timeSpent: timeSpent || 0,
//           xpEarned: xpEarned,
//           coinsEarned: coinsEarned,
//           completedAt: new Date()
//         },
//         create: {
//           userId: session.user.id,
//           questId: questId,
//           score: finalScore,
//           timeSpent: timeSpent || 0,
//           xpEarned: xpEarned,
//           coinsEarned: coinsEarned
//         }
//       });

//       // Update student profile
//       const newXp = studentProfile.xp + xpEarned;
//       const newLevel = Math.floor(newXp / 1000) + 1;
//       const newCoins = studentProfile.coins + coinsEarned;

//       // Update the specific attribute
//       const attributeUpdates: any = {};
//       const currentAttributeValue = studentProfile[quest.attribute as keyof typeof studentProfile] as number;
//       attributeUpdates[quest.attribute] = Math.min(100, currentAttributeValue + attributeBoost);

//       const updatedProfile = await tx.studentProfile.update({
//         where: { userId: session.user.id },
//         data: {
//           xp: newXp,
//           level: newLevel,
//           coins: newCoins,
//           ...attributeUpdates
//         }
//       });

//       // Check for level up and achievement unlocks
//       const leveledUp = newLevel > studentProfile.level;
      
//       // TODO: Check for achievement unlocks based on new stats
//       const achievements: any[] = [];

//       return {
//         completion,
//         updatedProfile,
//         leveledUp,
//         achievements,
//         rewards: {
//           xp: xpEarned,
//           coins: coinsEarned,
//           attributeBoost: attributeBoost,
//           attribute: quest.attribute
//         }
//       };
//     });

//     return NextResponse.json({
//       message: 'Quest completed successfully',
//       completion: result.completion,
//       profile: result.updatedProfile,
//       rewards: result.rewards,
//       leveledUp: result.leveledUp,
//       achievements: result.achievements
//     });

//   } catch (error) {
//     console.error('Error completing quest:', error);
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message }, { status: 400 });
//     }
//     return NextResponse.json({ error: 'Failed to complete quest' }, { status: 500 });
//   }
// }






















// Updated app/api/student/quests/complete/route.ts with achievement checking
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

    const { questId, score, timeSpent, answers } = await request.json();

    // Get quest details
    const quest = await prisma.quest.findUnique({
      where: { id: questId }
    });

    if (!quest) {
      return NextResponse.json({ error: 'Quest not found' }, { status: 404 });
    }

    const result = await prisma.$transaction(async (tx) => {
      // Get current student profile
      const studentProfile = await tx.studentProfile.findUnique({
        where: { userId: session.user.id }
      });

      if (!studentProfile) {
        throw new Error('Student profile not found');
      }

      // Calculate score if not provided (for quiz-based quests)
      let finalScore = score;
      if (quest.questions && answers && Array.isArray(answers)) {
        const questions = quest.questions as any[];
        let correctAnswers = 0;
        
        answers.forEach((answer: number, index: number) => {
          if (questions[index] && questions[index].a === answer) {
            correctAnswers++;
          }
        });
        
        finalScore = Math.round((correctAnswers / questions.length) * 100);
      }

      // Calculate rewards based on score/performance
      const scorePercentage = Math.min(100, Math.max(0, finalScore)) / 100;
      const xpEarned = Math.floor(quest.xpReward * scorePercentage);
      const coinsEarned = Math.floor(quest.coinReward * scorePercentage);
      const attributeBoost = Math.floor(quest.attributeBoost * scorePercentage);

      // Create or update quest completion
      const completion = await tx.questCompletion.upsert({
        where: {
          userId_questId: {
            userId: session.user.id,
            questId: questId
          }
        },
        update: {
          score: finalScore,
          timeSpent: timeSpent || 0,
          xpEarned: xpEarned,
          coinsEarned: coinsEarned,
          completedAt: new Date()
        },
        create: {
          userId: session.user.id,
          questId: questId,
          score: finalScore,
          timeSpent: timeSpent || 0,
          xpEarned: xpEarned,
          coinsEarned: coinsEarned
        }
      });

      // Update student profile
      const newXp = studentProfile.xp + xpEarned;
      const newLevel = Math.floor(newXp / 1000) + 1;
      const newCoins = studentProfile.coins + coinsEarned;

      // Update the specific attribute
      const attributeUpdates: any = {};
      const currentAttributeValue = studentProfile[quest.attribute as keyof typeof studentProfile] as number;
      attributeUpdates[quest.attribute] = Math.min(100, currentAttributeValue + attributeBoost);

      const updatedProfile = await tx.studentProfile.update({
        where: { userId: session.user.id },
        data: {
          xp: newXp,
          level: newLevel,
          coins: newCoins,
          ...attributeUpdates
        }
      });

      return {
        completion,
        updatedProfile,
        leveledUp: newLevel > studentProfile.level,
        rewards: {
          xp: xpEarned,
          coins: coinsEarned,
          attributeBoost: attributeBoost,
          attribute: quest.attribute
        }
      };
    });

    // Check for achievement unlocks (outside transaction for better performance)
    const newAchievements = await AchievementService.checkAndUnlockAchievements(
      session.user.id,
      result.updatedProfile
    );

    return NextResponse.json({
      message: 'Quest completed successfully',
      completion: result.completion,
      profile: result.updatedProfile,
      rewards: result.rewards,
      leveledUp: result.leveledUp,
      newAchievements: newAchievements
    });

  } catch (error) {
    console.error('Error completing quest:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to complete quest' }, { status: 500 });
  }
}