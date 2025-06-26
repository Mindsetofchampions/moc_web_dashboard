// app/(protected)/dashboards/page.tsx
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

  // Students should not access this dashboard
  // They should only access /mobile-ui
  if (user.role === 'STUDENT') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-red-900/20 border border-red-400/30 rounded-lg p-8">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-6">Students cannot access the dashboard. Please use the mobile interface.</p>
          <a 
            href="/mobile-ui" 
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded transition-colors"
          >
            Go to Mobile Interface
          </a>
        </div>
      </div>
    );
  }

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