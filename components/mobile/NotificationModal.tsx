//components/mobile/NotificationModal.tsx
import React from 'react';

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
  type: 'notification' | 'dailyReward';
  title?: string;
  message?: string;
  icon?: string;
}

export default function NotificationModal({ 
  visible, 
  onClose, 
  type, 
  title, 
  message, 
  icon 
}: NotificationModalProps) {
  if (!visible) return null;

  const content = type === 'dailyReward' 
    ? {
        icon: '🎁',
        title: 'Daily Login Cache',
        message: 'This feature is currently under development. Check back soon for daily rewards and bonuses!',
        buttonText: 'Roger That!'
      }
    : {
        icon: icon || '🎉',
        title: title || 'Success!',
        message: message || 'Action completed successfully.',
        buttonText: 'OK'
      };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(13,12,29,0.7)] backdrop-blur-[10px] z-[200] flex items-center justify-center opacity-100 visible transition-opacity duration-300 ease-in-out" onClick={onClose}>
      <div className="bg-[rgb(23,22,46)] rounded-[20px] p-[25px] transform scale-100 translate-y-0 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] opacity-100 w-[90%] max-w-[480px] border border-[rgba(0,255,255,0.2)] shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative text-center" onClick={(e) => e.stopPropagation()}>
        <div className="text-[48px] mb-[15px]">{content.icon}</div>
        <h3 className="text-xl font-bold mb-[10px] font-['Orbitron'] text-[#E0E0E0]">{content.title}</h3>
        <p className="text-sm text-[#A0AEC0] mb-[25px] leading-[1.6]">{content.message}</p>
        <button 
          className="flex-1 p-3 rounded-[10px] font-semibold cursor-pointer transition-all duration-200 ease-in-out border-none bg-[#8A2BE2] text-white hover:brightness-[1.15]"
          onClick={onClose}
        >
          {content.buttonText}
        </button>
      </div>
    </div>
  );
}