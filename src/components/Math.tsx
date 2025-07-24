"use client";

interface MathProps {
  children: string;
  block?: boolean;
}

import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const Math = ({ children, block = false }: MathProps) => {
  if (block) {
    return <BlockMath math={children} />;
  }
  return <InlineMath math={children} />;
};

export default Math;
