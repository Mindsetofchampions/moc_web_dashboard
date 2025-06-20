// app/(protected)/dashboard/page.tsx
import React from "react";
import { headers } from "next/headers";
import { redirect } from 'next/navigation';
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import UserDashboard from "@/components/dashboard/UserDashboard";

export default async function DashboardPage() {
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
    }
  });
  

  const user = {
    ...session.user,
    ...dbUser,
    role: dbUser?.role || 'VOLUNTEER'
  };
  
  const isAdmin = user.role === 'ADMIN';
  
  return (
    <div className="w-full">
      {isAdmin ? (
        <AdminDashboard />
      ) : (
        <UserDashboard userName={user.name || ''} />
      )}
    </div>
  );
}