//components/mobile/StatusBar.tsx
import React from 'react';

interface StatusBarProps {
  playerData: {
    name: string;
    level: number;
    avatar: string;
    coins: number;
  };
  onDailyReward: () => void;
}

export default function StatusBar({ playerData, onDailyReward }: StatusBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-[80px] bg-gradient-to-b from-[rgba(13,12,29,0.95)] to-[rgba(13,12,29,0.7)] backdrop-blur-[15px] z-[100] px-5 flex justify-between items-center border-b border-[rgba(0,255,255,0.2)] shadow-[0_5px_25px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-3">
        <div className="relative w-[45px] h-[45px] rounded-full bg-gradient-to-br from-[#8A2BE2] to-[#00FFFF] flex items-center justify-center text-[22px] shadow-[0_0_15px_rgba(138,43,226,0.6)] border-2 border-[#9370DB]">
          <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-[#8A2BE2] to-[#00FFFF] z-[-1] opacity-40 blur-[8px]"></div>
          {playerData.avatar}
        </div>
        <div>
          <h3 className="text-base font-bold mb-0.5 font-['Orbitron']">{playerData.name}</h3>
          <div className="inline-flex items-center gap-[5px] text-xs text-[#FF00FF] bg-[rgba(255,0,255,0.1)] px-[10px] py-[3px] rounded-[15px] border border-[rgba(255,0,255,0.3)] font-semibold">
            ⚡ Level <span>{playerData.level}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-[10px]">
        <div className="flex gap-[10px]">
          <div className="bg-[rgba(255,255,255,0.08)] px-[14px] py-[7px] rounded-[15px] flex items-center gap-[6px] border border-[rgba(0,255,255,0.2)] backdrop-blur-[5px] transition-all duration-300 ease-in-out shadow-[0_2px_5px_rgba(0,0,0,0.2)] hover:transform hover:translate-y-[-2px] hover:shadow-[0_4px_10px_rgba(0,255,255,0.5)]">
            <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-[#A0522D] text-xs">
              $
            </div>
            <span className="font-semibold text-sm">{playerData.coins.toLocaleString()}</span>
          </div>
        </div>
        <button 
          className="bg-[rgba(255,255,255,0.1)] rounded-full w-9 h-9 flex items-center justify-center text-lg text-[#A0AEC0] border border-[rgba(0,255,255,0.2)] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#8A2BE2] hover:text-white hover:shadow-[0_0_15px_rgba(138,43,226,0.6)]"
          title="Daily Reward" 
          onClick={onDailyReward}
        >
          🎁
        </button>
      </div>
    </div>
  );
}