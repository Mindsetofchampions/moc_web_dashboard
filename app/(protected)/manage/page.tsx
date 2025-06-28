// app/(protected)/manage/page.tsx
import React from 'react';
import { headers } from "next/headers";
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import ManageDashboard from '@/components/manage/ManageDashboard';

export default async function ManagePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session) {
    return redirect("/sign-in");
  }
  
  const user = await prisma.user.findUnique({
    where: { 
      id: session.user.id 
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    }
  });
  
  if (user?.role !== 'ADMIN') {
    return redirect("/dashboards");
  }
  
  return (
    <div className="w-full">
      <ManageDashboard />
    </div>
  );
}