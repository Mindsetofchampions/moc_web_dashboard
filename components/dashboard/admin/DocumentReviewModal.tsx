/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'; 

import React, { useState, useEffect, useCallback } from 'react';

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
  status: 'PENDING' | 'APPROVED' | 'REJECTED'; 
  createdAt: string;
  updatedAt: string;
  reviewedBy: string | null;
  notes: string | null;
  user: User;
}

interface DocumentReviewModalProps {
  selectedRequest: VerificationRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (notes: string) => Promise<void>;
  onReject: (notes: string) => Promise<void>;
  isSubmitting: boolean;
}

export default function DocumentReviewModal({
  selectedRequest,
  isOpen,
  onClose,
  onApprove,
  onReject,
  isSubmitting,
}: DocumentReviewModalProps) {
  const [reviewNotes, setReviewNotes] = useState('');
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [isLoadingUrl, setIsLoadingUrl] = useState(false); // State for loading indicator
  const [fetchError, setFetchError] = useState<string | null>(null); // State for fetch errors

  // Status badges styles
  const statusStyles: Record<VerificationRequest['status'], string> = {
    PENDING: 'bg-yellow-500/20 text-yellow-500 border-yellow-700',
    APPROVED: 'bg-green-500/20 text-green-500 border-green-700',
    REJECTED: 'bg-red-500/20 text-red-500 border-red-700',
  };

  const fetchPresignedUrl = useCallback(async (docId: string) => {
    if (!docId) return;

    setIsLoadingUrl(true);
    setFetchError(null); 
    setDocumentUrl(null); 

    try {
      const response = await fetch(`/api/admin/document/${docId}`);

      if (!response.ok) {
        const errorData = await response.text(); 
        throw new Error(
          `Failed to fetch presigned URL: ${response.status} ${response.statusText}. ${errorData}`
        );
      }

      const data = await response.json();

      if (data.presignedUrl) {
        setDocumentUrl(data.presignedUrl);
      } else {
        console.error('No presigned URL found in response:', data);
        setFetchError('Presigned URL could not be retrieved.');
        setDocumentUrl(null);
      }
    } catch (error) {
      console.error('Error fetching presigned URL:', error);
      setFetchError(
        error instanceof Error ? error.message : 'An unknown error occurred.'
      );
      setDocumentUrl(null);
    } finally {
      setIsLoadingUrl(false);
    }
  }, []); 

  useEffect(() => {
    setDocumentUrl(null);
    setReviewNotes(selectedRequest?.notes || ''); 
    setFetchError(null);
    setIsLoadingUrl(false);

    if (isOpen && selectedRequest?.user?.verificationDoc?.id) {
      fetchPresignedUrl(selectedRequest.user.verificationDoc.id);
    }
  }, [selectedRequest, isOpen, fetchPresignedUrl]); 

  const getFileExtension = (url: string | null): string => {
    if (!url) return 'file';
    try {
      const parsedUrl = new URL(url);
      const pathname = parsedUrl.pathname;
      const lastDotIndex = pathname.lastIndexOf('.');
      if (lastDotIndex > -1 && lastDotIndex < pathname.length - 1) {
        return pathname.substring(lastDotIndex + 1);
      }
    } catch (e) {
      const parts = url.split('.').pop();
      if (parts && parts.length < 5) return parts.split('?')[0]; 
    }
    return 'file'; 
  };

  if (!isOpen || !selectedRequest) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80"
        onClick={!isSubmitting ? onClose : undefined} 
      ></div>

      <div className="relative bg-gray-900 border border-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="sticky top-0 bg-gray-900 px-6 py-4 border-b border-gray-800 flex justify-between items-center z-10">
          <h3 className="text-xl font-bold text-white">
            Verification Document Review
          </h3>
          <button
            onClick={!isSubmitting ? onClose : undefined}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-white disabled:opacity-50"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-grow">
          <div className="p-6 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3 bg-black/50 rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px]">
              {selectedRequest.user.verificationDoc ? (
                <>
                  {isLoadingUrl && (
                    <div className="text-gray-400 py-16 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                      <p>Preparing document access...</p>
                    </div>
                  )}
                  {fetchError && !isLoadingUrl && (
                     <div className="text-red-400 py-16 text-center">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                       </svg>
                       <p className="font-semibold">Error loading document</p>
                       <p className="text-sm mt-1">{fetchError}</p>
                     </div>
                   )}
                  {documentUrl && !isLoadingUrl && !fetchError && (
                    <div className="text-center w-full">
                      <div className="bg-gray-800/50 p-4 rounded-lg mb-6 text-left">
                        <h4 className="text-white font-medium mb-2">
                          Document Information
                        </h4>
                        <p className="text-gray-300 text-sm break-words">
                          <span className="text-gray-400">Document ID:</span>{' '}
                          {selectedRequest.user.verificationDoc.id}
                        </p>
                        <p className="text-gray-300 text-sm">
                          <span className="text-gray-400">Uploaded:</span>{' '}
                          {new Date(
                            selectedRequest.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <p className="text-lg text-white mb-4">
                          Document Actions
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                           <a
                             href={documentUrl}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center transition duration-300"
                           >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            Open in New Tab
                          </a>
                           {/* <a
                             href={documentUrl}
                             download={`verification-doc-${
                               selectedRequest.id
                             }.${getFileExtension(documentUrl)}`} 
                             className="px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center transition duration-300"
                           >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                            Download
                          </a> */}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-gray-400 py-16 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto mb-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p>No document uploaded for this request.</p>
                </div>
              )}
            </div>

            <div className="w-full md:w-1/3 flex flex-col space-y-4">
              <div className="bg-black/50 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3">
                  User Information
                </h4>
                <div className="text-sm text-gray-300 space-y-2">
                  <p>
                    <span className="text-gray-400 font-medium w-28 inline-block">Name:</span>{' '}
                    {selectedRequest.user.name}
                  </p>
                  <p>
                    <span className="text-gray-400 font-medium w-28 inline-block">Email:</span>{' '}
                    {selectedRequest.user.email}
                  </p>
                  <p>
                    <span className="text-gray-400 font-medium w-28 inline-block">Role:</span>{' '}
                    {selectedRequest.user.role}
                  </p>
                  <p className="flex items-center">
                    <span className="text-gray-400 font-medium w-28 inline-block">Status:</span>
                    <span
                      className={`ml-2 inline-flex px-2 py-0.5 text-xs font-semibold rounded-full border ${
                        statusStyles[selectedRequest.status] ?? 'bg-gray-500/20 text-gray-400 border-gray-600' // Fallback style
                      }`}
                    >
                      {selectedRequest.status}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-400 font-medium w-28 inline-block">Submitted:</span>{' '}
                    {new Date(selectedRequest.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="bg-black/50 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3">Review Action</h4>

                 {selectedRequest.status === 'PENDING' ? (
                  <>
                    <div className="mb-4">
                      <label htmlFor="reviewNotes" className="block text-sm text-gray-400 mb-1">
                        Notes {selectedRequest.status === 'PENDING' && '(Required for rejection)'}
                      </label>
                      <textarea
                        id="reviewNotes"
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        placeholder="Add review notes..."
                        className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md h-24 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        disabled={isSubmitting}
                      ></textarea>
                    </div>

                    <div className="flex space-x-3">
                       <button
                         onClick={() => onApprove(reviewNotes)}
                         disabled={isSubmitting || !documentUrl || !!fetchError} 
                         className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                       >
                        {isSubmitting ? 'Processing...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => onReject(reviewNotes)}
                        disabled={isSubmitting || !reviewNotes.trim()} 
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Processing...' : 'Reject'}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="bg-gray-800/50 p-3 rounded-md">
                    <p className="text-sm text-gray-400 mb-1">
                      This request has already been reviewed.
                    </p>
                    {selectedRequest.notes && (
                      <div className="mt-2 text-sm">
                        <span className="text-gray-400 font-semibold">Review Notes:</span>
                        <p className="text-gray-300 mt-1 whitespace-pre-wrap break-words">
                          {selectedRequest.notes}
                        </p>
                      </div>
                    )}
                     {!selectedRequest.notes && (
                       <p className="text-sm text-gray-500 italic mt-1">No notes were added during review.</p>
                     )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}