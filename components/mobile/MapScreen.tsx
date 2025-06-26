/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapScreenProps {
  onQuestClick: (questId: string) => void;
  onEventClick: (eventId: string) => void;
}

export default function MapScreen({ onQuestClick, onEventClick }: MapScreenProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Get Mapbox access token
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    
    if (!accessToken) {
      console.error('Mapbox access token is not set. Please add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your .env.local file');
      return;
    }

    if (!mapContainer.current) return;

    mapboxgl.accessToken = accessToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-73.973, 40.740], 
      zoom: 12
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');


    map.current.on('load', () => {
      console.log('Map loaded, adding markers...');
      setMapLoaded(true);
      addMarkers();
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  const addMarkers = () => {
    if (!map.current) return;

    addEventMarker();
  
    addQuestMarker1();
    addQuestMarker2();
  };

  const addEventMarker = () => {
    if (!map.current) return;

    console.log('Adding event marker at Brooklyn Navy Yard...');

    const el = document.createElement('div');
    el.className = 'event-marker';
    el.style.width = '60px';
    el.style.height = '60px';
    el.style.borderRadius = '50%';
    el.style.backgroundColor = '#00FFFF';
    el.style.border = '3px solid #FF00FF';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.fontSize = '24px';
    el.style.cursor = 'pointer';
    el.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.8)';
    el.innerHTML = '🎮';

  
    el.addEventListener('click', () => {
      console.log('Event marker clicked!');
      onQuestClick('e-sports');
    });

    const marker = new mapboxgl.Marker(el)
      .setLngLat([-73.973, 40.699]) 
      .addTo(map.current!);

    console.log('Event marker added successfully');
  };

  const addQuestMarker1 = () => {
    if (!map.current) return;

    console.log('Adding quest marker 1 at Hudson Yards...');

    const el = document.createElement('div');
    el.className = 'quest-marker-1';
    el.style.width = '60px';
    el.style.height = '60px';
    el.style.borderRadius = '50%';
    el.style.backgroundColor = '#FFD700';
    el.style.border = '3px solid #FF6B00';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.fontSize = '24px';
    el.style.cursor = 'pointer';
    el.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.8)';
    el.innerHTML = '🗺️';


    el.addEventListener('click', () => {
      console.log('Quest marker 1 clicked!');
      onQuestClick('hudson-quest');
    });

    const marker = new mapboxgl.Marker(el)
      .setLngLat([-74.002, 40.755]) 
      .addTo(map.current!);

    console.log('Quest marker 1 added successfully');
  };

  const addQuestMarker2 = () => {
    if (!map.current) return;

    console.log('Adding quest marker 2 at Roosevelt Island...');

    const el = document.createElement('div');
    el.className = 'quest-marker-2';
    el.style.width = '60px';
    el.style.height = '60px';
    el.style.borderRadius = '50%';
    el.style.backgroundColor = '#32CD32';
    el.style.border = '3px solid #00FF7F';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    el.style.fontSize = '24px';
    el.style.cursor = 'pointer';
    el.style.boxShadow = '0 0 15px rgba(50, 205, 50, 0.8)';
    el.innerHTML = '🌉';

    el.addEventListener('click', () => {
      console.log('Quest marker 2 clicked!');
      onQuestClick('roosevelt-quest');
    });

    const marker = new mapboxgl.Marker(el)
      .setLngLat([-73.948, 40.750]) 
      .addTo(map.current!);

    console.log('Quest marker 2 added successfully');
  };

  if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#0D0C1D] to-[#17162E] flex items-center justify-center">
        <div className="text-center p-8 bg-[rgba(23,22,46,0.8)] rounded-[20px] border border-[rgba(255,69,0,0.5)] backdrop-blur-[10px] max-w-md">
          <div className="text-[48px] mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-4 text-[#FF6B9D] font-['Orbitron']">Mapbox Token Required</h2>
          <p className="text-sm text-[#A0AEC0] mb-4">
            Please add your Mapbox access token to your .env.local file:
          </p>
          <div className="bg-[rgba(0,0,0,0.3)] p-3 rounded-lg text-xs text-[#00FFFF] font-mono">
            NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_token
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative" style={{ height: 'calc(100vh - 80px)', marginTop: '75px', marginBottom: '40px' }}>
      {/* Map Container */}
      <div 
        ref={mapContainer} 
        className="w-full h-full"
        style={{ 
          filter: 'hue-rotate(280deg) saturate(1.2) brightness(0.9)'
        }} 
      />
      
      {/* Loading Overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-[rgba(13,12,29,0.8)] flex items-center justify-center z-[1000]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-transparent border-t-[#8A2BE2] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#A0AEC0] font-['Orbitron']">Loading Map...</p>
          </div>
        </div>
      )}


      <style jsx>{`
        .event-marker, .quest-marker-1, .quest-marker-2 {
          animation: simplePulse 2s infinite;
        }

        @keyframes simplePulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}