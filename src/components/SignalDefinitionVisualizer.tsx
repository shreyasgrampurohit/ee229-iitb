"use client";

import { useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const SignalDefinitionVisualizer = () => {
  const [selectedSignal, setSelectedSignal] = useState('sine');
  
  const generateData = () => {
    const data = [];
    for (let t = -2; t <= 2; t += 0.1) {
      let value;
      switch (selectedSignal) {
        case 'sine':
          value = Math.sin(2 * Math.PI * t);
          break;
        case 'square':
          value = Math.sign(Math.sin(2 * Math.PI * t));
          break;
        case 'sawtooth':
          value = 2 * (t - Math.floor(t + 0.5));
          break;
        case 'exponential':
          value = Math.exp(-Math.abs(t));
          break;
        default:
          value = 0;
      }
      data.push({ t: parseFloat(t.toFixed(1)), value: parseFloat(value.toFixed(3)) });
    }
    return data;
  };

  const data = generateData();

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
      <h4 className="text-lg font-semibold mb-4">Signal Examples</h4>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Signal Type:</label>
        <select 
          value={selectedSignal} 
          onChange={(e) => setSelectedSignal(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="sine">Sine Wave</option>
          <option value="square">Square Wave</option>
          <option value="sawtooth">Sawtooth Wave</option>
          <option value="exponential">Exponential Decay</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="t" label={{ value: 'Time (t)', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'x(t)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => [value, 'x(t)']} />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SignalDefinitionVisualizer;
