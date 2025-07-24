"use client";

import { useState } from 'react';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const ElementarySignalsVisualizer = () => {
  const [selectedSignal, setSelectedSignal] = useState('exponential');
  const [parameter, setParameter] = useState(1);
  
  const generateData = () => {
    const data = [];
    const range = selectedSignal === 'impulse' ? 0.5 : 4;
    const step = selectedSignal === 'impulse' ? 0.01 : 0.1;
    
    for (let t = -range; t <= range; t += step) {
      let value = 0;
      
      switch (selectedSignal) {
        case 'exponential':
          value = Math.exp(parameter * t);
          break;
        case 'sinusoid':
          value = Math.cos(parameter * t);
          break;
        case 'step':
          value = t >= 0 ? 1 : 0;
          break;
        case 'impulse':
          // Approximate impulse as very narrow pulse
          value = Math.abs(t) < 0.05 ? 20 : 0;
          break;
        case 'decaying-exp':
          value = Math.exp(-parameter * Math.abs(t));
          break;
        default:
          value = 0;
      }
      
      data.push({ 
        t: parseFloat(t.toFixed(2)), 
        value: parseFloat(value.toFixed(3)) 
      });
    }
    return data;
  };

  const data = generateData();

  const getParameterInfo = () => {
    switch (selectedSignal) {
      case 'exponential':
        return { label: 'Exponent (a)', min: -2, max: 2, step: 0.1 };
      case 'sinusoid':
        return { label: 'Frequency (ω)', min: 0.5, max: 4, step: 0.1 };
      case 'decaying-exp':
        return { label: 'Decay rate (a)', min: 0.1, max: 3, step: 0.1 };
      default:
        return null;
    }
  };

  const paramInfo = getParameterInfo();

  const getSignalEquation = () => {
    switch (selectedSignal) {
      case 'exponential':
        return `x(t) = e^(${parameter}t)`;
      case 'sinusoid':
        return `x(t) = cos(${parameter}t)`;
      case 'step':
        return 'x(t) = u(t)';
      case 'impulse':
        return 'x(t) = δ(t)';
      case 'decaying-exp':
        return `x(t) = e^(-${parameter}|t|)`;
      default:
        return '';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
      <h4 className="text-lg font-semibold mb-4">Elementary Signals</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-2">Signal Type:</label>
          <select 
            value={selectedSignal} 
            onChange={(e) => {
              setSelectedSignal(e.target.value);
              setParameter(1); // Reset parameter
            }}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="exponential">Exponential</option>
            <option value="sinusoid">Sinusoid</option>
            <option value="step">Unit Step</option>
            <option value="impulse">Unit Impulse</option>
            <option value="decaying-exp">Decaying Exponential</option>
          </select>
        </div>
        
        {paramInfo && (
          <div>
            <label className="block text-sm font-medium mb-2">{paramInfo.label}:</label>
            <input
              type="range"
              min={paramInfo.min}
              max={paramInfo.max}
              step={paramInfo.step}
              value={parameter}
              onChange={(e) => setParameter(parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="text-xs text-gray-600">{parameter}</span>
          </div>
        )}
      </div>

      <div className="mb-3">
        <span className="text-sm font-medium">Equation: </span>
        <span className="text-sm bg-red-100 dark:bg-red-900 px-2 py-1 rounded font-mono">
          {getSignalEquation()}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="t" label={{ value: 'Time (t)', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'x(t)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => [value, 'x(t)']} />
          <ReferenceLine x={0} stroke="#666" strokeDasharray="2 2" />
          <ReferenceLine y={0} stroke="#666" strokeDasharray="2 2" />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#ef4444" 
            strokeWidth={selectedSignal === 'step' ? 3 : 2} 
            dot={selectedSignal === 'impulse' ? { r: 3 } : false}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ElementarySignalsVisualizer;
