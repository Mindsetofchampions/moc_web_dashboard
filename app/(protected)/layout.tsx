/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import PageHeader from '@/components/PageHeader';


export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profileResponse = await fetch('/api/user/profile');
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          console.log("Complete profile data:", profileData);
          
          if (profileData.user) {
            setUser(profileData.user);
            setLoading(false);
            return;
          }
        }
        
        const roleResponse = await fetch('/api/user/check-role');
        if (roleResponse.ok) {
          const userData = await roleResponse.json();
          console.log("Role check data:", userData);
          setUser(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-transparent text-white">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/carbon-fiber.png"
          alt="Carbon Fiber Background"
          fill
          className="object-cover opacity-20"
        />
      </div>

      <div className="relative z-10 w-64 flex flex-col">
        <div className="p-4">
          <div className="flex items-center justify-center">
            <Image
              src="/moc-logo.png"
              alt="Mindset of Champions Foundation"
              width={100}
              height={100}
            />
          </div>
        </div>

        <Navigation userRole={user?.role} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
        <PageHeader user={user} />
        <main className="p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}