import React from 'react';

const moods = [
  { emoji: '😄', label: 'Happy' },
  { emoji: '😊', label: 'Content' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😕', label: 'Confused' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '😴', label: 'Tired' }
];

const MoodSelector = ({ onSelectMood, selectedMood }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">How are you feeling today?</h3>
      <div className="flex justify-between">
        {moods.map(({ emoji, label }) => (
          <button
            key={emoji}
            onClick={() => onSelectMood(emoji)}
            className={`text-2xl p-2 rounded-full ${selectedMood === emoji ? 'bg-blue-100 ring-2 ring-blue-500' : 'hover:bg-gray-100'}`}
            title={label}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;