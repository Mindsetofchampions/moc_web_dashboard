/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface BottomNavProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
  onQuestToggle: () => void;
  questPanelActive: boolean;
}

export default function BottomNav({ currentScreen, onScreenChange, onQuestToggle, questPanelActive }: BottomNavProps) {
  const navItems = [
    { id: 'mapScreen', icon: '🗺️', label: 'Map' },
    { id: 'questPanel', icon: '⚔️', label: 'quests', isToggle: true },
    { id: 'shopScreen', icon: '🛍️', label: 'Shop' },
    { id: 'profileScreen', icon: '👤', label: 'Profile' }
  ];

  const handleNavClick = (item: any) => {
    if (item.isToggle) {
      onQuestToggle();
    } else {
      onScreenChange(item.id);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[75px] bg-[rgba(23,22,46,0.85)] backdrop-blur-[15px] border-t border-[rgba(0,255,255,0.2)] z-[100] flex justify-around items-center px-[10px] shadow-[0_-5px_25px_rgba(0,0,0,0.3)]">
      {navItems.map((item) => {
        const isActive = item.isToggle 
          ? questPanelActive 
          : (!questPanelActive && currentScreen === item.id);
        
        return (
          <div
            key={item.id}
            className={`flex-1 flex flex-col items-center gap-[5px] p-[10px_5px] rounded-[15px] transition-all duration-300 ease-in-out cursor-pointer relative
              ${isActive ? 'before:content-[""] before:absolute before:inset-0 before:rounded-[15px] before:bg-[#8A2BE2] before:opacity-15' : ''}
            `}
            onClick={() => handleNavClick(item)}
          >
            <div 
              className={`w-[26px] h-[26px] flex items-center justify-center text-[22px] z-[1] transition-all duration-300 ease-in-out
                ${isActive ? 'transform scale-[1.2] translate-y-[-2px] drop-shadow-[0_0_12px_#8A2BE2] text-[#9370DB]' : ''}
              `}
            >
              {item.icon}
            </div>
            <span 
              className={`text-[10px] z-[1] font-medium transition-all duration-300 ease-in-out
                ${isActive ? 'text-[#9370DB] font-bold' : 'text-[#A0AEC0]'}
              `}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}