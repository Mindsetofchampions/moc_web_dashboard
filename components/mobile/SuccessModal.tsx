//components/mobile/SuccessModal.tsx
import React from 'react';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  type?: 'registration' | 'purchase' | 'quiz' | 'general';
  title?: string;
  message?: string;
}

const successMessages = {
  registration: {
    title: 'Registration Confirmed!',
    message: 'Your access node for the event is secured.',
    icon: '🎫'
  },
  purchase: {
    title: 'Purchase Complete!',
    message: 'Item has been added to your inventory.',
    icon: '🛍️'
  },
  quiz: {
    title: 'Challenge Complete!',
    message: 'Great job! Your progress has been saved.',
    icon: '🎯'
  },
  general: {
    title: 'Success!',
    message: 'Action completed successfully.',
    icon: '✅'
  }
};

export default function SuccessModal({ 
  visible, 
  onClose, 
  type = 'registration',
  title,
  message 
}: SuccessModalProps) {
  if (!visible) return null;

  const successData = successMessages[type];
  const displayTitle = title || successData.title;
  const displayMessage = message || successData.message;
  const displayIcon = successData.icon;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(13,12,29,0.8)] backdrop-blur-[15px] z-[250] flex items-center justify-center" onClick={onClose}>
      <div className="bg-[rgb(23,22,46)] rounded-[20px] p-8 max-w-[320px] w-[90%] text-center relative border border-[rgba(0,255,255,0.3)] shadow-[0_8px_30px_rgba(0,255,255,0.4)]" onClick={(e) => e.stopPropagation()}>
        {/* Success Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-[#FF1493] to-[#FF69B4] rounded-[15px] flex items-center justify-center text-[36px] mx-auto mb-6 shadow-[0_8px_25px_rgba(255,20,147,0.4)] border-2 border-[rgba(255,20,147,0.3)]">
          {displayIcon}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#E0E0E0] font-['Orbitron'] mb-4">
          {displayTitle}
        </h2>

        {/* Message */}
        <p className="text-sm text-[#A0AEC0] mb-8 leading-[1.6]">
          {displayMessage}
        </p>

        {/* OK Button */}
        <button 
          className="bg-gradient-to-r from-[#8A2BE2] to-[#FF00FF] text-white border-none rounded-[12px] px-8 py-3 font-bold text-base cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(138,43,226,0.6)] hover:transform hover:scale-[1.05] active:scale-[0.95] min-w-[100px]"
          onClick={onClose}
        >
          OK
        </button>

        {/* Animated background elements */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-[#00FFFF] rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-8 right-6 w-1 h-1 bg-[#FF00FF] rounded-full animate-pulse opacity-40" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-[#9370DB] rounded-full animate-pulse opacity-50" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-4 right-4 w-1 h-1 bg-[#00FFFF] rounded-full animate-pulse opacity-30" style={{animationDelay: '1.5s'}}></div>
      </div>
    </div>
  );
}