// components/PlayerTimer.jsx
import React, { useState } from 'react';
import Timer from './Timer';

function PlayerTimer({ player, onNameChange, onRemove }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(player.name);
  
  const timer = Timer({
    initialTime: player.time,
    onTimeUp: () => {
      // Additional actions when time is up can be added here
    }
  });

  const handleNameSubmit = (e) => {
    e.preventDefault();
    onNameChange(player.id, name);
    setIsEditing(false);
  };

  return (
    <div className={`p-6 rounded-lg shadow-md ${timer.isRunning ? 'bg-green-50' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-4">
        {isEditing ? (
          <form onSubmit={handleNameSubmit} className="flex-1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              autoFocus
            />
          </form>
        ) : (
          <h2 className="text-xl font-semibold text-gray-800">{player.name}</h2>
        )}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="ml-2 text-gray-600 hover:text-gray-800"
        >
          {isEditing ? '✓' : '✎'}
        </button>
        <button
          onClick={() => onRemove(player.id)}
          className="ml-2 text-red-600 hover:text-red-800"
        >
          ✕
        </button>
      </div>
      
      <div className="text-4xl font-mono text-center my-4">
        {timer.formatTime}
      </div>
      
      <div className="flex justify-center gap-2">
        <button
          onClick={timer.toggleTimer}
          className={`px-4 py-2 rounded ${
            timer.isRunning
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          } text-white transition-colors`}
        >
          {timer.isRunning ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={timer.resetTimer}
          className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default PlayerTimer;