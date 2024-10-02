import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Diary = ({ selectedDate, entry, mood, onSave }) => {
  const [diaryEntry, setDiaryEntry] = useState(entry);

  useEffect(() => {
    setDiaryEntry(entry);
  }, [selectedDate, entry]);

  const handleSave = () => {
    onSave(diaryEntry);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-2xl font-bold mb-4">
        Diary Entry for {format(selectedDate, 'MMMM d, yyyy')} {mood && <span className="text-2xl">{mood}</span>}
      </h2>
      <textarea
        className="w-full h-40 p-4 border rounded-md mb-4 resize-none"
        value={diaryEntry}
        onChange={(e) => setDiaryEntry(e.target.value)}
        placeholder="Write about your day..."
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={handleSave}
      >
        Save Entry
      </button>
    </div>
  );
};

export default Diary;