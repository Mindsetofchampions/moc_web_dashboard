"use client";

import React, { useState } from 'react';
import QRCodeGenerator from './QRCodeGenerator';
import Image from 'next/image';

interface EventTicketProps {
  eventId: string;
  userId: string;
  eventName: string;
  userName: string;
  date: string;
  location: string;
  eventLogo?: string;
}

const EventTicket: React.FC<EventTicketProps> = ({
  eventId,
  userId,
  eventName,
  userName,
  date,
  location,
  eventLogo = '/logo-placeholder.png',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const qrData = JSON.stringify({
    eventId,
    userId,
    name: userName,
    timestamp: new Date().toISOString(),
  });

  return (
    <div 
      className="max-w-sm mx-auto perspective-1000" 
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{eventName}</h3>
                <p className="text-gray-300 text-sm">{date}</p>
              </div>
              {eventLogo && (
                <div className="h-12 w-12 relative">
                  <Image
                    src={eventLogo}
                    alt={`${eventName} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
            
            <div className="mt-4 border-t border-gray-700 pt-4">
              <p className="text-gray-400 text-sm mb-1">Attendee</p>
              <p className="text-white font-medium">{userName}</p>
            </div>
            
            <div className="mt-3">
              <p className="text-gray-400 text-sm mb-1">Location</p>
              <p className="text-white">{location}</p>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-yellow-400 text-sm">Tap to flip and view QR code</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-red-600 to-purple-600"></div>
        </div>

        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl">
          <div className="p-6 flex flex-col items-center justify-center h-full">
            <h3 className="text-xl font-bold text-white mb-6 text-center">{eventName}</h3>
            
            <div className="flex justify-center mb-6">
              <QRCodeGenerator 
                data={qrData} 
                size={180}
              />
            </div>
            
            <p className="text-gray-300 text-sm text-center mb-2">
              Present this QR code at the event entrance
            </p>
            <p className="text-yellow-400 text-sm text-center">
              Tap to flip back
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTicket;