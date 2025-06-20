import React from 'react';

interface LoadingOverlayProps {
  visible: boolean;
}

export default function LoadingOverlay({ visible }: LoadingOverlayProps) {
  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 bg-[#0D0C1D] flex items-center justify-center z-[300] transition-[opacity,visibility] duration-500 ease-in-out ${!visible ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
      <div className="w-[70px] h-[70px] relative">
        <div className="absolute w-full h-full border-[3px] border-transparent border-t-[#8A2BE2] rounded-full animate-spin"></div>
        <div className="absolute w-[80%] h-[80%] top-[10%] left-[10%] border-[3px] border-transparent border-t-[#00FFFF] rounded-full animate-spin [animation-duration:0.9s] [animation-direction:reverse]"></div>
        <div className="absolute w-[60%] h-[60%] top-[20%] left-[20%] border-[3px] border-transparent border-t-[#FF00FF] rounded-full animate-spin [animation-duration:0.8s]"></div>
      </div>
    </div>
  );
}