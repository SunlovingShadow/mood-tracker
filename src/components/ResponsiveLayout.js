import React from 'react';
import { format } from 'date-fns';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot } from 'recharts';
import Calendar from './Calendar';
import MoodSelector from './MoodSelector';
import MoodChart from './MoodChart';
import TaskList from './TaskList';
import Diary from './Diary';
import DiaryList from './DiaryList';
import PomodoroTimer from './PomodoroTimer';

const moods = [
  { emoji: '😄', label: 'Happy' },
  { emoji: '😊', label: 'Content' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😕', label: 'Confused' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '😴', label: 'Tired' }
].reverse();

const ResponsiveLayout = ({
  selectedDate,
  selectedMood,
  diaryEntries,
  tasks,
  onSelectDate,
  onMoodSelect,
  onDiaryEntry,
  onAddTask,
  onToggleTask
}) => {
  const moodChartData = Object.entries(diaryEntries)
    .map(([date, entry]) => ({
      date,
      mood: entry.mood ? moods.findIndex(m => m.emoji === entry.mood) : null,
      note: entry.text || ''
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // const CustomYAxisTick = ({ x, y, payload }) => (
  //   <g transform={`translate(${x},${y})`}>
  //     <text x={-15} y={4} textAnchor="end" fill="#666">
  //       {moods[payload.value]?.emoji || ''}
  //     </text>
  //   </g>
  // );

  // const CustomTooltip = ({ active, payload, label }) => {
  //   if (active && payload && payload.length) {
  //     const data = payload[0].payload;
  //     return (
  //       <div className="bg-white p-2 border rounded shadow">
  //         <p className="font-semibold">{format(new Date(label), 'MMM d, yyyy')}</p>
  //         <p>Mood: {moods[data.mood]?.emoji} {moods[data.mood]?.label}</p>
  //         {data.note && <p>Note: {data.note}</p>}
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <Calendar selectedDate={selectedDate} onSelectDate={onSelectDate} moodData={diaryEntries} />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
            <MoodSelector onSelectMood={onMoodSelect} selectedMood={selectedMood} moods={moods} />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
            <TaskList tasks={tasks} onAddTask={onAddTask} onToggleTask={onToggleTask} />
          </div>
          <PomodoroTimer />
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Diary Entry for {format(selectedDate, 'MMMM d, yyyy')}</h2>
            <Diary 
              selectedDate={selectedDate}
              entry={diaryEntries[format(selectedDate, 'yyyy-MM-dd')]?.text || ''}
              mood={selectedMood}
              onSave={onDiaryEntry}
            />
          </div>
       
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
  <h2 className="text-xl font-semibold mb-4">Mood Chart</h2>
  <MoodChart moodData={moodChartData} moods={moods} />

          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Diary Entries</h2>
            <DiaryList entries={Object.values(diaryEntries)} onSelectEntry={onSelectDate} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResponsiveLayout;