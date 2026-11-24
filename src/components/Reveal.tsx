import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface RevealProps {
  children: ReactNode;
  /** Delay in ms before the element fades up (for staggering). */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
}

/** Fade-up on scroll — same timing as the home sections (700ms ease-out, 24px). */
export function Reveal({ children, delay = 0, className, style, threshold = 0.15 }: RevealProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold });
  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out motion-reduce:transition-none',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        className
      )}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
