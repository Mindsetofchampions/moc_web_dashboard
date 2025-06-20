// types/user.ts
export interface ExtendedUser {
    id: string;
    name?: string;
    email?: string;
    emailVerified: boolean;
    image?: string | null;
    role?: 'VOLUNTEER' | 'ORGANIZATION' | 'ADMIN';
    isVerified?: boolean;
    createdAt: Date;
    updatedAt: Date;
  }