import React from 'react';

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
  type: 'notification' | 'dailyReward';
}

export default function NotificationModal({ visible, onClose, type }: NotificationModalProps) {
  if (!visible) return null;

  const content = type === 'dailyReward' 
    ? {
        icon: '🎁',
        title: 'Daily Login Cache',
        message: 'This feature is currently under development. Check back soon for daily rewards and bonuses!'
      }
    : {
        icon: '🎉',
        title: 'Success!',
        message: 'Action completed successfully.'
      };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(13,12,29,0.8)] backdrop-blur-[10px] z-[200] flex items-center justify-center" onClick={onClose}>
      <div className="bg-[rgb(23,22,46)] rounded-[20px] p-[30px] max-w-[360px] w-[90%] text-center" onClick={(e) => e.stopPropagation()}>
        <div className="text-[48px] mb-[15px]">{content.icon}</div>
        <h3 className="text-xl font-bold mb-[10px] font-['Orbitron'] text-[#E0E0E0]">{content.title}</h3>
        <p className="text-sm text-[#A0AEC0] mb-[25px] leading-[1.6]">{content.message}</p>
        <button 
          className="w-full p-3 rounded-[10px] font-semibold cursor-pointer transition-all duration-200 border-none bg-[#8A2BE2] text-white hover:bg-[#9370DB] hover:shadow-[0_0_15px_rgba(138,43,226,0.5)]"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
}