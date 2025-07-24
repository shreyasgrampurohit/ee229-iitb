
import ConvolutionVisualizer from '@/components/ConvolutionVisualizer';

const LTISystemsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-4">2. Linear Time-Invariant (LTI) Systems</h1>
      
      <h2 className="text-2xl font-semibold mt-8">What are LTI Systems?</h2>
      <p>
        A system can be thought of as a "black box" that takes an input signal, <em>x(t)</em>, and produces an output signal, <em>y(t)</em>. <strong>Linear Time-Invariant (LTI)</strong> systems are a special class of systems that are both linear and time-invariant. These two properties make them particularly easy to analyze.
      </p>
      <ul>
        <li>
          <strong>Linearity:</strong> A system is linear if it satisfies the superposition principle. This means that if input <em>x<sub>1</sub>(t)</em> produces output <em>y<sub>1</sub>(t)</em> and input <em>x<sub>2</sub>(t)</em> produces output <em>y<sub>2</sub>(t)</em>, then a weighted sum of inputs <em>ax<sub>1</sub>(t) + bx<sub>2</sub>(t)</em> will produce the same weighted sum of outputs <em>ay<sub>1</sub>(t) + by<sub>2</sub>(t)</em>.
        </li>
        <li>
          <strong>Time-Invariance:</strong> A system is time-invariant if a time shift in the input signal results in an identical time shift in the output signal. If input <em>x(t)</em> produces output <em>y(t)</em>, then the input <em>x(t - t<sub>0</sub>)</em> will produce the output <em>y(t - t<sub>0</sub>)</em> for any time shift <em>t<sub>0</sub></em>.
        </li>
      </ul>
      <p>
        Many physical processes, especially in electronics and mechanics, can be modeled effectively as LTI systems.
      </p>

      <h2 className="text-2xl font-semibold mt-8">The Impulse Response and Convolution</h2>
      <p>
        The behavior of any LTI system is completely characterized by its <strong>impulse response</strong>, denoted as <em>h(t)</em>. The impulse response is the output of the system when the input is a Dirac delta function, <em>δ(t)</em>—an infinitesimally short, infinitely high pulse whose area is 1.
      </p>
      <p>
        The real power of the impulse response is that it allows us to find the system's output for <em>any</em> input signal. This is done through an operation called <strong>convolution</strong>. The output <em>y(t)</em> of an LTI system is the convolution of the input signal <em>x(t)</em> with the system's impulse response <em>h(t)</em>.
      </p>
      <p>The convolution integral is defined as:</p>
      <p className="text-center text-lg font-medium bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
        <em>y(t) = x(t) * h(t) = ∫ x(τ)h(t - τ) dτ</em>
      </p>
      <p>
        Where the integral is over all τ. This integral can be interpreted graphically:
      </p>
      <ol>
        <li><strong>Flip:</strong> Take the impulse response <em>h(τ)</em> and flip it around the vertical axis to get <em>h(-τ)</em>.</li>
        <li><strong>Shift:</strong> Shift the flipped response by an amount <em>t</em>. For a given time <em>t</em>, this gives you <em>h(t - τ)</em>.</li>
        <li><strong>Multiply:</strong> Multiply the original input signal <em>x(τ)</em> by the flipped and shifted impulse response <em>h(t - τ)</em>.</li>
        <li><strong>Integrate:</strong> The area under the curve of the product signal from the previous step gives you the value of the output <em>y(t)</em> at that specific time <em>t</em>.</li>
      </ol>

      <h2 className="text-2xl font-semibold mt-8">Interactive Convolution Visualization</h2>
      <p>
        The visualization below demonstrates this graphical interpretation of convolution. You can select different shapes for the input signal <em>x(τ)</em> and the impulse response <em>h(τ)</em>. Use the slider to change the time shift <em>t</em> and observe how the output signal <em>y(t)</em> is constructed point by point.
      </p>

      <div className="not-prose">
        <ConvolutionVisualizer />
      </div>
    </div>
  );
};

export default LTISystemsPage;
