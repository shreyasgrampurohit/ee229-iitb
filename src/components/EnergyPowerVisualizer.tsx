"use client";

import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const EnergyPowerVisualizer = () => {
  const [selectedExample, setSelectedExample] = useState('finite-energy');
  
  const generateEnergySignalData = () => {
    const data = [];
    let totalEnergy = 0;
    
    for (let t = -3; t <= 3; t += 0.1) {
      const value = Math.exp(-t * t); // Gaussian pulse
      const energyDensity = value * value;
      totalEnergy += energyDensity * 0.1; // Approximate integral
      
      data.push({
        t: parseFloat(t.toFixed(1)),
        amplitude: parseFloat(value.toFixed(3)),
        energyDensity: parseFloat(energyDensity.toFixed(3)),
        cumulativeEnergy: parseFloat(totalEnergy.toFixed(3))
      });
    }
    return { data, totalEnergy };
  };

  const generatePowerSignalData = () => {
    const data = [];
    const period = 2;
    let powerSum = 0;
    let sampleCount = 0;
    
    for (let t = 0; t <= 10; t += 0.1) {
      const value = Math.sin(2 * Math.PI * t / period);
      const instantaneousPower = value * value;
      powerSum += instantaneousPower;
      sampleCount++;
      const averagePower = powerSum / sampleCount;
      
      data.push({
        t: parseFloat(t.toFixed(1)),
        amplitude: parseFloat(value.toFixed(3)),
        instantaneousPower: parseFloat(instantaneousPower.toFixed(3)),
        averagePower: parseFloat(averagePower.toFixed(3))
      });
    }
    return { data, averagePower: powerSum / sampleCount };
  };

  const generateComparisonData = () => {
    return [
      { type: 'Gaussian Pulse', energy: 1.77, power: 0, classification: 'Energy Signal' },
      { type: 'Sinusoid', energy: Infinity, power: 0.5, classification: 'Power Signal' },
      { type: 'Step Function', energy: Infinity, power: 1, classification: 'Power Signal' },
      { type: 'Decaying Exp.', energy: 2.5, power: 0, classification: 'Energy Signal' }
    ];
  };

  const energyResult = generateEnergySignalData();
  const powerResult = generatePowerSignalData();
  const comparisonData = generateComparisonData();

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
      <h4 className="text-lg font-semibold mb-4">Signal Energy and Power</h4>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Example to visualize:</label>
        <select 
          value={selectedExample} 
          onChange={(e) => setSelectedExample(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="finite-energy">Finite Energy Signal (Gaussian)</option>
          <option value="finite-power">Finite Power Signal (Sinusoid)</option>
          <option value="comparison">Energy vs Power Comparison</option>
        </select>
      </div>

      {selectedExample === 'finite-energy' && (
        <div className="space-y-4">
          <div>
            <p className="text-sm mb-2">
              Energy Signal: E = ∫|x(t)|²dt = {energyResult.totalEnergy.toFixed(2)} (finite)
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={energyResult.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="t" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amplitude" stroke="#6366f1" strokeWidth={2} name="x(t)" />
                <Line type="monotone" dataKey="energyDensity" stroke="#f59e0b" strokeWidth={2} name="|x(t)|²" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {selectedExample === 'finite-power' && (
        <div className="space-y-4">
          <div>
            <p className="text-sm mb-2">
              Power Signal: P = {powerResult.averagePower.toFixed(2)} (finite), E = ∞
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={powerResult.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="t" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amplitude" stroke="#10b981" strokeWidth={2} name="x(t)" />
                <Line type="monotone" dataKey="averagePower" stroke="#ef4444" strokeWidth={2} name="Avg Power" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {selectedExample === 'comparison' && (
        <div>
          <p className="text-sm mb-3">Comparison of different signal types (Energy in J, Power in W)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium mb-2">Energy (J)</h5>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={comparisonData.filter(d => d.energy !== Infinity)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="energy" fill="#6366f1" name="Energy (J)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h5 className="text-sm font-medium mb-2">Power (W)</h5>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={comparisonData.filter(d => d.power > 0)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="power" fill="#10b981" name="Power (W)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnergyPowerVisualizer;
