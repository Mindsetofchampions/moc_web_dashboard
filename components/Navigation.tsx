/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


interface NavigationProps {
  userRole?: string;
}

export default function Navigation({ userRole }: NavigationProps) {
  const pathname = usePathname();
  const isAccountPage = pathname.includes('/account');
  const isRolesPage = pathname.includes('/roles');
  const isDashboardPage = pathname === '/dashboards';
  const isVerificationPage = pathname.includes('/verification');
  const isEventsPage = pathname.includes('/events');
  const isUsersPage = pathname.includes('/users');
  
  return (
    <nav className="flex-1 py-4">
      <ul className="space-y-2">
        <li>
          <Link
            href="/dashboards"
            className={`flex items-center px-6 py-3 ${isDashboardPage ? 'text-red-500 border-l-4 border-red-500' : 'text-gray-400 hover:text-white transition duration-150'}`}
          >
            <svg
              className="w-6 h-6 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
            </svg>
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/roles"
            className={`flex items-center px-6 py-3 ${isRolesPage ? 'text-red-500 border-l-4 border-red-500' : 'text-gray-400 hover:text-white transition duration-150'}`}
          >
            <svg
              className="w-6 h-6 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            Roles
          </Link>
        </li>
        <li>
          <Link
            href="/events"
            className={`flex items-center px-6 py-3 ${isEventsPage ? 'text-red-500 border-l-4 border-red-500' : 'text-gray-400 hover:text-white transition duration-150'}`}
          >
            <svg
              className="w-6 h-6 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            Events
          </Link>
        </li>
        {userRole === 'ADMIN' && (<>
          <li>
            <Link
              href="/users"
              className={`flex items-center px-6 py-3 ${isUsersPage ? 'text-red-500 border-l-4 border-red-500' : 'text-gray-400 hover:text-white transition duration-150'}`}
            >
              <svg
                className="w-6 h-6 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Users
            </Link>
          </li>
          </>
          
        )}
      </ul>
    </nav>
  );
}
