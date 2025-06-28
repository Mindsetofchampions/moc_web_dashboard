// //components/mobile/ShopScreen.tsx
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';

// interface ShopScreenProps {
//   playerData: any;
//   onPurchase: (item: any) => void;
// }

// const shopItems = [
//   { id: 'f2', name: 'Neon Pulse Blaster Skin', price: '5000', icon: '🔫', type: 'credit' },
//   { id: 's1', name: 'Stealth Suit Mk.II', price: '8000', icon: '👤', type: 'credit' },
//   { id: 's3', name: 'Glitch Camo Outfit', price: '6500', icon: '🌀', type: 'credit' },
//   { id: 'g2', name: 'Gravity Boots', price: '10000', icon: '👟', type: 'credit' },
//   { id: 'b2', name: 'Credit Cache (Small)', price: '2500', icon: '💰', type: 'credit' },
// ];

// export default function ShopScreen({ playerData, onPurchase }: ShopScreenProps) {
//   return (
//     <div className="pt-[90px] pb-[90px] px-[15px] overflow-y-auto h-full scrollbar-hide">
//       <div className="bg-gradient-to-br from-[rgba(138,43,226,0.15)] to-[rgba(0,255,255,0.1)] border border-[rgba(0,255,255,0.2)] rounded-[18px] p-[18px] mb-5 flex justify-center items-center">
//         <div className="text-center">
//           <div className="text-2xl font-bold flex items-center gap-2 mb-[5px] text-[#E0E0E0]">
//             <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-[#A0522D] text-xs">
//               $
//             </div>
//             <span>{playerData.coins.toLocaleString()}</span>
//           </div>
//           <div className="text-[#A0AEC0] text-xs">Neon Credits</div>
//         </div>
//       </div>
      
//       <div className="bg-gradient-to-br from-[#4B0082] to-[#FF00FF] rounded-[18px] p-[25px] mb-[18px] relative overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.4)]">
//         <div className="absolute top-[-60%] right-[-60%] w-[220%] h-[220%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_60%)] animate-spin [animation-duration:25s]"></div>
//         <div className="relative z-[1]">
//           <h2 className="text-[22px] font-bold text-white mb-2 font-['Orbitron']">Legendary Ronin Jacket</h2>
//           <p className="text-[13px] opacity-85 mb-3 text-[#E0E0E0]">Embrace the shadows. Limited edition cyber-weave jacket.</p>
//           <div className="flex items-center gap-[6px] text-[18px] font-semibold text-[#FFA500] bg-[rgba(0,0,0,0.3)] px-[10px] py-[5px] rounded-[10px] inline-flex">
//             <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-[#A0522D] text-xs">
//               $
//             </div>
//             15000
//           </div>
//         </div>
//       </div>
      
//       <h2 className="text-xl font-bold mb-4 font-['Orbitron'] text-[#9370DB]">🔥 Hot Deals</h2>
//       <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[15px]">
//         {shopItems.map(item => (
//           <div 
//             key={item.id} 
//             className="bg-[rgba(23,22,46,0.85)] border border-[rgba(0,255,255,0.2)] rounded-[15px] p-[15px] text-center cursor-pointer transition-all duration-300 ease-in-out hover:transform hover:translate-y-[-5px] hover:border-[#00FFFF] hover:shadow-[0_8px_20px_rgba(0,255,255,0.5)] relative overflow-hidden backdrop-blur-[5px]"
//             onClick={() => onPurchase(item)}
//           >
//             <div className="w-full h-[100px] bg-[rgba(255,255,255,0.05)] rounded-[10px] mb-3 flex items-center justify-center text-[32px] text-[#718096] border border-dashed border-[rgba(0,255,255,0.2)]">
//               {item.icon}
//             </div>
//             <div className="font-semibold text-[15px] mb-[6px] text-[#E0E0E0]">{item.name}</div>
//             <div className="text-[#FFA500] text-sm font-medium mb-[10px] flex items-center justify-center gap-[5px]">
//               <div className="w-4 h-4 rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-[#A0522D] text-[10px]">
//                 $
//               </div>
//               {item.price}
//             </div>
//             <button className="bg-gradient-to-br from-[#00FFFF] to-[#00BFFF] text-[#0D0C1D] border-none rounded-[10px] px-[15px] py-2 text-[13px] font-semibold cursor-pointer w-full transition-all duration-300 ease-in-out hover:brightness-[1.1] hover:shadow-[0_3px_10px_rgba(0,255,255,0.5)]">
//               Acquire
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface ShopScreenProps {
  playerData: any;
  shopItems: any[];
  onPurchase: (item: any) => void;
}

export default function ShopScreen({ playerData, shopItems, onPurchase }: ShopScreenProps) {
  // Fallback static items if no backend items available
  const fallbackItems = [
    { id: 'f2', name: 'Neon Pulse Blaster Skin', price: 5000, icon: '🔫', type: 'credit' },
    { id: 's1', name: 'Stealth Suit Mk.II', price: 8000, icon: '👤', type: 'credit' },
    { id: 's3', name: 'Glitch Camo Outfit', price: 6500, icon: '🌀', type: 'credit' },
    { id: 'g2', name: 'Gravity Boots', price: 10000, icon: '👟', type: 'credit' },
    { id: 'b2', name: 'Credit Cache (Small)', price: 2500, icon: '💰', type: 'credit' },
  ];

  const displayItems = shopItems && shopItems.length > 0 ? shopItems : fallbackItems;

  return (
    <div className="pt-[90px] pb-[90px] px-[15px] overflow-y-auto h-full scrollbar-hide">
      <div className="bg-gradient-to-br from-[rgba(138,43,226,0.15)] to-[rgba(0,255,255,0.1)] border border-[rgba(0,255,255,0.2)] rounded-[18px] p-[18px] mb-5 flex justify-center items-center">
        <div className="text-center">
          <div className="text-2xl font-bold flex items-center gap-2 mb-[5px] text-[#E0E0E0]">
            <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-[#A0522D] text-xs">
              $
            </div>
            <span>{playerData.coins.toLocaleString()}</span>
          </div>
          <div className="text-[#A0AEC0] text-xs">Neon Credits</div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-[#4B0082] to-[#FF00FF] rounded-[18px] p-[25px] mb-[18px] relative overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.4)]">
        <div className="absolute top-[-60%] right-[-60%] w-[220%] h-[220%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_60%)] animate-spin [animation-duration:25s]"></div>
        <div className="relative z-[1]">
          <h2 className="text-[22px] font-bold text-white mb-2 font-['Orbitron']">Legendary Ronin Jacket</h2>
          <p className="text-[13px] opacity-85 mb-3 text-[#E0E0E0]">Embrace the shadows. Limited edition cyber-weave jacket.</p>
          <div className="flex items-center gap-[6px] text-[18px] font-semibold text-[#FFA500] bg-[rgba(0,0,0,0.3)] px-[10px] py-[5px] rounded-[10px] inline-flex">
            <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-[#A0522D] text-xs">
              $
            </div>
            15000
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-4 font-['Orbitron'] text-[#9370DB]">🔥 Hot Deals</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[15px]">
        {displayItems.map(item => (
          <div 
            key={item.id} 
            className="bg-[rgba(23,22,46,0.85)] border border-[rgba(0,255,255,0.2)] rounded-[15px] p-[15px] text-center cursor-pointer transition-all duration-300 ease-in-out hover:transform hover:translate-y-[-5px] hover:border-[#00FFFF] hover:shadow-[0_8px_20px_rgba(0,255,255,0.5)] relative overflow-hidden backdrop-blur-[5px]"
            onClick={() => onPurchase(item)}
          >
            <div className="w-full h-[100px] bg-[rgba(255,255,255,0.05)] rounded-[10px] mb-3 flex items-center justify-center text-[32px] text-[#718096] border border-dashed border-[rgba(0,255,255,0.2)]">
              {item.icon || '🎁'}
            </div>
            <div className="font-semibold text-[15px] mb-[6px] text-[#E0E0E0]">{item.name}</div>
            <div className="text-[#FFA500] text-sm font-medium mb-[10px] flex items-center justify-center gap-[5px]">
              <div className="w-4 h-4 rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-[#A0522D] text-[10px]">
                $
              </div>
              {typeof item.price === 'number' ? item.price.toLocaleString() : item.price}
            </div>
            <button className="bg-gradient-to-br from-[#00FFFF] to-[#00BFFF] text-[#0D0C1D] border-none rounded-[10px] px-[15px] py-2 text-[13px] font-semibold cursor-pointer w-full transition-all duration-300 ease-in-out hover:brightness-[1.1] hover:shadow-[0_3px_10px_rgba(0,255,255,0.5)]">
              Acquire
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}