// import React from 'react';

// interface QuestPanelProps {
//   active: boolean;
//   onQuestClick: (questId: string) => void;
// }

// const quests = [
//   { 
//     id: 'e-sports', 
//     icon: '🎮', 
//     name: 'Cyber Arena Showdown', 
//     reward: '+1200 Credits', 
//     distance: 'Sector 7',
//     attribute: 'character',
//     attributeIcon: '🎭'
//   },
//   { 
//     id: 'hudson-quest', 
//     icon: '🏗️', 
//     name: 'Hudson Yards Heist', 
//     reward: '+800 Credits', 
//     distance: 'Hudson Yards',
//     attribute: 'exploration',
//     attributeIcon: '🧭'
//   },
//   { 
//     id: 'roosevelt-quest', 
//     icon: '🌉', 
//     name: 'Island Bridge Mystery', 
//     reward: '+600 Credits', 
//     distance: 'Roosevelt Island',
//     attribute: 'stewardship',
//     attributeIcon: '🌳'
//   },
//   { 
//     id: 'health01', 
//     icon: '💚', 
//     name: 'Wellness Workshop', 
//     reward: '+180 XP', 
//     distance: 'Med Center',
//     attribute: 'health',
//     attributeIcon: '💚'
//   },
//   { 
//     id: 'scholar01', 
//     icon: '🎓', 
//     name: 'Knowledge Archive', 
//     reward: '+250 XP', 
//     distance: 'Data Library',
//     attribute: 'scholarship',
//     attributeIcon: '🎓'
//   },
//   { 
//     id: 'explore01', 
//     icon: '🧭', 
//     name: 'Hidden Path Discovery', 
//     reward: '+300 XP', 
//     distance: 'Unknown Sector',
//     attribute: 'exploration',
//     attributeIcon: '🧭'
//   },
//   { 
//     id: 'steward01', 
//     icon: '🌳', 
//     name: 'Eco-Guardian Training', 
//     reward: '+220 XP', 
//     distance: 'Green Zone',
//     attribute: 'stewardship',
//     attributeIcon: '🌳'
//   },
//   { 
//     id: 'logic01', 
//     icon: '🧠', 
//     name: 'Logic Circuit Bender', 
//     reward: '+150 XP', 
//     distance: 'Data Node 3',
//     attribute: 'character',
//     attributeIcon: '🎭'
//   },
//   { 
//     id: 'math01', 
//     icon: '🧮', 
//     name: 'Math Attack: Velocity', 
//     reward: 'Score Based', 
//     distance: 'Training Sim',
//     attribute: 'scholarship',
//     attributeIcon: '🎓'
//   }
// ];

// export default function QuestPanel({ active, onQuestClick }: QuestPanelProps) {
//   return (
//     <div className={`fixed bottom-[75px] left-[0px] right-[0px] max-h-[380px] bg-[rgba(23,22,46,0.85)] rounded-t-[20px] backdrop-blur-[15px] border border-[rgba(0,255,255,0.2)] z-[90] overflow-hidden shadow-[0_-5px_30px_rgba(0,0,0,0.4)] transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${active ? 'transform translate-y-0' : 'transform translate-y-full'}`}>
//       <div className="p-[18px] border-b border-[rgba(0,255,255,0.2)] bg-[rgba(255,255,255,0.03)]">
//         <h2 className="text-xl font-bold mb-1 bg-gradient-to-br from-[#9370DB] to-[#00FFFF] bg-clip-text text-transparent font-['Orbitron']">
//           Active Chronicles
//         </h2>
//         <div className="text-[#A0AEC0] text-[13px]">Choose your path to growth!</div>
//       </div>
//       <div className="p-[10px] overflow-y-auto max-h-[calc(380px-70px)] scrollbar-hide">
//         {quests.map(quest => (
//           <div 
//             key={quest.id} 
//             className="relative bg-[rgba(255,255,255,0.04)] border border-[rgba(0,255,255,0.2)] rounded-[15px] p-[15px] mb-[10px] flex items-center gap-[15px] cursor-pointer transition-all duration-300 ease-in-out overflow-hidden hover:transform hover:translate-x-1 hover:border-[#00FFFF] hover:bg-[rgba(0,255,255,0.08)] hover:shadow-[0_5px_15px_rgba(0,255,255,0.1)] before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-[rgba(0,255,255,0.1)] before:to-transparent before:transition-[left] before:duration-[600ms] before:ease-in-out hover:before:left-full"
//             onClick={() => onQuestClick(quest.id)}
//           >
//             <div className="w-[45px] h-[45px] bg-gradient-to-br from-[#8A2BE2] to-[#FF00FF] rounded-[12px] flex items-center justify-center text-[22px] flex-shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
//               {quest.icon}
//             </div>
//             <div className="flex-1">
//               <div className="font-semibold text-[15px] mb-[3px] text-[#E0E0E0]">{quest.name}</div>
//               <div className="text-[#FFA500] text-[13px] font-medium mb-1">{quest.reward}</div>
//               <div className="flex items-center gap-2">
//                 <div className="text-[#718096] text-xs bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded-[8px]">
//                   {quest.distance}
//                 </div>
//                 <div className="flex items-center gap-1 text-[10px] text-[#9370DB] bg-[rgba(138,43,226,0.15)] px-2 py-1 rounded-[8px] border border-[rgba(138,43,226,0.3)]">
//                   <span>{quest.attributeIcon}</span>
//                   <span>{quest.attribute.charAt(0).toUpperCase() + quest.attribute.slice(1)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface QuestPanelProps {
  active: boolean;
  quests: any[];
  onQuestClick: (questId: string) => void;
}

export default function QuestPanel({ active, quests, onQuestClick }: QuestPanelProps) {
  // Fallback static quests if no backend quests available
  const fallbackQuests = [
    { 
      id: 'e-sports', 
      icon: '🎮', 
      name: 'Cyber Arena Showdown', 
      reward: '+1200 Credits', 
      distance: 'Sector 7',
      attribute: 'character',
      attributeIcon: '🎭'
    },
    { 
      id: 'hudson-quest', 
      icon: '🏗️', 
      name: 'Hudson Yards Heist', 
      reward: '+800 Credits', 
      distance: 'Hudson Yards',
      attribute: 'exploration',
      attributeIcon: '🧭'
    },
    { 
      id: 'roosevelt-quest', 
      icon: '🌉', 
      name: 'Island Bridge Mystery', 
      reward: '+600 Credits', 
      distance: 'Roosevelt Island',
      attribute: 'stewardship',
      attributeIcon: '🌳'
    },
    { 
      id: 'health01', 
      icon: '💚', 
      name: 'Wellness Workshop', 
      reward: '+180 XP', 
      distance: 'Med Center',
      attribute: 'health',
      attributeIcon: '💚'
    },
    { 
      id: 'scholar01', 
      icon: '🎓', 
      name: 'Knowledge Archive', 
      reward: '+250 XP', 
      distance: 'Data Library',
      attribute: 'scholarship',
      attributeIcon: '🎓'
    },
    { 
      id: 'explore01', 
      icon: '🧭', 
      name: 'Hidden Path Discovery', 
      reward: '+300 XP', 
      distance: 'Unknown Sector',
      attribute: 'exploration',
      attributeIcon: '🧭'
    },
    { 
      id: 'steward01', 
      icon: '🌳', 
      name: 'Eco-Guardian Training', 
      reward: '+220 XP', 
      distance: 'Green Zone',
      attribute: 'stewardship',
      attributeIcon: '🌳'
    },
    { 
      id: 'logic01', 
      icon: '🧠', 
      name: 'Logic Circuit Bender', 
      reward: '+150 XP', 
      distance: 'Data Node 3',
      attribute: 'character',
      attributeIcon: '🎭'
    },
    { 
      id: 'math01', 
      icon: '🧮', 
      name: 'Math Attack: Velocity', 
      reward: 'Score Based', 
      distance: 'Training Sim',
      attribute: 'scholarship',
      attributeIcon: '🎓'
    }
  ];

  // Transform backend quests to match expected format
  const transformQuest = (quest: any) => {
    if (quest.title || quest.description) {
      // Backend quest format
      return {
        id: quest.id,
        icon: quest.icon || getAttributeIcon(quest.attribute),
        name: quest.title || quest.name,
        reward: quest.xpReward ? `+${quest.xpReward} XP` : (quest.coinReward ? `+${quest.coinReward} Credits` : 'Variable Reward'),
        distance: quest.location || 'Unknown',
        attribute: quest.attribute || 'character',
        attributeIcon: getAttributeIcon(quest.attribute)
      };
    }
    // Already in correct format
    return quest;
  };

  const getAttributeIcon = (attribute: string) => {
    const icons = {
      character: '🎭',
      health: '💚',
      exploration: '🧭',
      scholarship: '🎓',
      stewardship: '🌳'
    };
    return icons[attribute as keyof typeof icons] || '🎯';
  };

  const displayQuests = quests && quests.length > 0 
    ? quests.map(transformQuest)
    : fallbackQuests;

  return (
    <div className={`fixed bottom-[75px] left-[0px] right-[0px] max-h-[380px] bg-[rgba(23,22,46,0.85)] rounded-t-[20px] backdrop-blur-[15px] border border-[rgba(0,255,255,0.2)] z-[90] overflow-hidden shadow-[0_-5px_30px_rgba(0,0,0,0.4)] transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${active ? 'transform translate-y-0' : 'transform translate-y-full'}`}>
      <div className="p-[18px] border-b border-[rgba(0,255,255,0.2)] bg-[rgba(255,255,255,0.03)]">
        <h2 className="text-xl font-bold mb-1 bg-gradient-to-br from-[#9370DB] to-[#00FFFF] bg-clip-text text-transparent font-['Orbitron']">
          Active Chronicles
        </h2>
        <div className="text-[#A0AEC0] text-[13px]">Choose your path to growth!</div>
      </div>
      <div className="p-[10px] overflow-y-auto max-h-[calc(380px-70px)] scrollbar-hide">
        {displayQuests.map(quest => (
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
              <div className="text-[#FFA500] text-[13px] font-medium mb-1">{quest.reward}</div>
              <div className="flex items-center gap-2">
                <div className="text-[#718096] text-xs bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded-[8px]">
                  {quest.distance}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#9370DB] bg-[rgba(138,43,226,0.15)] px-2 py-1 rounded-[8px] border border-[rgba(138,43,226,0.3)]">
                  <span>{quest.attributeIcon}</span>
                  <span>{quest.attribute.charAt(0).toUpperCase() + quest.attribute.slice(1)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}