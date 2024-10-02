// src/App.js
import React, { useState } from 'react';
import { format } from 'date-fns';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './contexts/ThemeContext';
import ResponsiveLayout from './components/ResponsiveLayout';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMood, setSelectedMood] = useState(null);
  const [diaryEntries, setDiaryEntries] = useState({});
  const [tasks, setTasks] = useState([]);
  const { currentTheme, themes } = useTheme();

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    const dateKey = format(date, 'yyyy-MM-dd');
    setSelectedMood(diaryEntries[dateKey]?.mood || null);
  };

  const handleDiaryEntry = (entry) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    setDiaryEntries((prev) => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        text: entry,
        date: selectedDate,
        mood: selectedMood,
      },
    }));
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    setDiaryEntries((prev) => ({
      ...prev,
      [dateKey]: { ...prev[dateKey], mood: mood, date: selectedDate },
    }));
  };

  const handleAddTask = (task) => {
    setTasks((prev) => [...prev, { id: Date.now(), text: task, completed: false }]);
  };

  const handleToggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
      <header className="p-4 flex justify-between items-center" style={{ background: 'var(--header-bg)', transition: 'background 0.3s ease' }}>
        <h1 className="text-3xl font-bold">Mood Tracker</h1>
        <ThemeToggle />
      </header>

      <ResponsiveLayout
        selectedDate={selectedDate}
        selectedMood={selectedMood}
        diaryEntries={diaryEntries}
        tasks={tasks}
        onSelectDate={handleSelectDate}
        onMoodSelect={handleMoodSelect}
        onDiaryEntry={handleDiaryEntry}
        onAddTask={handleAddTask}
        onToggleTask={handleToggleTask}
      />

      <footer className="p-4 text-center" style={{ background: 'var(--header-bg)', transition: 'background 0.3s ease' }}>
        © 2024 BingChillin'. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
