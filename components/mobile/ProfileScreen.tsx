/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface ProfileScreenProps {
  playerData: any;
}

export default function ProfileScreen({ playerData }: ProfileScreenProps) {
  return (
    <div className="pt-[90px] pb-[90px] px-[15px] overflow-y-auto h-full flex flex-col items-center gap-[25px] scrollbar-hide">
      <div className="bg-[rgba(23,22,46,0.85)] rounded-[20px] p-[25px] w-full max-w-[500px] border border-[rgba(0,255,255,0.2)] shadow-[0_8px_30px_rgba(75,0,130,0.5)] backdrop-blur-[10px]">
        <div className="flex flex-col items-center text-center mb-[25px] pb-5 border-b border-[rgba(0,255,255,0.2)]">
          <div className="w-[150px] h-[150px] rounded-full bg-gradient-to-[160deg] from-[#4B0082] to-[#FF00FF] flex items-center justify-center text-[70px] text-white mb-[15px] border-4 border-[#9370DB] shadow-[0_0_25px_rgba(138,43,226,0.6),inset_0_0_15px_rgba(0,0,0,0.3)]">
            {playerData.avatar}
          </div>
          <h1 className="font-['Orbitron'] text-[28px] font-bold text-[#E0E0E0] mb-[5px]">
            {playerData.name}
          </h1>
          <p className="text-sm text-[#00FFFF] font-medium">
            {playerData.title} | Level {playerData.level}
          </p>
        </div>
        
        <h2 className="font-['Orbitron'] text-xl text-[#9370DB] mb-[15px] text-center">
          📈 Player Stats
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[15px]">
          <div className="bg-[rgba(23,22,46,0.7)] border border-[rgba(0,255,255,0.2)] rounded-[50px] p-[12px_18px] flex items-center gap-3 transition-all duration-300 ease-in-out">
            <div className="text-xl text-[#00FFFF]">⚡</div>
            <div>
              <div className="text-[13px] text-[#A0AEC0]">Agility</div>
              <div className="text-base font-semibold text-[#E0E0E0]">{playerData.stats.agility}%</div>
            </div>
          </div>
          <div className="bg-[rgba(23,22,46,0.7)] border border-[rgba(0,255,255,0.2)] rounded-[50px] p-[12px_18px] flex items-center gap-3 transition-all duration-300 ease-in-out">
            <div className="text-xl text-[#00FFFF]">🧠</div>
            <div>
              <div className="text-[13px] text-[#A0AEC0]">Intellect</div>
              <div className="text-base font-semibold text-[#E0E0E0]">{playerData.stats.intellect}%</div>
            </div>
          </div>
          <div className="bg-[rgba(23,22,46,0.7)] border border-[rgba(0,255,255,0.2)] rounded-[50px] p-[12px_18px] flex items-center gap-3 transition-all duration-300 ease-in-out">
            <div className="text-xl text-[#00FFFF]">⚙️</div>
            <div>
              <div className="text-[13px] text-[#A0AEC0]">Tech Skill</div>
              <div className="text-base font-semibold text-[#E0E0E0]">{playerData.stats.techSkill}%</div>
            </div>
          </div>
          <div className="bg-[rgba(23,22,46,0.7)] border border-[rgba(0,255,255,0.2)] rounded-[50px] p-[12px_18px] flex items-center gap-3 transition-all duration-300 ease-in-out">
            <div className="text-xl text-[#00FFFF]">⭐</div>
            <div>
              <div className="text-[13px] text-[#A0AEC0]">Reputation</div>
              <div className="text-base font-semibold text-[#E0E0E0]">{playerData.stats.reputation}%</div>
            </div>
          </div>
        </div>

        <h2 className="font-['Orbitron'] text-xl text-[#9370DB] mb-[15px] text-center mt-[25px]">
          🏆 Achievements
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {playerData.achievements.map((achievement: any) => (
            <div 
              key={achievement.id} 
              className={`p-3 rounded-[15px] border flex items-center gap-3 transition-all duration-300 ease-in-out ${
                achievement.unlocked 
                  ? 'bg-[rgba(0,255,255,0.1)] border-[#00FFFF] shadow-[0_0_10px_rgba(0,255,255,0.3)]' 
                  : 'bg-[rgba(255,255,255,0.05)] border-[rgba(0,255,255,0.2)] opacity-50'
              }`}
            >
              <div className="text-lg">{achievement.icon}</div>
              <div className="text-sm font-medium text-[#E0E0E0]">{achievement.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}