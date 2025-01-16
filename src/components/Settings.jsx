// src/components/Settings.jsx
import React, { useState, useEffect } from 'react';

const PRESETS = [
  { label: '30s', value: 30 },
  { label: '1m', value: 60 },
  { label: '2m', value: 120 }
];

function Settings({ isOpen, onClose, onTimeSet, currentTime }) {
  const [customTime, setCustomTime] = useState(currentTime);

  useEffect(() => {
    setCustomTime(currentTime);
  }, [currentTime]);

  const handlePresetClick = (seconds) => {
    onTimeSet(seconds);
    onClose();
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    const time = Math.max(1, Math.min(3600, parseInt(customTime) || 60));
    onTimeSet(time);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-8 w-[94%] max-w-sm
                    shadow-xl border border-white/10 transform transition-all duration-300 mx-2">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/60 hover:text-white/90 transition-colors"
        >
          ✕
        </button>

        <h2 className="text-white/90 text-xl font-light tracking-wider mb-6">Set Timer</h2>

        {/* Preset buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {PRESETS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => handlePresetClick(value)}
              className={`py-3 rounded-lg transition-all duration-200 font-light tracking-wider
                      ${value === currentTime 
                        ? 'bg-white/20 text-white border border-white/30' 
                        : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/5 hover:border-white/20'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Custom time input */}
        <form onSubmit={handleCustomSubmit} className="flex flex-col gap-2">
          <label className="text-white/60 text-sm font-light tracking-wider">
            Custom Time (seconds)
          </label>
          <input
            type="number"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            min="1"
            max="3600"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2
                     text-white text-center focus:outline-none focus:border-white/30
                     transition-colors appearance-none"
            style={{ '-webkit-appearance': 'textfield' }}
          />
          <button
            type="submit"
            className="mt-4 bg-white/10 hover:bg-white/20 text-white/90
                     py-2 rounded-lg transition-all duration-200
                     font-light tracking-wider"
          >
            Set Timer
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;