/* eslint-disable react/no-unescaped-entities */
"use client";
/* eslint-disable react/no-unescaped-entities */

import ContinuousDiscreteVisualizer from '@/components/ContinuousDiscreteVisualizer';
import ElementarySignalsVisualizer from '@/components/ElementarySignalsVisualizer';
import EnergyPowerVisualizer from '@/components/EnergyPowerVisualizer';
import Math from '@/components/Math';
import SignalDefinitionVisualizer from '@/components/SignalDefinitionVisualizer';
import SignalPlot from '@/components/SignalPlot';
import SignalPropertiesVisualizer from '@/components/SignalPropertiesVisualizer';
import TimeTransformationVisualizer from '@/components/TimeTransformationVisualizer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, InfinityIcon, Ruler, Sigma, Waves, Zap } from 'lucide-react';
import React from 'react';

const IntroductionToSignalsPage = () => {
  const sections = [
    {
      id: "what-is-a-signal",
      title: "1.1 What is a Signal?",
      icon: <BrainCircuit style={{ width: '32px', height: '32px', color: '#3b82f6' }} />,
      content: (
        <>
          <p>In the context of signal processing, a <strong>signal</strong> is a function that conveys information about a phenomenon. Mathematically, a signal is represented as a function of one or more independent variables. For example, the voltage from a sensor over time, the intensity of pixels in an image, or the air pressure variations of a sound wave are all signals. In this course, we will primarily focus on signals where the independent variable is time, denoted by <Math>t</Math>.</p>
          
          <div className="mt-6">
            <SignalDefinitionVisualizer />
          </div>
        </>
      )
    },
    {
      id: "continuous-vs-discrete",
      title: "1.2 Continuous-Time vs. Discrete-Time Signals",
      icon: <Waves style={{ width: '32px', height: '32px', color: '#10b981' }} />,
      content: (
        <>
          <p>Signals can be broadly classified into two main categories based on the nature of their time variable:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li><strong>Continuous-Time Signals:</strong> These signals are defined for every value of time <Math>t</Math> in a continuous interval. They are often denoted as <Math>x(t)</Math>, where the parentheses indicate a continuous variable. Think of the temperature in a room throughout the day or the voltage across a capacitor. These values exist at every single moment in time.</li>
            <li><strong>Discrete-Time Signals:</strong> These signals are defined only at discrete instances of time. They are represented as a sequence of numbers, denoted as <Math>x[n]</Math>, where the square brackets indicate a discrete variable <Math>n</Math> (an integer). A discrete-time signal can be obtained by sampling a continuous-time signal at regular intervals. For example, the daily closing price of a stock or a digital audio recording are discrete-time signals.</li>
          </ul>
          
          <div className="mt-6">
            <ContinuousDiscreteVisualizer />
          </div>
        </>
      )
    },
    {
      id: "transformations",
      title: "1.3 Transformations of the Independent Variable",
      icon: <Ruler style={{ width: '32px', height: '32px', color: '#8b5cf6' }} />,
      content: (
        <>
          <p>Understanding how to manipulate the time variable of a signal is a fundamental skill. These transformations—shifting, scaling, and reversal—are essential for analyzing systems and understanding signal properties.</p>
          <Accordion type="single" collapsible className="w-full mt-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>Time Shifting</AccordionTrigger>
              <AccordionContent style={{ lineHeight: '1.8', padding: '1rem 0' }}>
                <p>A time shift results in a delay or an advance of the signal in time. A signal <Math>x(t)</Math> shifted by a time <Math>t_0</Math> is represented as <Math>y(t) = x(t - t_0)</Math>.</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>The <strong>total energy</strong> of a signal is defined as <Math block>{`E = \\int_{-\\infty}^{+\\infty} |x(t)|^2 \\, dt`}</Math>.</li>
            <li>The <strong>average power</strong> of a signal is defined as <Math block>{`P = \\lim_{T \\to \\infty} \\frac{1}{T} \\int_{-T/2}^{T/2} |x(t)|^2 \\, dt`}</Math>.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Time Reversal</AccordionTrigger>
              <AccordionContent style={{ lineHeight: '1.8', padding: '1rem 0' }}>
                <p>Time reversal, or reflection, flips the signal around the time axis <Math>t=0</Math>. It is represented as <Math>y(t) = x(-t)</Math>. The portion of the signal that was in positive time now appears in negative time, and vice-versa.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Time Scaling</AccordionTrigger>
              <AccordionContent style={{ lineHeight: '1.8', padding: '1rem 0' }}>
                <p>Time scaling compresses or expands a signal in time. It is represented as <Math>{`y(t) = x(at)`}</Math>.</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li><Math>{`|a| > 1`}</Math> The signal is <strong>compressed</strong> in time. It happens faster.</li>
                  <li><Math>{`0 < |a| < 1`}</Math> The signal is <strong>expanded</strong> or stretched in time. It happens slower.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="mt-6">
            <TimeTransformationVisualizer />
          </div>
        </>
      )
    },
    {
      id: "properties",
      title: "1.4 Signal Properties",
      icon: <Sigma style={{ width: '32px', height: '32px', color: '#f59e0b' }} />,
      content: (
        <>
         <p>A signal can be decomposed into its even and odd components.</p>
          <ul className="list-disc pl-6 mt-2 space-y-3">
            <li>An <strong>even signal</strong> is symmetric about the vertical axis, satisfying the condition <Math>x(-t) = x(t)</Math>. The cosine function is an example of an even signal.</li>
            <li>An <strong>odd signal</strong> is anti-symmetric about the vertical axis, satisfying the condition <Math>x(-t) = -x(t)</Math>. The sine function is an example of an odd signal.</li>
          </ul>
          <p className="mt-4">Any signal <Math>x(t)</Math> can be expressed as the sum of its even part <Math>x_e(t)</Math> and its odd part <Math>x_o(t)</Math>, where:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="formula-container text-center font-medium bg-gray-100 dark:bg-gray-800 rounded-md">
              <Math>x_e(t) = (1/2) * [x(t) + x(-t)]</Math>
            </div>
            <div className="formula-container text-center font-medium bg-gray-100 dark:bg-gray-800 rounded-md">
              <Math>x_o(t) = (1/2) * [x(t) - x(-t)]</Math>
            </div>
          </div>
          <h4 className="font-semibold mt-6">Periodic Signals</h4>
          <p>A continuous-time signal <Math>x(t)</Math> is <strong>periodic</strong> if it repeats itself over a fixed period of time. There exists a positive value <Math>T</Math> such that <Math>x(t + T) = x(t)</Math> for all <Math>t</Math>. The smallest such <Math>T</Math> is called the <strong>fundamental period</strong>.</p>
          
          <div className="mt-6">
            <SignalPropertiesVisualizer />
          </div>
        </>
      )
    },
     {
      id: "elementary-signals",
      title: "1.5 Elementary Signals",
      icon: <Zap style={{ width: '32px', height: '32px', color: '#ef4444' }} />,
      content: (
        <>
          <p>Several elementary signals are fundamental building blocks in signal processing.</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li><strong>Exponential Signals:</strong> Of the form <Math>{"x(t) = Ce^{at}"}</Math>. Depending on whether C and a are real or complex, these signals can represent decaying or growing exponentials, or sinusoids (when 'a' is purely imaginary, by Euler's formula).</li>
            <li><strong>Sinusoidal Signals:</strong> As seen in the plot below, these are periodic signals of the form <Math>x(t) = A * cos(omega * t + phi)</Math>. They are a cornerstone of signal analysis.</li>
            <li><strong>Unit Step Function <Math>u(t)</Math>:</strong> Defined as <Math>u(t) = 1</Math> for <Math>t {'>'} 0</Math> and <Math>u(t) = 0</Math> for <Math>t {'<'} 0</Math>. It is used to represent signals that "switch on" at a certain time.</li>
            <li><strong>Unit Impulse Function <Math>delta(t)</Math>:</strong> The Dirac delta function is a theoretical signal defined as being zero everywhere except at <Math>t=0</Math>, where it is infinitely high, and the total area under the function is equal to 1. It is immensely important for understanding LTI systems.</li>
          </ul>
          
          <div className="mt-6">
            <ElementarySignalsVisualizer />
          </div>
        </>
      )
    },
    {
      id: "energy-power",
      title: "1.7 Signal Energy and Power",
      icon: <InfinityIcon style={{ width: '32px', height: '32px', color: '#6366f1' }} />,
      content: (
        <>
          <p>Signals can also be classified based on their energy and power.</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>The <strong>total energy</strong> of a signal is defined as <Math block>{`E = \\int_{-\\infty}^{+\\infty} |x(t)|^2 \\, dt`}</Math>.</li>
            <li>The <strong>average power</strong> of a signal is defined as <Math block>{`P = \\lim_{T \\to \\infty} \\frac{1}{T} \\int_{-T/2}^{T/2} |x(t)|^2 \\, dt`}</Math>.</li>
          </ul>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>An <strong>Energy Signal</strong> is a signal with finite total energy (<Math>0 &lt; E &lt; \infty</Math>). For these signals, the average power is zero.</li>
            <li>A <strong>Power Signal</strong> is a signal with finite and non-zero average power (<Math>0 &lt; P &lt; \infty</Math>).</li>
          </ul>
          
          <div className="mt-6">
            <EnergyPowerVisualizer />
          </div>
        </>
      )
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">1. Introduction to Signals</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">The foundational concepts of signal processing.</p>
        </header>

        <div className="safari-layout">
          <main className="safari-main space-y-8">
            {sections.map(section => (
              <Card key={section.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
                <CardHeader className="flex flex-row items-center gap-4 p-6">
                  <div className="flex-shrink-0 p-3 rounded-full" style={{ backgroundColor: '#f3f4f6' }}>
                    {section.icon}
                  </div>
                  <CardTitle className="text-xl md:text-2xl font-bold flex-1">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none p-6 pt-0" style={{ lineHeight: '1.7' }}>
                  {section.content}
                </CardContent>
              </Card>
            ))}
          </main>

          <aside className="safari-sidebar space-y-8" style={{ minHeight: 'fit-content' }}>
            <Card className="shadow-lg w-full">
              <CardHeader className="p-6">
                <CardTitle className="text-xl md:text-2xl">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ul className="space-y-2">
                  {sections.map(section => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="flex items-center gap-3 hover:text-blue-500 transition-colors duration-200 py-1 text-sm md:text-base" style={{ color: '#374151' }}>
                        <span className="flex-shrink-0">
                          {React.cloneElement(section.icon, { style: { width: '20px', height: '20px' } })}
                        </span>
                        <span className="flex-1">{section.title.split(' ').slice(1).join(' ')}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-lg w-full">
               <CardHeader className="p-6">
                <CardTitle id="interactive-plot" className="text-xl md:text-2xl font-bold">Interactive Signal Visualization</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="mb-4 text-sm md:text-base">
                  The interactive plot below allows you to visualize some of the fundamental periodic signals. Use the controls to change the signal type and its parameters to develop an intuition for how these basic signals behave.
                </p>
                <div className="not-prose rounded-lg overflow-hidden w-full">
                  <SignalPlot />
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default IntroductionToSignalsPage;