// src/components/RulesSection.jsx
import React, { useState } from 'react';

function RulesSection() {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    {
      title: "Basic Rules",
      content: [
        "Rummikub is played with 106 tiles (2 sets of tiles numbered 1-13 in four colors, plus two jokers)",
        "Each player starts with 14 tiles",
        "To make your initial meld, you need combinations worth at least 30 points",
        "Valid combinations are:",
        "- Groups: 3 or 4 same-number tiles of different colors",
        "- Runs: 3 or more consecutive numbers in the same color"
      ]
    },
    {
      title: "Gameplay",
      content: [
        "On your turn, you must either:",
        "1. Place tiles from your rack to the table (if you haven't made initial meld)",
        "2. Add to existing sets on the table",
        "3. Manipulate sets on the table to create new valid combinations",
        "4. Draw one tile if you can't make any moves"
      ]
    },
    {
      title: "Strategies",
      content: [
        "Keep jokers in your rack until necessary",
        "Look for multiple ways to rearrange tiles on the table",
        "Try to keep balanced color and number distributions",
        "Watch other players' moves to anticipate their strategies",
        "Consider keeping high-value tiles for the initial meld"
      ]
    },
    {
      title: "Tips for Beginners",
      content: [
        "Start by organizing your tiles by color or number",
        "Look for natural groups and runs in your rack",
        "Don't be afraid to draw tiles if needed",
        "Watch experienced players to learn new combinations",
        "Practice rearranging tiles to see different possibilities"
      ]
    }
  ];

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-2 px-4 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-colors"
      >
        <h2 className="text-xl font-semibold text-indigo-700">Rules & Strategy Guide</h2>
        <span className="text-2xl">{isOpen ? '−' : '+'}</span>
      </button>
      
      {isOpen && (
        <div className="mt-4 space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{section.title}</h3>
              <ul className="space-y-2">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-600 pl-4">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RulesSection;