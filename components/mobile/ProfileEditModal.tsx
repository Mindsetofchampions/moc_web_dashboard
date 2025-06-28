// components/mobile/ProfileEditModal.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';

interface ProfileEditModalProps {
  visible: boolean;
  onClose: () => void;
  playerData: any;
  onSave: (data: any) => void;
}

const avatarOptions = [
  "😎", "🤖", "👾", "🦸", "🧙", "🎮", "⚡", "🌟", "🔥", "💎",
  "🚀", "🎯", "🏆", "💀", "👑", "🎭", "🦾", "🧠", "💫", "⭐"
];

const titleOptions = [
  "Grid Runner", "Cyber Warrior", "Data Hunter", "Code Breaker", "Neo Sage",
  "Digital Nomad", "Pixel Master", "Circuit Rider", "Byte Bender", "Logic Lord",
  "Quest Seeker", "Mind Hacker", "System Ranger", "Data Knight", "Cyber Scout"
];

export default function ProfileEditModal({ 
  visible, 
  onClose, 
  playerData, 
  onSave 
}: ProfileEditModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    avatar: '😎',
    title: 'Grid Runner'
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (visible && playerData) {
      setFormData({
        name: playerData.name || '',
        avatar: playerData.avatar || '😎',
        title: playerData.title || 'Grid Runner'
      });
    }
  }, [visible, playerData]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(13,12,29,0.8)] backdrop-blur-[15px] z-[200] flex items-center justify-center" onClick={onClose}>
      <div 
        className="bg-gradient-to-br from-[rgba(23,22,46,0.95)] to-[rgba(75,0,130,0.8)] rounded-[25px] p-[30px] w-[95%] max-w-[500px] max-h-[90vh] border-2 border-[#00FFFF] shadow-[0_0_30px_rgba(0,255,255,0.5)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-['Orbitron'] text-2xl text-[#9370DB]">Customize Profile</h2>
          <button 
            className="bg-[rgba(0,0,0,0.3)] border border-[rgba(0,255,255,0.2)] text-[#A0AEC0] w-[30px] h-[30px] rounded-full text-base cursor-pointer hover:bg-[#00FFFF] hover:text-[#0D0C1D] transition-all duration-200 flex items-center justify-center"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-[#9370DB] font-semibold mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 bg-[rgba(0,0,0,0.3)] border border-[rgba(0,255,255,0.2)] rounded-[12px] text-[#E0E0E0] placeholder-[#718096] focus:border-[#00FFFF] focus:outline-none transition-colors"
              placeholder="Enter your display name"
            />
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="block text-[#9370DB] font-semibold mb-2">
              Choose Avatar
            </label>
            <div className="grid grid-cols-5 gap-3">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setFormData({...formData, avatar})}
                  className={`w-12 h-12 text-2xl rounded-[12px] transition-all duration-200 flex items-center justify-center ${
                    formData.avatar === avatar
                      ? 'bg-[#8A2BE2] border-2 border-[#00FFFF] shadow-[0_0_15px_rgba(138,43,226,0.6)]'
                      : 'bg-[rgba(255,255,255,0.1)] border border-[rgba(0,255,255,0.2)] hover:border-[#00FFFF]'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          {/* Title Selection */}
          <div>
            <label className="block text-[#9370DB] font-semibold mb-2">
              Select Title
            </label>
            <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto scrollbar-hide">
              {titleOptions.map((title) => (
                <button
                  key={title}
                  onClick={() => setFormData({...formData, title})}
                  className={`p-3 text-left rounded-[10px] transition-all duration-200 ${
                    formData.title === title
                      ? 'bg-[#8A2BE2] border border-[#00FFFF] text-white'
                      : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(0,255,255,0.2)] text-[#E0E0E0] hover:border-[#00FFFF]'
                  }`}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-[rgba(0,0,0,0.2)] rounded-[15px] p-4 border border-[rgba(0,255,255,0.2)]">
            <h3 className="text-[#9370DB] font-semibold mb-3">Preview</h3>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8A2BE2] to-[#00FFFF] rounded-full flex items-center justify-center text-3xl border-2 border-[#9370DB]">
                {formData.avatar}
              </div>
              <div>
                <div className="text-lg font-bold text-[#E0E0E0]">
                  {formData.name || 'Grid Runner'}
                </div>
                <div className="text-sm text-[#00FFFF]">
                  {formData.title}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 p-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(0,255,255,0.2)] text-[#E0E0E0] rounded-[12px] font-semibold hover:bg-[rgba(255,255,255,0.15)] hover:border-[#00FFFF] transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 p-3 bg-gradient-to-br from-[#8A2BE2] to-[#FF00FF] border-none rounded-[12px] text-white font-semibold hover:brightness-[1.2] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-transparent border-t-white rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}