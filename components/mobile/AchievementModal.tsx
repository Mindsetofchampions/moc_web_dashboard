// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';

// interface AchievementModalProps {
//   visible: boolean;
//   onClose: () => void;
//   achievement: any | null;
// }

// export default function AchievementModal({ visible, onClose, achievement }: AchievementModalProps) {
//   if (!visible || !achievement) return null;

//   const getProgressColor = () => {
//     if (achievement.unlocked) return '#32CD32';
//     if (achievement.progress.percentage >= 75) return '#FFD700';
//     if (achievement.progress.percentage >= 50) return '#FFA500';
//     if (achievement.progress.percentage >= 25) return '#FF69B4';
//     return '#A0AEC0';
//   };

//   const getRequirementText = () => {
//     switch (achievement.progress.type) {
//       case 'xp':
//         return `Earn ${achievement.progress.required.toLocaleString()} XP`;
//       case 'level':
//         return `Reach Level ${achievement.progress.required}`;
//       case 'attribute':
//         return `Get ${achievement.progress.required} ${achievement.progress.attributeName} points`;
//       case 'quests':
//         return `Complete ${achievement.progress.required} specific quests`;
//       default:
//         return 'Unknown requirement';
//     }
//   };

//   const getProgressText = () => {
//     if (achievement.unlocked) {
//       return `✅ Unlocked on ${new Date(achievement.unlockedAt).toLocaleDateString()}`;
//     }
    
//     const remaining = achievement.progress.required - achievement.progress.current;
//     switch (achievement.progress.type) {
//       case 'xp':
//         return `${remaining.toLocaleString()} XP remaining`;
//       case 'level':
//         return `${remaining} levels remaining`;
//       case 'attribute':
//         return `${remaining} ${achievement.progress.attributeName} points remaining`;
//       case 'quests':
//         return `${remaining} quests remaining`;
//       default:
//         return '';
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center">
//       {/* Backdrop */}
//       <div 
//         className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
//         onClick={onClose}
//       />
      
//       {/* Modal */}
//       <div 
//         className={`relative w-[90vw] max-w-[420px] bg-gradient-to-br from-[rgba(23,22,46,0.95)] to-[rgba(75,0,130,0.95)] border-2 rounded-[25px] p-[30px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-[15px] transform transition-all duration-500 ${
//           visible ? 'scale-100 opacity-100 rotate-0' : 'scale-75 opacity-0 rotate-12'
//         }`}
//         style={{
//           borderColor: achievement.unlocked ? '#32CD32' : '#00FFFF',
//           boxShadow: achievement.unlocked 
//             ? '0 0 40px rgba(50, 205, 50, 0.4), 0 20px 60px rgba(0,0,0,0.8)' 
//             : '0 0 40px rgba(0, 255, 255, 0.4), 0 20px 60px rgba(0,0,0,0.8)'
//         }}
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-[15px] right-[15px] w-[35px] h-[35px] bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.2)] rounded-full flex items-center justify-center text-[#E0E0E0] hover:text-white transition-all duration-300 text-lg"
//         >
//           ✕
//         </button>

//         {/* Achievement Icon */}
//         <div 
//           className={`w-[100px] h-[100px] rounded-full mx-auto mb-[20px] flex items-center justify-center text-[50px] border-4 transition-all duration-300 ${
//             achievement.unlocked 
//               ? 'bg-gradient-to-br from-[#32CD32] to-[#228B22] border-[#32CD32] shadow-[0_0_30px_rgba(50,205,50,0.6)]' 
//               : 'bg-gradient-to-br from-[rgba(0,255,255,0.2)] to-[rgba(138,43,226,0.2)] border-[#00FFFF] shadow-[0_0_20px_rgba(0,255,255,0.3)]'
//           }`}
//         >
//           {achievement.unlocked && (
//             <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[rgba(255,215,0,0.3)] to-[rgba(255,165,0,0.3)] animate-pulse" />
//           )}
//           <span className={achievement.unlocked ? 'relative z-10' : 'grayscale opacity-70'}>
//             {achievement.icon}
//           </span>
//         </div>

//         {/* Achievement Title */}
//         <h2 className="font-['Orbitron'] text-[24px] font-bold text-center mb-[10px]" style={{ color: getProgressColor() }}>
//           {achievement.name}
//         </h2>

//         {/* Achievement Description */}
//         <p className="text-[#E0E0E0] text-center mb-[25px] leading-relaxed">
//           {achievement.description}
//         </p>

//         {/* Requirements Section */}
//         <div className="mb-[25px]">
//           <h3 className="font-['Orbitron'] text-[16px] font-bold text-[#9370DB] mb-[10px] flex items-center gap-[8px]">
//             🎯 Requirements
//           </h3>
//           <div className="bg-[rgba(0,0,0,0.3)] rounded-[12px] p-[15px]">
//             <p className="text-[#A0AEC0] text-[14px] mb-[10px]">
//               {getRequirementText()}
//             </p>
            
//             {/* Progress Bar */}
//             <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-full h-[8px] mb-[8px] overflow-hidden">
//               <div 
//                 className="h-full rounded-full transition-all duration-1000 ease-out"
//                 style={{ 
//                   width: `${achievement.progress.percentage}%`,
//                   backgroundColor: getProgressColor(),
//                   boxShadow: `0 0 10px ${getProgressColor()}40`
//                 }}
//               />
//             </div>
            
//             <div className="flex justify-between items-center text-[12px]">
//               <span className="text-[#E0E0E0]">
//                 {achievement.progress.current.toLocaleString()} / {achievement.progress.required.toLocaleString()}
//               </span>
//               <span className="font-bold" style={{ color: getProgressColor() }}>
//                 {Math.round(achievement.progress.percentage)}%
//               </span>
//             </div>
            
//             <p className="text-[13px] mt-[8px]" style={{ color: getProgressColor() }}>
//               {getProgressText()}
//             </p>
//           </div>
//         </div>

//         {/* Rewards Section */}
//         <div className="mb-[20px]">
//           <h3 className="font-['Orbitron'] text-[16px] font-bold text-[#9370DB] mb-[10px] flex items-center gap-[8px]">
//             🎁 Rewards
//           </h3>
//           <div className="flex gap-[10px]">
//             {achievement.rewards.xp > 0 && (
//               <div className="bg-[rgba(255,0,255,0.1)] border border-[rgba(255,0,255,0.3)] rounded-[10px] px-[12px] py-[8px] flex items-center gap-[5px]">
//                 <span className="text-[16px]">⚡</span>
//                 <span className="text-[#FF00FF] text-[14px] font-bold">+{achievement.rewards.xp} XP</span>
//               </div>
//             )}
//             {achievement.rewards.coins > 0 && (
//               <div className="bg-[rgba(255,215,0,0.1)] border border-[rgba(255,215,0,0.3)] rounded-[10px] px-[12px] py-[8px] flex items-center gap-[5px]">
//                 <span className="text-[16px]">🪙</span>
//                 <span className="text-[#FFD700] text-[14px] font-bold">+{achievement.rewards.coins} Coins</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Status Badge */}
//         <div className="text-center">
//           <div 
//             className={`inline-flex items-center gap-[8px] px-[20px] py-[10px] rounded-full font-bold text-[14px] border-2 transition-all duration-300 ${
//               achievement.unlocked
//                 ? 'bg-[rgba(50,205,50,0.2)] border-[#32CD32] text-[#32CD32]'
//                 : 'bg-[rgba(0,255,255,0.1)] border-[#00FFFF] text-[#00FFFF]'
//             }`}
//           >
//             {achievement.unlocked ? (
//               <>
//                 <span className="text-[16px]">🏆</span>
//                 <span>UNLOCKED</span>
//               </>
//             ) : (
//               <>
//                 <span className="text-[16px]">🔒</span>
//                 <span>LOCKED</span>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface AchievementModalProps {
  visible: boolean;
  onClose: () => void;
  achievement: any | null;
}

export default function AchievementModal({ visible, onClose, achievement }: AchievementModalProps) {
  if (!visible || !achievement) return null;

  const getProgressColor = () => {
    if (achievement.unlocked) return '#32CD32';
    if (achievement.progress.percentage >= 75) return '#FFD700';
    if (achievement.progress.percentage >= 50) return '#FFA500';
    return '#00FFFF';
  };

  const getRequirementText = () => {
    switch (achievement.progress.type) {
      case 'xp':
        return `Earn ${achievement.progress.required.toLocaleString()} XP`;
      case 'level':
        return `Reach Level ${achievement.progress.required}`;
      case 'attribute':
        return `Get ${achievement.progress.required} ${achievement.progress.attributeName} points`;
      case 'quests':
        return `Complete ${achievement.progress.required} specific quests`;
      default:
        return 'Unknown requirement';
    }
  };

  const getProgressText = () => {
    if (achievement.unlocked) {
      return `✅ Unlocked on ${new Date(achievement.unlockedAt).toLocaleDateString()}`;
    }
    
    const remaining = achievement.progress.required - achievement.progress.current;
    switch (achievement.progress.type) {
      case 'xp':
        return `${remaining.toLocaleString()} XP remaining`;
      case 'level':
        return `${remaining} levels remaining`;
      case 'attribute':
        return `${remaining} ${achievement.progress.attributeName} points remaining`;
      case 'quests':
        return `${remaining} quests remaining`;
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-[90vw] max-w-[400px] bg-[rgba(23,22,46,0.95)] border border-[rgba(0,255,255,0.3)] rounded-[20px] p-[25px] shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-[10px]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[15px] right-[15px] w-[30px] h-[30px] bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.2)] rounded-full flex items-center justify-center text-[#E0E0E0] hover:text-white transition-all duration-300 text-sm"
        >
          ✕
        </button>

        {/* Achievement Icon */}
        <div className="text-center mb-[20px]">
          <div 
            className={`w-[80px] h-[80px] rounded-full mx-auto mb-[15px] flex items-center justify-center text-[40px] border-2 ${
              achievement.unlocked 
                ? 'bg-[rgba(50,205,50,0.2)] border-[#32CD32] text-[#32CD32]' 
                : 'bg-[rgba(0,255,255,0.1)] border-[#00FFFF] text-[#A0AEC0]'
            }`}
          >
            <span className={achievement.unlocked ? '' : 'grayscale opacity-70'}>
              {achievement.icon}
            </span>
          </div>

          {/* Achievement Title */}
          <h2 className="font-['Orbitron'] text-[20px] font-bold text-[#E0E0E0] mb-[8px]">
            {achievement.name}
          </h2>

          {/* Status Badge */}
          <div 
            className={`inline-flex items-center gap-[6px] px-[12px] py-[6px] rounded-full text-[12px] font-bold border ${
              achievement.unlocked
                ? 'bg-[rgba(50,205,50,0.2)] border-[#32CD32] text-[#32CD32]'
                : 'bg-[rgba(0,255,255,0.1)] border-[#00FFFF] text-[#00FFFF]'
            }`}
          >
            <span className="text-[14px]">{achievement.unlocked ? '🏆' : '🔒'}</span>
            <span>{achievement.unlocked ? 'UNLOCKED' : 'LOCKED'}</span>
          </div>
        </div>

        {/* Achievement Description */}
        <p className="text-[#A0AEC0] text-center mb-[20px] text-[14px] leading-relaxed">
          {achievement.description}
        </p>

        {/* Requirements Section */}
        <div className="mb-[20px]">
          <h3 className="font-['Orbitron'] text-[14px] font-bold text-[#9370DB] mb-[10px]">
            🎯 Requirements
          </h3>
          <div className="bg-[rgba(0,0,0,0.3)] rounded-[10px] p-[12px]">
            <p className="text-[#A0AEC0] text-[13px] mb-[8px]">
              {getRequirementText()}
            </p>
            
            {/* Progress Bar */}
            <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-full h-[6px] mb-[8px]">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${achievement.progress.percentage}%`,
                  backgroundColor: getProgressColor()
                }}
              />
            </div>
            
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#E0E0E0]">
                {achievement.progress.current.toLocaleString()} / {achievement.progress.required.toLocaleString()}
              </span>
              <span className="font-bold" style={{ color: getProgressColor() }}>
                {Math.round(achievement.progress.percentage)}%
              </span>
            </div>
            
            <p className="text-[12px] mt-[6px]" style={{ color: getProgressColor() }}>
              {getProgressText()}
            </p>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="mb-[15px]">
          <h3 className="font-['Orbitron'] text-[14px] font-bold text-[#9370DB] mb-[10px]">
            🎁 Rewards
          </h3>
          <div className="flex gap-[8px]">
            {achievement.rewards.xp > 0 && (
              <div className="bg-[rgba(255,0,255,0.1)] border border-[rgba(255,0,255,0.3)] rounded-[8px] px-[10px] py-[6px] flex items-center gap-[4px]">
                <span className="text-[14px]">⚡</span>
                <span className="text-[#FF00FF] text-[12px] font-bold">+{achievement.rewards.xp} XP</span>
              </div>
            )}
            {achievement.rewards.coins > 0 && (
              <div className="bg-[rgba(255,215,0,0.1)] border border-[rgba(255,215,0,0.3)] rounded-[8px] px-[10px] py-[6px] flex items-center gap-[4px]">
                <span className="text-[14px]">🪙</span>
                <span className="text-[#FFD700] text-[12px] font-bold">+{achievement.rewards.coins} Coins</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}