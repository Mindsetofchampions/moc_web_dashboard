/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';

interface MapScreenProps {
  onQuestClick: (questId: string) => void;
  onEventClick: (eventId: string) => void;
}

const questLocations = [
  { id: 'e-sports', coords: [51.050, -114.080], icon: '🎮', title: 'Cyber Arena Showdown', type: 'event' },
  { id: 'fitness', coords: [51.040, -114.060], icon: '🏃', title: 'Urban Parkour Run', type: 'event' },
  { id: 'logic01', coords: [51.045, -114.075], icon: '🧠', title: 'Logic Circuit Bender', type: 'quiz' },
  { id: 'math01', coords: [51.048, -114.065], icon: '🧮', title: 'Math Attack: Velocity', type: 'quiz' }
];

// Temporary fallback component until leaflet is installed
export default function MapScreen({ onQuestClick, onEventClick }: MapScreenProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0D0C1D] to-[#17162E] flex items-center justify-center">
      <div className="text-center p-8 bg-[rgba(23,22,46,0.8)] rounded-[20px] border border-[rgba(0,255,255,0.2)] backdrop-blur-[10px] max-w-md">
        <div className="text-[48px] mb-4">🗺️</div>
        <h2 className="text-xl font-bold mb-4 text-[#9370DB] font-['Orbitron']">Map</h2>


        <div className="grid grid-cols-2 gap-3">
          {questLocations.map((quest) => (
            <button
              key={quest.id}
              onClick={() => quest.type === 'quiz' ? onQuestClick(quest.id) : onEventClick(quest.id)}
              className="p-3 bg-[rgba(138,43,226,0.2)] border border-[rgba(138,43,226,0.3)] rounded-[10px] text-center transition-all duration-300 hover:bg-[rgba(138,43,226,0.3)] hover:transform hover:scale-105"
            >
              <div className="text-lg mb-1">{quest.icon}</div>
              <div className="text-xs text-[#A0AEC0]">{quest.title}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}