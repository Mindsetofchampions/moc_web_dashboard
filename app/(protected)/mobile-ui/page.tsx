// app/(protected)/mobile-ui/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import MobileGameUI from '@/components/mobile/MobileGameUI';

interface User {
  id: string;
  name?: string;
  email?: string;
  role: string;
}

export default function MobileUIPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/check-role');
        if (response.ok) {
          const userData = await response.json();
          
          // Only allow students to access this page
          if (userData.role !== 'STUDENT') {
            router.push('/dashboards');
            return;
          }
          
          setUser(userData);
        } else {
          router.push('/sign-in');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/sign-in');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/sign-in');
          },
          onError: (context) => {
            console.error('Sign out error:', context.error);
            router.push('/sign-in');
          }
        }
      });
    } catch (error) {
      console.error('Error signing out:', error);
      router.push('/sign-in');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0C1D]">
        <div className="w-[70px] h-[70px] relative">
          <div className="absolute w-full h-full border-[3px] border-transparent border-t-[#8A2BE2] rounded-full animate-spin"></div>
          <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] border-[3px] border-transparent border-t-[#00FFFF] rounded-full animate-spin [animation-duration:0.9s] [animation-direction:reverse]"></div>
          <div className="absolute w-[60%] h-[60%] top-[20%] left-[20%] border-[3px] border-transparent border-t-[#FF00FF] rounded-full animate-spin [animation-duration:0.8s]"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; 
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0D0C1D]">
      <MobileGameUI user={user} onSignOut={handleSignOut} />
    </div>
  );
}