/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface ShopScreenProps {
  playerData: any;
  onPurchase: (item: any) => void;
}

const shopItems = [
  { id: 'f1', name: 'Legendary Ronin Jacket', price: '75 Gems', icon: '🧥', type: 'gem' },
  { id: 'f2', name: 'Neon Pulse Blaster Skin', price: '5000 Credits', icon: '🔫', type: 'credit' },
];

export default function ShopScreen({ playerData, onPurchase }: ShopScreenProps) {
  return (
    <div className="pt-[90px] pb-[90px] px-[15px] overflow-y-auto h-full scrollbar-hide">
      <div className="bg-gradient-to-br from-[rgba(138,43,226,0.15)] to-[rgba(0,255,255,0.1)] border border-[rgba(0,255,255,0.2)] rounded-[18px] p-[18px] mb-5 flex justify-around items-center">
        <div className="text-center">
          <div className="text-2xl font-bold flex items-center gap-2 mb-[5px]">
            <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-[#A0522D] text-xs">
              $
            </div>
            <span>{playerData.coins.toLocaleString()}</span>
          </div>
          <div className="text-[#A0AEC0] text-sm">Neon Credits</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold flex items-center gap-2 mb-[5px]">
            <div className="w-[22px] h-[22px] bg-gradient-to-br from-[#00FFFF] to-[#00BFFF] [clip-path:polygon(50%_0%,100%_38%,82%_100%,18%_100%,0%_38%)]"></div>
            <span>{playerData.gems}</span>
          </div>
          <div className="text-[#A0AEC0] text-sm">Data Gems</div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-[#4B0082] to-[#FF00FF] rounded-[18px] p-[25px] mb-[18px] relative overflow-hidden">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-2">Legendary Ronin Jacket</h2>
          <p className="text-sm text-[rgba(255,255,255,0.8)] mb-4">Embrace the shadows. Limited edition cyber-weave jacket.</p>
          <div className="flex items-center justify-center gap-2 text-lg font-bold text-white">
            <div className="w-[22px] h-[22px] bg-gradient-to-br from-[#00FFFF] to-[#00BFFF] [clip-path:polygon(50%_0%,100%_38%,82%_100%,18%_100%,0%_38%)]"></div>
            75
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-4 font-['Orbitron'] text-[#9370DB]">🔥 Hot Deals</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[15px]">
        {shopItems.map(item => (
          <div 
            key={item.id} 
            className="bg-[rgba(23,22,46,0.85)] border border-[rgba(0,255,255,0.2)] rounded-[15px] p-[15px] text-center cursor-pointer transition-all duration-300 hover:transform hover:scale-105 hover:shadow-[0_5px_20px_rgba(0,255,255,0.3)]"
            onClick={() => onPurchase(item)}
          >
            <div className="w-full h-[100px] bg-[rgba(255,255,255,0.05)] rounded-[10px] mb-3 flex items-center justify-center text-[32px]">
              {item.icon}
            </div>
            <div className="font-semibold text-sm mb-2 text-[#E0E0E0]">{item.name}</div>
            <div className="text-[#FFA500] text-sm font-medium mb-[10px]">{item.price}</div>
            <button className="bg-gradient-to-br from-[#00FFFF] to-[#00BFFF] text-[#0D0C1D] border-none rounded-[10px] px-[15px] py-2 text-[13px] font-semibold cursor-pointer w-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]">
              Acquire
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}