'use client';

import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type SignalShape = 'rect' | 'triangle';
type ViewMode = 'separate' | 'combined';

// Generates a signal of a specific shape, centered in the array
const generateSignal = (shape: SignalShape, totalPoints: number): number[] => {
  const signal = Array(totalPoints).fill(0);
  const pulseWidth = Math.floor(totalPoints / 4);
  const start = Math.floor((totalPoints - pulseWidth) / 2);

  for (let i = 0; i < pulseWidth; i++) {
    const index = start + i;
    if (shape === 'rect') {
      signal[index] = 1;
    } else if (shape === 'triangle') {
      const halfWidth = pulseWidth / 2;
      signal[index] = 1 - Math.abs(i - halfWidth) / halfWidth;
    }
  }
  return signal;
};

const totalPoints = 200;
const domain = Array.from({ length: totalPoints }, (_, i) => i - totalPoints / 2);
const scalingFactor = 20;

const ConvolutionVisualizer = () => {
  const [t, setT] = useState(-100);
  const [inputShape, setInputShape] = useState<SignalShape>('rect');
  const [impulseShape, setImpulseShape] = useState<SignalShape>('rect');
  const [viewMode, setViewMode] = useState<ViewMode>('separate');

  const {
    inputSignalData,
    shiftedFlippedImpulseData,
    productData,
    outputSignalData,
    combinedData,
  } = useMemo(() => {
    const inputSignalArr = generateSignal(inputShape, totalPoints);
    const impulseResponseArr = generateSignal(impulseShape, totalPoints);

    const convolutionResult = Array(totalPoints * 2 - 1).fill(0);
    for (let n = 0; n < totalPoints * 2 - 1; n++) {
      let sum = 0;
      for (let k = 0; k < totalPoints; k++) {
        if (n - k >= 0 && n - k < totalPoints) {
          sum += inputSignalArr[k] * impulseResponseArr[n - k];
        }
      }
      convolutionResult[n] = sum / scalingFactor;
    }

    const shiftedFlippedImpulseArr = Array(totalPoints).fill(0);
    const productArr = Array(totalPoints).fill(0);

    for (let i = 0; i < totalPoints; i++) {
      const tau = domain[i];
      const argumentForH = t - tau;
      const impulseIndex = Math.round(argumentForH + totalPoints / 2);

      let impulseValue = 0;
      if (impulseIndex >= 0 && impulseIndex < totalPoints) {
        impulseValue = impulseResponseArr[impulseIndex];
      }
      
      shiftedFlippedImpulseArr[i] = impulseValue;
      productArr[i] = inputSignalArr[i] * shiftedFlippedImpulseArr[i];
    }

    const inputSignalData = domain.map((val, i) => ({ x: val, y: inputSignalArr[i] }));
    const shiftedFlippedImpulseData = domain.map((val, i) => ({ x: val, y: shiftedFlippedImpulseArr[i] }));
    const productData = domain.map((val, i) => ({ x: val, y: productArr[i] }));
    
    const outputSignalData = Array.from({ length: totalPoints * 2 }, (_, i) => {
        const timeVal = i - totalPoints;
        return { x: timeVal, y: convolutionResult[i] || 0 };
    });

    const combinedData = outputSignalData.map(point => {
        const x = point.x;
        const inputPoint = x >= -totalPoints/2 && x < totalPoints/2 ? inputSignalArr[x + totalPoints/2] : undefined;
        const impulsePoint = x >= -totalPoints/2 && x < totalPoints/2 ? shiftedFlippedImpulseArr[x + totalPoints/2] : undefined;
        return {
            x: x,
            output: point.y,
            input: inputPoint,
            impulse: impulsePoint,
        };
    });

    return {
      inputSignalData,
      shiftedFlippedImpulseData,
      productData,
      outputSignalData,
      combinedData,
    };
  }, [t, inputShape, impulseShape]);

  return (
    <div className="p-4 border rounded-lg space-y-8 bg-white dark:bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
                <label htmlFor="input-shape" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Input Signal x(τ)</label>
                <select id="input-shape" value={inputShape} onChange={(e) => setInputShape(e.target.value as SignalShape)} className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600">
                    <option value="rect">Rectangle</option>
                    <option value="triangle">Triangle</option>
                </select>
            </div>
            <div>
                <label htmlFor="impulse-shape" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Impulse Response h(τ)</label>
                <select id="impulse-shape" value={impulseShape} onChange={(e) => setImpulseShape(e.target.value as SignalShape)} className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600">
                    <option value="rect">Rectangle</option>
                    <option value="triangle">Triangle</option>
                </select>
            </div>
            <div className="lg:col-span-2">
                <label htmlFor="t-slider" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Time Shift (t): {t}</label>
                <input
                    type="range"
                    id="t-slider"
                    min={-totalPoints + 20}
                    max={totalPoints - 20}
                    value={t}
                    onChange={(e) => setT(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
            </div>
             <button onClick={() => setViewMode(viewMode === 'separate' ? 'combined' : 'separate')} className="p-2 border rounded-md w-full lg:col-span-4">
                Switch to {viewMode === 'separate' ? 'Combined' : 'Separate'} View
            </button>
      </div>

      {viewMode === 'separate' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
            <h3 className="font-semibold text-center mb-2">Input Signal x(τ)</h3>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={inputSignalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" type="number" domain={[-totalPoints/2, totalPoints/2]} allowDataOverflow/>
                <YAxis domain={[-0.2, 1.2]}/>
                <Line isAnimationActive={false} type="monotone" dataKey="y" stroke="#8884d8" dot={false} strokeWidth={2}/>
                </LineChart>
            </ResponsiveContainer>
            </div>
            <div>
            <h3 className="font-semibold text-center mb-2">Shifted Impulse h(t-τ)</h3>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={shiftedFlippedImpulseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" type="number" domain={[-totalPoints/2, totalPoints/2]} allowDataOverflow/>
                <YAxis domain={[-0.2, 1.2]}/>
                <Line isAnimationActive={false} type="monotone" dataKey="y" stroke="#82ca9d" dot={false} strokeWidth={2}/>
                </LineChart>
            </ResponsiveContainer>
            </div>
            <div>
            <h3 className="font-semibold text-center mb-2">Product x(τ)h(t-τ)</h3>
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={productData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" type="number" domain={[-totalPoints/2, totalPoints/2]} allowDataOverflow/>
                <YAxis domain={[-0.2, 1.2]}/>
                <Tooltip />
                <Area isAnimationActive={false} type="monotone" dataKey="y" stroke="#ffc658" fill="#ffc658" fillOpacity={0.8}/>
                </AreaChart>
            </ResponsiveContainer>
            </div>
            <div>
            <h3 className="font-semibold text-center mb-2">Output Signal y(t)</h3>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={outputSignalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" type="number" domain={[-totalPoints, totalPoints]} allowDataOverflow/>
                <YAxis domain={[-0.2, 3]}/>
                <Tooltip />
                <Line isAnimationActive={false} type="monotone" dataKey="y" stroke="#ff7300" dot={false} strokeWidth={2}/>
                <ReferenceLine isAnimationActive={false} x={t} stroke="red" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
      )}

      {viewMode === 'combined' && (
        <div className="grid grid-cols-1 gap-8">
            <div>
                <h3 className="font-semibold text-center mb-2">Combined View</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={combinedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" type="number" domain={[-totalPoints, totalPoints]} allowDataOverflow/>
                        <YAxis domain={[-0.2, 3]}/>
                        <Tooltip />
                        <Legend />
                        <Line isAnimationActive={false} type="monotone" name="Input x(τ)" dataKey="input" stroke="#8884d8" dot={false} strokeWidth={2}/>
                        <Line isAnimationActive={false} type="monotone" name="Impulse h(t-τ)" dataKey="impulse" stroke="#82ca9d" dot={false} strokeWidth={2}/>
                        <Line isAnimationActive={false} type="monotone" name="Output y(t)" dataKey="output" stroke="#ff7300" dot={false} strokeWidth={2}/>
                        <ReferenceLine isAnimationActive={false} x={t} stroke="red" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div>
                <h3 className="font-semibold text-center mb-2">Product x(τ)h(t-τ)</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={productData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" type="number" domain={[-totalPoints/2, totalPoints/2]} allowDataOverflow/>
                        <YAxis domain={[-0.2, 1.2]}/>
                        <Tooltip />
                        <Area isAnimationActive={false} type="monotone" dataKey="y" stroke="#ffc658" fill="#ffc658" fillOpacity={0.8}/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
      )}
    </div>
  );
};

export default ConvolutionVisualizer;