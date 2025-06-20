import { PrismaClient } from '@prisma/client';
import { createId } from '@paralleldrive/cuid2';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminId = createId();
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      id: adminId,
      name: 'Admin User',
      email: 'admin@example.com',
      emailVerified: true,
      role: 'ADMIN',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      accounts: {
        create: {
          id: createId(),
          accountId: adminId,
          providerId: 'email',
          password: hashSync('Admin@123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    },
  });

  // Create sample organization user
  const orgId = createId();
  const orgUser = await prisma.user.upsert({
    where: { email: 'org@example.com' },
    update: {},
    create: {
      id: orgId,
      name: 'Organization',
      email: 'org@example.com',
      emailVerified: true,
      role: 'ORGANIZATION',
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      accounts: {
        create: {
          id: createId(),
          accountId: orgId,
          providerId: 'email',
          password: hashSync('Org@123', 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    },
  });

  console.log({ adminUser, orgUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });