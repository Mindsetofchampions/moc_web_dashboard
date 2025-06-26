'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import ProfileDropdown from '@/components/profile-dropdown';

interface ExtendedUser {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  image?: string | null;
  role?: 'VOLUNTEER' | 'ORGANIZATION' | 'ADMIN';
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PageHeaderProps {
  user: ExtendedUser;
}

export default function PageHeader({ user }: PageHeaderProps) {
  const pathname = usePathname();

  let title = "Dashboard";
  if (pathname.includes('/account')) title = "Account";
  if (pathname.includes('/roles')) title = "Roles";
  if (pathname.includes('/verification')) title = "Verification";
  if (pathname === '/dashboards') title = "Dashboard";
  if (pathname.includes('/events')) title = "Events";
  
  return (
    <header className="bg-transparent p-4 sticky top-0 z-20">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red-500">{title}</h1>
        <div className="flex items-center space-x-4">
          {/* <div className="relative">
            <input
              type="text"
              placeholder="Search for something"
              className="w-64 bg-gray-800 rounded-full py-2 px-10 text-white focus:outline-none"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <button className="bg-gray-800 p-2 rounded-full">
            <svg
              className="w-6 h-6 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </button> */}

          {/* <button className="bg-gray-800 p-2 rounded-full">
            <svg
              className="w-6 h-6 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </button> */}

          {user && (
            <ProfileDropdown user={{
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              role: user.role,
              isVerified: user.isVerified || false
            }} />
          )}
        </div>
      </div>
    </header>
  );
}