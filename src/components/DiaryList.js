import React, { useState } from 'react';
import { format } from 'date-fns';

const DiaryList = ({ entries, onSelectEntry }) => {
  const [sortOrder, setSortOrder] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');

  const sortedEntries = [...entries].sort((a, b) => {
    return sortOrder === 'latest' ? b.date - a.date : a.date - b.date;
  });

  const filteredEntries = sortedEntries.filter(entry => 
    entry.text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    format(entry.date, 'yyyy-MM-dd').includes(searchTerm)
  );

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border rounded-l"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded-r"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
      <ul className="space-y-2">
        {filteredEntries.map(entry => (
          <li key={format(entry.date, 'yyyy-MM-dd')} className="border-b pb-2">
            <button onClick={() => onSelectEntry(entry.date)} className="text-left w-full">
              <strong>{format(entry.date, 'MMMM d, yyyy')}</strong> {entry.mood}
              <p className="text-sm text-gray-600">{entry.text ? entry.text.substring(0, 50) + '...' : 'No entry'}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaryList;