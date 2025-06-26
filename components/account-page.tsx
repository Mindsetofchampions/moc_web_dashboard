/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import AddressAutocomplete from './ui/AddressAutocomplete';

interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  isVerified?: boolean;
  image?: string;
  dateOfBirth?: string | Date;
  presentAddress?: string;
  permanentAddress?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

interface ProfileFormData {
  name: string;
  email: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  city: string;
  postalCode: string;
  country: string;
}

interface AccountPageProps {
  user?: User;
  isEditable?: boolean;
}

export default function AccountPage({ user, isEditable = true }: AccountPageProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState<string>(user?.image || '/placeholder-avatar.png');
  const [verificationDocument, setVerificationDocument] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Added state variables for verification status
  const [verificationStatus, setVerificationStatus] = useState<'PENDING' | 'APPROVED' | 'REJECTED' | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(user?.isVerified || false);
  
  // Added state for drag and drop
  const [isDragOver, setIsDragOver] = useState(false);
  
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const isAdmin = user?.role === 'ADMIN';
  const isVolunteer = user?.role === 'VOLUNTEER';
  
  useEffect(() => {
    if ((isAdmin && activeTab === 'verification') || 
        (isAdmin && activeTab === 'qrcode') || 
        (!isVolunteer && activeTab === 'qrcode')) {
      setActiveTab('profile');
    }
  }, [isAdmin, isVolunteer, activeTab]);
  
  const { register, handleSubmit,control, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      dateOfBirth: user?.dateOfBirth ? new Date(user?.dateOfBirth).toISOString().split('T')[0] : '',
      presentAddress: user?.presentAddress || '',
      permanentAddress: user?.permanentAddress || '',
      city: user?.city || '',
      postalCode: user?.postalCode || '',
      country: user?.country || '',
    },
  });

  useEffect(() => {
    if (activeTab === 'verification' && !isAdmin) {
      const fetchVerificationStatus = async () => {
        try {
          const response = await fetch('/api/user/verification');
          if (!response.ok) {
            throw new Error('Failed to fetch verification status');
          }
          const data = await response.json();
          
          setIsVerified(data.isVerified || false);
          
          if (data.verificationRequest) {
            setVerificationStatus(data.verificationRequest.status);
            if (data.verificationRequest.status === 'REJECTED' && data.verificationRequest.notes) {
              setRejectionReason(data.verificationRequest.notes);
            }
          }
        } catch (error) {
          console.error('Error fetching verification status:', error);
        }
      };
      
      fetchVerificationStatus();
    }
  }, [activeTab, isAdmin]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      if (profileImageFile) {
        const formData = new FormData();
        
        formData.append('name', data.name);
        if (data.dateOfBirth) formData.append('dateOfBirth', data.dateOfBirth);
        if (data.presentAddress) formData.append('presentAddress', data.presentAddress);
        if (data.permanentAddress) formData.append('permanentAddress', data.permanentAddress);
        if (data.city) formData.append('city', data.city);
        if (data.postalCode) formData.append('postalCode', data.postalCode);
        if (data.country) formData.append('country', data.country);

        formData.append('profileImage', profileImageFile);
        
        const response = await fetch('/api/user/profile', {
          method: 'PUT',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
  
        const result = await response.json();

        if (result.user?.image) {
          setProfileImage(result.user.image);
          setProfileImageFile(null); 
        }
        
        alert('Profile updated successfully');
      } else {
        const response = await fetch('/api/user/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
  
        alert('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      setProfileImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProfileImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Enhanced file validation function
  const validateVerificationFile = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid file type (JPG, PNG, or PDF)');
      return false;
    }

    if (file.size > maxSize) {
      alert('File size exceeds 5MB limit. Please choose a smaller file.');
      return false;
    }

    return true;
  };

  const handleVerificationUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateVerificationFile(file)) {
        setVerificationDocument(file);
      }
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateVerificationFile(file)) {
        setVerificationDocument(file);
      }
    }
  };

  const submitVerification = async () => {
    if (!verificationDocument) {
      alert('Please upload a verification document');
      return;
    }

    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append('document', verificationDocument);
    
    try {
      const response = await fetch('/api/user/verification', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit verification request');
      }

      const data = await response.json();
      alert('Verification request submitted successfully');
      setVerificationDocument(null);
      setVerificationStatus('PENDING');
    } catch (error) {
      console.error('Error submitting verification:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit verification request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const qrCodeData = user?.id ? JSON.stringify({ 
    id: user.id,
    name: user.name,
    role: 'VOLUNTEER'
  }) : '';

  return (
    <div className="flex flex-col min-h-full bg-transparent">
      <div className="border-b border-gray-800">
        <div className="flex">
          <button
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'profile' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('profile')}
          >
            Edit Profile
          </button>
          {/* <button
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'preferences' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('preferences')}
          >
            Preferences
          </button>
          <button
            className={`px-6 py-4 text-sm font-medium ${activeTab === 'security' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button> */}
          {!isAdmin && (
            <button
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'verification' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('verification')}
            >
              Verification
            </button>
          )}
          {isVolunteer && (
            <button
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'qrcode' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('qrcode')}
            >
              QR Code
            </button>
          )}
        </div>
      </div>

      <div className="p-6 flex-grow">
        {activeTab === 'profile' && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className='flex gap-5 justify-between'>
                <div className="flex items-start mr-5">
                  <div className="relative">
                    <Image
                      src={profileImage}
                      alt="Profile"
                      width={120}
                      height={120}
                      className="rounded-full object-cover"
                    />
                    <label
                      htmlFor="profile-image"
                      className="absolute bottom-0 right-0 bg-red-500 rounded-full p-2 cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </label>
                    <input
                      type="file"
                      id="profile-image"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={!isEditable}
                    />
                  </div>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md"
                      disabled={!isEditable}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">User Name</label>
                    <input
                      type="text"
                      value={user?.name || ''}
                      className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md"
                      disabled={true}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Email</label>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md"
                      disabled={true}
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Password</label>
                    <input
                      type="password"
                      value="••••••••"
                      className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md"
                      disabled={true}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      {...register('dateOfBirth')}
                      className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md"
                      disabled={!isEditable}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Present Address</label>
                    <Controller
                      name="presentAddress"
                      control={control}
                      render={({ field }) => (
                        <AddressAutocomplete
                          value={field.value}
                          onChange={field.onChange}
                          className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md"
                          disabled={!isEditable}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Permanent Address</label>
                    <Controller
                      name="permanentAddress"
                      control={control}
                      render={({ field }) => (
                        <AddressAutocomplete
                          value={field.value}
                          onChange={field.onChange}
                          className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md"
                          disabled={!isEditable}
                        />
                      )}
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">City</label>
                    <input
                      type="text"
                      {...register('city')}
                      className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md"
                      disabled={!isEditable}
                    />
                  </div>
                  {/* Postal Code */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Postal Code</label>
                    <input
                      type="text"
                      {...register('postalCode')}
                      className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md"
                      disabled={!isEditable}
                    />
                  </div>
                  {/* Country */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Country</label>
                    <input
                      type="text"
                      {...register('country')}
                      className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md"
                      disabled={!isEditable}
                    />
                  </div>
                </div>
            </div>

            {isEditable && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            )}
          </form>
        )}

        {activeTab === 'preferences' && (
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400">Preferences settings coming soon.</p>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400">Security settings coming soon.</p>
          </div>
        )}

        {/* Only render verification tab content for non-admin users */}
        {activeTab === 'verification' && !isAdmin && (
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">ID Verification</h2>
            
            {isVerified ? (
              <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-green-400">Your account has been verified!</p>
                </div>
              </div>
            ) : verificationStatus === 'PENDING' ? (
              <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <p className="text-yellow-400">Your verification request is under review.</p>
                </div>
              </div>
            ) : verificationStatus === 'REJECTED' ? (
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-red-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-red-400">Your verification was rejected.</p>
                    {rejectionReason && <p className="text-red-400 text-sm mt-1">Reason: {rejectionReason}</p>}
                    <p className="text-gray-400 text-sm mt-2">Please submit a new verification document below.</p>
                  </div>
                </div>
              </div>
            ) : null}
            
            {!isVerified && verificationStatus !== 'PENDING' && (
              <div className="space-y-6">
                <p className="text-gray-300">Submit a government-issued ID for verification. This helps us ensure the safety and trust within our community.</p>
                
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragOver 
                      ? 'border-red-500 bg-red-500/10' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {verificationDocument ? (
                    <div className="flex items-center justify-center flex-col">
                      <svg className="w-12 h-12 text-green-500 mb-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-green-400 font-medium">Document Ready to Upload</p>
                      <p className="text-gray-500 text-sm mt-1">{verificationDocument.name}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {(verificationDocument.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <button 
                        onClick={() => setVerificationDocument(null)}
                        className="text-red-400 text-sm mt-2 hover:text-red-300 transition"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-gray-300 font-medium">Drag and drop your document here</p>
                      <p className="text-gray-500 text-sm mt-1">or click to browse files</p>
                      <p className="text-gray-500 text-xs mt-2">Supported formats: JPG, PNG, PDF (max 5MB)</p>
                      <input
                        type="file"
                        id="verification-document"
                        className="hidden"
                        onChange={handleVerificationUpload}
                        accept=".jpg,.jpeg,.png,.pdf"
                      />
                      <button
                        onClick={() => {
                          const fileInput = document.getElementById('verification-document') as HTMLInputElement;
                          if (fileInput) fileInput.click();
                        }}
                        className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition"
                      >
                        Select File
                      </button>
                    </>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={submitVerification}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition duration-300"
                    disabled={!verificationDocument || isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* New QR Code tab - only visible for volunteers */}
        {activeTab === 'qrcode' && isVolunteer && (
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Your Volunteer QR Code</h2>
            
            <div className="text-center">
              <p className="text-gray-300 mb-6">
                This is your unique volunteer QR code. Present this code when checking in to events.
              </p>
              
              {user?.id ? (
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <QRCode 
                      value={qrCodeData}
                      size={200}
                      level="H"
                    />
                  </div>
                  
                  <div className="text-sm text-gray-400 mt-2">
                    <p>Volunteer ID: {user.id}</p>
                    <p>Name: {user.name}</p>
                  </div>
                  
                  <div className="mt-6 text-gray-300">
                    <p className="text-sm">
                      Tip: Take a screenshot or save this QR code to your phone for easy access.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-red-400">
                  Unable to generate QR code. Please try refreshing the page.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}