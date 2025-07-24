"use client";

import { useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const TimeTransformationVisualizer = () => {
  const [timeShift, setTimeShift] = useState(0);
  const [timeScale, setTimeScale] = useState(1);
  const [timeReverse, setTimeReverse] = useState(false);
  
  const originalSignal = (t: number) => {
    if (t >= -1 && t <= 0) return t + 1;
    if (t > 0 && t <= 1) return 1 - t;
    return 0;
  };

  const generateData = () => {
    const data = [];
    for (let t = -3; t <= 5; t += 0.1) {
      // For transformed signal, we need to evaluate the original signal at the transformed time
      // If y(t) = x(at - b), then we evaluate x at (at - b)
      let transformedInput = timeScale * t - timeShift; // Scale first, then shift
      if (timeReverse) transformedInput = -transformedInput; // Apply reversal to the input
      
      const originalValue = originalSignal(t);
      const transformedValue = originalSignal(transformedInput);
      
      data.push({ 
        t: parseFloat(t.toFixed(1)), 
        original: parseFloat(originalValue.toFixed(3)),
        transformed: parseFloat(transformedValue.toFixed(3))
      });
    }
    return data;
  };

  const data = generateData();

  const getTransformationText = () => {
    let result = "x(";
    if (timeReverse) result += "-";
    if (timeScale !== 1) result += `${timeScale}`;
    result += "t";
    if (timeShift !== 0) {
      result += timeShift > 0 ? ` - ${timeShift}` : ` + ${Math.abs(timeShift)}`;
    }
    result += ")";
    return result;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
      <h4 className="text-lg font-semibold mb-4">Time Transformations</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Time Shift</label>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={timeShift}
            onChange={(e) => setTimeShift(parseFloat(e.target.value))}
            className="w-full"
          />
          <span className="text-xs text-gray-600">{timeShift}</span>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Time Scale</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={timeScale}
            onChange={(e) => setTimeScale(parseFloat(e.target.value))}
            className="w-full"
          />
          <span className="text-xs text-gray-600">{timeScale}</span>
        </div>
        
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={timeReverse}
              onChange={(e) => setTimeReverse(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Time Reverse</span>
          </label>
        </div>
      </div>

      <div className="mb-2">
        <span className="text-sm font-medium">Current transformation: </span>
        <span className="text-sm bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">{getTransformationText()}</span>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="t" label={{ value: 'Time (t)', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Amplitude', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Line type="monotone" dataKey="original" stroke="#6b7280" strokeWidth={2} strokeDasharray="5 5" name="Original x(t)" />
          <Line type="monotone" dataKey="transformed" stroke="#8b5cf6" strokeWidth={3} name="Transformed" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeTransformationVisualizer;
