// src/utils/sounds.js
class SoundGenerator {
  constructor() {
    this.audioContext = null;
  }

  initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  createBeep(frequency = 880, duration = 0.5) {
    this.initAudioContext();
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, this.audioContext.currentTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }
}

const soundGenerator = new SoundGenerator();

export const playAlertSound = () => {
  try {
    soundGenerator.createBeep(880, 0.5); // A5 note for end alert
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

export const playWarningSound = () => {
  try {
    // Play two short D5 notes for warning
    soundGenerator.createBeep(587.33, 0.2); // D5 note
    setTimeout(() => soundGenerator.createBeep(587.33, 0.2), 300);
  } catch (error) {
    console.error('Error playing warning sound:', error);
  }
};