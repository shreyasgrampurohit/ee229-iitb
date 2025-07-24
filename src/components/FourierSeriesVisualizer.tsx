'use client';

import { useMemo, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type SignalType = 'square' | 'sawtooth';

// Function to calculate Fourier series coefficients and reconstruct the signal
const generateFourierSeries = (signalType: SignalType, numHarmonics: number, totalPoints: number) => {
  const reconstructedSignal = Array(totalPoints).fill(0);
  const t = Array.from({ length: totalPoints }, (_, i) => (i / totalPoints) * 2 * Math.PI); // Time from 0 to 2*pi

  if (signalType === 'square') {
    for (let n = 1; n <= numHarmonics; n++) {
      const k = 2 * n - 1; // Only odd harmonics
      for (let i = 0; i < totalPoints; i++) {
        reconstructedSignal[i] += (4 / Math.PI) * (1 / k) * Math.sin(k * t[i]);
      }
    }
  } else if (signalType === 'sawtooth') {
    for (let n = 1; n <= numHarmonics; n++) {
      for (let i = 0; i < totalPoints; i++) {
        reconstructedSignal[i] += (2 / Math.PI) * (Math.pow(-1, n + 1) / n) * Math.sin(n * t[i]);
      }
    }
  }

  return reconstructedSignal;
};

// Function to generate the ideal signal for comparison
const generateIdealSignal = (signalType: SignalType, totalPoints: number) => {
    const idealSignal = Array(totalPoints).fill(0);
    const t = Array.from({ length: totalPoints }, (_, i) => (i / totalPoints) * 2 * Math.PI);

    if (signalType === 'square') {
        for (let i = 0; i < totalPoints; i++) {
            idealSignal[i] = Math.sin(t[i]) >= 0 ? 1 : -1;
        }
    } else if (signalType === 'sawtooth') {
        for (let i = 0; i < totalPoints; i++) {
            // Wrap time to the interval [-PI, PI) to make the signal periodic
            const t_wrapped = (t[i] + Math.PI) % (2 * Math.PI) - Math.PI;
            // The Fourier series converges to t/PI on this interval
            idealSignal[i] = t_wrapped / Math.PI;
        }
    }
    return idealSignal;
}

const totalPoints = 500;

const FourierSeriesVisualizer = () => {
  const [numHarmonics, setNumHarmonics] = useState(1);
  const [signalType, setSignalType] = useState<SignalType>('square');

  const chartData = useMemo(() => {
    const fourierSignal = generateFourierSeries(signalType, numHarmonics, totalPoints);
    const idealSignal = generateIdealSignal(signalType, totalPoints);
    
    return Array.from({ length: totalPoints }, (_, i) => ({
      x: (i / totalPoints) * 2, // Scale x-axis to be in terms of pi
      fourier: fourierSignal[i],
      ideal: idealSignal[i],
    }));
  }, [numHarmonics, signalType]);

  return (
    <div className="p-4 border rounded-lg space-y-8 bg-white dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <label htmlFor="signal-type" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Signal Type</label>
          <select id="signal-type" value={signalType} onChange={(e) => setSignalType(e.target.value as SignalType)} className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600">
            <option value="square">Square Wave</option>
            <option value="sawtooth">Sawtooth Wave</option>
          </select>
        </div>
        <div>
          <label htmlFor="harmonics-slider" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Number of Harmonics: {numHarmonics}</label>
          <input
            type="range"
            id="harmonics-slider"
            min="1"
            max="100"
            value={numHarmonics}
            onChange={(e) => setNumHarmonics(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" type="number" domain={[0, 2]} label={{ value: 't / π', position: 'insideBottomRight', offset: -5 }}/>
          <YAxis domain={[-1.5, 1.5]} />
          <Tooltip />
          <Legend />
          <Line isAnimationActive={false} type="monotone" name="Fourier Approximation" dataKey="fourier" stroke="#8884d8" dot={false} strokeWidth={2} />
          <Line isAnimationActive={false} type="monotone" name="Ideal Signal" dataKey="ideal" stroke="#82ca9d" strokeDasharray="5 5" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FourierSeriesVisualizer;
