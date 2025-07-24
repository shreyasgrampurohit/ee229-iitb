"use client";

import { useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const SignalPropertiesVisualizer = () => {
  const [selectedProperty, setSelectedProperty] = useState('even-odd');
  
  const generateEvenOddData = () => {
    const data = [];
    for (let t = -3; t <= 3; t += 0.1) {
      // Use a signal that has both even and odd components: x(t) = t * e^(-0.2*t^2) + cos(t)
      const signal = t * Math.exp(-0.2 * t * t) + 0.5 * Math.cos(t);
      const signalAtMinusT = (-t) * Math.exp(-0.2 * t * t) + 0.5 * Math.cos(-t);
      const evenPart = 0.5 * (signal + signalAtMinusT);
      const oddPart = 0.5 * (signal - signalAtMinusT);
      
      data.push({
        t: parseFloat(t.toFixed(1)),
        signal: parseFloat(signal.toFixed(3)),
        even: parseFloat(evenPart.toFixed(3)),
        odd: parseFloat(oddPart.toFixed(3))
      });
    }
    return data;
  };

  const generatePeriodicData = () => {
    const data = [];
    for (let t = 0; t <= 12; t += 0.1) {
      const period = 2;
      const fundamental = Math.sin(2 * Math.PI * t / period);
      const harmonic = 0.3 * Math.sin(4 * Math.PI * t / period);
      const composite = fundamental + harmonic;
      
      data.push({
        t: parseFloat(t.toFixed(1)),
        fundamental: parseFloat(fundamental.toFixed(3)),
        harmonic: parseFloat(harmonic.toFixed(3)),
        composite: parseFloat(composite.toFixed(3))
      });
    }
    return data;
  };

  const evenOddData = generateEvenOddData();
  const periodicData = generatePeriodicData();

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
      <h4 className="text-lg font-semibold mb-4">Signal Properties</h4>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Property to visualize:</label>
        <select 
          value={selectedProperty} 
          onChange={(e) => setSelectedProperty(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="even-odd">Even and Odd Decomposition</option>
          <option value="periodic">Periodic Signals</option>
        </select>
      </div>

      {selectedProperty === 'even-odd' && (
        <div>
          <p className="text-sm mb-3">Any signal can be decomposed into even and odd parts: x(t) = x_e(t) + x_o(t)</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={evenOddData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="t" label={{ value: 'Time (t)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Amplitude', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="signal" stroke="#f59e0b" strokeWidth={3} name="Original x(t)" />
              <Line type="monotone" dataKey="even" stroke="#10b981" strokeWidth={2} name="Even part x_e(t)" />
              <Line type="monotone" dataKey="odd" stroke="#ef4444" strokeWidth={2} name="Odd part x_o(t)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {selectedProperty === 'periodic' && (
        <div>
          <p className="text-sm mb-3">Periodic signals repeat with period T. Here: fundamental (T=2) + harmonic (T=1)</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={periodicData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="t" label={{ value: 'Time (t)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Amplitude', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="fundamental" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" name="Fundamental" />
              <Line type="monotone" dataKey="harmonic" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="3 3" name="Harmonic" />
              <Line type="monotone" dataKey="composite" stroke="#f59e0b" strokeWidth={3} name="Composite" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default SignalPropertiesVisualizer;
