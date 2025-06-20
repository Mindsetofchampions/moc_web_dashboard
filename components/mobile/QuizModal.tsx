import React from 'react';

interface QuizModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function QuizModal({ visible, onClose }: QuizModalProps) {
  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(13,12,29,0.8)] backdrop-blur-[15px] z-[200] flex items-center justify-center" onClick={onClose}>
      <div className="bg-gradient-to-[145deg] from-[rgba(23,22,46,0.95)] to-[rgba(75,0,130,0.5)] rounded-[25px] p-[30px] max-w-[500px] w-[95%] border-2 border-[#00FFFF] shadow-[0_0_30px_rgba(0,255,255,0.5)] relative" onClick={(e) => e.stopPropagation()}>
        <button 
          className="absolute top-5 right-5 bg-[rgba(0,0,0,0.3)] border border-[rgba(0,255,255,0.2)] text-[#A0AEC0] w-[30px] h-[30px] rounded-full text-base cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-center">
          <span className="text-[48px] text-[#00FFFF] block mb-[10px]">🧠</span>
          <h2 className="font-['Orbitron'] text-[28px] text-[#9370DB] mb-[15px]">Logic Circuit Bender</h2>
          <p className="text-[15px] text-[#A0AEC0] leading-[1.6] mb-[25px]">
            Navigate the labyrinth of logic. Deduce correctly before the system overloads.
          </p>
          <button 
            className="w-full p-4 bg-gradient-to-br from-[#8A2BE2] to-[#FF00FF] border-none rounded-[15px] text-white text-base font-semibold cursor-pointer hover:shadow-[0_0_20px_rgba(138,43,226,0.7)] transition-all duration-300"
            onClick={onClose}
          >
            Start Challenge
          </button>
        </div>
      </div>
    </div>
  );
}