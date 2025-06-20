'use client';

import React, { useState, useEffect } from 'react';
import StatCards from './admin/StatCards';
import UserDistribution from './admin/UserDistribution';
import VerificationTable from './admin/VerificationTable';
import DocumentReviewModal from './admin/DocumentReviewModal';

interface Stats {
  totalUsers: number;
  verifiedUsers: number;
  pendingVerifications: number;
  rejectedVerifications: number;
}

interface UserRoleCounts {
  VOLUNTEER: number;
  ORGANIZATION: number;
  ADMIN: number;
}

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

export default function AdminDashboard() {
  // Stats state
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    verifiedUsers: 0,
    pendingVerifications: 0,
    rejectedVerifications: 0,
  });

  const [roleCounts, setRoleCounts] = useState<UserRoleCounts>({
    VOLUNTEER: 0,
    ORGANIZATION: 0,
    ADMIN: 0,
  });

  // Verification state
  const [verifications, setVerifications] = useState<VerificationRequest[]>([]);
  const [activeStatus, setActiveStatus] = useState("PENDING");
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch both stats and verifications on page load
    fetchStats();
    fetchVerifications();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      const data = await response.json();

      if (data.stats) {
        setStats(data.stats);
      }

      if (data.roleCounts) {
        setRoleCounts(data.roleCounts);
      }
    } catch (error) {
      console.error("Error fetching admin stats:", error);
    }
  };

  const handleStatusChange = (status: string) => {
    setActiveStatus(status);
    fetchVerificationsWithStatus(status);
  };

  const fetchVerificationsWithStatus = async (status: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/admin/verifications?status=${status}&page=1&limit=10`
      );
      const data = await response.json();
  
      if (data.verificationRequests) {
        setVerifications(data.verificationRequests);
      }
    } catch (error) {
      console.error("Error fetching verifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVerifications = async () => {
    await fetchVerificationsWithStatus(activeStatus);
  };

  const handleViewDocument = (request: VerificationRequest) => {
    setSelectedRequest(request);
    setShowDocumentModal(true);
  };

  const handleApproveRequest = async (notes: string) => {
    if (!selectedRequest) return;

    try {
      setIsSubmitting(true);
      const response = await fetch(
        `/api/admin/verification/${selectedRequest.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "APPROVED",
            notes: notes,
          }),
        }
      );

      if (response.ok) {
        setShowDocumentModal(false);
        setSelectedRequest(null);
        // Refresh data after approval
        fetchStats();
        fetchVerifications();
      } else {
        throw new Error("Failed to approve verification");
      }
    } catch (error) {
      console.error("Error approving verification:", error);
      alert("Failed to approve verification. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRejectRequest = async (notes: string) => {
    if (!selectedRequest) return;

    if (!notes.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(
        `/api/admin/verification/${selectedRequest.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "REJECTED",
            notes: notes,
          }),
        }
      );

      if (response.ok) {
        setShowDocumentModal(false);
        setSelectedRequest(null);
        fetchStats();
        fetchVerifications();
      } else {
        throw new Error("Failed to reject verification");
      }
    } catch (error) {
      console.error("Error rejecting verification:", error);
      alert("Failed to reject verification. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>

      <StatCards stats={stats} />

      <UserDistribution roleCounts={roleCounts} totalUsers={stats.totalUsers} />

      {/* Verification Requests Table */}
      <VerificationTable 
        verifications={verifications}
        activeStatus={activeStatus}
        isLoading={isLoading}
        onStatusChange={handleStatusChange}
        onViewDocument={handleViewDocument}
      />

      {/* Document Review Modal */}
      <DocumentReviewModal
        selectedRequest={selectedRequest}
        isOpen={showDocumentModal}
        onClose={() => setShowDocumentModal(false)}
        onApprove={handleApproveRequest}
        onReject={handleRejectRequest}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}