// src/components/Timer.jsx
import React, { useEffect } from 'react';
import { playAlertSound, playWarningSound } from '../utils/sounds';

function Timer({ isRunning, timeLeft, setTimeLeft, setIsRunning }) {
  useEffect(() => {
    let interval;
    let startTime;
    
    if (isRunning) {
      startTime = Date.now();
      interval = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        const newTime = timeLeft - elapsedTime;
        
        // Play warning sound at 10 seconds
        if (Math.ceil(newTime) === 10) {
          playWarningSound();
        }
        
        if (newTime <= 0) {
          playAlertSound();
          setTimeout(playAlertSound, 1000);
          setTimeout(playAlertSound, 2000);
          
          setTimeout(() => {
            setTimeLeft(60);
            setIsRunning(true);
          }, 3000);
          
          setIsRunning(false);
          setTimeLeft(0);
          clearInterval(interval);
          return;
        }
        
        setTimeLeft(newTime);
      }, 16.67);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, setTimeLeft, setIsRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const milliseconds = Math.floor((seconds % 1) * 1000);
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
  };

  return (
    <div className="text-center transform transition-transform duration-200">
      <div className="relative inline-block tabular-nums">
        <div className={`text-[3.5rem] sm:text-[6rem] md:text-[8rem] font-mono font-thin text-white drop-shadow-2xl
                      tracking-[0.1em] sm:tracking-[0.15em] transition-all duration-200 ${isRunning ? 'scale-100 opacity-100' : 'scale-95 opacity-90'}`}>
          {formatTime(timeLeft)}
        </div>
        <div className={`absolute -bottom-8 sm:-bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap
                      text-white/60 text-lg sm:text-xl font-extralight tracking-[0.7em] transition-all duration-300
                      ${isRunning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          {timeLeft === 0 ? 'TIME UP' : 'PAUSED'}
        </div>
      </div>
    </div>
  );
}

export default Timer;