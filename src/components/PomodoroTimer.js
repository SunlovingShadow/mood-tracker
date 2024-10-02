import React, { useState, useEffect } from 'react';

const MODES = {
  pomodoro: { label: 'Pomodoro', duration: 25 * 60 },
  shortBreak: { label: 'Short Break', duration: 5 * 60 },
  longBreak: { label: 'Long Break', duration: 15 * 60 },
};

const PomodoroTimer = () => {
  const [mode, setMode] = useState('pomodoro');
  const [timeLeft, setTimeLeft] = useState(MODES[mode].duration);
  const [isActive, setIsActive] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [durations, setDurations] = useState({
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  });

  // Load durations from localStorage on initial render
  useEffect(() => {
    const savedDurations = JSON.parse(localStorage.getItem('pomodoroDurations'));
    if (savedDurations) {
      setDurations(savedDurations);
      setTimeLeft(savedDurations[mode]);
    }
  }, [mode]);

  // Save durations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pomodoroDurations', JSON.stringify(durations));
  }, [durations]);

  // Update timeLeft when mode changes
  useEffect(() => {
    setTimeLeft(durations[mode]);
    setIsActive(false);
  }, [mode, durations]);

  // Timer logic
  useEffect(() => {
    let timer = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (mode === 'pomodoro') {
        setCompletedPomodoros((prev) => prev + 1);
      }
      const audio = new Audio('/alarm.mp3');
      audio.play();
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Time\'s up!', {
          body: `${MODES[mode].label} session has ended.`,
        });
      }
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, mode]);

  // Request notification permission on component mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const toggleTimer = () => setIsActive((prev) => !prev);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(durations[mode]);
  };
  const changeMode = (newMode) => setMode(newMode);
  const handleDurationChange = (modeKey, newDuration) => {
    setDurations((prev) => ({
      ...prev,
      [modeKey]: newDuration * 60,
    }));
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const totalDuration = durations[mode];
  const progress = ((totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h2 className="text-2xl font-semibold text-center mb-6">Pomodoro Timer</h2>
      
      <div className="w-full bg-gray-200 h-2 rounded mb-4">
        <div
          className="bg-blue-500 h-2 rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="text-6xl font-bold text-center mb-6">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <div className="flex justify-center space-x-2 mb-6">
        {Object.keys(MODES).map((modeKey) => (
          <button
            key={modeKey}
            className={`px-4 py-2 rounded ${
              mode === modeKey ? 'bg-blue-500 text-white' : 'bg-gray-200'
            } focus:outline-none`}
            onClick={() => changeMode(modeKey)}
          >
            {MODES[modeKey].label}
          </button>
        ))}
      </div>

      <div className="flex justify-center space-x-2 mb-6">
        <button
          className={`px-6 py-2 rounded ${
            isActive ? 'bg-red-500' : 'bg-green-500'
          } text-white focus:outline-none`}
          onClick={toggleTimer}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          className="px-6 py-2 rounded bg-gray-500 text-white focus:outline-none"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>

      <div className="text-center mb-6">
        <p className="text-lg">Completed Pomodoros: {completedPomodoros}</p>
      </div>

      <div className="flex justify-center">
        <button
          className="px-4 py-2 rounded bg-gray-300 focus:outline-none"
          onClick={() => setShowSettings(true)}
        >
          Settings
        </button>
      </div>

      {showSettings && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white rounded-lg p-6 w-80">
            <h3 className="text-xl font-semibold mb-4">Settings</h3>
            {Object.keys(MODES).map((modeKey) => (
              <div key={modeKey} className="mb-4">
                <label className="block mb-1 font-medium">
                  {MODES[modeKey].label} Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  value={durations[modeKey] / 60}
                  onChange={(e) =>
                    handleDurationChange(modeKey, parseInt(e.target.value) || 1)
                  }
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
                />
              </div>
            ))}
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 rounded bg-blue-500 text-white focus:outline-none"
                onClick={() => setShowSettings(false)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer;