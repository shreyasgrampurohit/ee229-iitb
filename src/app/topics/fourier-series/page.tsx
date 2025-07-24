/* eslint-disable react/no-unescaped-entities */
'use client';

import FourierSeriesVisualizer from '@/components/FourierSeriesVisualizer';

const FourierSeriesPage = () => {
  return (
    <div className="container mx-auto p-4 prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-4">3. Fourier Series</h1>

      <h2 className="text-2xl font-semibold mt-8">Decomposing Signals into Sines and Cosines</h2>
      <p>
        The <strong>Fourier Series</strong> is a powerful mathematical tool for representing a periodic function as an infinite sum of sine and cosine functions. The core idea, proposed by Joseph Fourier, is that any periodic signal, no matter how complex, can be broken down into a combination of simple, harmonically related sinusoids.
      </p>
      <p>
        For a periodic function <em>f(t)</em> with period <em>T</em>, the Fourier series is given by:
      </p>
      <p className="text-center text-lg font-medium bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
        <em>f(t) = a<sub>0</sub> + Σ [a<sub>n</sub> cos(nω<sub>0</sub>t) + b<sub>n</sub> sin(nω<sub>0</sub>t)]</em>
      </p>
      <p>
        Where the sum is from <em>n=1</em> to infinity. Here:
      </p>
      <ul>
        <li><em>ω<sub>0</sub> = 2π/T</em> is the <strong>fundamental frequency</strong> of the signal.</li>
        <li>The term for <em>n=1</em> is the <strong>fundamental harmonic</strong>.</li>
        <li>Terms for <em>n &gt; 1</em> are the <strong>harmonics</strong> (or overtones).</li>
        <li><em>a<sub>0</sub></em> is the DC offset or average value of the signal.</li>
        <li><em>a<sub>n</sub></em> and <em>b<sub>n</sub></em> are the <strong>Fourier coefficients</strong>, which represent the amplitude of the cosine and sine waves at each harmonic frequency <em>nω<sub>0</sub></em>.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8">Why is this useful?</h2>
      <p>
        The Fourier Series is fundamental to nearly every field of science and engineering. It allows us to move from the <strong>time domain</strong> (viewing a signal as a function of time) to the <strong>frequency domain</strong> (viewing a signal as a collection of frequencies). This is incredibly useful for:
      </p>
      <ul>
        <li><strong>System Analysis:</strong> Understanding how an LTI system affects a signal is much simpler in the frequency domain.</li>
        <li><strong>Filtering:</strong> We can easily remove unwanted noise or isolate specific frequency components of a signal.</li>
        <li><strong>Data Compression:</strong> By discarding harmonics with small amplitudes, we can compress data like images (JPEG) and audio (MP3) with minimal perceptual loss.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8">Interactive Fourier Series Visualization</h2>
      <p>
        The visualization below builds a signal by adding one harmonic at a time. You can choose a target signal (like a square wave or sawtooth wave) and use the slider to increase the number of harmonics used in the approximation.
      </p>
      <p>
        Notice how the approximation gets closer to the ideal signal as you add more harmonics. Also, observe the <strong>Gibbs phenomenon</strong> near the discontinuities of the square wave—the small overshoots that don't disappear even with a large number of harmonics.
      </p>

      <div className="not-prose">
        <FourierSeriesVisualizer />
      </div>
    </div>
  );
};

export default FourierSeriesPage;
