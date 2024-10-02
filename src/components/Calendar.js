import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';

const Calendar = ({ selectedDate, onSelectDate, moodData }) => {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(monthStart);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => onSelectDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>
          &lt;
        </button>
        <h2 className="text-lg font-semibold">{format(selectedDate, 'MMMM yyyy')}</h2>
        <button onClick={() => onSelectDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold">{day}</div>
        ))}
        {daysInMonth.map(date => (
          <button
            key={date}
            onClick={() => onSelectDate(date)}
            className={`h-10 w-10 rounded-full flex items-center justify-center
              ${isSameMonth(date, selectedDate) ? 'text-gray-700' : 'text-gray-300'}
              ${isSameDay(date, selectedDate) ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
          >
            {format(date, 'd')}
            {moodData[format(date, 'yyyy-MM-dd')]?.mood && (
              <span className="text-xs ml-1">{moodData[format(date, 'yyyy-MM-dd')].mood}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;