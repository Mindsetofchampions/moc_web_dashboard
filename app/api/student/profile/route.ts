// /* eslint-disable @typescript-eslint/no-explicit-any */
// // app/api/student/profile/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@/lib/auth';
// import prisma from '@/lib/prisma';

// export async function GET(request: NextRequest) {
//   try {
//     const session = await auth.api.getSession({ headers: request.headers });
    
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const user = await prisma.user.findUnique({
//       where: { id: session.user.id },
//       include: {
//         studentProfile: true,
//         studentAchievements: {
//           include: {
//             achievement: true
//           }
//         }
//       }
//     });

//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     // Create student profile if it doesn't exist
//     let profile = user.studentProfile;
//     if (!profile) {
//       profile = await prisma.studentProfile.create({
//         data: {
//           userId: user.id,
//           level: 1,
//           xp: 0,
//           coins: 12000,
//           character: 0,
//           health: 0,
//           exploration: 0,
//           scholarship: 0,
//           stewardship: 0,
//           avatar: "😎",
//           title: "Grid Runner"
//         }
//       });
//     }

//     // Format achievements
//     const achievements = user.studentAchievements.map(sa => ({
//       id: sa.achievement.id,
//       name: sa.achievement.name,
//       icon: sa.achievement.icon,
//       unlocked: true,
//       unlockedAt: sa.unlockedAt
//     }));

//     return NextResponse.json({
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         profile: profile,
//         achievements: achievements
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching student profile:', error);
//     return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
//   }
// }

// export async function PUT(request: NextRequest) {
//   try {
//     const session = await auth.api.getSession({ headers: request.headers });
    
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const updateData = await request.json();

//     // Update user name if provided
//     if (updateData.name) {
//       await prisma.user.update({
//         where: { id: session.user.id },
//         data: { name: updateData.name }
//       });
//     }

//     // Update student profile
//     const profileData: any = {};
//     if (updateData.avatar) profileData.avatar = updateData.avatar;
//     if (updateData.title) profileData.title = updateData.title;

//     if (Object.keys(profileData).length > 0) {
//       await prisma.studentProfile.upsert({
//         where: { userId: session.user.id },
//         update: profileData,
//         create: {
//           userId: session.user.id,
//           level: 1,
//           xp: 0,
//           coins: 12000,
//           character: 0,
//           health: 0,
//           exploration: 0,
//           scholarship: 0,
//           stewardship: 0,
//           avatar: updateData.avatar || "😎",
//           title: updateData.title || "Grid Runner"
//         }
//       });
//     }

//     return NextResponse.json({ message: 'Profile updated successfully' });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
//   }
// }
















// // Updated app/api/student/profile/route.ts
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@/lib/auth';
// import prisma from '@/lib/prisma';
// import { AchievementService } from '@/lib/achievementService';

// export async function GET(request: NextRequest) {
//   try {
//     const session = await auth.api.getSession({ headers: request.headers });
    
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const user = await prisma.user.findUnique({
//       where: { id: session.user.id },
//       include: {
//         studentProfile: true,
//       }
//     });

//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     // Create student profile if it doesn't exist
//     let profile = user.studentProfile;
//     if (!profile) {
//       profile = await prisma.studentProfile.create({
//         data: {
//           userId: user.id,
//           level: 1,
//           xp: 0,
//           coins: 12000,
//           character: 0,
//           health: 0,
//           exploration: 0,
//           scholarship: 0,
//           stewardship: 0,
//           avatar: "😎",
//           title: "Grid Runner"
//         }
//       });
//     }

//     // Get all achievements for user (locked and unlocked)
//     const achievements = await AchievementService.getAllAchievementsForUser(user.id);

//     return NextResponse.json({
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         profile: profile,
//         achievements: achievements
//       }
//     });
//   } catch (error) {
//     console.error('Error fetching student profile:', error);
//     return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
//   }
// }

// export async function PUT(request: NextRequest) {
//   try {
//     const session = await auth.api.getSession({ headers: request.headers });
    
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const updateData = await request.json();

//     // Update user name if provided
//     if (updateData.name) {
//       await prisma.user.update({
//         where: { id: session.user.id },
//         data: { name: updateData.name }
//       });
//     }

//     // Update student profile
//     const profileData: any = {};
//     if (updateData.avatar) profileData.avatar = updateData.avatar;
//     if (updateData.title) profileData.title = updateData.title;

//     if (Object.keys(profileData).length > 0) {
//       await prisma.studentProfile.upsert({
//         where: { userId: session.user.id },
//         update: profileData,
//         create: {
//           userId: session.user.id,
//           level: 1,
//           xp: 0,
//           coins: 12000,
//           character: 0,
//           health: 0,
//           exploration: 0,
//           scholarship: 0,
//           stewardship: 0,
//           avatar: updateData.avatar || "😎",
//           title: updateData.title || "Grid Runner"
//         }
//       });
//     }

//     return NextResponse.json({ message: 'Profile updated successfully' });
//   } catch (error) {
//     console.error('Error updating profile:', error);
//     return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
//   }
// }












// Updated app/api/student/profile/route.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { AchievementService } from '@/lib/achievementService';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        studentProfile: true,
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create student profile if it doesn't exist
    let profile = user.studentProfile;
    if (!profile) {
      profile = await prisma.studentProfile.create({
        data: {
          userId: user.id,
          level: 1,
          xp: 0,
          coins: 12000,
          character: 0,
          health: 0,
          exploration: 0,
          scholarship: 0,
          stewardship: 0,
          avatar: "😎",
          title: "Grid Runner"
        }
      });
    }

    // Check and unlock any achievements that should be unlocked based on current stats
    const newlyUnlocked = await AchievementService.checkAndUnlockAchievements(user.id, profile);

    // Get all achievements for user (locked and unlocked) with detailed info
    const achievements = await AchievementService.getAllAchievementsForUser(user.id);

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: profile,
        achievements: achievements
      },
      newlyUnlocked: newlyUnlocked // Return any newly unlocked achievements
    });
  } catch (error) {
    console.error('Error fetching student profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updateData = await request.json();

    // Update user name if provided
    if (updateData.name) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { name: updateData.name }
      });
    }

    // Update student profile
    const profileData: any = {};
    if (updateData.avatar) profileData.avatar = updateData.avatar;
    if (updateData.title) profileData.title = updateData.title;

    if (Object.keys(profileData).length > 0) {
      await prisma.studentProfile.upsert({
        where: { userId: session.user.id },
        update: profileData,
        create: {
          userId: session.user.id,
          level: 1,
          xp: 0,
          coins: 12000,
          character: 0,
          health: 0,
          exploration: 0,
          scholarship: 0,
          stewardship: 0,
          avatar: updateData.avatar || "😎",
          title: updateData.title || "Grid Runner"
        }
      });
    }

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}