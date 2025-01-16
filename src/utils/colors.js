// src/utils/colors.js
export const getBackgroundColor = (timeLeft, totalTime) => {
  // Convert time ratio to a value between 0 and 1
  const ratio = timeLeft / totalTime;
  
  // Define beautiful colors for start and end
  const startColor = { r: 34, g: 197, b: 94 }; // A beautiful green
  const endColor = { r: 239, g: 68, b: 68 };   // A beautiful red
  
  // Interpolate between the colors
  const r = Math.round(startColor.r + (endColor.r - startColor.r) * (1 - ratio));
  const g = Math.round(startColor.g + (endColor.g - startColor.g) * (1 - ratio));
  const b = Math.round(startColor.b + (endColor.b - startColor.b) * (1 - ratio));
  
  return `rgb(${r}, ${g}, ${b})`;
};