// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useState } from 'react';

// interface AchievementUnlockModalProps {
//   visible: boolean;
//   onClose: () => void;
//   achievement: any | null;
// }

// export default function AchievementUnlockModal({ visible, onClose, achievement }: AchievementUnlockModalProps) {
//   const [stage, setStage] = useState(0); // 0: hidden, 1: crate animation, 2: reveal, 3: celebration
//   const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; rotation: number }>>([]);

//   useEffect(() => {
//     if (visible && achievement) {
//       // Generate particles for celebration
//       const newParticles = Array.from({ length: 20 }, (_, i) => ({
//         id: i,
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         rotation: Math.random() * 360
//       }));
//       setParticles(newParticles);

//       // Animation sequence
//       setStage(1);
      
//       const timer1 = setTimeout(() => setStage(2), 800);
//       const timer2 = setTimeout(() => setStage(3), 1200);
//       const timer3 = setTimeout(() => {
//         onClose();
//         setStage(0);
//       }, 4000);

//       return () => {
//         clearTimeout(timer1);
//         clearTimeout(timer2);
//         clearTimeout(timer3);
//       };
//     }
//   }, [visible, achievement, onClose]);

//   if (!visible || !achievement) return null;

//   return (
//     <div className="fixed inset-0 z-[10000] flex items-center justify-center">
//       {/* Backdrop */}
//       <div className="absolute inset-0 bg-black/80 backdrop-blur-[3px]" />
      
//       {/* Particles */}
//       {stage === 3 && (
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {particles.map((particle) => (
//             <div
//               key={particle.id}
//               className="absolute w-4 h-4 animate-bounce"
//               style={{
//                 left: `${particle.x}%`,
//                 top: `${particle.y}%`,
//                 animationDelay: `${Math.random() * 2}s`,
//                 animationDuration: `${2 + Math.random() * 2}s`
//               }}
//             >
//               <div
//                 className="w-full h-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full opacity-80"
//                 style={{
//                   transform: `rotate(${particle.rotation}deg)`,
//                   animation: `spin ${1 + Math.random() * 2}s linear infinite`
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Main Modal */}
//       <div className="relative">
//         {/* Stage 1: Crate Animation */}
//         {stage >= 1 && (
//           <div 
//             className={`relative transition-all duration-800 ${
//               stage === 1 ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
//             }`}
//           >
//             {/* Treasure Crate */}
//             <div 
//               className={`w-[200px] h-[150px] bg-gradient-to-br from-[#8B4513] to-[#654321] rounded-[20px] border-4 border-[#FFD700] relative mx-auto transform transition-all duration-800 ${
//                 stage === 1 ? 'animate-pulse scale-100' : 'scale-0'
//               }`}
//               style={{
//                 boxShadow: '0 0 30px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(0, 0, 0, 0.3)'
//               }}
//             >
//               {/* Crate Details */}
//               <div className="absolute inset-[10px] border-2 border-dashed border-[#DAA520] rounded-[10px]" />
//               <div className="absolute top-[20px] left-1/2 transform -translate-x-1/2 w-[80px] h-[20px] bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-[10px]" />
//               <div className="absolute bottom-[20px] left-1/2 transform -translate-x-1/2 w-[120px] h-[15px] bg-gradient-to-r from-[#B8860B] to-[#DAA520] rounded-[5px]" />
              
//               {/* Glowing effect */}
//               <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,215,0,0.3)] to-transparent rounded-[20px] animate-pulse" />
//             </div>
//           </div>
//         )}

//         {/* Stage 2: Revelation */}
//         {stage >= 2 && (
//           <div 
//             className={`absolute inset-0 flex items-center justify-center transform transition-all duration-1000 ${
//               stage >= 2 ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-180'
//             }`}
//           >
//             <div className="bg-gradient-to-br from-[rgba(23,22,46,0.95)] to-[rgba(75,0,130,0.95)] border-4 border-[#32CD32] rounded-[30px] p-[40px] text-center relative overflow-hidden"
//                  style={{
//                    boxShadow: '0 0 50px rgba(50, 205, 50, 0.8), 0 20px 60px rgba(0,0,0,0.8)',
//                    minWidth: '350px'
//                  }}>
              
//               {/* Animated Background */}
//               <div className="absolute inset-0 bg-gradient-to-r from-[rgba(50,205,50,0.1)] via-[rgba(255,215,0,0.1)] to-[rgba(50,205,50,0.1)] animate-pulse" />
              
//               {/* Header */}
//               <div className="relative z-10">
//                 <h1 className="font-['Orbitron'] text-[28px] font-bold text-[#32CD32] mb-[10px] animate-bounce">
//                   🏆 ACHIEVEMENT UNLOCKED! 🏆
//                 </h1>
                
//                 {/* Achievement Icon */}
//                 <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#32CD32] to-[#228B22] border-4 border-[#FFD700] mx-auto mb-[20px] flex items-center justify-center text-[60px] relative"
//                      style={{
//                        boxShadow: '0 0 40px rgba(50, 205, 50, 0.8), inset 0 0 20px rgba(255, 215, 0, 0.3)'
//                      }}>
//                   <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgba(255,215,0,0.4)] to-transparent animate-spin" style={{ animationDuration: '3s' }} />
//                   <span className="relative z-10 animate-pulse">{achievement.icon}</span>
//                 </div>

//                 {/* Achievement Details */}
//                 <h2 className="font-['Orbitron'] text-[22px] font-bold text-[#FFD700] mb-[10px]">
//                   {achievement.name}
//                 </h2>
                
//                 <p className="text-[#E0E0E0] text-[14px] mb-[20px] leading-relaxed">
//                   {achievement.description}
//                 </p>

//                 {/* Rewards */}
//                 <div className="flex justify-center gap-[15px] mb-[20px]">
//                   {achievement.rewards?.xp > 0 && (
//                     <div className="bg-[rgba(255,0,255,0.2)] border-2 border-[#FF00FF] rounded-[15px] px-[15px] py-[8px] flex items-center gap-[5px]">
//                       <span className="text-[20px]">⚡</span>
//                       <span className="text-[#FF00FF] text-[16px] font-bold">+{achievement.rewards.xp} XP</span>
//                     </div>
//                   )}
//                   {achievement.rewards?.coins > 0 && (
//                     <div className="bg-[rgba(255,215,0,0.2)] border-2 border-[#FFD700] rounded-[15px] px-[15px] py-[8px] flex items-center gap-[5px]">
//                       <span className="text-[20px]">🪙</span>
//                       <span className="text-[#FFD700] text-[16px] font-bold">+{achievement.rewards.coins} Coins</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Continue Button */}
//                 <button
//                   onClick={onClose}
//                   className="bg-gradient-to-r from-[#32CD32] to-[#228B22] hover:from-[#228B22] hover:to-[#32CD32] text-white px-[30px] py-[12px] rounded-[20px] font-bold text-[16px] transition-all duration-300 border-2 border-[#FFD700] hover:scale-105"
//                   style={{
//                     boxShadow: '0 5px 15px rgba(50, 205, 50, 0.5)'
//                   }}
//                 >
//                   Awesome! 🎉
//                 </button>
//               </div>

//               {/* Decoration Elements */}
//               <div className="absolute top-[10px] left-[10px] w-[30px] h-[30px] bg-[#FFD700] rounded-full animate-ping opacity-75" />
//               <div className="absolute top-[20px] right-[20px] w-[25px] h-[25px] bg-[#32CD32] rounded-full animate-bounce opacity-75" />
//               <div className="absolute bottom-[15px] left-[20px] w-[20px] h-[20px] bg-[#FF00FF] rounded-full animate-pulse opacity-75" />
//               <div className="absolute bottom-[10px] right-[15px] w-[35px] h-[35px] bg-[#00FFFF] rounded-full animate-ping opacity-75" style={{ animationDelay: '0.5s' }} />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Background Sparkles */}
//       {stage === 3 && (
//         <div className="absolute inset-0 pointer-events-none">
//           {[...Array(15)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute text-[20px] animate-ping"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 2}s`,
//                 animationDuration: `${1 + Math.random()}s`
//               }}
//             >
//               ✨
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';

interface AchievementUnlockModalProps {
  visible: boolean;
  onClose: () => void;
  achievement: any | null;
}

export default function AchievementUnlockModal({ visible, onClose, achievement }: AchievementUnlockModalProps) {
  useEffect(() => {
    if (visible && achievement) {
      // Auto close after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible, achievement, onClose]);

  if (!visible || !achievement) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-[3px]" />
      
      {/* Modal */}
      <div className="relative bg-[rgba(23,22,46,0.95)] border-2 border-[#32CD32] rounded-[20px] p-[30px] text-center shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-[10px] max-w-[350px] mx-4">
        
        {/* Header */}
        <h1 className="font-['Orbitron'] text-[22px] font-bold text-[#32CD32] mb-[15px]">
          🏆 Achievement Unlocked!
        </h1>
        
        {/* Achievement Icon */}
        <div className="w-[100px] h-[100px] rounded-full bg-[rgba(50,205,50,0.2)] border-2 border-[#32CD32] mx-auto mb-[15px] flex items-center justify-center text-[50px]">
          <span className="text-[#32CD32]">{achievement.icon}</span>
        </div>

        {/* Achievement Details */}
        <h2 className="font-['Orbitron'] text-[18px] font-bold text-[#E0E0E0] mb-[8px]">
          {achievement.name}
        </h2>
        
        <p className="text-[#A0AEC0] text-[13px] mb-[20px] leading-relaxed">
          {achievement.description}
        </p>

        {/* Rewards */}
        {(achievement.rewards?.xp > 0 || achievement.rewards?.coins > 0) && (
          <div className="flex justify-center gap-[10px] mb-[20px]">
            {achievement.rewards?.xp > 0 && (
              <div className="bg-[rgba(255,0,255,0.2)] border border-[#FF00FF] rounded-[10px] px-[12px] py-[6px] flex items-center gap-[4px]">
                <span className="text-[16px]">⚡</span>
                <span className="text-[#FF00FF] text-[14px] font-bold">+{achievement.rewards.xp} XP</span>
              </div>
            )}
            {achievement.rewards?.coins > 0 && (
              <div className="bg-[rgba(255,215,0,0.2)] border border-[#FFD700] rounded-[10px] px-[12px] py-[6px] flex items-center gap-[4px]">
                <span className="text-[16px]">🪙</span>
                <span className="text-[#FFD700] text-[14px] font-bold">+{achievement.rewards.coins} Coins</span>
              </div>
            )}
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={onClose}
          className="bg-[#32CD32] hover:bg-[#228B22] text-white px-[20px] py-[8px] rounded-[12px] font-bold text-[14px] transition-all duration-300 border border-[#32CD32]"
        >
          Awesome! 🎉
        </button>

        {/* Auto-close indicator */}
        <p className="text-[#718096] text-[11px] mt-[10px]">
          Auto-closing in 3 seconds...
        </p>
      </div>
    </div>
  );
}