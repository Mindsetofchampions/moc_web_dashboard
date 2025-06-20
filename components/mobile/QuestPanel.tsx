import React from 'react';

interface QuestPanelProps {
  active: boolean;
  onQuestClick: (questId: string) => void;
}

const quests = [
  { id: 'e-sports', icon: '🎮', name: 'Cyber Arena Showdown', reward: '+1200 Neon Credits', distance: 'Sector 7' },
  { id: 'logic01', icon: '🧠', name: 'Logic Circuit Bender', reward: '+150 XP, +5 Gems', distance: 'Data Node 3' },
  { id: 'math01', icon: '🧮', name: 'Math Attack: Velocity', reward: 'Score Based Credits', distance: 'Training Sim LX' },
  { id: 'fitness', icon: '🏃', name: 'Urban Parkour Run', reward: '+300 Data Shards', distance: 'District 4' }
];

export default function QuestPanel({ active, onQuestClick }: QuestPanelProps) {
  return (
    <div className={`fixed bottom-[75px] left-[10px] right-[10px] max-h-[380px] bg-[rgba(23,22,46,0.85)] rounded-t-[20px] backdrop-blur-[15px] border border-[rgba(0,255,255,0.2)] z-[90] overflow-hidden shadow-[0_-5px_30px_rgba(0,0,0,0.4)] transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${active ? 'transform translate-y-0' : 'transform translate-y-full'}`}>
      <div className="p-[18px] border-b border-[rgba(0,255,255,0.2)] bg-[rgba(255,255,255,0.03)]">
        <h2 className="text-xl font-bold mb-1 bg-gradient-to-br from-[#9370DB] to-[#00FFFF] bg-clip-text text-transparent font-['Orbitron']">
          Active Chronicles
        </h2>
        <div className="text-[#A0AEC0] text-[13px]">Unfold the citys stories!</div>
      </div>
      <div className="p-[10px] overflow-y-auto max-h-[calc(380px-70px)] scrollbar-hide">
        {quests.map(quest => (
          <div 
            key={quest.id} 
            className="relative bg-[rgba(255,255,255,0.04)] border border-[rgba(0,255,255,0.2)] rounded-[15px] p-[15px] mb-[10px] flex items-center gap-[15px] cursor-pointer transition-all duration-300 ease-in-out overflow-hidden hover:transform hover:translate-x-1 hover:border-[#00FFFF] hover:bg-[rgba(0,255,255,0.08)] hover:shadow-[0_5px_15px_rgba(0,255,255,0.1)] before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-[rgba(0,255,255,0.1)] before:to-transparent before:transition-[left] before:duration-[600ms] before:ease-in-out hover:before:left-full"
            onClick={() => onQuestClick(quest.id)}
          >
            <div className="w-[45px] h-[45px] bg-gradient-to-br from-[#8A2BE2] to-[#FF00FF] rounded-[12px] flex items-center justify-center text-[22px] flex-shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
              {quest.icon}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-[15px] mb-[3px] text-[#E0E0E0]">{quest.name}</div>
              <div className="text-[#FFA500] text-[13px] font-medium">{quest.reward}</div>
            </div>
            <div className="text-[#718096] text-xs bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded-[10px]">
              {quest.distance}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}