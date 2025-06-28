/* eslint-disable @typescript-eslint/no-explicit-any */
// // lib/achievementService.ts
// import prisma from '@/lib/prisma';

// interface StudentProfile {
//   userId: string;
//   level: number;
//   xp: number;
//   coins: number;
//   character: number;
//   health: number;
//   exploration: number;
//   scholarship: number;
//   stewardship: number;
// }

// export class AchievementService {
//   static async checkAndUnlockAchievements(userId: string, updatedProfile: StudentProfile) {
//     try {
//       // Get all active achievements
//       const achievements = await prisma.achievement.findMany({
//         where: { isActive: true }
//       });

//       // Get already unlocked achievements
//       const unlockedAchievements = await prisma.studentAchievement.findMany({
//         where: { userId },
//         select: { achievementId: true }
//       });

//       const unlockedIds = unlockedAchievements.map(ua => ua.achievementId);
//       const newlyUnlocked: string[] = [];

//       for (const achievement of achievements) {
//         // Skip if already unlocked
//         if (unlockedIds.includes(achievement.id)) continue;

//         let canUnlock = true;

//         // Check XP requirement
//         if (achievement.requiredXp && updatedProfile.xp < achievement.requiredXp) {
//           canUnlock = false;
//         }

//         // Check level requirement
//         if (achievement.requiredLevel && updatedProfile.level < achievement.requiredLevel) {
//           canUnlock = false;
//         }

//         // Check attribute requirement
//         if (achievement.requiredAttribute) {
//           const [attribute, requiredValue] = achievement.requiredAttribute.split(':');
//           const currentValue = updatedProfile[attribute as keyof StudentProfile] as number;
//           if (currentValue < parseInt(requiredValue)) {
//             canUnlock = false;
//           }
//         }

//         // Check quest requirements
//         if (achievement.requiredQuests.length > 0) {
//           const completedQuests = await prisma.questCompletion.findMany({
//             where: {
//               userId,
//               questId: { in: achievement.requiredQuests }
//             },
//             select: { questId: true }
//           });

//           const completedQuestIds = completedQuests.map(cq => cq.questId);
//           const hasAllRequiredQuests = achievement.requiredQuests.every(
//             questId => completedQuestIds.includes(questId)
//           );

//           if (!hasAllRequiredQuests) {
//             canUnlock = false;
//           }
//         }

//         // Unlock achievement if all requirements met
//         if (canUnlock) {
//           await prisma.studentAchievement.create({
//             data: {
//               userId,
//               achievementId: achievement.id
//             }
//           });

//           // Award achievement rewards
//           if (achievement.xpReward > 0 || achievement.coinReward > 0) {
//             await prisma.studentProfile.update({
//               where: { userId },
//               data: {
//                 xp: { increment: achievement.xpReward },
//                 coins: { increment: achievement.coinReward }
//               }
//             });
//           }

//           newlyUnlocked.push(achievement.id);
//         }
//       }

//       return newlyUnlocked;
//     } catch (error) {
//       console.error('Error checking achievements:', error);
//       return [];
//     }
//   }

//   static async getAllAchievementsForUser(userId: string) {
//     try {
//       const allAchievements = await prisma.achievement.findMany({
//         where: { isActive: true },
//         orderBy: { createdAt: 'asc' }
//       });

//       const unlockedAchievements = await prisma.studentAchievement.findMany({
//         where: { userId },
//         include: { achievement: true }
//       });

//       const unlockedMap = new Map(
//         unlockedAchievements.map(ua => [ua.achievementId, ua.unlockedAt])
//       );

//       return allAchievements.map(achievement => ({
//         id: achievement.id,
//         name: achievement.name,
//         description: achievement.description,
//         icon: achievement.icon,
//         unlocked: unlockedMap.has(achievement.id),
//         unlockedAt: unlockedMap.get(achievement.id) || null
//       }));
//     } catch (error) {
//       console.error('Error getting achievements for user:', error);
//       return [];
//     }
//   }
// }












// Enhanced lib/achievementService.ts
import prisma from '@/lib/prisma';

interface StudentProfile {
  userId: string;
  level: number;
  xp: number;
  coins: number;
  character: number;
  health: number;
  exploration: number;
  scholarship: number;
  stewardship: number;
}

interface AchievementProgress {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: {
    current: number;
    required: number;
    percentage: number;
    type: 'xp' | 'level' | 'attribute' | 'quests';
    attributeName?: string;
  };
  rewards: {
    xp: number;
    coins: number;
  };
}

export class AchievementService {
  static async checkAndUnlockAchievements(userId: string, updatedProfile: StudentProfile) {
    try {
      // Get all active achievements
      const achievements = await prisma.achievement.findMany({
        where: { isActive: true }
      });

      // Get already unlocked achievements
      const unlockedAchievements = await prisma.studentAchievement.findMany({
        where: { userId },
        select: { achievementId: true }
      });

      const unlockedIds = unlockedAchievements.map(ua => ua.achievementId);
      const newlyUnlocked: string[] = [];

      for (const achievement of achievements) {
        // Skip if already unlocked
        if (unlockedIds.includes(achievement.id)) continue;

        let canUnlock = true;

        // Check XP requirement
        if (achievement.requiredXp && updatedProfile.xp < achievement.requiredXp) {
          canUnlock = false;
        }

        // Check level requirement
        if (achievement.requiredLevel && updatedProfile.level < achievement.requiredLevel) {
          canUnlock = false;
        }

        // Check attribute requirement
        if (achievement.requiredAttribute) {
          const [attribute, requiredValue] = achievement.requiredAttribute.split(':');
          const currentValue = updatedProfile[attribute as keyof StudentProfile] as number;
          if (currentValue < parseInt(requiredValue)) {
            canUnlock = false;
          }
        }

        // Check quest requirements
        if (achievement.requiredQuests.length > 0) {
          const completedQuests = await prisma.questCompletion.findMany({
            where: {
              userId,
              questId: { in: achievement.requiredQuests }
            },
            select: { questId: true }
          });

          const completedQuestIds = completedQuests.map(cq => cq.questId);
          const hasAllRequiredQuests = achievement.requiredQuests.every(
            questId => completedQuestIds.includes(questId)
          );

          if (!hasAllRequiredQuests) {
            canUnlock = false;
          }
        }

        // Unlock achievement if all requirements met
        if (canUnlock) {
          await prisma.studentAchievement.create({
            data: {
              userId,
              achievementId: achievement.id
            }
          });

          // Award achievement rewards
          if (achievement.xpReward > 0 || achievement.coinReward > 0) {
            await prisma.studentProfile.update({
              where: { userId },
              data: {
                xp: { increment: achievement.xpReward },
                coins: { increment: achievement.coinReward }
              }
            });
          }

          newlyUnlocked.push(achievement.id);
        }
      }

      return newlyUnlocked;
    } catch (error) {
      console.error('Error checking achievements:', error);
      return [];
    }
  }

  static async getAllAchievementsForUser(userId: string): Promise<AchievementProgress[]> {
    try {
      const allAchievements = await prisma.achievement.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'asc' }
      });

      const unlockedAchievements = await prisma.studentAchievement.findMany({
        where: { userId },
        include: { achievement: true }
      });

      const unlockedMap = new Map(
        unlockedAchievements.map(ua => [ua.achievementId, ua.unlockedAt])
      );

      // Get current user profile for progress calculation
      const userProfile = await prisma.studentProfile.findUnique({
        where: { userId }
      });

      if (!userProfile) {
        return [];
      }

      // Get completed quests for quest-based achievements
      const completedQuests = await prisma.questCompletion.findMany({
        where: { userId },
        select: { questId: true }
      });
      const completedQuestIds = completedQuests.map(cq => cq.questId);

      return allAchievements.map(achievement => {
        let progress: {
          current: number;
          required: number;
          percentage: number;
          type: 'xp' | 'level' | 'attribute' | 'quests';
          attributeName?: string;
        } = { current: 0, required: 0, percentage: 0, type: 'xp' };

        // Calculate progress based on requirement type
        if (achievement.requiredXp) {
          progress = {
            current: Math.min(userProfile.xp, achievement.requiredXp),
            required: achievement.requiredXp,
            percentage: Math.min(100, (userProfile.xp / achievement.requiredXp) * 100),
            type: 'xp' as const
          };
        } else if (achievement.requiredLevel) {
          progress = {
            current: Math.min(userProfile.level, achievement.requiredLevel),
            required: achievement.requiredLevel,
            percentage: Math.min(100, (userProfile.level / achievement.requiredLevel) * 100),
            type: 'level' as const
          };
        } else if (achievement.requiredAttribute) {
          const [attributeName, requiredValue] = achievement.requiredAttribute.split(':');
          const currentValue = userProfile[attributeName as keyof typeof userProfile] as number;
          const required = parseInt(requiredValue);
          progress = {
            current: Math.min(currentValue, required),
            required: required,
            percentage: Math.min(100, (currentValue / required) * 100),
            type: 'attribute' as const,
            attributeName: attributeName
          };
        } else if (achievement.requiredQuests.length > 0) {
          const completedRequired = achievement.requiredQuests.filter(
            questId => completedQuestIds.includes(questId)
          ).length;
          progress = {
            current: completedRequired,
            required: achievement.requiredQuests.length,
            percentage: Math.min(100, (completedRequired / achievement.requiredQuests.length) * 100),
            type: 'quests' as const
          };
        }

        return {
          id: achievement.id,
          name: achievement.name,
          description: achievement.description,
          icon: achievement.icon,
          unlocked: unlockedMap.has(achievement.id),
          unlockedAt: unlockedMap.get(achievement.id) || undefined,
          progress: progress,
          rewards: {
            xp: achievement.xpReward,
            coins: achievement.coinReward
          }
        };
      });
    } catch (error) {
      console.error('Error getting achievements for user:', error);
      return [];
    }
  }

  static async getAchievementDetails(achievementId: string): Promise<any> {
    try {
      const achievement = await prisma.achievement.findUnique({
        where: { id: achievementId }
      });

      return achievement;
    } catch (error) {
      console.error('Error getting achievement details:', error);
      return null;
    }
  }
}