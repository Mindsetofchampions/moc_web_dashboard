
'use client';

import React from 'react';
import { AlertCircle, CheckCircle, Clock, Eye, UserCheck, XCircle } from 'lucide-react';

interface VerificationDoc {
  id: string;
  documentUrl: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  verificationDoc: VerificationDoc | null;
}

interface VerificationRequest {
  id: string;
  userId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  reviewedBy: string | null;
  notes: string | null;
  user: User;
}

interface VerificationTableProps {
  verifications: VerificationRequest[];
  activeStatus: string;
  isLoading: boolean;
  onStatusChange: (status: string) => void;
  onViewDocument: (request: VerificationRequest) => void;
}

export default function VerificationTable({
  verifications,
  activeStatus,
  isLoading,
  onStatusChange,
  onViewDocument
}: VerificationTableProps) {
  const statusStyles = {
    PENDING: 'bg-amber-500/10 text-amber-400 border-amber-600',
    APPROVED: 'bg-emerald-500/10 text-emerald-400 border-emerald-600',
    REJECTED: 'bg-rose-500/10 text-rose-400 border-rose-600',
  };

  const statusIcons = {
    PENDING: <Clock className="w-4 h-4 mr-1" />,
    APPROVED: <CheckCircle className="w-4 h-4 mr-1" />,
    REJECTED: <XCircle className="w-4 h-4 mr-1" />,
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-xl shadow-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <UserCheck className="w-6 h-6 text-indigo-400 mr-2" />
          <h2 className="text-xl font-bold text-white">
            Verification Requests
          </h2>
        </div>
        
        <div className="bg-black/30 rounded-lg p-1">
          <div className="flex items-center">
            <button
              onClick={() => onStatusChange("all")}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeStatus === "all"
                  ? "bg-gray-800 text-white shadow-md"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              All
            </button>
            <button
              onClick={() => onStatusChange("PENDING")}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeStatus === "PENDING"
                  ? "bg-amber-500/20 text-amber-400 shadow-md"
                  : "text-gray-400 hover:text-amber-400 hover:bg-gray-800/50"
              }`}
            >
              <Clock className="w-4 h-4 mr-1" />
              Pending
            </button>
            <button
              onClick={() => onStatusChange("APPROVED")}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeStatus === "APPROVED"
                  ? "bg-emerald-500/20 text-emerald-400 shadow-md" 
                  : "text-gray-400 hover:text-emerald-400 hover:bg-gray-800/50"
              }`}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Approved
            </button>
            <button
              onClick={() => onStatusChange("REJECTED")}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeStatus === "REJECTED"
                  ? "bg-rose-500/20 text-rose-400 shadow-md"
                  : "text-gray-400 hover:text-rose-400 hover:bg-gray-800/50"
              }`}
            >
              <XCircle className="w-4 h-4 mr-1" />
              Rejected
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-64 bg-gray-900/30 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-gray-400">Loading requests...</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-800">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-black/40">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Date Submitted
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-black/20 divide-y divide-gray-800">
                {verifications.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <AlertCircle className="w-10 h-10 text-gray-600 mb-3" />
                        <p className="text-gray-400 font-medium mb-1">No verification requests found</p>
                        <p className="text-gray-600 text-sm">
                          {activeStatus === "all" 
                            ? "There are no verification requests available" 
                            : `There are no ${activeStatus.toLowerCase()} requests`}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  verifications.map((verification) => (
                    <tr 
                      key={verification.id} 
                      className="hover:bg-gray-800/40 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                            <span className="text-lg font-medium text-indigo-400">
                              {verification.user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-white">
                              {verification.user.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              {verification.user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${
                            statusStyles[
                              verification.status as keyof typeof statusStyles
                            ] || "bg-gray-500/20 text-gray-500 border-gray-700"
                          }`}
                        >
                          {verification.status === "PENDING" && statusIcons.PENDING}
                          {verification.status === "APPROVED" && statusIcons.APPROVED}
                          {verification.status === "REJECTED" && statusIcons.REJECTED}
                          {verification.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {formatDate(verification.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-900/40 text-indigo-400 border border-indigo-800">
                          {verification.user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => onViewDocument(verification)}
                            className="flex items-center px-3 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded-lg transition-colors duration-150"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </button>
                          
                          {verification.status === "PENDING" && (
                            <>
                              <button
                                onClick={() => onViewDocument(verification)}
                                className="flex items-center px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors duration-150"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </button>
                              <button
                                onClick={() => onViewDocument(verification)}
                                className="flex items-center px-3 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors duration-150"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}