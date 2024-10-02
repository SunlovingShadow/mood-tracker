//MoodChart.js
import React from 'react';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot } from 'recharts';

const MoodChart = ({ moodData, moods }) => {
  const CustomYAxisTick = ({ x, y, payload }) => (
    <g transform={`translate(${x},${y})`}>
      <text x={-15} y={4} textAnchor="end" fill="#666">
        {moods[payload.value]?.emoji || ''}
      </text>
    </g>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-semibold">{format(new Date(label), 'MMM d, yyyy')}</p>
          <p>Mood: {moods[data.mood]?.emoji} {moods[data.mood]?.label}</p>
          {data.note && <p>Note: {data.note}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={moodData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={(date) => format(new Date(date), 'MMM d')} />
        <YAxis domain={[0, 6]} ticks={[0, 1, 2, 3, 4, 5, 6]} tick={<CustomYAxisTick />} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="mood" stroke="#8884d8" />
        {moodData.map((entry, index) =>
          entry.note ? (
            <ReferenceDot
              key={index}
              x={entry.date}
              y={entry.mood}
              r={4}
              fill="#ff4757"
              stroke="none"
            />
          ) : null
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MoodChart;

