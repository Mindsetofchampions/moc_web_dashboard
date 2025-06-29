'use client';

import React, { useState, useEffect } from 'react';
import StatusBar from './mobile/StatusBar';
import BottomNav from './mobile/BottomNav';
import MapScreen from './mobile/MapScreen';
import QuestPanel from './mobile/QuestPanel';
import ProfileScreen from './mobile/ProfileScreen';
import ShopScreen from './mobile/ShopScreen';
import EventModal from './mobile/EventModal';
import SuccessModal from './mobile/SuccessModal';
import NotificationModal from './mobile/NotificationModal';
import AchievementModal from './mobile/AchievementModal';
import AchievementUnlockModal from './mobile/AchievementUnlockModal';
import ProfileEditModal from './mobile/ProfileEditModal';
import LoadingOverlay from './mobile/LoadingOverlay';
import './mobile/mobile-styles.css';

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
  // Screen state
  const [currentScreen, setCurrentScreen] = useState('mapScreen');
  const [questPanelActive, setQuestPanelActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [showEventModal, setShowEventModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showAchievementUnlockModal, setShowAchievementUnlockModal] = useState(false);
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  
  // Data states
  const [currentEventId, setCurrentEventId] = useState('e-sports');
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
  const [playerData, setPlayerData] = useState<any>({
    name: user.name || 'Grid Runner',
    email: user.email,
    level: 1,
    xp: 0,
    nextLevelXp: 1000,
    coins: 12000,
    avatar: '😎',
    title: 'Grid Runner',
    stats: {
      character: 0,
      health: 0,
      exploration: 0,
      scholarship: 0,
      stewardship: 0
    },
    achievements: [
      { id: 'a1', name: 'First Steps', icon: '🥾', unlocked: true, unlockedAt: new Date() },
      { id: 'a2', name: 'Explorer', icon: '🧭', unlocked: false },
      { id: 'a3', name: 'Scholar', icon: '🎓', unlocked: false },
      { id: 'a4', name: 'Volunteer', icon: '🤝', unlocked: false },
      { id: 'a5', name: 'Eco Warrior', icon: '🌱', unlocked: false },
      { id: 'a6', name: 'Digital Native', icon: '💻', unlocked: false },
    ]
  });
  
  const [quests, setQuests] = useState<any[]>([]);
  const [shopItems, setShopItems] = useState<any[]>([]);
  
  // Fetch player data
  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/student/profile');
        if (response.ok) {
          const data = await response.json();
          
          if (data.user) {
            // Calculate next level XP
            const nextLevelXp = (data.user.profile.level + 1) * 1000;
            
            // Format player data
            setPlayerData({
              name: data.user.name || 'Grid Runner',
              email: data.user.email,
              level: data.user.profile.level,
              xp: data.user.profile.xp,
              nextLevelXp: nextLevelXp,
              coins: data.user.profile.coins,
              avatar: data.user.profile.avatar || '😎',
              title: data.user.profile.title || 'Grid Runner',
              stats: {
                character: data.user.profile.character,
                health: data.user.profile.health,
                exploration: data.user.profile.exploration,
                scholarship: data.user.profile.scholarship,
                stewardship: data.user.profile.stewardship
              },
              achievements: data.user.achievements || []
            });
            
            // Check for newly unlocked achievements
            if (data.newlyUnlocked && data.newlyUnlocked.length > 0) {
              // Find the first newly unlocked achievement
              const newAchievement = data.user.achievements.find(
                (a: any) => data.newlyUnlocked.includes(a.id)
              );
              
              if (newAchievement) {
                setSelectedAchievement(newAchievement);
                setShowAchievementUnlockModal(true);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching player data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPlayerData();
    fetchQuests();
    fetchShopItems();
  }, []);
  
  // Fetch quests
  const fetchQuests = async () => {
    try {
      const response = await fetch('/api/student/quests');
      if (response.ok) {
        const data = await response.json();
        setQuests(data.quests || []);
      }
    } catch (error) {
      console.error('Error fetching quests:', error);
    }
  };
  
  // Fetch shop items
  const fetchShopItems = async () => {
    try {
      const response = await fetch('/api/student/shop');
      if (response.ok) {
        const data = await response.json();
        setShopItems(data.items || []);
      }
    } catch (error) {
      console.error('Error fetching shop items:', error);
    }
  };
  
  // Event handlers
  const handleQuestToggle = () => {
    setQuestPanelActive(!questPanelActive);
  };
  
  const handleQuestClick = (questId: string) => {
    setCurrentEventId(questId);
    setShowEventModal(true);
    setQuestPanelActive(false);
  };
  
  const handleEventClick = (eventId: string) => {
    setCurrentEventId(eventId);
    setShowEventModal(true);
  };
  
  const handleEventRegister = () => {
    setShowSuccessModal(true);
  };
  
  const handleDailyReward = () => {
    setShowNotificationModal(true);
  };
  
  const handleProfileAction = (action: string) => {
    if (action === 'edit') {
      setShowProfileEditModal(true);
    } else if (action === 'settings') {
      // Show settings modal
    } else if (action === 'stats') {
      // Show detailed stats
    }
  };
  
  const handleAchievementClick = (achievement: any) => {
    setSelectedAchievement(achievement);
    setShowAchievementModal(true);
  };
  
  const handleSaveProfile = async (data: any) => {
    try {
      const response = await fetch('/api/student/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        // Update local state
        setPlayerData({
          ...playerData,
          name: data.name || playerData.name,
          avatar: data.avatar || playerData.avatar,
          title: data.title || playerData.title
        });
        
        setShowProfileEditModal(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  const handlePurchase = async (item: any) => {
    try {
      const response = await fetch('/api/student/shop/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId: item.id })
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Update player data
        if (data.profile) {
          const nextLevelXp = (data.profile.level + 1) * 1000;
          
          setPlayerData({
            ...playerData,
            level: data.profile.level,
            xp: data.profile.xp,
            nextLevelXp: nextLevelXp,
            coins: data.profile.coins,
            stats: {
              character: data.profile.character,
              health: data.profile.health,
              exploration: data.profile.exploration,
              scholarship: data.profile.scholarship,
              stewardship: data.profile.stewardship
            }
          });
        }
        
        // Show success message
        setShowSuccessModal(true);
        
        // Check for new achievements
        if (data.newAchievements && data.newAchievements.length > 0) {
          // Find the achievement details
          const newAchievement = playerData.achievements.find(
            (a: any) => data.newAchievements.includes(a.id)
          );
          
          if (newAchievement) {
            setSelectedAchievement(newAchievement);
            setShowAchievementUnlockModal(true);
          }
        }
        
        // Refresh shop items
        fetchShopItems();
      }
    } catch (error) {
      console.error('Error making purchase:', error);
    }
  };

  return (
    <div className="mobile-game-container">
      {/* Status Bar */}
      <StatusBar playerData={playerData} onDailyReward={handleDailyReward} />
      
      {/* Main Content */}
      {currentScreen === 'mapScreen' && (
        <MapScreen onQuestClick={handleQuestClick} onEventClick={handleEventClick} />
      )}
      
      {currentScreen === 'profileScreen' && (
        <ProfileScreen 
          playerData={playerData} 
          onProfileAction={handleProfileAction} 
          onAchievementClick={handleAchievementClick}
          onSignOut={onSignOut}
        />
      )}
      
      {currentScreen === 'shopScreen' && (
        <ShopScreen 
          playerData={playerData} 
          shopItems={shopItems}
          onPurchase={handlePurchase} 
        />
      )}
      
      {/* Quest Panel */}
      <QuestPanel 
        active={questPanelActive} 
        quests={quests}
        onQuestClick={handleQuestClick} 
      />
      
      {/* Bottom Navigation */}
      <BottomNav 
        currentScreen={currentScreen} 
        onScreenChange={setCurrentScreen} 
        onQuestToggle={handleQuestToggle}
        questPanelActive={questPanelActive}
      />
      
      {/* Modals */}
      <EventModal 
        visible={showEventModal} 
        onClose={() => setShowEventModal(false)} 
        eventId={currentEventId}
        onRegister={handleEventRegister}
      />
      
      <SuccessModal 
        visible={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
        type="registration"
      />
      
      <NotificationModal 
        visible={showNotificationModal} 
        onClose={() => setShowNotificationModal(false)} 
        type="dailyReward"
      />
      
      <AchievementModal 
        visible={showAchievementModal} 
        onClose={() => setShowAchievementModal(false)} 
        achievement={selectedAchievement}
      />
      
      <AchievementUnlockModal 
        visible={showAchievementUnlockModal} 
        onClose={() => setShowAchievementUnlockModal(false)} 
        achievement={selectedAchievement}
      />
      
      <ProfileEditModal 
        visible={showProfileEditModal} 
        onClose={() => setShowProfileEditModal(false)} 
        playerData={playerData}
        onSave={handleSaveProfile}
      />
      
      {/* Loading Overlay */}
      <LoadingOverlay visible={isLoading} />
    </div>
  );
}