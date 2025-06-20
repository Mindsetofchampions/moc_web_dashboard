'use client';

import React from 'react';

interface UserRoleCounts {
  VOLUNTEER: number;
  ORGANIZATION: number;
  ADMIN: number;
}

interface UserDistributionProps {
  roleCounts: UserRoleCounts;
  totalUsers: number;
}

export default function UserDistribution({ roleCounts, totalUsers }: UserDistributionProps) {
  return (
    <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-white mb-4">
        User Distribution by Role
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border border-gray-700 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Volunteers</span>
            <span className="text-white font-bold">
              {roleCounts.VOLUNTEER}
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{
                width: `${
                  totalUsers
                    ? (roleCounts.VOLUNTEER / totalUsers) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>

        <div className="p-4 border border-gray-700 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Organizations</span>
            <span className="text-white font-bold">
              {roleCounts.ORGANIZATION}
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{
                width: `${
                  totalUsers
                    ? (roleCounts.ORGANIZATION / totalUsers) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>

        <div className="p-4 border border-gray-700 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Admins</span>
            <span className="text-white font-bold">{roleCounts.ADMIN}</span>
          </div>
          <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full"
              style={{
                width: `${
                  totalUsers
                    ? (roleCounts.ADMIN / totalUsers) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}