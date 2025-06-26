// types/user.ts
export interface ExtendedUser {
    id: string;
    name?: string;
    email?: string;
    emailVerified: boolean;
    image?: string | null;
    role?: 'VOLUNTEER' | 'ORGANIZATION' | 'ADMIN' | 'STUDENT';
    isVerified?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type UserRole = 'VOLUNTEER' | 'ORGANIZATION' | 'ADMIN' | 'STUDENT';

export const USER_ROLES = {
    VOLUNTEER: 'VOLUNTEER',
    ORGANIZATION: 'ORGANIZATION', 
    ADMIN: 'ADMIN',
    STUDENT: 'STUDENT'
} as const;