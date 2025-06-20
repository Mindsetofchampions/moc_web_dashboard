/* eslint-disable @typescript-eslint/no-unused-vars */
// app/(protected)/account/page.tsx
import { headers } from "next/headers";
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import AccountPage from '@/components/account-page';

export default async function AccountPageWrapper() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session) {
    return redirect("/sign-in"); 
  }
  
  const dbUser = await prisma.user.findUnique({
    where: { 
      id: session.user.id 
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isVerified: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      dateOfBirth: true,
      presentAddress: true,
      permanentAddress: true,
      city: true,
      postalCode: true,
      country: true
    }
  });
  
  const safeUser = {
    id: session.user.id,
    name: session.user.name || dbUser?.name || undefined,
    email: session.user.email || dbUser?.email || undefined,
    image: dbUser?.image || session.user.image || undefined,
    role: dbUser?.role || undefined,
    isVerified: dbUser?.isVerified || false,
    dateOfBirth: dbUser?.dateOfBirth || undefined,
    presentAddress: dbUser?.presentAddress || undefined,
    permanentAddress: dbUser?.permanentAddress || undefined,
    city: dbUser?.city || undefined,
    postalCode: dbUser?.postalCode || undefined,
    country: dbUser?.country || undefined,
    createdAt: dbUser?.createdAt || new Date(),
    updatedAt: dbUser?.updatedAt || new Date()
  };
  
  return <AccountPage user={safeUser} isEditable={true} />;
}