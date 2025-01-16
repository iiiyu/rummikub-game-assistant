// src/App.jsx
import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import Settings from './components/Settings';
import { getBackgroundColor } from './utils/colors';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Load saved duration from localStorage or default to 60
  const savedDuration = parseInt(localStorage.getItem('timerDuration')) || 60;
  const [timeLeft, setTimeLeft] = useState(savedDuration);
  const [defaultDuration, setDefaultDuration] = useState(savedDuration);

  const handleScreenClick = () => {
    if (isSettingsOpen) return;

    if (!hasStarted) {
      setHasStarted(true);
      setIsRunning(true);
      return;
    }

    if (timeLeft > 0) {
      setIsRunning(false);
      setTimeLeft(defaultDuration);
      setTimeout(() => setIsRunning(true), 10);
    }
  };

  const handleStop = (e) => {
    e.stopPropagation();
    setIsRunning(false);
    setTimeLeft(defaultDuration);
    setHasStarted(false);
  };

  const handleTimeSet = (seconds) => {
    const newDuration = Math.max(1, Math.min(3600, seconds));
    setDefaultDuration(newDuration);
    setTimeLeft(newDuration);
    localStorage.setItem('timerDuration', newDuration.toString());
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ 
        backgroundColor: getBackgroundColor(timeLeft, defaultDuration),
        transition: 'background-color 0.5s ease'
      }}
      onClick={handleScreenClick}
    >
      {/* Decorative background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-white/5 blur-3xl transform rotate-12" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative z-10">
        <Timer 
          isRunning={isRunning}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          setIsRunning={setIsRunning}
        />
      </div>

      {!hasStarted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm transition-opacity duration-500">
          <div className="text-white/80 text-base sm:text-xl md:text-2xl font-extralight tracking-[0.4em] sm:tracking-[0.5em] uppercase animate-pulse transform hover:scale-105 transition-all duration-500 px-4 text-center">
            Touch to Start
          </div>
        </div>
      )}
      
      {/* Settings button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsSettingsOpen(true);
        }}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white/90
                 p-2.5 sm:p-3 rounded-full backdrop-blur-sm shadow-lg transition-all duration-300
                 transform hover:scale-105 active:scale-95 border border-white/10"
        aria-label="Settings"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Stop button */}
      <button
        onClick={handleStop}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 sm:bottom-8 sm:left-auto sm:right-8 sm:translate-x-0
                 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white/90
                 px-6 py-2 sm:px-5 sm:py-3 rounded-full backdrop-blur-sm shadow-lg transition-all duration-300 font-light
                 tracking-[0.3em] text-sm sm:text-base transform hover:scale-105 active:scale-95 border border-white/10"
      >
        STOP
      </button>

      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onTimeSet={handleTimeSet}
        currentTime={defaultDuration}
      />
    </div>
  );
}

export default App;