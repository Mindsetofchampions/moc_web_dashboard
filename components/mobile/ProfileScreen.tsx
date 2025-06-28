// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from 'react';

// interface ProfileScreenProps {
//   playerData: any;
//   onProfileAction: (action: string) => void;
//   onSignOut: () => Promise<void>;
// }

// export default function ProfileScreen({ playerData, onProfileAction, onSignOut }: ProfileScreenProps) {
//   const [isSigningOut, setIsSigningOut] = useState(false);
//   const xpPercentage = (playerData.xp / playerData.nextLevelXp) * 100;

//   const handleSignOut = async () => {
//     setIsSigningOut(true);
//     try {
//       await onSignOut();
//     } catch (error) {
//       console.error('Error signing out:', error);
//       setIsSigningOut(false);
//     }
//   };

//   const getStatColor = (statName: string) => {
//     const colors = {
//       // chess: '#8B4513',
//       character: '#FF1493',
//       health: '#32CD32',
//       exploration: '#FFD700',
//       scholarship: '#4169E1',
//       stewardship: '#228B22'
//     };
//     return colors[statName as keyof typeof colors] || '#00FFFF';
//   };

//   const getStatProgress = (value: number) => {
//     if (value >= 80) return 'Master';
//     if (value >= 60) return 'Expert';
//     if (value >= 40) return 'Advanced';
//     if (value >= 20) return 'Intermediate';
//     return 'Novice';
//   };

//   return (
//     <div className="pt-[90px] pb-[140px] px-[15px] overflow-y-auto h-full flex flex-col items-center gap-[25px] scrollbar-hide">
//       <div className="bg-[rgba(23,22,46,0.85)] rounded-[20px] p-[25px] w-full max-w-[500px] border border-[rgba(0,255,255,0.2)] shadow-[0_8px_30px_rgba(75,0,130,0.5)] backdrop-blur-[10px]">
//         <div className="flex flex-col items-center text-center mb-[25px] pb-5 border-b border-[rgba(0,255,255,0.2)]">
//           <div className="w-[150px] h-[150px] rounded-full bg-gradient-to-[160deg] from-[#4B0082] to-[#FF00FF] flex items-center justify-center text-[70px] text-white mb-[15px] border-4 border-[#9370DB] shadow-[0_0_25px_rgba(138,43,226,0.6),inset_0_0_15px_rgba(0,0,0,0.3)] relative">
//             <div className="absolute inset-[5px] border-2 border-dashed border-[#00FFFF] opacity-50 rounded-full"></div>
//             {playerData.avatar}
//           </div>
//           <h1 className="font-['Orbitron'] text-[28px] font-bold text-[#E0E0E0] mb-[5px]">
//             {playerData.name}
//           </h1>
//           <p className="text-sm text-[#00FFFF] font-medium mb-[15px]">
//             {playerData.title} | Level {playerData.level}
//           </p>
//           {playerData.email && (
//             <p className="text-xs text-[#A0AEC0] mb-[15px]">
//               {playerData.email}
//             </p>
//           )}
//           <div className="flex items-center gap-[15px]">
//             <div 
//               className="w-[80px] h-[80px] rounded-full relative flex items-center justify-center"
//               style={{
//                 background: `conic-gradient(#FF00FF ${xpPercentage}%, rgba(0,255,255,0.2) 0deg)`
//               }}
//             >
//               <div className="absolute w-[65px] h-[65px] bg-[#17162E] rounded-full"></div>
//               <div className="relative z-[1] font-['Orbitron'] text-xl font-bold text-[#FF00FF]">{playerData.level}</div>
//             </div>
//             <div className="text-left">
//               <div className="text-sm text-[#A0AEC0]">{playerData.xp.toLocaleString()} / {playerData.nextLevelXp.toLocaleString()} XP</div>
//               <div className="text-xs text-[#718096]">To Level {playerData.level + 1}</div>
//             </div>
//           </div>
//         </div>
        
//         <h2 className="font-['Orbitron'] text-xl text-[#9370DB] mb-[15px] text-center pb-[5px] border-b border-[rgba(0,255,255,0.2)] flex items-center justify-center gap-[10px]">
//           📈 Attribute Development
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[15px] mb-[25px]">
//           {Object.entries(playerData.stats).map(([statName, value]) => (
//             <div 
//               key={statName}
//               className="bg-[rgba(23,22,46,0.7)] border border-[rgba(0,255,255,0.2)] rounded-[50px] p-[12px_18px] flex items-center gap-3 transition-all duration-300 ease-in-out hover:border-[#00FFFF] hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] hover:transform hover:translate-y-[-2px]"
//             >
//               <div 
//                 className="text-xl w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
//                 style={{ 
//                   backgroundColor: `${getStatColor(statName)}20`,
//                   color: getStatColor(statName)
//                 }}
//               >
//                 {/* {statName === 'chess' && '♟️'} */}
//                 {statName === 'character' && '🎭'}
//                 {statName === 'health' && '💚'}
//                 {statName === 'exploration' && '🧭'}
//                 {statName === 'scholarship' && '🎓'}
//                 {statName === 'stewardship' && '🌳'}
//               </div>
//               <div className="flex-grow min-w-0">
//                 <div className="text-[13px] text-[#A0AEC0] mb-[2px] capitalize">{statName}</div>
//                 <div className="flex items-center gap-2">
//                   <div className="text-base font-semibold text-[#E0E0E0]">{Number(value)}/100</div>
//                   <div 
//                     className="text-[10px] px-2 py-0.5 rounded-[8px] font-medium whitespace-nowrap"
//                     style={{ 
//                       backgroundColor: `${getStatColor(statName)}15`,
//                       color: getStatColor(statName),
//                       border: `1px solid ${getStatColor(statName)}30`
//                     }}
//                   >
//                     {getStatProgress(Number(value))}
//                   </div>
//                 </div>
//                 <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-full h-1.5 mt-1">
//                   <div 
//                     className="h-1.5 rounded-full transition-all duration-500"
//                     style={{ 
//                       width: `${Number(value)}%`,
//                       backgroundColor: getStatColor(statName)
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <h2 className="font-['Orbitron'] text-xl text-[#9370DB] mb-[15px] text-center pb-[5px] border-b border-[rgba(0,255,255,0.2)] flex items-center justify-center gap-[10px]">
//           🏆 Achievement Gallery
//         </h2>
//         <div className="grid grid-cols-[repeat(auto-fill,minmax(70px,1fr))] gap-[15px] mb-[25px]">
//           {playerData.achievements.map((achievement: any) => (
//             <div 
//               key={achievement.id} 
//               className={`bg-[rgba(23,22,46,0.7)] border rounded-[15px] p-[10px] flex flex-col items-center justify-center aspect-square transition-all duration-300 ease-in-out hover:transform hover:scale-110 hover:border-[#00FFFF] cursor-pointer ${
//                 achievement.unlocked 
//                   ? 'border-[#FF00FF] shadow-[0_0_10px_rgba(255,0,255,0.5)]' 
//                   : 'border-[rgba(0,255,255,0.2)]'
//               }`}
//               onClick={() => onProfileAction('achievement')}
//               title={achievement.unlocked ? `Achievement Unlocked: ${achievement.name}` : `Locked: ${achievement.name}`}
//             >
//               <div className={`text-[32px] mb-[5px] transition-all duration-300 ${
//                 achievement.unlocked 
//                   ? 'opacity-100 filter-none text-[#FF00FF]' 
//                   : 'opacity-50 grayscale'
//               }`}>
//                 {achievement.icon}
//               </div>
//               <div className={`text-[10px] text-center transition-all duration-300 ${
//                 achievement.unlocked ? 'text-[#A0AEC0]' : 'text-[#718096]'
//               }`}>
//                 {achievement.name}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Progress Overview */}
//         <div className="bg-[rgba(0,0,0,0.2)] rounded-[15px] p-[15px] mb-[25px]">
//           <h3 className="font-['Orbitron'] text-lg text-[#9370DB] mb-3 text-center">Development Overview</h3>
//           <div className="grid grid-cols-2 gap-3 text-center">
//             <div className="bg-[rgba(255,255,255,0.05)] rounded-[10px] p-3">
//               <div className="text-[#FFA500] text-xl font-bold">{Object.values(playerData.stats).reduce((a: number, b: any) => a + Number(b), 0)}</div>
//               <div className="text-[#A0AEC0] text-xs">Total Points</div>
//             </div>
//             <div className="bg-[rgba(255,255,255,0.05)] rounded-[10px] p-3">
//               <div className="text-[#32CD32] text-xl font-bold">{playerData.achievements.filter((a: any) => a.unlocked).length}/{playerData.achievements.length}</div>
//               <div className="text-[#A0AEC0] text-xs">Achievements</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="bg-[rgba(23,22,46,0.85)] rounded-[20px] w-full max-w-[500px] border border-[rgba(0,255,255,0.2)] p-[20px] flex flex-col gap-[15px] mt-0 shadow-none">
//         <button 
//           className="w-full p-[15px] border-none rounded-[12px] text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out text-center bg-gradient-to-br from-[#8A2BE2] to-[#FF00FF] text-white shadow-[0_5px_15px_rgba(138,43,226,0.6)] hover:brightness-[1.2] hover:transform hover:translate-y-[-2px]"
//           onClick={() => onProfileAction('edit')}
//         >
//           ⚙️ Customize Profile
//         </button>
//         <button 
//           className="w-full p-[15px] border border-[rgba(0,255,255,0.2)] rounded-[12px] text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out text-center bg-[rgba(255,255,255,0.1)] text-[#E0E0E0] hover:bg-[rgba(255,255,255,0.15)] hover:border-[#00FFFF] hover:transform hover:translate-y-[-2px]"
//           onClick={() => onProfileAction('settings')}
//         >
//           🔧 Game Settings
//         </button>
//         <button 
//           className="w-full p-[15px] border border-[rgba(255,165,0,0.3)] rounded-[12px] text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out text-center bg-[rgba(255,165,0,0.1)] text-[#FFA500] hover:bg-[rgba(255,165,0,0.15)] hover:border-[#FFA500] hover:transform hover:translate-y-[-2px]"
//           onClick={() => onProfileAction('stats')}
//         >
//           📊 Detailed Statistics
//         </button>
//         <button 
//           onClick={handleSignOut}
//           disabled={isSigningOut}
//           className="w-full p-[15px] bg-[rgba(220,38,127,0.2)] hover:bg-[rgba(220,38,127,0.3)] border border-[rgba(220,38,127,0.4)] rounded-[12px] text-[#FF6B9D] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-base font-semibold hover:transform hover:translate-y-[-2px]"
//         >
//           {isSigningOut ? (
//             <>
//               <div className="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin"></div>
//               Signing Out...
//             </>
//           ) : (
//             <>
//               <span>🚪</span>
//               Sign Out
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }

















// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from 'react';

// interface ProfileScreenProps {
//   playerData: any;
//   onProfileAction: (action: string) => void;
//   onAchievementClick: (achievement: any) => void;
//   onSignOut: () => Promise<void>;
// }

// export default function ProfileScreen({ playerData, onProfileAction, onAchievementClick, onSignOut }: ProfileScreenProps) {
//   const [isSigningOut, setIsSigningOut] = useState(false);
//   const xpPercentage = (playerData.xp / playerData.nextLevelXp) * 100;

//   const handleSignOut = async () => {
//     setIsSigningOut(true);
//     try {
//       await onSignOut();
//     } catch (error) {
//       console.error('Error signing out:', error);
//       setIsSigningOut(false);
//     }
//   };

//   const getStatColor = (statName: string) => {
//     const colors = {
//       character: '#FF1493',
//       health: '#32CD32',
//       exploration: '#FFD700',
//       scholarship: '#4169E1',
//       stewardship: '#228B22'
//     };
//     return colors[statName as keyof typeof colors] || '#00FFFF';
//   };

//   const getStatProgress = (value: number) => {
//     if (value >= 80) return 'Master';
//     if (value >= 60) return 'Expert';
//     if (value >= 40) return 'Advanced';
//     if (value >= 20) return 'Intermediate';
//     return 'Novice';
//   };

//   const getAchievementBorderColor = (achievement: any) => {
//     if (achievement.unlocked) return '#32CD32';
//     if (achievement.progress.percentage >= 75) return '#FFD700';
//     if (achievement.progress.percentage >= 50) return '#FFA500';
//     if (achievement.progress.percentage >= 25) return '#FF69B4';
//     return 'rgba(0,255,255,0.2)';
//   };

//   const getAchievementGlowColor = (achievement: any) => {
//     if (achievement.unlocked) return 'rgba(50, 205, 50, 0.5)';
//     if (achievement.progress.percentage >= 75) return 'rgba(255, 215, 0, 0.3)';
//     if (achievement.progress.percentage >= 50) return 'rgba(255, 165, 0, 0.3)';
//     if (achievement.progress.percentage >= 25) return 'rgba(255, 105, 180, 0.3)';
//     return 'rgba(0, 255, 255, 0.1)';
//   };

//   const unlockedAchievements = playerData.achievements.filter((a: any) => a.unlocked).length;
//   const totalAchievements = playerData.achievements.length;

//   return (
//     <div className="pt-[90px] pb-[140px] px-[15px] overflow-y-auto h-full flex flex-col items-center gap-[25px] scrollbar-hide">
//       <div className="bg-[rgba(23,22,46,0.85)] rounded-[20px] p-[25px] w-full max-w-[500px] border border-[rgba(0,255,255,0.2)] shadow-[0_8px_30px_rgba(75,0,130,0.5)] backdrop-blur-[10px]">
//         <div className="flex flex-col items-center text-center mb-[25px] pb-5 border-b border-[rgba(0,255,255,0.2)]">
//           <div className="w-[150px] h-[150px] rounded-full bg-gradient-to-[160deg] from-[#4B0082] to-[#FF00FF] flex items-center justify-center text-[70px] text-white mb-[15px] border-4 border-[#9370DB] shadow-[0_0_25px_rgba(138,43,226,0.6),inset_0_0_15px_rgba(0,0,0,0.3)] relative">
//             <div className="absolute inset-[5px] border-2 border-dashed border-[#00FFFF] opacity-50 rounded-full"></div>
//             {playerData.avatar}
//           </div>
//           <h1 className="font-['Orbitron'] text-[28px] font-bold text-[#E0E0E0] mb-[5px]">
//             {playerData.name}
//           </h1>
//           <p className="text-sm text-[#00FFFF] font-medium mb-[15px]">
//             {playerData.title} | Level {playerData.level}
//           </p>
//           {playerData.email && (
//             <p className="text-xs text-[#A0AEC0] mb-[15px]">
//               {playerData.email}
//             </p>
//           )}
//           <div className="flex items-center gap-[15px]">
//             <div 
//               className="w-[80px] h-[80px] rounded-full relative flex items-center justify-center"
//               style={{
//                 background: `conic-gradient(#FF00FF ${xpPercentage}%, rgba(0,255,255,0.2) 0deg)`
//               }}
//             >
//               <div className="absolute w-[65px] h-[65px] bg-[#17162E] rounded-full"></div>
//               <div className="relative z-[1] font-['Orbitron'] text-xl font-bold text-[#FF00FF]">{playerData.level}</div>
//             </div>
//             <div className="text-left">
//               <div className="text-sm text-[#A0AEC0]">{playerData.xp.toLocaleString()} / {playerData.nextLevelXp.toLocaleString()} XP</div>
//               <div className="text-xs text-[#718096]">To Level {playerData.level + 1}</div>
//             </div>
//           </div>
//         </div>
        
//         <h2 className="font-['Orbitron'] text-xl text-[#9370DB] mb-[15px] text-center pb-[5px] border-b border-[rgba(0,255,255,0.2)] flex items-center justify-center gap-[10px]">
//           📈 Attribute Development
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[15px] mb-[25px]">
//           {Object.entries(playerData.stats).map(([statName, value]) => (
//             <div 
//               key={statName}
//               className="bg-[rgba(23,22,46,0.7)] border border-[rgba(0,255,255,0.2)] rounded-[50px] p-[12px_18px] flex items-center gap-3 transition-all duration-300 ease-in-out hover:border-[#00FFFF] hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] hover:transform hover:translate-y-[-2px]"
//             >
//               <div 
//                 className="text-xl w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
//                 style={{ 
//                   backgroundColor: `${getStatColor(statName)}20`,
//                   color: getStatColor(statName)
//                 }}
//               >
//                 {statName === 'character' && '🎭'}
//                 {statName === 'health' && '💚'}
//                 {statName === 'exploration' && '🧭'}
//                 {statName === 'scholarship' && '🎓'}
//                 {statName === 'stewardship' && '🌳'}
//               </div>
//               <div className="flex-grow min-w-0">
//                 <div className="text-[13px] text-[#A0AEC0] mb-[2px] capitalize">{statName}</div>
//                 <div className="flex items-center gap-2">
//                   <div className="text-base font-semibold text-[#E0E0E0]">{Number(value)}/100</div>
//                   <div 
//                     className="text-[10px] px-2 py-0.5 rounded-[8px] font-medium whitespace-nowrap"
//                     style={{ 
//                       backgroundColor: `${getStatColor(statName)}15`,
//                       color: getStatColor(statName),
//                       border: `1px solid ${getStatColor(statName)}30`
//                     }}
//                   >
//                     {getStatProgress(Number(value))}
//                   </div>
//                 </div>
//                 <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-full h-1.5 mt-1">
//                   <div 
//                     className="h-1.5 rounded-full transition-all duration-500"
//                     style={{ 
//                       width: `${Number(value)}%`,
//                       backgroundColor: getStatColor(statName)
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <h2 className="font-['Orbitron'] text-xl text-[#9370DB] mb-[15px] text-center pb-[5px] border-b border-[rgba(0,255,255,0.2)] flex items-center justify-center gap-[10px]">
//           🏆 Achievement Gallery
//         </h2>
//         <div className="grid grid-cols-[repeat(auto-fill,minmax(70px,1fr))] gap-[15px] mb-[25px]">
//           {playerData.achievements.map((achievement: any) => (
//             <div 
//               key={achievement.id} 
//               className={`bg-[rgba(23,22,46,0.7)] border-2 rounded-[15px] p-[10px] flex flex-col items-center justify-center aspect-square transition-all duration-300 ease-in-out hover:transform hover:scale-110 cursor-pointer relative overflow-hidden`}
//               style={{
//                 borderColor: getAchievementBorderColor(achievement),
//                 boxShadow: `0 0 15px ${getAchievementGlowColor(achievement)}`
//               }}
//               onClick={() => onAchievementClick(achievement)}
//               title={achievement.unlocked ? `Achievement Unlocked: ${achievement.name}` : `${achievement.name} - ${Math.round(achievement.progress.percentage)}% Complete`}
//             >
//               {/* Progress indicator for locked achievements */}
//               {!achievement.unlocked && achievement.progress.percentage > 0 && (
//                 <div 
//                   className="absolute bottom-0 left-0 right-0 h-[3px] transition-all duration-500"
//                   style={{ 
//                     backgroundColor: getAchievementBorderColor(achievement),
//                     width: `${achievement.progress.percentage}%`
//                   }}
//                 />
//               )}
              
//               {/* Sparkle effect for unlocked achievements */}
//               {achievement.unlocked && (
//                 <div className="absolute inset-0 pointer-events-none">
//                   <div className="absolute top-1 right-1 text-[10px] animate-pulse">✨</div>
//                   <div className="absolute bottom-1 left-1 text-[8px] animate-ping" style={{ animationDelay: '0.5s' }}>⭐</div>
//                 </div>
//               )}
              
//               <div className={`text-[32px] mb-[5px] transition-all duration-300 ${
//                 achievement.unlocked 
//                   ? 'opacity-100 filter-none' 
//                   : 'opacity-60 grayscale'
//               }`}
//                 style={{ color: achievement.unlocked ? getAchievementBorderColor(achievement) : '#A0AEC0' }}
//               >
//                 {achievement.icon}
//               </div>
//               <div className={`text-[10px] text-center transition-all duration-300 ${
//                 achievement.unlocked ? 'text-[#A0AEC0]' : 'text-[#718096]'
//               }`}>
//                 {achievement.name}
//               </div>
              
//               {/* Progress percentage for locked achievements */}
//               {!achievement.unlocked && achievement.progress.percentage > 0 && (
//                 <div className="text-[8px] font-bold mt-1" style={{ color: getAchievementBorderColor(achievement) }}>
//                   {Math.round(achievement.progress.percentage)}%
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Progress Overview */}
//         <div className="bg-[rgba(0,0,0,0.2)] rounded-[15px] p-[15px] mb-[25px]">
//           <h3 className="font-['Orbitron'] text-lg text-[#9370DB] mb-3 text-center">Development Overview</h3>
//           <div className="grid grid-cols-2 gap-3 text-center">
//             <div className="bg-[rgba(255,255,255,0.05)] rounded-[10px] p-3">
//               <div className="text-[#FFA500] text-xl font-bold">{Object.values(playerData.stats).reduce((a: number, b: any) => a + Number(b), 0)}</div>
//               <div className="text-[#A0AEC0] text-xs">Total Points</div>
//             </div>
//             <div className="bg-[rgba(255,255,255,0.05)] rounded-[10px] p-3">
//               <div className="text-[#32CD32] text-xl font-bold">{unlockedAchievements}/{totalAchievements}</div>
//               <div className="text-[#A0AEC0] text-xs">Achievements</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="bg-[rgba(23,22,46,0.85)] rounded-[20px] w-full max-w-[500px] border border-[rgba(0,255,255,0.2)] p-[20px] flex flex-col gap-[15px] mt-0 shadow-none">
//         <button 
//           className="w-full p-[15px] border-none rounded-[12px] text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out text-center bg-gradient-to-br from-[#8A2BE2] to-[#FF00FF] text-white shadow-[0_5px_15px_rgba(138,43,226,0.6)] hover:brightness-[1.2] hover:transform hover:translate-y-[-2px]"
//           onClick={() => onProfileAction('edit')}
//         >
//           ⚙️ Customize Profile
//         </button>
//         <button 
//           className="w-full p-[15px] border border-[rgba(0,255,255,0.2)] rounded-[12px] text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out text-center bg-[rgba(255,255,255,0.1)] text-[#E0E0E0] hover:bg-[rgba(255,255,255,0.15)] hover:border-[#00FFFF] hover:transform hover:translate-y-[-2px]"
//           onClick={() => onProfileAction('settings')}
//         >
//           🔧 Game Settings
//         </button>
//         <button 
//           className="w-full p-[15px] border border-[rgba(255,165,0,0.3)] rounded-[12px] text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out text-center bg-[rgba(255,165,0,0.1)] text-[#FFA500] hover:bg-[rgba(255,165,0,0.15)] hover:border-[#FFA500] hover:transform hover:translate-y-[-2px]"
//           onClick={() => onProfileAction('stats')}
//         >
//           📊 Detailed Statistics
//         </button>
//         <button 
//           onClick={handleSignOut}
//           disabled={isSigningOut}
//           className="w-full p-[15px] bg-[rgba(220,38,127,0.2)] hover:bg-[rgba(220,38,127,0.3)] border border-[rgba(220,38,127,0.4)] rounded-[12px] text-[#FF6B9D] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-base font-semibold hover:transform hover:translate-y-[-2px]"
//         >
//           {isSigningOut ? (
//             <>
//               <div className="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin"></div>
//               Signing Out...
//             </>
//           ) : (
//             <>
//               <span>🚪</span>
//               Sign Out
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

interface ProfileScreenProps {
  playerData: any;
  onProfileAction: (action: string) => void;
  onAchievementClick: (achievement: any) => void;
  onSignOut: () => Promise<void>;
}

export default function ProfileScreen({ playerData, onProfileAction, onAchievementClick, onSignOut }: ProfileScreenProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const xpPercentage = (playerData.xp / playerData.nextLevelXp) * 100;

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await onSignOut();
    } catch (error) {
      console.error('Error signing out:', error);
      setIsSigningOut(false);
    }
  };

  const getStatColor = (statName: string) => {
    const colors = {
      character: '#FF1493',
      health: '#32CD32',
      exploration: '#FFD700',
      scholarship: '#4169E1',
      stewardship: '#228B22'
    };
    return colors[statName as keyof typeof colors] || '#00FFFF';
  };

  const getStatProgress = (value: number) => {
    if (value >= 80) return 'Master';
    if (value >= 60) return 'Expert';
    if (value >= 40) return 'Advanced';
    if (value >= 20) return 'Intermediate';
    return 'Novice';
  };

  const unlockedAchievements = playerData.achievements.filter((a: any) => a.unlocked).length;
  const totalAchievements = playerData.achievements.length;

  return (
    <div className="pt-[90px] pb-[140px] px-[15px] overflow-y-auto h-full flex flex-col items-center gap-[25px] scrollbar-hide">
      <div className="bg-[rgba(23,22,46,0.85)] rounded-[20px] p-[25px] w-full max-w-[500px] border border-[rgba(0,255,255,0.2)] shadow-[0_8px_30px_rgba(75,0,130,0.5)] backdrop-blur-[10px]">
        <div className="flex flex-col items-center text-center mb-[25px] pb-5 border-b border-[rgba(0,255,255,0.2)]">
          <div className="w-[150px] h-[150px] rounded-full bg-gradient-to-[160deg] from-[#4B0082] to-[#FF00FF] flex items-center justify-center text-[70px] text-white mb-[15px] border-4 border-[#9370DB] shadow-[0_0_25px_rgba(138,43,226,0.6),inset_0_0_15px_rgba(0,0,0,0.3)] relative">
            <div className="absolute inset-[5px] border-2 border-dashed border-[#00FFFF] opacity-50 rounded-full"></div>
            {playerData.avatar}
          </div>
          <h1 className="font-['Orbitron'] text-[28px] font-bold text-[#E0E0E0] mb-[5px]">
            {playerData.name}
          </h1>
          <p className="text-sm text-[#00FFFF] font-medium mb-[15px]">
            {playerData.title} | Level {playerData.level}
          </p>
          {playerData.email && (
            <p className="text-xs text-[#A0AEC0] mb-[15px]">
              {playerData.email}
            </p>
          )}
          <div className="flex items-center gap-[15px]">
            <div 
              className="w-[80px] h-[80px] rounded-full relative flex items-center justify-center"
              style={{
                background: `conic-gradient(#FF00FF ${xpPercentage}%, rgba(0,255,255,0.2) 0deg)`
              }}
            >
              <div className="absolute w-[65px] h-[65px] bg-[#17162E] rounded-full"></div>
              <div className="relative z-[1] font-['Orbitron'] text-xl font-bold text-[#FF00FF]">{playerData.level}</div>
            </div>
            <div className="text-left">
              <div className="text-sm text-[#A0AEC0]">{playerData.xp.toLocaleString()} / {playerData.nextLevelXp.toLocaleString()} XP</div>
              <div className="text-xs text-[#718096]">To Level {playerData.level + 1}</div>
            </div>
          </div>
        </div>
        
        <h2 className="font-['Orbitron'] text-xl text-[#9370DB] mb-[15px] text-center pb-[5px] border-b border-[rgba(0,255,255,0.2)] flex items-center justify-center gap-[10px]">
          📈 Attribute Development
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[15px] mb-[25px]">
          {Object.entries(playerData.stats).map(([statName, value]) => (
            <div 
              key={statName}
              className="bg-[rgba(23,22,46,0.7)] border border-[rgba(0,255,255,0.2)] rounded-[50px] p-[12px_18px] flex items-center gap-3 transition-all duration-300 ease-in-out hover:border-[#00FFFF] hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] hover:transform hover:translate-y-[-2px]"
            >
              <div 
                className="text-xl w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ 
                  backgroundColor: `${getStatColor(statName)}20`,
                  color: getStatColor(statName)
                }}
              >
                {statName === 'character' && '🎭'}
                {statName === 'health' && '💚'}
                {statName === 'exploration' && '🧭'}
                {statName === 'scholarship' && '🎓'}
                {statName === 'stewardship' && '🌳'}
              </div>
              <div className="flex-grow min-w-0">
                <div className="text-[13px] text-[#A0AEC0] mb-[2px] capitalize">{statName}</div>
                <div className="flex items-center gap-2">
                  <div className="text-base font-semibold text-[#E0E0E0]">{Number(value)}/100</div>
                  <div 
                    className="text-[10px] px-2 py-0.5 rounded-[8px] font-medium whitespace-nowrap"
                    style={{ 
                      backgroundColor: `${getStatColor(statName)}15`,
                      color: getStatColor(statName),
                      border: `1px solid ${getStatColor(statName)}30`
                    }}
                  >
                    {getStatProgress(Number(value))}
                  </div>
                </div>
                <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-full h-1.5 mt-1">
                  <div 
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Number(value)}%`,
                      backgroundColor: getStatColor(statName)
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-['Orbitron'] text-xl text-[#9370DB] mb-[15px] text-center pb-[5px] border-b border-[rgba(0,255,255,0.2)] flex items-center justify-center gap-[10px]">
          🏆 Achievement Gallery
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(70px,1fr))] gap-[15px] mb-[25px]">
          {playerData.achievements.map((achievement: any) => (
            <div 
              key={achievement.id} 
              className={`bg-[rgba(23,22,46,0.7)] border rounded-[15px] p-[10px] flex flex-col items-center justify-center aspect-square transition-all duration-300 ease-in-out hover:transform hover:scale-110 hover:border-[#00FFFF] cursor-pointer ${
                achievement.unlocked 
                  ? 'border-[#FF00FF] shadow-[0_0_10px_rgba(255,0,255,0.5)]' 
                  : 'border-[rgba(0,255,255,0.2)]'
              }`}
              onClick={() => onAchievementClick(achievement)}
              title={achievement.unlocked ? `Achievement Unlocked: ${achievement.name}` : `Locked: ${achievement.name}`}
            >
              <div className={`text-[32px] mb-[5px] transition-all duration-300 ${
                achievement.unlocked 
                  ? 'opacity-100 filter-none text-[#FF00FF]' 
                  : 'opacity-50 grayscale'
              }`}>
                {achievement.icon}
              </div>
              <div className={`text-[10px] text-center transition-all duration-300 ${
                achievement.unlocked ? 'text-[#A0AEC0]' : 'text-[#718096]'
              }`}>
                {achievement.name}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Overview */}
        <div className="bg-[rgba(0,0,0,0.2)] rounded-[15px] p-[15px] mb-[25px]">
          <h3 className="font-['Orbitron'] text-lg text-[#9370DB] mb-3 text-center">Development Overview</h3>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-[rgba(255,255,255,0.05)] rounded-[10px] p-3">
              <div className="text-[#FFA500] text-xl font-bold">{Object.values(playerData.stats).reduce((a: number, b: any) => a + Number(b), 0)}</div>
              <div className="text-[#A0AEC0] text-xs">Total Points</div>
            </div>
            <div className="bg-[rgba(255,255,255,0.05)] rounded-[10px] p-3">
              <div className="text-[#32CD32] text-xl font-bold">{unlockedAchievements}/{totalAchievements}</div>
              <div className="text-[#A0AEC0] text-xs">Achievements</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-[rgba(23,22,46,0.85)] rounded-[20px] w-full max-w-[500px] border border-[rgba(0,255,255,0.2)] p-[20px] flex flex-col gap-[15px] mt-0 shadow-none">
        <button 
          className="w-full p-[15px] border-none rounded-[12px] text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out text-center bg-gradient-to-br from-[#8A2BE2] to-[#FF00FF] text-white shadow-[0_5px_15px_rgba(138,43,226,0.6)] hover:brightness-[1.2] hover:transform hover:translate-y-[-2px]"
          onClick={() => onProfileAction('edit')}
        >
          ⚙️ Customize Profile
        </button>
        <button 
          className="w-full p-[15px] border border-[rgba(0,255,255,0.2)] rounded-[12px] text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out text-center bg-[rgba(255,255,255,0.1)] text-[#E0E0E0] hover:bg-[rgba(255,255,255,0.15)] hover:border-[#00FFFF] hover:transform hover:translate-y-[-2px]"
          onClick={() => onProfileAction('settings')}
        >
          🔧 Game Settings
        </button>
        <button 
          className="w-full p-[15px] border border-[rgba(255,165,0,0.3)] rounded-[12px] text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out text-center bg-[rgba(255,165,0,0.1)] text-[#FFA500] hover:bg-[rgba(255,165,0,0.15)] hover:border-[#FFA500] hover:transform hover:translate-y-[-2px]"
          onClick={() => onProfileAction('stats')}
        >
          📊 Detailed Statistics
        </button>
        <button 
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="w-full p-[15px] bg-[rgba(220,38,127,0.2)] hover:bg-[rgba(220,38,127,0.3)] border border-[rgba(220,38,127,0.4)] rounded-[12px] text-[#FF6B9D] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-base font-semibold hover:transform hover:translate-y-[-2px]"
        >
          {isSigningOut ? (
            <>
              <div className="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin"></div>
              Signing Out...
            </>
          ) : (
            <>
              <span>🚪</span>
              Sign Out
            </>
          )}
        </button>
      </div>
    </div>
  );
}