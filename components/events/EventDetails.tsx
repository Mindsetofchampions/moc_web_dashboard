/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import EventLogoImage from '@/components/EventLogoImage';

interface EventDetailsProps {
  event: {
    id: string;
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    address: string;
    logo?: string | null;
    primaryColor?: string | null;
    secondaryColor?: string | null;
    maxSpots: number;
    organizer: {
      name: string | null;
      email: string | null;
    };
  };
}

export default function EventDetails({ event: initialEvent }: EventDetailsProps) {
  const router = useRouter();
  const [event, setEvent] = useState<any>(initialEvent);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch updated event data
  const fetchEventData = async () => {
    try {
      const response = await fetch(`/api/events/${event.id}`);
      if (response.ok) {
        const data = await response.json();
        setEvent(data.event);
      }
    } catch (error) {
      console.error('Error fetching event data:', error);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  // Handle registration
  const handleRegister = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/events/${event.id}/register`, {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      setSuccess(data.message);
      // Refresh event data to get updated counts
      await fetchEventData();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle unregistration
  const handleUnregister = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/events/${event.id}/register`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to unregister');
      }

      setSuccess(data.message);
      // Refresh event data to get updated counts
      await fetchEventData();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Use the primary color from the event or default to red
  const primaryColor = event.primaryColor || 'rgb(220, 38, 38)';
  const secondaryColor = event.secondaryColor || 'rgb(79, 70, 229)';
  
  // Calculate if event is upcoming, ongoing, or past
  const now = new Date();
  const isUpcoming = new Date(event.startTime) > now;
  const isOngoing = new Date(event.startTime) <= now && new Date(event.endTime) >= now;
  const isPast = new Date(event.endTime) < now;
  
  // Calculate available spots
  const registeredCount = event.registeredCount || 0;
  const availableSpots = event.maxSpots - registeredCount;
  const spotsPercentage = (registeredCount / event.maxSpots) * 100;
  
  // Check if user is registered
  const isUserRegistered = event.isUserRegistered || false;
  
  // Format event duration in a readable way
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const durationMs = endDate.getTime() - startDate.getTime();
  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  
  // Create a formatted duration string
  let durationText = "";
  if (durationHours > 0) {
    durationText += `${durationHours} hour${durationHours > 1 ? 's' : ''}`;
    if (durationMinutes > 0) {
      durationText += ` ${durationMinutes} minute${durationMinutes > 1 ? 's' : ''}`;
    }
  } else {
    durationText = `${durationMinutes} minute${durationMinutes > 1 ? 's' : ''}`;
  }

  const getEventStatusTag = () => {
    if (isUpcoming) {
      return (
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Upcoming
        </div>
      );
    } else if (isOngoing) {
      return (
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Live Now
        </div>
      );
    } else {
      return (
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-500 mr-2"></span>
          Past
        </div>
      );
    }
  };

  const getRegistrationButton = () => {
    if (isPast) {
      return (
        <button 
          disabled
          className="relative overflow-hidden py-4 rounded-xl text-center text-gray-500 font-bold text-lg bg-gray-700 cursor-not-allowed"
        >
          Event Ended
        </button>
      );
    }

    if (isUserRegistered) {
      return (
        <button 
          onClick={handleUnregister}
          disabled={isLoading}
          className="relative overflow-hidden py-4 rounded-xl text-center text-white font-bold text-lg shadow-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50"
        >
          <div className="relative z-10 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {isLoading ? 'Unregistering...' : 'Registered - Click to Cancel'}
          </div>
        </button>
      );
    }

    if (availableSpots <= 0) {
      return (
        <button 
          disabled
          className="relative overflow-hidden py-4 rounded-xl text-center text-gray-500 font-bold text-lg bg-gray-700 cursor-not-allowed"
        >
          Event Full
        </button>
      );
    }

    return (
      <button 
        onClick={handleRegister}
        disabled={isLoading}
        className="relative overflow-hidden py-4 rounded-xl text-center text-white font-bold text-lg shadow-lg disabled:opacity-50"
        style={{ 
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor || primaryColor} 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 transform -skew-y-12 bg-white/40"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {isLoading ? 'Registering...' : 'Register Now'}
        </div>
      </button>
    );
  };
  
  return (
    <div className="space-y-8 max-w-4xl mx-auto relative">
      <div 
        className="absolute -top-12 -right-12 w-64 h-64 rounded-full opacity-20 blur-2xl"
        style={{ background: `radial-gradient(circle, ${primaryColor}, transparent 70%)` }}
      ></div>
      
      <div className="absolute -bottom-12 -left-12 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: `radial-gradient(circle, ${secondaryColor || primaryColor}, transparent 70%)` }}
      ></div>

      <div className="flex items-center mb-6 relative z-10">
        <Link 
          href="/events" 
          className="flex items-center text-gray-400 hover:text-white transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-800/50"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Events
        </Link>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-6 relative z-10">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500 rounded-lg p-4 mb-6 relative z-10">
          <p className="text-green-400">{success}</p>
        </div>
      )}

      <div className="relative z-10 overflow-hidden">
        <div className="absolute top-6 right-6 z-20">
          {getEventStatusTag()}
        </div>

        <div 
          className="relative overflow-hidden rounded-t-xl p-8 pb-16"
          style={{ 
            background: `linear-gradient(135deg, ${primaryColor}CC 0%, ${secondaryColor || primaryColor}99 100%)`,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8 relative">
              <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl bg-black/30 backdrop-blur-sm">
                <EventLogoImage 
                  src={event.logo}
                  alt={event.title}
                  width={160}
                  height={160}
                  fallbackChar={event.title.charAt(0)}
                />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">{event.title}</h1>
              <p className="text-white/80 text-lg mb-4 flex flex-col md:flex-row md:items-center">
                <span>Organized by</span>
                <span className="font-semibold mx-1 inline-block" style={{ color: 'white' }}>{event.organizer.name || 'Unknown'}</span>
              </p>

              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm border border-white/30 shadow-md">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Duration: {durationText}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/60 backdrop-blur-xl border border-gray-800/50 rounded-b-xl overflow-hidden shadow-2xl relative">
          <div className="w-full h-16 overflow-hidden relative -mt-12">
            <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full absolute top-0 left-0">
              <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="fill-black/60"></path>
            </svg>
          </div>

          <div className="p-8 pt-0 flex flex-col md:flex-row">
            <div className="flex-1 mb-8 md:mb-0">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-start bg-white/5 rounded-xl p-4 border border-gray-700/50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 relative z-10">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 relative z-10">
                    <div className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-1">Start Time</div>
                    <div className="text-white text-lg font-medium">{formatDate(event.startTime)}</div>
                  </div>
                </div>

                <div className="flex items-start bg-white/5 rounded-xl p-4 border border-gray-700/50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4 relative z-10">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 relative z-10">
                    <div className="text-purple-400 text-sm font-semibold uppercase tracking-wider mb-1">End Time</div>
                    <div className="text-white text-lg font-medium">{formatDate(event.endTime)}</div>
                  </div>
                </div>

                <div className="flex items-start bg-white/5 rounded-xl p-4 border border-gray-700/50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mr-4 relative z-10">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 relative z-10">
                    <div className="text-orange-400 text-sm font-semibold uppercase tracking-wider mb-1">Location</div>
                    <div className="text-white text-lg font-medium break-words">{event.address}</div>
                  </div>
                </div>

                {/* Updated Available Spots Section */}
                <div className="flex items-start bg-white/5 rounded-xl p-4 border border-gray-700/50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-xl opacity-70"></div>
                  
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mr-4 relative z-10">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  
                  <div className="flex-1 relative z-10">
                    <div className="text-green-400 text-sm font-semibold uppercase tracking-wider mb-2">Available Spots</div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="text-white text-lg font-medium flex items-center">
                        <span className="text-2xl font-bold mr-1 text-green-400">{availableSpots}</span>
                        <span className="text-gray-400 text-sm mx-1">of</span>
                        <span className="text-lg">{event.maxSpots}</span>
                        <span className="text-gray-400 text-sm ml-1">spots left</span>
                      </div>
                    </div>

                    <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300"
                        style={{ 
                          width: `${spotsPercentage}%`, 
                          boxShadow: '0 0 8px rgba(74, 222, 128, 0.5)' 
                        }}
                      ></div>
                    </div>

                    <div className="text-gray-400 text-xs mt-2 italic">
                      {registeredCount} registered
                      {availableSpots <= 5 && availableSpots > 0 && ' • Filling up quickly'}
                      {availableSpots === 0 && ' • Event is full'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-gray-700/50 to-transparent mx-8"></div>

            <div className="flex-1 flex flex-col">
              <div className="bg-white/5 border border-gray-700/50 rounded-xl p-6 mb-6 flex flex-col items-center justify-center">
                <div className="text-gray-400 text-sm mb-4 text-center">Scan to save this event</div>

                <div className="w-48 h-48 relative bg-white p-2 rounded-lg">
                  <div className="w-full h-full bg-white relative">
                    <div 
                      className="absolute inset-0" 
                      style={{
                        backgroundImage: "url('/qr-code.svg')",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat"
                      }}
                    ></div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                      <div className="w-10 h-10 relative">
                        <EventLogoImage 
                          src={event.logo}
                          alt={event.title}
                          width={40}
                          height={40}
                          fallbackChar={event.title.charAt(0)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-gray-400 text-xs mt-4 flex items-center">
                  <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified Event
                </div>
              </div>

              {/* Dynamic Registration Button */}
              {getRegistrationButton()}

              {isUpcoming && (
                <div className="mt-6 bg-white/5 border border-gray-700/50 rounded-xl p-4">
                  <div className="text-gray-400 text-sm mb-2 text-center">Registration closes in</div>
                  <div className="flex justify-center space-x-2 text-center">
                    <div className="flex-1">
                      <div className="bg-gray-900/50 rounded-lg p-2 border border-gray-700/30">
                        <div className="text-white text-xl font-bold">03</div>
                        <div className="text-gray-400 text-xs">Days</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-900/50 rounded-lg p-2 border border-gray-700/30">
                        <div className="text-white text-xl font-bold">08</div>
                        <div className="text-gray-400 text-xs">Hours</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-900/50 rounded-lg p-2 border border-gray-700/30">
                        <div className="text-white text-xl font-bold">15</div>
                        <div className="text-gray-400 text-xs">Minutes</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-8 pt-0">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About This Event
              </h2>
              <div 
                className="text-gray-300 whitespace-pre-line p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-gray-700/30"
              >
                {event.description}
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Organizer
              </h2>
              <div className="flex flex-col md:flex-row items-start p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-gray-700/30">
                <div className="flex-1">
                  <p className="text-gray-300 mb-2">
                    For questions about this event, please contact:
                  </p>
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-white font-medium">{event.organizer.name || 'Event Organizer'}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-white font-medium">{event.organizer.email || '[No email provided]'}</span>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-8 flex flex-col items-center">
                  <div className="text-center mb-2">
                    <div className="text-gray-400 text-sm">Already attending</div>
                    <div className="flex -space-x-2 mt-2">
                      {[...Array(Math.min(5, registeredCount))].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center text-gray-300 text-xs font-medium overflow-hidden">
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                      {registeredCount > 5 && (
                        <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center text-gray-300 text-xs">
                          +{registeredCount - 5}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="p-4 border-t border-gray-800"
            style={{ 
              background: `linear-gradient(to right, rgba(0,0,0,0.3), ${primaryColor}30, rgba(0,0,0,0.3))` 
            }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
              <div className="mb-4 md:mb-0">
                <div className="text-gray-400 text-sm">Event ID: {event.id}</div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}