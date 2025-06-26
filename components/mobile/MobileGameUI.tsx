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

interface User {
  id: string;
  name?: string;
  email?: string;
  role: string;
}

interface MobileGameUIProps {
  user: User;
  onSignOut: () => Promise<void>;
}

export default function MobileGameUI({ user, onSignOut }: MobileGameUIProps) {
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
  const [currentEventId, setCurrentEventId] = useState<string>('e-sports');
  const [currentQuizId, setCurrentQuizId] = useState<string>('logic01');
  const [notificationData, setNotificationData] = useState({
    title: 'Success!',
    message: 'Action completed successfully.',
    icon: '🎉'
  });
  
  const [playerData, setPlayerData] = useState({
    name: user.name || "SynthWaveKid",
    level: 12,
    xp: 1250,
    nextLevelXp: 2000,
    title: "Grid Runner",
    avatar: "😎",
    coins: 12300,
    email: user.email || "",
    stats: {
      character: 22,
      health: 18,
      exploration: 8,
      scholarship: 12,
      stewardship: 5
    },
    achievements: [
      { id: "pixel_pioneer", name: "Pixel Pioneer", icon: "🎮", unlocked: true },
      { id: "street_dasher", name: "Street Dasher", icon: "🏃", unlocked: true },
      { id: "circuit_champ", name: "Circuit Champ", icon: "🏆", unlocked: false },
      { id: "code_cracker", name: "Code Cracker", icon: "🧠", unlocked: true },
      { id: "shard_hoarder", name: "Shard Hoarder", icon: "💎", unlocked: false },
      { id: "neon_legend", name: "Neon Legend", icon: "🌟", unlocked: false },
      // { id: "chess_master", name: "Chess Master", icon: "♟️", unlocked: false },
      { id: "health_guru", name: "Health Guru", icon: "💚", unlocked: false },
      { id: "scholar", name: "Scholar", icon: "🎓", unlocked: false },
      { id: "explorer", name: "Explorer", icon: "🧭", unlocked: false },
      { id: "steward", name: "Steward", icon: "🌳", unlocked: false }
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

  const openModal = (modalType: string, id?: string) => {
    if (modalType === 'event' && id) {
      setCurrentEventId(id);
    }
    if (modalType === 'quiz' && id) {
      setCurrentQuizId(id);
    }
    setActiveModals(prev => ({ ...prev, [modalType]: true }));
  };

  const closeModal = (modalType: string) => {
    setActiveModals(prev => ({ ...prev, [modalType]: false }));
  };

  const showNotification = (title: string, message: string, icon: string = '🎉') => {
    setNotificationData({ title, message, icon });
    openModal('notification');
  };

  const handleQuestClick = (questId: string) => {
    if (questId.includes('logic') || questId.includes('math') || questId.includes('chess') || 
        questId.includes('health') || questId.includes('scholar') || questId.includes('explore') || 
        questId.includes('steward')) {
      openModal('quiz', questId);
    } else {
      openModal('event', questId);
    }
  };

  const handleEventClick = (eventId: string) => {
    openModal('event', eventId);
  };

  const handlePurchase = (item: any) => {
    const price = parseInt(item.price.replace(/,/g, ''));
    
    if (playerData.coins >= price) {
      setPlayerData(prev => ({
        ...prev,
        coins: prev.coins - price
      }));
      showNotification('Purchase Successful!', `${item.name} has been added to your inventory.`, '🛍️');
    } else {
      showNotification('Insufficient Funds', `You need ${price.toLocaleString()} credits but only have ${playerData.coins.toLocaleString()}.`, '❌');
    }
  };

  const handleEventRegistration = () => {
    showNotification('Registration Confirmed!', 'Your event registration is secured. Prepare for the challenge ahead!', '🎟️');
  };

  const handleQuizCompletion = (score: number, attribute: string) => {
    const pointsEarned = Math.floor(score * 0.1); 
    const coinsEarned = score * 10; 
    
    setPlayerData(prev => ({
      ...prev,
      coins: prev.coins + coinsEarned,
      xp: prev.xp + score,
      stats: {
        ...prev.stats,
        [attribute]: Math.min(100, prev.stats[attribute as keyof typeof prev.stats] + pointsEarned)
      }
    }));

    showNotification(
      'Quest Complete!', 
      `+${score} XP, +${coinsEarned} coins, +${pointsEarned} ${attribute.charAt(0).toUpperCase() + attribute.slice(1)}!`, 
      '🏆'
    );
  };

  const handleProfileAction = (action: string) => {
    if (action === 'edit') {
      showNotification('Profile Editor', 'Profile customization coming soon! More avatar and theme options await.', '⚙️');
    } else if (action === 'settings') {
      showNotification('Settings', 'Audio, notifications, and game preferences will be available here.', '🔧');
    } else if (action === 'stats') {
      showNotification('Statistics', 'Detailed performance analytics will be available here.', '📊');
    }
  };

  return (
    <div className="mobile-game-container">
      <LoadingOverlay visible={loading} />
      
      <StatusBar playerData={playerData} onDailyReward={() => openModal('dailyReward')} />
      
      <div className="relative h-screen w-screen z-[1]">
        <div className={`absolute top-0 left-0 w-full h-full flex flex-col transition-[opacity,transform] duration-[400ms] ease-out ${currentScreen === 'mapScreen' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] hidden'}`}>
          <MapScreen 
            onQuestClick={handleQuestClick}
            onEventClick={handleEventClick}
          />
        </div>
        
        <div className={`absolute top-0 left-0 w-full h-full flex flex-col transition-[opacity,transform] duration-[400ms] ease-out ${currentScreen === 'profileScreen' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] hidden'}`}>
          <ProfileScreen 
            playerData={playerData} 
            onProfileAction={handleProfileAction}
            onSignOut={onSignOut}
          />
        </div>
        
        <div className={`absolute top-0 left-0 w-full h-full flex flex-col transition-[opacity,transform] duration-[400ms] ease-out ${currentScreen === 'shopScreen' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] hidden'}`}>
          <ShopScreen 
            playerData={playerData}
            onPurchase={handlePurchase}
          />
        </div>
      </div>
      
      <QuestPanel 
        active={questPanelActive}
        onQuestClick={handleQuestClick}
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
        eventId={currentEventId}
        onRegister={handleEventRegistration}
      />
      
      <QuizModal 
        visible={activeModals.quiz}
        onClose={() => closeModal('quiz')}
        quizId={currentQuizId}
        onComplete={handleQuizCompletion}
      />
      
      <NotificationModal 
        visible={activeModals.notification}
        onClose={() => closeModal('notification')}
        type="notification"
        title={notificationData.title}
        message={notificationData.message}
        icon={notificationData.icon}
      />
      
      <NotificationModal 
        visible={activeModals.dailyReward}
        onClose={() => closeModal('dailyReward')}
        type="dailyReward"
      />
    </div>
  );
}