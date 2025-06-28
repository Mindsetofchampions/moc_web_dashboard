// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// 'use client';

// import React, { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';
// import StatusBar from './StatusBar';
// import BottomNav from './BottomNav';
// import LoadingOverlay from './LoadingOverlay';
// import QuestPanel from './QuestPanel';
// import ProfileScreen from './ProfileScreen';
// import ShopScreen from './ShopScreen';
// import EventModal from './EventModal';
// import QuizModal from './QuizModal';
// import NotificationModal from './NotificationModal';
// import './mobile-styles.css';

// const MapScreen = dynamic(() => import('./MapScreen'), {
//   ssr: false,
//   loading: () => (
//     <div className="h-full w-full flex items-center justify-center bg-[#17162E] text-[#A0AEC0] text-lg">
//       Loading map...
//     </div>
//   )
// });

// interface User {
//   id: string;
//   name?: string;
//   email?: string;
//   role: string;
// }

// interface MobileGameUIProps {
//   user: User;
//   onSignOut: () => Promise<void>;
// }

// export default function MobileGameUI({ user, onSignOut }: MobileGameUIProps) {
//   const [currentScreen, setCurrentScreen] = useState('mapScreen');
//   const [loading, setLoading] = useState(true);
//   const [questPanelActive, setQuestPanelActive] = useState(false);
//   const [activeModals, setActiveModals] = useState({
//     event: false,
//     quiz: false,
//     notification: false,
//     purchase: false,
//     dailyReward: false
//   });
//   const [currentEventId, setCurrentEventId] = useState<string>('e-sports');
//   const [currentQuizId, setCurrentQuizId] = useState<string>('logic01');
//   const [notificationData, setNotificationData] = useState({
//     title: 'Success!',
//     message: 'Action completed successfully.',
//     icon: '🎉'
//   });
  
//   const [playerData, setPlayerData] = useState({
//     name: user.name || "SynthWaveKid",
//     level: 12,
//     xp: 1250,
//     nextLevelXp: 2000,
//     title: "Grid Runner",
//     avatar: "😎",
//     coins: 12300,
//     email: user.email || "",
//     stats: {
//       character: 22,
//       health: 18,
//       exploration: 8,
//       scholarship: 12,
//       stewardship: 5
//     },
//     achievements: [
//       { id: "pixel_pioneer", name: "Pixel Pioneer", icon: "🎮", unlocked: true },
//       { id: "street_dasher", name: "Street Dasher", icon: "🏃", unlocked: true },
//       { id: "circuit_champ", name: "Circuit Champ", icon: "🏆", unlocked: false },
//       { id: "code_cracker", name: "Code Cracker", icon: "🧠", unlocked: true },
//       { id: "shard_hoarder", name: "Shard Hoarder", icon: "💎", unlocked: false },
//       { id: "neon_legend", name: "Neon Legend", icon: "🌟", unlocked: false },
//       // { id: "chess_master", name: "Chess Master", icon: "♟️", unlocked: false },
//       { id: "health_guru", name: "Health Guru", icon: "💚", unlocked: false },
//       { id: "scholar", name: "Scholar", icon: "🎓", unlocked: false },
//       { id: "explorer", name: "Explorer", icon: "🧭", unlocked: false },
//       { id: "steward", name: "Steward", icon: "🌳", unlocked: false }
//     ]
//   });

//   useEffect(() => {
//     // Simulate loading
//     setTimeout(() => {
//       setLoading(false);
//     }, 800);
//   }, []);

//   const switchScreen = (screenId: string) => {
//     setCurrentScreen(screenId);
//     setQuestPanelActive(false);
//   };

//   const toggleQuestPanel = () => {
//     setQuestPanelActive(!questPanelActive);
//   };

//   const openModal = (modalType: string, id?: string) => {
//     if (modalType === 'event' && id) {
//       setCurrentEventId(id);
//     }
//     if (modalType === 'quiz' && id) {
//       setCurrentQuizId(id);
//     }
//     setActiveModals(prev => ({ ...prev, [modalType]: true }));
//   };

//   const closeModal = (modalType: string) => {
//     setActiveModals(prev => ({ ...prev, [modalType]: false }));
//   };

//   const showNotification = (title: string, message: string, icon: string = '🎉') => {
//     setNotificationData({ title, message, icon });
//     openModal('notification');
//   };

//   const handleQuestClick = (questId: string) => {
//     if (questId.includes('logic') || questId.includes('math') || questId.includes('chess') || 
//         questId.includes('health') || questId.includes('scholar') || questId.includes('explore') || 
//         questId.includes('steward')) {
//       openModal('quiz', questId);
//     } else {
//       openModal('event', questId);
//     }
//   };

//   const handleEventClick = (eventId: string) => {
//     openModal('event', eventId);
//   };

//   const handlePurchase = (item: any) => {
//     const price = parseInt(item.price.replace(/,/g, ''));
    
//     if (playerData.coins >= price) {
//       setPlayerData(prev => ({
//         ...prev,
//         coins: prev.coins - price
//       }));
//       showNotification('Purchase Successful!', `${item.name} has been added to your inventory.`, '🛍️');
//     } else {
//       showNotification('Insufficient Funds', `You need ${price.toLocaleString()} credits but only have ${playerData.coins.toLocaleString()}.`, '❌');
//     }
//   };

//   const handleEventRegistration = () => {
//     showNotification('Registration Confirmed!', 'Your event registration is secured. Prepare for the challenge ahead!', '🎟️');
//   };

//   const handleQuizCompletion = (score: number, attribute: string) => {
//     const pointsEarned = Math.floor(score * 0.1); 
//     const coinsEarned = score * 10; 
    
//     setPlayerData(prev => ({
//       ...prev,
//       coins: prev.coins + coinsEarned,
//       xp: prev.xp + score,
//       stats: {
//         ...prev.stats,
//         [attribute]: Math.min(100, prev.stats[attribute as keyof typeof prev.stats] + pointsEarned)
//       }
//     }));

//     showNotification(
//       'Quest Complete!', 
//       `+${score} XP, +${coinsEarned} coins, +${pointsEarned} ${attribute.charAt(0).toUpperCase() + attribute.slice(1)}!`, 
//       '🏆'
//     );
//   };

//   const handleProfileAction = (action: string) => {
//     if (action === 'edit') {
//       showNotification('Profile Editor', 'Profile customization coming soon! More avatar and theme options await.', '⚙️');
//     } else if (action === 'settings') {
//       showNotification('Settings', 'Audio, notifications, and game preferences will be available here.', '🔧');
//     } else if (action === 'stats') {
//       showNotification('Statistics', 'Detailed performance analytics will be available here.', '📊');
//     }
//   };

//   return (
//     <div className="mobile-game-container">
//       <LoadingOverlay visible={loading} />
      
//       <StatusBar playerData={playerData} onDailyReward={() => openModal('dailyReward')} />
      
//       <div className="relative h-screen w-screen z-[1]">
//         <div className={`absolute top-0 left-0 w-full h-full flex flex-col transition-[opacity,transform] duration-[400ms] ease-out ${currentScreen === 'mapScreen' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] hidden'}`}>
//           <MapScreen 
//             onQuestClick={handleQuestClick}
//             onEventClick={handleEventClick}
//           />
//         </div>
        
//         <div className={`absolute top-0 left-0 w-full h-full flex flex-col transition-[opacity,transform] duration-[400ms] ease-out ${currentScreen === 'profileScreen' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] hidden'}`}>
//           <ProfileScreen 
//             playerData={playerData} 
//             onProfileAction={handleProfileAction}
//             onSignOut={onSignOut}
//           />
//         </div>
        
//         <div className={`absolute top-0 left-0 w-full h-full flex flex-col transition-[opacity,transform] duration-[400ms] ease-out ${currentScreen === 'shopScreen' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] hidden'}`}>
//           <ShopScreen 
//             playerData={playerData}
//             onPurchase={handlePurchase}
//           />
//         </div>
//       </div>
      
//       <QuestPanel 
//         active={questPanelActive}
//         onQuestClick={handleQuestClick}
//       />
      
//       <BottomNav 
//         currentScreen={currentScreen}
//         onScreenChange={switchScreen}
//         onQuestToggle={toggleQuestPanel}
//         questPanelActive={questPanelActive}
//       />
      
//       {/* Modals */}
//       <EventModal 
//         visible={activeModals.event}
//         onClose={() => closeModal('event')}
//         eventId={currentEventId}
//         onRegister={handleEventRegistration}
//       />
      
//       <QuizModal 
//         visible={activeModals.quiz}
//         onClose={() => closeModal('quiz')}
//         quizId={currentQuizId}
//         onComplete={handleQuizCompletion}
//       />
      
//       <NotificationModal 
//         visible={activeModals.notification}
//         onClose={() => closeModal('notification')}
//         type="notification"
//         title={notificationData.title}
//         message={notificationData.message}
//         icon={notificationData.icon}
//       />
      
//       <NotificationModal 
//         visible={activeModals.dailyReward}
//         onClose={() => closeModal('dailyReward')}
//         type="dailyReward"
//       />
//     </div>
//   );
// }


// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// 'use client';

// import React, { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';
// import StatusBar from './StatusBar';
// import BottomNav from './BottomNav';
// import LoadingOverlay from './LoadingOverlay';
// import QuestPanel from './QuestPanel';
// import ProfileScreen from './ProfileScreen';
// import ShopScreen from './ShopScreen';
// import EventModal from './EventModal';
// import QuizModal from './QuizModal';
// import NotificationModal from './NotificationModal';
// import ProfileEditModal from './ProfileEditModal';
// import './mobile-styles.css';

// const MapScreen = dynamic(() => import('./MapScreen'), {
//   ssr: false,
//   loading: () => (
//     <div className="h-full w-full flex items-center justify-center bg-[#17162E] text-[#A0AEC0] text-lg">
//       Loading map...
//     </div>
//   )
// });

// interface User {
//   id: string;
//   name?: string;
//   email?: string;
//   role: string;
// }

// interface PlayerData {
//   id: string;
//   name: string;
//   level: number;
//   xp: number;
//   nextLevelXp: number;
//   title: string;
//   avatar: string;
//   coins: number;
//   email: string;
//   stats: {
//     character: number;
//     health: number;
//     exploration: number;
//     scholarship: number;
//     stewardship: number;
//   };
//   achievements: Array<{
//     id: string;
//     name: string;
//     icon: string;
//     unlocked: boolean;
//     unlockedAt?: Date;
//   }>;
// }

// interface MobileGameUIProps {
//   user: User;
//   onSignOut: () => Promise<void>;
// }

// export default function MobileGameUI({ user, onSignOut }: MobileGameUIProps) {
//   const [currentScreen, setCurrentScreen] = useState('mapScreen');
//   const [loading, setLoading] = useState(true);
//   const [questPanelActive, setQuestPanelActive] = useState(false);
//   const [activeModals, setActiveModals] = useState({
//     event: false,
//     quiz: false,
//     notification: false,
//     purchase: false,
//     dailyReward: false,
//     profileEdit: false
//   });
//   const [currentEventId, setCurrentEventId] = useState<string>('e-sports');
//   const [currentQuizId, setCurrentQuizId] = useState<string>('logic01');
//   const [notificationData, setNotificationData] = useState({
//     title: 'Success!',
//     message: 'Action completed successfully.',
//     icon: '🎉'
//   });
  
//   const [playerData, setPlayerData] = useState<PlayerData | null>(null);
//   const [quests, setQuests] = useState<any[]>([]);
//   const [shopItems, setShopItems] = useState<any[]>([]);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     // Initial data load
//     loadPlayerData();
//     loadQuests();
//     loadShopItems();
//   }, []);

//   const loadPlayerData = async () => {
//     try {
//       const response = await fetch('/api/student/profile');
//       if (response.ok) {
//         const data = await response.json();
//         const profile = data.user.profile;
//         const nextLevelXp = profile.level * 1000; // 1000 XP per level
        
//         setPlayerData({
//           id: data.user.id,
//           name: data.user.name || "Grid Runner",
//           level: profile.level,
//           xp: profile.xp,
//           nextLevelXp: nextLevelXp,
//           title: profile.title,
//           avatar: profile.avatar,
//           coins: profile.coins,
//           email: data.user.email || "",
//           stats: {
//             character: profile.character,
//             health: profile.health,
//             exploration: profile.exploration,
//             scholarship: profile.scholarship,
//             stewardship: profile.stewardship
//           },
//           achievements: data.user.achievements || []
//         });
//       }
//     } catch (error) {
//       console.error('Error loading player data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadQuests = async () => {
//     try {
//       const response = await fetch('/api/student/quests');
//       if (response.ok) {
//         const data = await response.json();
//         setQuests(data.quests || []);
//       }
//     } catch (error) {
//       console.error('Error loading quests:', error);
//     }
//   };

//   const loadShopItems = async () => {
//     try {
//       const response = await fetch('/api/student/shop');
//       if (response.ok) {
//         const data = await response.json();
//         setShopItems(data.items || []);
//       }
//     } catch (error) {
//       console.error('Error loading shop items:', error);
//     }
//   };

//   const refreshData = async () => {
//     setRefreshing(true);
//     await Promise.all([
//       loadPlayerData(),
//       loadQuests(),
//       loadShopItems()
//     ]);
//     setRefreshing(false);
//   };

//   const switchScreen = (screenId: string) => {
//     setCurrentScreen(screenId);
//     setQuestPanelActive(false);
//   };

//   const toggleQuestPanel = () => {
//     setQuestPanelActive(!questPanelActive);
//   };

//   const openModal = (modalType: string, id?: string) => {
//     if (modalType === 'event' && id) {
//       setCurrentEventId(id);
//     }
//     if (modalType === 'quiz' && id) {
//       setCurrentQuizId(id);
//     }
//     setActiveModals(prev => ({ ...prev, [modalType]: true }));
//   };

//   const closeModal = (modalType: string) => {
//     setActiveModals(prev => ({ ...prev, [modalType]: false }));
//   };

//   const showNotification = (title: string, message: string, icon: string = '🎉') => {
//     setNotificationData({ title, message, icon });
//     openModal('notification');
//   };

//   const handleQuestClick = (questId: string) => {
//     // Check if it's a real quest from DB or static quest
//     const realQuest = quests.find(q => q.id === questId);
//     if (realQuest) {
//       openModal('quiz', questId);
//     } else {
//       // Handle static quests (keep existing logic for static map events)
//       if (questId.includes('logic') || questId.includes('math') || questId.includes('chess') || 
//           questId.includes('health') || questId.includes('scholar') || questId.includes('explore') || 
//           questId.includes('steward')) {
//         openModal('quiz', questId);
//       } else {
//         openModal('event', questId);
//       }
//     }
//   };

//   const handleEventClick = (eventId: string) => {
//     openModal('event', eventId);
//   };

//   const handlePurchase = async (item: any) => {
//     if (!playerData) return;

//     try {
//       const response = await fetch('/api/student/shop/purchase', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           itemId: item.id,
//           quantity: 1
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Update player data with new profile
//         setPlayerData(prev => prev ? {
//           ...prev,
//           coins: data.profile.coins,
//           xp: data.profile.xp,
//           level: data.profile.level,
//           stats: {
//             character: data.profile.character,
//             health: data.profile.health,
//             exploration: data.profile.exploration,
//             scholarship: data.profile.scholarship,
//             stewardship: data.profile.stewardship
//           }
//         } : null);

//         showNotification('Purchase Successful!', `${item.name} has been added to your inventory.`, '🛍️');
//         loadShopItems(); // Refresh shop items
//       } else {
//         showNotification('Purchase Failed', data.error, '❌');
//       }
//     } catch (error) {
//       console.error('Error purchasing item:', error);
//       showNotification('Purchase Failed', 'An error occurred while processing your purchase.', '❌');
//     }
//   };

//   const handleEventRegistration = () => {
//     showNotification('Registration Confirmed!', 'Your event registration is secured. Prepare for the challenge ahead!', '🎟️');
//   };

//   const handleQuizCompletion = async (score: number, questId: string) => {
//     if (!playerData) return;

//     try {
//       // Check if it's a real quest
//       const realQuest = quests.find(q => q.id === questId);
//       if (realQuest) {
//         const response = await fetch('/api/student/quests/complete', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             questId: questId,
//             score: score,
//             timeSpent: 0 // You might want to track this
//           }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//           // Update player data with new profile
//           setPlayerData(prev => prev ? {
//             ...prev,
//             coins: data.profile.coins,
//             xp: data.profile.xp,
//             level: data.profile.level,
//             stats: {
//               character: data.profile.character,
//               health: data.profile.health,
//               exploration: data.profile.exploration,
//               scholarship: data.profile.scholarship,
//               stewardship: data.profile.stewardship
//             }
//           } : null);

//           showNotification(
//             'Quest Complete!', 
//             `+${data.rewards.xp} XP, +${data.rewards.coins} coins, +${data.rewards.attributeBoost} ${data.rewards.attribute}!`, 
//             '🏆'
//           );
          
//           loadQuests(); // Refresh quests
//         } else {
//           showNotification('Quest Failed', data.error, '❌');
//         }
//       } else {
//         // Handle static quests (fallback to original logic)
//         const pointsEarned = Math.floor(score * 0.1); 
//         const coinsEarned = score * 10; 
        
//         setPlayerData(prev => prev ? {
//           ...prev,
//           coins: prev.coins + coinsEarned,
//           xp: prev.xp + score,
//           stats: {
//             ...prev.stats,
//             // You'd need to determine which attribute based on questId
//           }
//         } : null);

//         showNotification(
//           'Quest Complete!', 
//           `+${score} XP, +${coinsEarned} coins!`, 
//           '🏆'
//         );
//       }
//     } catch (error) {
//       console.error('Error completing quest:', error);
//       showNotification('Quest Failed', 'An error occurred while completing the quest.', '❌');
//     }
//   };

//   const handleProfileAction = (action: string) => {
//     if (action === 'edit') {
//       openModal('profileEdit');
//     } else if (action === 'settings') {
//       showNotification('Settings', 'Audio, notifications, and game preferences will be available here.', '🔧');
//     } else if (action === 'stats') {
//       showNotification('Statistics', 'Detailed performance analytics will be available here.', '📊');
//     }
//   };

//   const handleProfileUpdate = async (updatedData: any) => {
//     try {
//       const response = await fetch('/api/student/profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedData),
//       });

//       if (response.ok) {
//         await loadPlayerData(); // Refresh player data
//         showNotification('Profile Updated!', 'Your profile has been successfully updated.', '✅');
//         closeModal('profileEdit');
//       } else {
//         showNotification('Update Failed', 'Failed to update profile. Please try again.', '❌');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       showNotification('Update Failed', 'An error occurred while updating your profile.', '❌');
//     }
//   };

//   if (loading || !playerData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0D0C1D]">
//         <div className="w-[70px] h-[70px] relative">
//           <div className="absolute w-full h-full border-[3px] border-transparent border-t-[#8A2BE2] rounded-full animate-spin"></div>
//           <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] border-[3px] border-transparent border-t-[#00FFFF] rounded-full animate-spin [animation-duration:0.9s] [animation-direction:reverse]"></div>
//           <div className="absolute w-[60%] h-[60%] top-[20%] left-[20%] border-[3px] border-transparent border-t-[#FF00FF] rounded-full animate-spin [animation-duration:0.8s]"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mobile-game-container">
//       <LoadingOverlay visible={refreshing} />
      
//       <StatusBar playerData={playerData} onDailyReward={() => openModal('dailyReward')} />
      
//       <div className="relative h-screen w-screen z-[1]">
//         <div className={`absolute top-0 left-0 w-full h-full flex flex-col transition-[opacity,transform] duration-[400ms] ease-out ${currentScreen === 'mapScreen' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] hidden'}`}>
//           <MapScreen 
//             onQuestClick={handleQuestClick}
//             onEventClick={handleEventClick}
//           />
//         </div>
        
//         <div className={`absolute top-0 left-0 w-full h-full flex flex-col transition-[opacity,transform] duration-[400ms] ease-out ${currentScreen === 'profileScreen' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] hidden'}`}>
//           <ProfileScreen 
//             playerData={playerData} 
//             onProfileAction={handleProfileAction}
//             onSignOut={onSignOut}
//           />
//         </div>
        
//         <div className={`absolute top-0 left-0 w-full h-full flex flex-col transition-[opacity,transform] duration-[400ms] ease-out ${currentScreen === 'shopScreen' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] hidden'}`}>
//           <ShopScreen 
//             playerData={playerData}
//             shopItems={shopItems}
//             onPurchase={handlePurchase}
//           />
//         </div>
//       </div>
      
//       <QuestPanel 
//         active={questPanelActive}
//         quests={quests}
//         onQuestClick={handleQuestClick}
//       />
      
//       <BottomNav 
//         currentScreen={currentScreen}
//         onScreenChange={switchScreen}
//         onQuestToggle={toggleQuestPanel}
//         questPanelActive={questPanelActive}
//       />
      
//       {/* Modals */}
//       <EventModal 
//         visible={activeModals.event}
//         onClose={() => closeModal('event')}
//         eventId={currentEventId}
//         onRegister={handleEventRegistration}
//       />
      
//       <QuizModal 
//         visible={activeModals.quiz}
//         onClose={() => closeModal('quiz')}
//         quizId={currentQuizId}
//         quests={quests}
//         onComplete={handleQuizCompletion}
//       />
      
//       <NotificationModal 
//         visible={activeModals.notification}
//         onClose={() => closeModal('notification')}
//         type="notification"
//         title={notificationData.title}
//         message={notificationData.message}
//         icon={notificationData.icon}
//       />
      
//       <NotificationModal 
//         visible={activeModals.dailyReward}
//         onClose={() => closeModal('dailyReward')}
//         type="dailyReward"
//       />

//       <ProfileEditModal
//         visible={activeModals.profileEdit}
//         onClose={() => closeModal('profileEdit')}
//         playerData={playerData}
//         onSave={handleProfileUpdate}
//       />
//     </div>
//   );
// }



// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// 'use client';

// import React, { useState, useEffect } from 'react';
// import dynamic from 'next/dynamic';
// import StatusBar from './StatusBar';
// import BottomNav from './BottomNav';
// import LoadingOverlay from './LoadingOverlay';
// import QuestPanel from './QuestPanel';
// import ProfileScreen from './ProfileScreen';
// import ShopScreen from './ShopScreen';
// import EventModal from './EventModal';
// import QuizModal from './QuizModal';
// import NotificationModal from './NotificationModal';
// import ProfileEditModal from './ProfileEditModal';
// import AchievementModal from './AchievementModal';
// import AchievementUnlockModal from './AchievementUnlockModal';
// import './mobile-styles.css';

// const MapScreen = dynamic(() => import('./MapScreen'), {
//   ssr: false,
//   loading: () => (
//     <div className="h-full w-full flex items-center justify-center bg-[#17162E] text-[#A0AEC0] text-lg">
//       Loading map...
//     </div>
//   )
// });

// interface User {
//   id: string;
//   name?: string;
//   email?: string;
//   role: string;
// }

// interface PlayerData {
//   id: string;
//   name: string;
//   level: number;
//   xp: number;
//   nextLevelXp: number;
//   title: string;
//   avatar: string;
//   coins: number;
//   email: string;
//   stats: {
//     character: number;
//     health: number;
//     exploration: number;
//     scholarship: number;
//     stewardship: number;
//   };
//   achievements: Array<{
//     id: string;
//     name: string;
//     description: string;
//     icon: string;
//     unlocked: boolean;
//     unlockedAt?: Date;
//     progress: {
//       current: number;
//       required: number;
//       percentage: number;
//       type: 'xp' | 'level' | 'attribute' | 'quests';
//       attributeName?: string;
//     };
//     rewards: {
//       xp: number;
//       coins: number;
//     };
//   }>;
// }

// interface MobileGameUIProps {
//   user: User;
//   onSignOut: () => Promise<void>;
// }

// export default function MobileGameUI({ user, onSignOut }: MobileGameUIProps) {
//   const [currentScreen, setCurrentScreen] = useState('mapScreen');
//   const [loading, setLoading] = useState(true);
//   const [questPanelActive, setQuestPanelActive] = useState(false);
//   const [activeModals, setActiveModals] = useState({
//     event: false,
//     quiz: false,
//     notification: false,
//     purchase: false,
//     dailyReward: false,
//     profileEdit: false,
//     achievement: false,
//     achievementUnlock: false
//   });
//   const [currentEventId, setCurrentEventId] = useState<string>('e-sports');
//   const [currentQuizId, setCurrentQuizId] = useState<string>('logic01');
//   const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
//   const [unlockedAchievement, setUnlockedAchievement] = useState<any>(null);
//   const [notificationData, setNotificationData] = useState({
//     title: 'Success!',
//     message: 'Action completed successfully.',
//     icon: '🎉'
//   });
  
//   const [playerData, setPlayerData] = useState<PlayerData | null>(null);
//   const [quests, setQuests] = useState<any[]>([]);
//   const [shopItems, setShopItems] = useState<any[]>([]);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     // Initial data load
//     loadPlayerData();
//     loadQuests();
//     loadShopItems();
//   }, []);

//   const loadPlayerData = async () => {
//     try {
//       const response = await fetch('/api/student/profile');
//       if (response.ok) {
//         const data = await response.json();
//         const profile = data.user.profile;
//         const nextLevelXp = (profile.level + 1) * 1000; // 1000 XP per level
        
//         setPlayerData({
//           id: data.user.id,
//           name: data.user.name || "Grid Runner",
//           level: profile.level,
//           xp: profile.xp,
//           nextLevelXp: nextLevelXp,
//           title: profile.title,
//           avatar: profile.avatar,
//           coins: profile.coins,
//           email: data.user.email || "",
//           stats: {
//             character: profile.character,
//             health: profile.health,
//             exploration: profile.exploration,
//             scholarship: profile.scholarship,
//             stewardship: profile.stewardship
//           },
//           achievements: data.user.achievements || []
//         });

//         // Check for newly unlocked achievements
//         if (data.newlyUnlocked && data.newlyUnlocked.length > 0) {
//           // Show unlock notification for the first newly unlocked achievement
//           const firstUnlocked = data.user.achievements.find((ach: any) => 
//             data.newlyUnlocked.includes(ach.id)
//           );
//           if (firstUnlocked) {
//             setUnlockedAchievement(firstUnlocked);
//             openModal('achievementUnlock');
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error loading player data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadQuests = async () => {
//     try {
//       const response = await fetch('/api/student/quests');
//       if (response.ok) {
//         const data = await response.json();
//         setQuests(data.quests || []);
//       }
//     } catch (error) {
//       console.error('Error loading quests:', error);
//     }
//   };

//   const loadShopItems = async () => {
//     try {
//       const response = await fetch('/api/student/shop');
//       if (response.ok) {
//         const data = await response.json();
//         setShopItems(data.items || []);
//       }
//     } catch (error) {
//       console.error('Error loading shop items:', error);
//     }
//   };

//   const refreshData = async () => {
//     setRefreshing(true);
//     await Promise.all([
//       loadPlayerData(),
//       loadQuests(),
//       loadShopItems()
//     ]);
//     setRefreshing(false);
//   };

//   const switchScreen = (screenId: string) => {
//     setCurrentScreen(screenId);
//     setQuestPanelActive(false);
//   };

//   const toggleQuestPanel = () => {
//     setQuestPanelActive(!questPanelActive);
//   };

//   const openModal = (modalType: string, id?: string) => {
//     if (modalType === 'event' && id) {
//       setCurrentEventId(id);
//     }
//     if (modalType === 'quiz' && id) {
//       setCurrentQuizId(id);
//     }
//     setActiveModals(prev => ({ ...prev, [modalType]: true }));
//   };

//   const closeModal = (modalType: string) => {
//     setActiveModals(prev => ({ ...prev, [modalType]: false }));
//     if (modalType === 'achievement') {
//       setSelectedAchievement(null);
//     }
//     if (modalType === 'achievementUnlock') {
//       setUnlockedAchievement(null);
//     }
//   };

//   const showNotification = (title: string, message: string, icon: string = '🎉') => {
//     setNotificationData({ title, message, icon });
//     openModal('notification');
//   };

//   const handleAchievementClick = (achievement: any) => {
//     setSelectedAchievement(achievement);
//     openModal('achievement');
//   };

//   const handleQuestClick = (questId: string) => {
//     // Check if it's a real quest from DB or static quest
//     const realQuest = quests.find(q => q.id === questId);
//     if (realQuest) {
//       openModal('quiz', questId);
//     } else {
//       // Handle static quests (keep existing logic for static map events)
//       if (questId.includes('logic') || questId.includes('math') || questId.includes('chess') || 
//           questId.includes('health') || questId.includes('scholar') || questId.includes('explore') || 
//           questId.includes('steward')) {
//         openModal('quiz', questId);
//       } else {
//         openModal('event', questId);
//       }
//     }
//   };

//   const handleEventClick = (eventId: string) => {
//     openModal('event', eventId);
//   };

//   const handlePurchase = async (item: any) => {
//     if (!playerData) return;

//     try {
//       const response = await fetch('/api/student/shop/purchase', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           itemId: item.id,
//           quantity: 1
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Update player data with new profile
//         setPlayerData(prev => prev ? {
//           ...prev,
//           coins: data.profile.coins,
//           xp: data.profile.xp,
//           level: data.profile.level,
//           stats: {
//             character: data.profile.character,
//             health: data.profile.health,
//             exploration: data.profile.exploration,
//             scholarship: data.profile.scholarship,
//             stewardship: data.profile.stewardship
//           }
//         } : null);

//         showNotification('Purchase Successful!', `${item.name} has been added to your inventory.`, '🛍️');
//         loadShopItems(); // Refresh shop items
//       } else {
//         showNotification('Purchase Failed', data.error, '❌');
//       }
//     } catch (error) {
//       console.error('Error purchasing item:', error);
//       showNotification('Purchase Failed', 'An error occurred while processing your purchase.', '❌');
//     }
//   };

//   const handleEventRegistration = () => {
//     showNotification('Registration Confirmed!', 'Your event registration is secured. Prepare for the challenge ahead!', '🎟️');
//   };

//   const handleQuizCompletion = async (score: number, questId: string) => {
//     if (!playerData) return;

//     try {
//       // Check if it's a real quest
//       const realQuest = quests.find(q => q.id === questId);
//       if (realQuest) {
//         const response = await fetch('/api/student/quests/complete', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             questId: questId,
//             score: score,
//             timeSpent: 0 // You might want to track this
//           }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//           // Update player data with new profile
//           setPlayerData(prev => prev ? {
//             ...prev,
//             coins: data.profile.coins,
//             xp: data.profile.xp,
//             level: data.profile.level,
//             stats: {
//               character: data.profile.character,
//               health: data.profile.health,
//               exploration: data.profile.exploration,
//               scholarship: data.profile.scholarship,
//               stewardship: data.profile.stewardship
//             }
//           } : null);

//           showNotification(
//             'Quest Complete!', 
//             `+${data.rewards.xp} XP, +${data.rewards.coins} coins, +${data.rewards.attributeBoost} ${data.rewards.attribute}!`, 
//             '🏆'
//           );

//           // Check for newly unlocked achievements
//           if (data.newAchievements && data.newAchievements.length > 0) {
//             // Reload player data to get updated achievements
//             await loadPlayerData();
//           }
          
//           loadQuests(); // Refresh quests
//         } else {
//           showNotification('Quest Failed', data.error, '❌');
//         }
//       } else {
//         // Handle static quests (fallback to original logic)
//         const pointsEarned = Math.floor(score * 0.1); 
//         const coinsEarned = score * 10; 
        
//         setPlayerData(prev => prev ? {
//           ...prev,
//           coins: prev.coins + coinsEarned,
//           xp: prev.xp + score,
//           stats: {
//             ...prev.stats,
//             // You'd need to determine which attribute based on questId
//           }
//         } : null);

//         showNotification(
//           'Quest Complete!', 
//           `+${score} XP, +${coinsEarned} coins!`, 
//           '🏆'
//         );
//       }
//     } catch (error) {
//       console.error('Error completing quest:', error);
//       showNotification('Quest Failed', 'An error occurred while completing the quest.', '❌');
//     }
//   };

//   const handleProfileAction = (action: string) => {
//     if (action === 'edit') {
//       openModal('profileEdit');
//     } else if (action === 'settings') {
//       showNotification('Settings', 'Audio, notifications, and game preferences will be available here.', '🔧');
//     } else if (action === 'stats') {
//       showNotification('Statistics', 'Detailed performance analytics will be available here.', '📊');
//     }
//   };

//   const handleProfileUpdate = async (updatedData: any) => {
//     try {
//       const response = await fetch('/api/student/profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedData),
//       });

//       if (response.ok) {
//         await loadPlayerData(); // Refresh player data
//         showNotification('Profile Updated!', 'Your profile has been successfully updated.', '✅');
//         closeModal('profileEdit');
//       } else {
//         showNotification('Update Failed', 'Failed to update profile. Please try again.', '❌');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       showNotification('Update Failed', 'An error occurred while updating your profile.', '❌');
//     }
//   };

//   if (loading || !playerData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0D0C1D]">
//         <div className="w-[70px] h-[70px] relative">
//           <div className="absolute w-full h-full border-[3px] border-transparent border-t-[#8A2BE2] rounded-full animate-spin"></div>
//           <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] border-[3px] border-transparent border-t-[#00FFFF] rounded-full animate-spin [animation-duration:0.9s] [animation-direction:reverse]"></div>
//           <div className="absolute w-[60%] h-[60%] top-[20%] left-[20%] border-[3px] border-transparent border-t-[#FF00FF] rounded-full animate-spin [animation-duration:0.8s]"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mobile-game-container">
//       <LoadingOverlay visible={refreshing} />
      
//       <StatusBar playerData={playerData} onDailyReward={() => openModal('dailyReward')} />
      
//       <div className="relative h-screen w-screen z-[1]">
//         <div className={`absolute top-0 left-0 w-full h-full flex flex-col transition-[opacity,transform] duration-[400ms] ease-out ${currentScreen === 'mapScreen' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] hidden'}`}>
//           <MapScreen 
//             onQuestClick={handleQuestClick}
//             onEventClick={handleEventClick}
//           />
//         </div>
        
//         <div className={`absolute top-0 left-0 w-full h-full flex flex-col transition-[opacity,transform] duration-[400ms] ease-out ${currentScreen === 'profileScreen' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] hidden'}`}>
//           <ProfileScreen 
//             playerData={playerData} 
//             onProfileAction={handleProfileAction}
//             onAchievementClick={handleAchievementClick}
//             onSignOut={onSignOut}
//           />
//         </div>
        
//         <div className={`absolute top-0 left-0 w-full h-full flex flex-col transition-[opacity,transform] duration-[400ms] ease-out ${currentScreen === 'shopScreen' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] hidden'}`}>
//           <ShopScreen 
//             playerData={playerData}
//             shopItems={shopItems}
//             onPurchase={handlePurchase}
//           />
//         </div>
//       </div>
      
//       <QuestPanel 
//         active={questPanelActive}
//         quests={quests}
//         onQuestClick={handleQuestClick}
//       />
      
//       <BottomNav 
//         currentScreen={currentScreen}
//         onScreenChange={switchScreen}
//         onQuestToggle={toggleQuestPanel}
//         questPanelActive={questPanelActive}
//       />
      
//       {/* Modals */}
//       <EventModal 
//         visible={activeModals.event}
//         onClose={() => closeModal('event')}
//         eventId={currentEventId}
//         onRegister={handleEventRegistration}
//       />
      
//       <QuizModal 
//         visible={activeModals.quiz}
//         onClose={() => closeModal('quiz')}
//         quizId={currentQuizId}
//         quests={quests}
//         onComplete={handleQuizCompletion}
//       />
      
//       <NotificationModal 
//         visible={activeModals.notification}
//         onClose={() => closeModal('notification')}
//         type="notification"
//         title={notificationData.title}
//         message={notificationData.message}
//         icon={notificationData.icon}
//       />
      
//       <NotificationModal 
//         visible={activeModals.dailyReward}
//         onClose={() => closeModal('dailyReward')}
//         type="dailyReward"
//       />

//       <ProfileEditModal
//         visible={activeModals.profileEdit}
//         onClose={() => closeModal('profileEdit')}
//         playerData={playerData}
//         onSave={handleProfileUpdate}
//       />

//       <AchievementModal
//         visible={activeModals.achievement}
//         onClose={() => closeModal('achievement')}
//         achievement={selectedAchievement}
//       />

//       <AchievementUnlockModal
//         visible={activeModals.achievementUnlock}
//         onClose={() => closeModal('achievementUnlock')}
//         achievement={unlockedAchievement}
//       />
//     </div>
//   );
// }










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
import ProfileEditModal from './ProfileEditModal';
import AchievementModal from './AchievementModal';
import AchievementUnlockModal from './AchievementUnlockModal';
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

interface PlayerData {
  id: string;
  name: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  title: string;
  avatar: string;
  coins: number;
  email: string;
  stats: {
    character: number;
    health: number;
    exploration: number;
    scholarship: number;
    stewardship: number;
  };
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    unlocked: boolean;
    unlockedAt?: Date;
    progress: {
      current: number;
      required: number;
      percentage: number;
      type: 'xp' | 'level' | 'attribute' | 'quests';
      attributeName?: string;
    };
    rewards: {
      xp: number;
      coins: number;
    };
  }>;
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
    dailyReward: false,
    profileEdit: false,
    achievement: false,
    achievementUnlock: false
  });
  const [currentEventId, setCurrentEventId] = useState<string>('e-sports');
  const [currentQuizId, setCurrentQuizId] = useState<string>('logic01');
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
  const [unlockedAchievement, setUnlockedAchievement] = useState<any>(null);
  const [notificationData, setNotificationData] = useState({
    title: 'Success!',
    message: 'Action completed successfully.',
    icon: '🎉'
  });
  
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [quests, setQuests] = useState<any[]>([]);
  const [shopItems, setShopItems] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Initial data load
    loadPlayerData();
    loadQuests();
    loadShopItems();
  }, []);

  const loadPlayerData = async () => {
    try {
      const response = await fetch('/api/student/profile');
      if (response.ok) {
        const data = await response.json();
        const profile = data.user.profile;
        const nextLevelXp = (profile.level + 1) * 1000; // Next level XP target
        
        setPlayerData({
          id: data.user.id,
          name: data.user.name || "Grid Runner",
          level: profile.level,
          xp: profile.xp,
          nextLevelXp: nextLevelXp,
          title: profile.title,
          avatar: profile.avatar,
          coins: profile.coins,
          email: data.user.email || "",
          stats: {
            character: profile.character,
            health: profile.health,
            exploration: profile.exploration,
            scholarship: profile.scholarship,
            stewardship: profile.stewardship
          },
          achievements: data.user.achievements || []
        });

        // Check for newly unlocked achievements on profile load
        if (data.newlyUnlocked && data.newlyUnlocked.length > 0) {
          // Show unlock notification for the first newly unlocked achievement
          const firstUnlocked = data.user.achievements.find((ach: any) => 
            data.newlyUnlocked.includes(ach.id) && ach.unlocked
          );
          if (firstUnlocked) {
            setTimeout(() => {
              setUnlockedAchievement(firstUnlocked);
              openModal('achievementUnlock');
            }, 100);
          }
        }
      }
    } catch (error) {
      console.error('Error loading player data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadQuests = async () => {
    try {
      const response = await fetch('/api/student/quests');
      if (response.ok) {
        const data = await response.json();
        setQuests(data.quests || []);
      }
    } catch (error) {
      console.error('Error loading quests:', error);
    }
  };

  const loadShopItems = async () => {
    try {
      const response = await fetch('/api/student/shop');
      if (response.ok) {
        const data = await response.json();
        setShopItems(data.items || []);
      }
    } catch (error) {
      console.error('Error loading shop items:', error);
    }
  };

  const refreshAchievements = async () => {
    try {
      const response = await fetch('/api/student/profile');
      if (response.ok) {
        const data = await response.json();
        
        // Update only achievements in player data
        setPlayerData(prev => prev ? {
          ...prev,
          achievements: data.user.achievements || []
        } : null);

        // Check for newly unlocked achievements
        if (data.newlyUnlocked && data.newlyUnlocked.length > 0) {
          const firstUnlocked = data.user.achievements.find((ach: any) => 
            data.newlyUnlocked.includes(ach.id) && ach.unlocked
          );
          if (firstUnlocked) {
            setTimeout(() => {
              setUnlockedAchievement(firstUnlocked);
              openModal('achievementUnlock');
            }, 100);
          }
        }
      }
    } catch (error) {
      console.error('Error refreshing achievements:', error);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await Promise.all([
      loadPlayerData(),
      loadQuests(),
      loadShopItems()
    ]);
    setRefreshing(false);
  };

  const switchScreen = (screenId: string) => {
    setCurrentScreen(screenId);
    setQuestPanelActive(false);
    
    // Refresh achievements when switching to profile screen
    if (screenId === 'profileScreen') {
      refreshAchievements();
    }
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
    if (modalType === 'achievement') {
      setSelectedAchievement(null);
    }
    if (modalType === 'achievementUnlock') {
      setUnlockedAchievement(null);
    }
  };

  const showNotification = (title: string, message: string, icon: string = '🎉') => {
    setNotificationData({ title, message, icon });
    openModal('notification');
  };

  const handleAchievementClick = (achievement: any) => {
    setSelectedAchievement(achievement);
    openModal('achievement');
  };

  const handleQuestClick = (questId: string) => {
    // Check if it's a real quest from DB or static quest
    const realQuest = quests.find(q => q.id === questId);
    if (realQuest) {
      openModal('quiz', questId);
    } else {
      // Handle static quests (keep existing logic for static map events)
      if (questId.includes('logic') || questId.includes('math') || questId.includes('chess') || 
          questId.includes('health') || questId.includes('scholar') || questId.includes('explore') || 
          questId.includes('steward')) {
        openModal('quiz', questId);
      } else {
        openModal('event', questId);
      }
    }
  };

  const handleEventClick = (eventId: string) => {
    openModal('event', eventId);
  };

  const handlePurchase = async (item: any) => {
    if (!playerData) return;

    try {
      const response = await fetch('/api/student/shop/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: item.id,
          quantity: 1
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update player data with new profile
        setPlayerData(prev => prev ? {
          ...prev,
          coins: data.profile.coins,
          xp: data.profile.xp,
          level: data.profile.level,
          stats: {
            character: data.profile.character,
            health: data.profile.health,
            exploration: data.profile.exploration,
            scholarship: data.profile.scholarship,
            stewardship: data.profile.stewardship
          }
        } : null);

        showNotification('Purchase Successful!', `${item.name} has been added to your inventory.`, '🛍️');
        loadShopItems(); // Refresh shop items
        refreshAchievements(); // Check for any newly unlocked achievements
      } else {
        showNotification('Purchase Failed', data.error, '❌');
      }
    } catch (error) {
      console.error('Error purchasing item:', error);
      showNotification('Purchase Failed', 'An error occurred while processing your purchase.', '❌');
    }
  };

  const handleEventRegistration = () => {
    showNotification('Registration Confirmed!', 'Your event registration is secured. Prepare for the challenge ahead!', '🎟️');
  };

  const handleQuizCompletion = async (score: number, questId: string) => {
    if (!playerData) return;

    try {
      // Check if it's a real quest
      const realQuest = quests.find(q => q.id === questId);
      if (realQuest) {
        const response = await fetch('/api/student/quests/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            questId: questId,
            score: score,
            timeSpent: 0 // You might want to track this
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Update player data with new profile
          setPlayerData(prev => prev ? {
            ...prev,
            coins: data.profile.coins,
            xp: data.profile.xp,
            level: data.profile.level,
            stats: {
              character: data.profile.character,
              health: data.profile.health,
              exploration: data.profile.exploration,
              scholarship: data.profile.scholarship,
              stewardship: data.profile.stewardship
            }
          } : null);

          showNotification(
            'Quest Complete!', 
            `+${data.rewards.xp} XP, +${data.rewards.coins} coins, +${data.rewards.attributeBoost} ${data.rewards.attribute}!`, 
            '🏆'
          );

          // Check for newly unlocked achievements
          if (data.newAchievements && data.newAchievements.length > 0) {
            console.log('🏆 New achievements unlocked:', data.newAchievements);
            // Reload player data to get updated achievements with full details
            const profileResponse = await fetch('/api/student/profile');
            if (profileResponse.ok) {
              const profileData = await profileResponse.json();
              const updatedAchievements = profileData.user.achievements || [];
              
              // Update player data with refreshed achievements
              setPlayerData(prev => prev ? {
                ...prev,
                achievements: updatedAchievements
              } : null);

              // Find the newly unlocked achievement with full details and show unlock modal
              const newlyUnlockedAchievement = updatedAchievements.find((ach: any) => 
                data.newAchievements.includes(ach.id) && ach.unlocked
              );
              
              if (newlyUnlockedAchievement) {
                console.log('🎉 Showing unlock modal for:', newlyUnlockedAchievement.name);
                // Small delay to ensure state is updated before showing modal
                setTimeout(() => {
                  setUnlockedAchievement(newlyUnlockedAchievement);
                  openModal('achievementUnlock');
                }, 100);
              }
            }
          }
          
          loadQuests(); // Refresh quests
        } else {
          showNotification('Quest Failed', data.error, '❌');
        }
      } else {
        // Handle static quests (fallback to original logic)
        const pointsEarned = Math.floor(score * 0.1); 
        const coinsEarned = score * 10; 
        
        setPlayerData(prev => prev ? {
          ...prev,
          coins: prev.coins + coinsEarned,
          xp: prev.xp + score,
          stats: {
            ...prev.stats,
            // You'd need to determine which attribute based on questId
          }
        } : null);

        showNotification(
          'Quest Complete!', 
          `+${score} XP, +${coinsEarned} coins!`, 
          '🏆'
        );
      }
    } catch (error) {
      console.error('Error completing quest:', error);
      showNotification('Quest Failed', 'An error occurred while completing the quest.', '❌');
    }
  };

  const handleProfileAction = (action: string) => {
    if (action === 'edit') {
      openModal('profileEdit');
    } else if (action === 'settings') {
      showNotification('Settings', 'Audio, notifications, and game preferences will be available here.', '🔧');
    } else if (action === 'stats') {
      showNotification('Statistics', 'Detailed performance analytics will be available here.', '📊');
    }
  };

  const handleProfileUpdate = async (updatedData: any) => {
    try {
      const response = await fetch('/api/student/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        await loadPlayerData(); // Refresh player data
        showNotification('Profile Updated!', 'Your profile has been successfully updated.', '✅');
        closeModal('profileEdit');
        refreshAchievements(); // Check for achievements after profile update
      } else {
        showNotification('Update Failed', 'Failed to update profile. Please try again.', '❌');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showNotification('Update Failed', 'An error occurred while updating your profile.', '❌');
    }
  };

  if (loading || !playerData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0C1D]">
        <div className="w-[70px] h-[70px] relative">
          <div className="absolute w-full h-full border-[3px] border-transparent border-t-[#8A2BE2] rounded-full animate-spin"></div>
          <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] border-[3px] border-transparent border-t-[#00FFFF] rounded-full animate-spin [animation-duration:0.9s] [animation-direction:reverse]"></div>
          <div className="absolute w-[60%] h-[60%] top-[20%] left-[20%] border-[3px] border-transparent border-t-[#FF00FF] rounded-full animate-spin [animation-duration:0.8s]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-game-container">
      <LoadingOverlay visible={refreshing} />
      
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
            onAchievementClick={handleAchievementClick}
            onSignOut={onSignOut}
          />
        </div>
        
        <div className={`absolute top-0 left-0 w-full h-full flex flex-col transition-[opacity,transform] duration-[400ms] ease-out ${currentScreen === 'shopScreen' ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98] hidden'}`}>
          <ShopScreen 
            playerData={playerData}
            shopItems={shopItems}
            onPurchase={handlePurchase}
          />
        </div>
      </div>
      
      <QuestPanel 
        active={questPanelActive}
        quests={quests}
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
        quests={quests}
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

      <ProfileEditModal
        visible={activeModals.profileEdit}
        onClose={() => closeModal('profileEdit')}
        playerData={playerData}
        onSave={handleProfileUpdate}
      />

      <AchievementModal
        visible={activeModals.achievement}
        onClose={() => closeModal('achievement')}
        achievement={selectedAchievement}
      />

      <AchievementUnlockModal
        visible={activeModals.achievementUnlock}
        onClose={() => closeModal('achievementUnlock')}
        achievement={unlockedAchievement}
      />
    </div>
  );
}