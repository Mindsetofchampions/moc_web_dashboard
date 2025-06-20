'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AddressAutocomplete from '../ui/AddressAutocomplete';

interface EventFormProps {
  userId: string;
  event?: {
    id: string;
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    address: string;
    logo?: string | null;
    primaryColor?: string | null;
    secondaryColor?: string | null;
    maxSpots?: number;
  };
}

export default function EventForm({ userId, event }: EventFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [startDate, setStartDate] = useState(
    event?.startTime ? new Date(event.startTime).toISOString().split('T')[0] : ''
  );
  const [startTime, setStartTime] = useState(
    event?.startTime ? new Date(event.startTime).toISOString().split('T')[1].substring(0, 5) : ''
  );
  const [endDate, setEndDate] = useState(
    event?.endTime ? new Date(event.endTime).toISOString().split('T')[0] : ''
  );
  const [endTime, setEndTime] = useState(
    event?.endTime ? new Date(event.endTime).toISOString().split('T')[1].substring(0, 5) : ''
  );
  const [address, setAddress] = useState(event?.address || '');
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState(event?.logo || null);
  const [primaryColor, setPrimaryColor] = useState(event?.primaryColor || '#dc2626'); 
  const [secondaryColor, setSecondaryColor] = useState(event?.secondaryColor || '#1f2937'); 
  const [maxSpots, setMaxSpots] = useState(event?.maxSpots || 10); // NEW: Max spots field
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setLogo(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate form
      if (!title || !description || !startDate || !startTime || !endDate || !endTime || !address) {
        throw new Error('Please fill out all required fields');
      }
      
      if (maxSpots < 1) {
        throw new Error('Maximum spots must be at least 1');
      }
      
      // Create start and end date objects
      const startDateTime = new Date(`${startDate}T${startTime}`);
      const endDateTime = new Date(`${endDate}T${endTime}`);
      
      if (endDateTime <= startDateTime) {
        throw new Error('End time must be after start time');
      }
      
      // Create FormData if we have a logo
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('startTime', startDateTime.toISOString());
      formData.append('endTime', endDateTime.toISOString());
      formData.append('address', address);
      formData.append('primaryColor', primaryColor);
      formData.append('secondaryColor', secondaryColor);
      formData.append('maxSpots', maxSpots.toString()); // NEW: Add maxSpots to form data
      formData.append('organizerId', userId);
      
      if (logo) {
        formData.append('logo', logo);
      }
      
      // Send the request
      const url = event ? `/api/events/${event.id}` : '/api/events';
      const method = event ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formData,
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong');
      }
      
      // Redirect to events page on success
      router.push('/events');
      router.refresh();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
      {error && (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
          <p className="text-red-400">{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Title */}
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-400 mb-1">Event Title*</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md"
            required
          />
        </div>
        
        {/* Event Description */}
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-400 mb-1">Event Description*</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md h-32"
            required
          />
        </div>
        
        {/* Start Date and Time */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Start Date*</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">Start Time*</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md"
            required
          />
        </div>
        
        {/* End Date and Time */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">End Date*</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">End Time*</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md"
            required
          />
        </div>
        
        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm text-gray-400 mb-1">Address*</label>
          <AddressAutocomplete
            value={address}
            onChange={setAddress}
            placeholder="Enter event location"
            required={true}
            className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Maximum Spots*</label>
          <input
            type="number"
            min="1"
            max="10000"
            value={maxSpots}
            onChange={(e) => setMaxSpots(parseInt(e.target.value) || 1)}
            className="w-full bg-black/50 backdrop-blur-sm border border-gray-700 text-white p-3 rounded-md"
            placeholder="Enter maximum number of volunteers"
            required
          />
          <p className="text-xs text-gray-500 mt-1">How many volunteers can register for this event?</p>
        </div>
        
        {/* Logo */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Event Logo</label>
          <div className="flex items-center space-x-4">
            {logoPreview && (
              <div className="w-16 h-16 relative">
                <img 
                  src={logoPreview} 
                  alt="Logo preview" 
                  className="rounded-md w-16 h-16 object-cover"
                />
              </div>
            )}
            <label className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md cursor-pointer">
              {logoPreview ? 'Change Logo' : 'Upload Logo'}
              <input
                type="file"
                onChange={handleLogoChange}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
        </div>
        
        {/* Colors */}
        <div className="flex items-center space-x-6 md:col-span-2">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Primary Color</label>
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-10 h-10 rounded border border-gray-700 bg-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Secondary Color</label>
            <input
              type="color"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              className="w-10 h-10 rounded border border-gray-700 bg-transparent"
            />
          </div>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-md mr-4"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
}