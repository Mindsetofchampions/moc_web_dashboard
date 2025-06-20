/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import StatusBar from './StatusBar';
import BottomNav from './BottomNav';
import LoadingOverlay from './LoadingOverlay';
import QuestPanel from './QuestPanel';
import ProfileScreen from './ProfileScreen';
import ShopScreen from './ShopScreen';
import EventModal from './EventModal';
import QuizModal from './QuizModal';
import NotificationModal from './NotificationModal';
import './mobile-styles.css';

const MapScreen = dynamic(() => import('./MapScreen'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-[#17162E] text-[#A0AEC0] text-lg">
      Loading map...
    </div>
  )
});

export default function MobileGameUI() {
  const [currentScreen, setCurrentScreen] = useState('mapScreen');
  const [loading, setLoading] = useState(true);
  const [questPanelActive, setQuestPanelActive] = useState(false);
  const [activeModals, setActiveModals] = useState({
    event: false,
    quiz: false,
    notification: false,
    purchase: false,
    dailyReward: false
  });
  
  const [playerData, setPlayerData] = useState({
    name: "SynthWaveKid",
    level: 12,
    xp: 1250,
    nextLevelXp: 2000,
    title: "Grid Runner",
    avatar: "😎",
    coins: 12300,
    gems: 275,
    stats: {
      agility: 68,
      intellect: 85,
      techSkill: 55,
      reputation: 72
    },
    achievements: [
      { id: "pixel_pioneer", name: "Pixel Pioneer", icon: "🎮", unlocked: true },
      { id: "street_dasher", name: "Street Dasher", icon: "🏃", unlocked: true },
      { id: "circuit_champ", name: "Circuit Champ", icon: "🏆", unlocked: false },
      { id: "code_cracker", name: "Code Cracker", icon: "🧠", unlocked: true },
      { id: "shard_hoarder", name: "Shard Hoarder", icon: "💎", unlocked: false },
      { id: "neon_legend", name: "Neon Legend", icon: "🌟", unlocked: false }
    ]
  });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const switchScreen = (screenId: string) => {
    setCurrentScreen(screenId);
    setQuestPanelActive(false);
  };

  const toggleQuestPanel = () => {
    setQuestPanelActive(!questPanelActive);
  };

  const openModal = (modalType: string) => {
    setActiveModals(prev => ({ ...prev, [modalType]: true }));
  };

  const closeModal = (modalType: string) => {
    setActiveModals(prev => ({ ...prev, [modalType]: false }));
  };

  return (
    <div className="mobile-game-container">
      <LoadingOverlay visible={loading} />
      
      <StatusBar playerData={playerData} onDailyReward={() => openModal('dailyReward')} />
      
      <div className="relative h-screen w-screen z-[1]">
        <div className={`absolute top-0 left-0 w-full h-full flex flex-col transition-[opacity,transform] duration-[400ms] ease-out ${currentScreen === 'mapScreen' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] hidden'}`}>
          <MapScreen 
            onQuestClick={(questId: string) => openModal('quiz')}
            onEventClick={(eventId: string) => openModal('event')}
          />
        </div>
        
        <div className={`absolute top-0 left-0 w-full h-full flex flex-col transition-[opacity,transform] duration-[400ms] ease-out ${currentScreen === 'profileScreen' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] hidden'}`}>
          <ProfileScreen playerData={playerData} />
        </div>
        
        <div className={`absolute top-0 left-0 w-full h-full flex flex-col transition-[opacity,transform] duration-[400ms] ease-out ${currentScreen === 'shopScreen' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] hidden'}`}>
          <ShopScreen 
            playerData={playerData}
            onPurchase={(item: any) => openModal('purchase')}
          />
        </div>
      </div>
      
      <QuestPanel 
        active={questPanelActive}
        onQuestClick={(questId: string) => {
          if (questId.includes('quiz')) {
            openModal('quiz');
          } else {
            openModal('event');
          }
        }}
      />
      
      <BottomNav 
        currentScreen={currentScreen}
        onScreenChange={switchScreen}
        onQuestToggle={toggleQuestPanel}
        questPanelActive={questPanelActive}
      />
      
      {/* Modals */}
      <EventModal 
        visible={activeModals.event}
        onClose={() => closeModal('event')}
      />
      
      <QuizModal 
        visible={activeModals.quiz}
        onClose={() => closeModal('quiz')}
      />
      
      <NotificationModal 
        visible={activeModals.notification}
        onClose={() => closeModal('notification')}
        type="notification"
      />
      
      <NotificationModal 
        visible={activeModals.dailyReward}
        onClose={() => closeModal('dailyReward')}
        type="dailyReward"
      />
    </div>
  );
}