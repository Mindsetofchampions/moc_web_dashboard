import React from 'react';

interface EventModalProps {
  visible: boolean;
  onClose: () => void;
  eventId?: string;
  onRegister: () => void;
}

const eventData = {
'e-sports': { 
  title: 'Cyber Arena Showdown', 
  organizer: 'by Grid Runners Inc.', 
  date: 'Next Cycle, Day 3', 
  time: '18:00 - 22:00 Grid Time', 
  location: 'Brooklyn Navy Yard - GridHub Arena', 
  capacity: '128 Runners', 
  spots: '32 / 128', 
  description: 'Enter the digital coliseum! Compete for glory and rare data shards in the quarterly Cyber Arena Showdown. High-stakes matches, dazzling light shows, and legendary loot for the champions.\n\nPerks:\n• Top 3: Exclusive Cybernetic Avatar Skin\n• Participants: +1200 Neon Credits\n• Attribute Boost: +5 Character', 
  logo: '🎮', 
  live: true,
  attribute: 'character'
},
'hudson-quest': { 
  title: 'Hudson Yards Heist', 
  organizer: 'by Shadow Syndicate', 
  date: 'This Cycle, Day 5', 
  time: '20:00 - 24:00 Grid Time', 
  location: 'Hudson Yards - Corporate District', 
  capacity: '24 Operatives', 
  spots: '8 / 24', 
  description: 'infiltrate the corporate towers and retrieve stolen environmental data. Use stealth, cunning, and urban navigation skills to complete this high-stakes heist mission.\n\nRewards:\n• Mission Success: +800 Neon Credits\n• Corporate Intel Bonus: +400 Credits\n• Attribute Boost: +4 Exploration\n• Special Unlock: Urban Infiltrator Gear', 
  logo: '🏗️', 
  live: true,
  attribute: 'exploration'
},
'roosevelt-quest': { 
  title: 'Island Bridge Mystery', 
  organizer: 'by Environmental Council', 
  date: 'Next Cycle, Day 2', 
  time: '14:00 - 18:00 Grid Time', 
  location: 'Roosevelt Island - Abandoned Research Facility', 
  capacity: '16 Investigators', 
  spots: '5 / 16', 
  description: 'Investigate the mysterious ecological anomalies around Roosevelt Island. Help restore the natural balance while uncovering secrets about the old research facility.\n\nRewards:\n• Investigation Complete: +600 Neon Credits\n• Ecological Restoration: +300 Credits\n• Attribute Boost: +5 Stewardship\n• Special Unlock: Environmental Scanner', 
  logo: '🌉', 
  live: true,
  attribute: 'stewardship'
},
'fitness': { 
  title: 'Urban Parkour Run', 
  organizer: 'by Rooftop Renegades', 
  date: 'Every Sunrise Cycle', 
  time: '05:00 - 07:00 Grid Time', 
  location: 'Hudson Yards Rooftop Circuit', 
  capacity: '50 Runners', 
  spots: '12 / 50', 
  description: 'Navigate the urban jungle with speed and style. This daily parkour challenge tests your agility and reflexes. Complete the course for a data shard bonus and bragging rights.\n\nRewards:\n• Completion: +300 Data Shards\n• Daily Bonus: +150 Credits\n• Attribute Boost: +3 Health', 
  logo: '🏃', 
  live: false,
  attribute: 'health'
},
'volunteer': { 
  title: 'Community Garden Project', 
  organizer: 'by Green Future Initiative', 
  date: 'Every Weekend', 
  time: '09:00 - 15:00 Grid Time', 
  location: 'Brooklyn Grange – Navy Yard Farm', 
  capacity: 'Open Participation', 
  spots: 'Unlimited', 
  description: 'Help build sustainable food systems and green spaces in the city. Learn about permaculture, environmental stewardship, and community building.\n\nBenefits:\n• Environmental Impact: High\n• Weekly Rewards: +200 Credits\n• Attribute Boost: +4 Stewardship', 
  logo: '🌱', 
  live: true,
  attribute: 'stewardship'
},
'exploration': { 
  title: 'Mystery District Expedition', 
  organizer: 'by Urban Explorers Guild', 
  date: 'Monthly Adventure', 
  time: '14:00 - 18:00 Grid Time', 
  location: 'Roosevelt Island Abandoned Sector', 
  capacity: '20 Explorers', 
  spots: '8 / 20', 
  description: 'Venture into uncharted areas of the city and uncover hidden secrets, abandoned tech, and lost artifacts. Perfect for those who seek adventure and discovery.\n\nRewards:\n• Rare Artifacts: Possible\n• Discovery Bonus: +500 Credits\n• Attribute Boost: +5 Exploration', 
  logo: '🗺️', 
  live: true,
  attribute: 'exploration'
}
};

export default function EventModal({ visible, onClose, eventId = 'e-sports', onRegister }: EventModalProps) {
  if (!visible) return null;

  const event = eventData[eventId as keyof typeof eventData] || eventData['e-sports'];

  const handleRegister = () => {
    onRegister();
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(13,12,29,0.7)] backdrop-blur-[10px] z-[200] flex items-center justify-center opacity-100 visible transition-opacity duration-300 ease-in-out" onClick={onClose}>
      <div className="fixed bottom-0 left-0 right-0 bg-[rgb(23,22,46)] rounded-t-[25px] p-5 z-[201] transform translate-y-0 transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] max-h-[85vh] overflow-y-auto border-t border-[rgba(0,255,255,0.2)] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]" onClick={(e) => e.stopPropagation()}>
        {/* Modal Handle */}
        <div className="w-10 h-1 bg-[#718096] rounded-[10px] mx-auto mb-[15px]"></div>
        
        {/* Close Button */}
        <button 
          className="absolute top-[15px] right-[15px] bg-[rgba(255,255,255,0.1)] border-none text-[#A0AEC0] w-[30px] h-[30px] rounded-full text-base cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[#8A2BE2] hover:text-white"
          onClick={onClose}
        >
          ×
        </button>

        {/* Event Header */}
        <div className="flex items-center gap-[18px] mb-5">
          <div className="w-[70px] h-[70px] rounded-[18px] bg-gradient-to-br from-[#8A2BE2] to-[#FF00FF] flex items-center justify-center text-[32px] flex-shrink-0 shadow-[0_8px_20px_rgba(0,0,0,0.3)]">
            {event.logo}
          </div>
          <div className="flex-1">
            <h2 className="text-[22px] font-bold mb-1 leading-[1.2] font-['Orbitron'] text-[#E0E0E0]">{event.title}</h2>
            <div className="text-[#A0AEC0] text-[13px] mb-[6px]">{event.organizer}</div>
            <div className="flex gap-2 mb-[6px]">
              <div className={`inline-flex items-center gap-[7px] px-[10px] py-[5px] rounded-[12px] text-[11px] font-medium border ${event.live ? 'bg-[rgba(50,205,50,0.1)] text-[#32CD32] border-[rgba(50,205,50,0.3)]' : 'bg-[rgba(255,165,0,0.1)] text-[#FFA500] border-[rgba(255,165,0,0.3)]'}`}>
                <div className={`w-[7px] h-[7px] rounded-full ${event.live ? 'bg-[#32CD32]' : 'bg-[#FFA500]'} animate-pulse`}></div>
                <span>{event.live ? 'Live Event' : 'Upcoming'}</span>
              </div>
              <div className="inline-flex items-center gap-[5px] px-[8px] py-[3px] rounded-[10px] text-[10px] font-medium bg-[rgba(138,43,226,0.15)] text-[#9370DB] border border-[rgba(138,43,226,0.3)]">
                <span>+{event.attribute.charAt(0).toUpperCase() + event.attribute.slice(1)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3 mb-5">
          <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(0,255,255,0.2)] rounded-[12px] p-3 flex items-center gap-[10px]">
            <div className="w-9 h-9 bg-[rgba(138,43,226,0.15)] rounded-[10px] flex items-center justify-center text-base text-[#9370DB]">📅</div>
            <div className="flex-1">
              <div className="text-[11px] text-[#A0AEC0] mb-[2px]">Date</div>
              <div className="text-[13px] font-medium text-[#E0E0E0]">{event.date}</div>
            </div>
          </div>
          <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(0,255,255,0.2)] rounded-[12px] p-3 flex items-center gap-[10px]">
            <div className="w-9 h-9 bg-[rgba(138,43,226,0.15)] rounded-[10px] flex items-center justify-center text-base text-[#9370DB]">⏰</div>
            <div className="flex-1">
              <div className="text-[11px] text-[#A0AEC0] mb-[2px]">Time</div>
              <div className="text-[13px] font-medium text-[#E0E0E0]">{event.time}</div>
            </div>
          </div>
          <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(0,255,255,0.2)] rounded-[12px] p-3 flex items-center gap-[10px]">
            <div className="w-9 h-9 bg-[rgba(138,43,226,0.15)] rounded-[10px] flex items-center justify-center text-base text-[#9370DB]">📍</div>
            <div className="flex-1">
              <div className="text-[11px] text-[#A0AEC0] mb-[2px]">Location</div>
              <div className="text-[13px] font-medium text-[#E0E0E0]">{event.location}</div>
            </div>
          </div>
          <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(0,255,255,0.2)] rounded-[12px] p-3 flex items-center gap-[10px]">
            <div className="w-9 h-9 bg-[rgba(138,43,226,0.15)] rounded-[10px] flex items-center justify-center text-base text-[#9370DB]">👥</div>
            <div className="flex-1">
              <div className="text-[11px] text-[#A0AEC0] mb-[2px]">Capacity</div>
              <div className="text-[13px] font-medium text-[#E0E0E0]">{event.capacity}</div>
            </div>
          </div>
        </div>

        {/* Event Description */}
        <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(0,255,255,0.2)] rounded-[12px] p-[18px] mb-5">
          <h3 className="text-[15px] mb-2 font-['Orbitron'] text-[#9370DB]">Event Intel</h3>
          <p className="text-[#A0AEC0] leading-[1.6] text-[13px] whitespace-pre-wrap">{event.description}</p>
        </div>

        {/* Spots Remaining */}
        <div className="bg-gradient-to-br from-[rgba(255,165,0,0.1)] to-[rgba(255,0,255,0.1)] border border-[rgba(255,165,0,0.3)] rounded-[12px] p-3 mb-[18px] text-center">
          <div className="text-[22px] font-bold text-[#FFA500] mb-1">{event.spots}</div>
          <div className="text-xs text-[#A0AEC0]">Participation Slots Available</div>
        </div>

        {/* Register Button */}
        <button 
          className="w-full p-4 bg-gradient-to-br from-[#8A2BE2] to-[#FF00FF] border-none rounded-[15px] text-white text-[15px] font-semibold cursor-pointer relative overflow-hidden transition-all duration-300 ease-in-out shadow-[0_8px_20px_rgba(138,43,226,0.6)] hover:brightness-[1.2] active:scale-[0.98]"
          onClick={handleRegister}
        >
          <span>Register for Event</span>
        </button>
      </div>
    </div>
  );
}