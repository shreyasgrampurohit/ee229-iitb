"use client";

import { useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const ContinuousDiscreteVisualizer = () => {
  const [showDiscrete, setShowDiscrete] = useState(false);
  
  const generateContinuousData = () => {
    const data = [];
    for (let t = 0; t <= 4; t += 0.05) {
      const value = Math.sin(2 * Math.PI * t) * Math.exp(-0.2 * t);
      data.push({ t: parseFloat(t.toFixed(2)), continuous: parseFloat(value.toFixed(3)) });
    }
    return data;
  };

  const generateDiscreteData = () => {
    const data = [];
    for (let n = 0; n <= 20; n++) {
      const t = n * 0.2; // Sample every 0.2 seconds
      const value = Math.sin(2 * Math.PI * t) * Math.exp(-0.2 * t);
      data.push({ n, t: parseFloat(t.toFixed(1)), discrete: parseFloat(value.toFixed(3)) });
    }
    return data;
  };

  const continuousData = generateContinuousData();
  const discreteData = generateDiscreteData();

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
      <h4 className="text-lg font-semibold mb-4">Continuous vs Discrete Signals</h4>
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showDiscrete}
            onChange={(e) => setShowDiscrete(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm">Show discrete-time sampling</span>
        </label>
      </div>
      
      <div className="space-y-4">
        <div>
          <h5 className="text-md font-medium mb-2">Continuous-Time Signal x(t)</h5>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={continuousData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="t" label={{ value: 'Time (t)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'x(t)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [value, 'x(t)']} />
              <Line type="monotone" dataKey="continuous" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {showDiscrete && (
          <div>
            <h5 className="text-md font-medium mb-2">Discrete-Time Signal x[n]</h5>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={discreteData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="n" label={{ value: 'Sample (n)', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'x[n]', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [value, 'x[n]']} labelFormatter={(n) => `Sample ${n} (t = ${discreteData[n]?.t}s)`} />
                <Line type="monotone" dataKey="discrete" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContinuousDiscreteVisualizer;
