'use client';

import { useMemo, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type SignalType = 'sine' | 'cosine' | 'square' | 'sawtooth';

const SignalPlot = () => {
  const [signalType, setSignalType] = useState<SignalType>('sine');
  const [frequency, setFrequency] = useState(1);
  const [amplitude, setAmplitude] = useState(1);

  const data = useMemo(() => {
    const points = [];
    for (let i = 0; i < 100; i++) {
      const t = i / 50; // time from 0 to 2
      let value;
      switch (signalType) {
        case 'sine':
          value = amplitude * Math.sin(2 * Math.PI * frequency * t);
          break;
        case 'cosine':
            value = amplitude * Math.cos(2 * Math.PI * frequency * t);
            break;
        case 'square':
          value = amplitude * Math.sign(Math.sin(2 * Math.PI * frequency * t));
          break;
        case 'sawtooth':
          value = amplitude * (2 * (t * frequency - Math.floor(0.5 + t * frequency)));
          break;
        default:
          value = 0;
      }
      points.push({ t, value });
    }
    return points;
  }, [signalType, frequency, amplitude]);

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label htmlFor="signal-type" className="mr-2">Signal Type:</label>
          <select id="signal-type" value={signalType} onChange={(e) => setSignalType(e.target.value as SignalType)} className="p-1 border rounded">
            <option value="sine">Sine</option>
            <option value="cosine">Cosine</option>
            <option value="square">Square</option>
            <option value="sawtooth">Sawtooth</option>
          </select>
        </div>
        <div>
          <label htmlFor="frequency" className="mr-2">Frequency:</label>
          <input type="range" id="frequency" min="1" max="10" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} className="align-middle" />
          <span className="ml-2">{frequency} Hz</span>
        </div>
        <div>
          <label htmlFor="amplitude" className="mr-2">Amplitude:</label>
          <input type="range" id="amplitude" min="0.1" max="2" step="0.1" value={amplitude} onChange={(e) => setAmplitude(Number(e.target.value))} className="align-middle" />
          <span className="ml-2">{amplitude.toFixed(1)}</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="t" label={{ value: 'Time (s)', position: 'insideBottom', offset: -5 }} />
          <YAxis label={{ value: 'Amplitude', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line isAnimationActive={false} type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SignalPlot;
