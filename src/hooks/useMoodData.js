import { useState, useEffect } from 'react';

const useMoodData = () => {
  const [moodData, setMoodData] = useState({});

  useEffect(() => {
    const storedMoodData = localStorage.getItem('moodData');
    if (storedMoodData) {
      setMoodData(JSON.parse(storedMoodData));
    }
  }, []);

  const logMood = (date, mood) => {
    const newMoodData = { ...moodData, [date]: mood };
    setMoodData(newMoodData);
    localStorage.setItem('moodData', JSON.stringify(newMoodData));
  };

  return { moodData, logMood };
};

export default useMoodData;