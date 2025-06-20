import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma"; 
import Image from "next/image";
import { redirect } from 'next/navigation';

export default async function RolesPage() {
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
      updatedAt: true
    }
  });

  const user = {
    ...session.user,
    ...dbUser
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  return (
    <div className="space-y-10">
      {/* User Profile Card */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-black/60 to-gray-800/60 backdrop-blur-md border border-gray-700 shadow-2xl">
        {/* Background Pattern */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-red-500/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-blue-500/20 blur-3xl"></div>
        
        <div className="relative z-10 p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* User Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-red-500/30 shadow-lg">
                {user?.image ? (
                  <Image 
                    src={user.image} 
                    alt={user?.name || 'User'} 
                    width={128} 
                    height={128}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Verification Badge */}
              {user?.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full border-2 border-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-1">{user?.name || 'User'}</h2>
              <p className="text-gray-400 mb-4">{user?.email}</p>
              
              <div className="inline-flex items-center bg-black/30 px-4 py-2 rounded-full">
                <span className="text-gray-400 mr-2">Current Role:</span>
                <span className={`font-semibold ${
                  user?.role === 'ADMIN' ? 'text-purple-400' : 
                  user?.role === 'ORGANIZATION' ? 'text-blue-400' : 
                  'text-green-400'
                }`}>
                  {user?.role || 'VOLUNTEER'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Verification Status</p>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${user?.isVerified ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <p className="text-white font-medium">{user?.isVerified ? 'Verified Account' : 'Verification Pending'}</p>
                  </div>
                </div>
                
                <div className="bg-black/30 rounded-lg p-4">
                  <p className="text-gray-400 text-sm mb-1">Member Since</p>
                  <p className="text-white font-medium">
                    {user?.createdAt ? formatDate(user.createdAt) : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Role Information Cards */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Role Privileges & Access
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Volunteer Card */}
          <div className={`relative overflow-hidden group rounded-xl transition-all duration-300 ${
            user?.role === 'VOLUNTEER' 
              ? 'bg-gradient-to-br from-green-900/50 to-green-700/20 border-2 border-green-500/50 transform scale-[1.02]' 
              : 'bg-black/30 border border-gray-700 hover:border-green-500/30'
          }`}>
            {user?.role === 'VOLUNTEER' && (
              <div className="absolute top-0 right-0">
                <div className="bg-green-500 text-white text-xs font-bold py-1 px-4 rounded-bl-lg">
                  CURRENT
                </div>
              </div>
            )}
            
            <div className="p-6">
              <div className="w-12 h-12 mb-4 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              <h4 className="text-xl font-bold text-white mb-2">Volunteer</h4>
              <p className="text-gray-400 mb-4">Participate in community events and contribute your time and skills to make a difference.</p>
              
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Join and participate in events
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Track volunteer hours
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Receive certificates
                </li>
              </ul>
            </div>
          </div>
          
          {/* Organization Card */}
          <div className={`relative overflow-hidden group rounded-xl transition-all duration-300 ${
            user?.role === 'ORGANIZATION' 
              ? 'bg-gradient-to-br from-blue-900/50 to-blue-700/20 border-2 border-blue-500/50 transform scale-[1.02]' 
              : 'bg-black/30 border border-gray-700 hover:border-blue-500/30'
          }`}>
            {user?.role === 'ORGANIZATION' && (
              <div className="absolute top-0 right-0">
                <div className="bg-blue-500 text-white text-xs font-bold py-1 px-4 rounded-bl-lg">
                  CURRENT
                </div>
              </div>
            )}
            
            <div className="p-6">
              <div className="w-12 h-12 mb-4 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              
              <h4 className="text-xl font-bold text-white mb-2">Organization</h4>
              <p className="text-gray-400 mb-4">Create and manage events, engage with volunteers, and make a broader impact.</p>
              
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Create and manage events
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Coordinate volunteer teams
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Access analytics and reports
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Custom branding options
                </li>
              </ul>
            </div>
          </div>
          
          {/* Admin Card */}
          <div className={`relative overflow-hidden group rounded-xl transition-all duration-300 ${
            user?.role === 'ADMIN' 
              ? 'bg-gradient-to-br from-purple-900/50 to-purple-700/20 border-2 border-purple-500/50 transform scale-[1.02]' 
              : 'bg-black/30 border border-gray-700 hover:border-purple-500/30'
          }`}>
            {user?.role === 'ADMIN' && (
              <div className="absolute top-0 right-0">
                <div className="bg-purple-500 text-white text-xs font-bold py-1 px-4 rounded-bl-lg">
                  CURRENT
                </div>
              </div>
            )}
            
            <div className="p-6">
              <div className="w-12 h-12 mb-4 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              
              <h4 className="text-xl font-bold text-white mb-2">Admin</h4>
              <p className="text-gray-400 mb-4">Full platform access with ability to manage users, organizations, and system settings.</p>
              
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Manage all users and roles
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Approve verification requests
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Configure platform settings
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Access all analytics and reports
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-purple-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  System-wide announcements
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}