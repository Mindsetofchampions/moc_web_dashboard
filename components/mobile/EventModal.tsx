import React from 'react';

interface EventModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function EventModal({ visible, onClose }: EventModalProps) {
  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(13,12,29,0.8)] backdrop-blur-[10px] z-[200] flex items-center justify-center" onClick={onClose}>
      <div className="bg-[rgb(23,22,46)] rounded-[20px] p-[30px] max-w-[360px] w-[90%] text-center relative" onClick={(e) => e.stopPropagation()}>
        <button 
          className="absolute top-[15px] right-[15px] bg-[rgba(255,255,255,0.1)] border-none text-[#A0AEC0] w-[30px] h-[30px] rounded-full text-base cursor-pointer hover:bg-[rgba(255,255,255,0.2)] transition-all duration-200"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-[48px] mb-[15px]">🎮</div>
        <h3 className="text-xl font-bold mb-[10px] font-['Orbitron'] text-[#E0E0E0]">Cyber Arena Showdown</h3>
        <p className="text-sm text-[#A0AEC0] mb-[25px] leading-[1.6]">
          Enter the digital coliseum! Compete for glory and rare data shards.
        </p>
        <button 
          className="w-full p-3 rounded-[10px] font-semibold cursor-pointer transition-all duration-200 border-none bg-[#8A2BE2] text-white hover:bg-[#9370DB] hover:shadow-[0_0_15px_rgba(138,43,226,0.5)]"
          onClick={onClose}
        >
          Register Now
        </button>
      </div>
    </div>
  );
}