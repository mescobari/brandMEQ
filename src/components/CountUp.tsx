import { useEffect, useState, type RefObject } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CountUpProps {
  /** Display value, e.g. "99.9%", "−40%", "+50%", "18+", "1st". Non-numeric values render as-is. */
  value: string;
  duration?: number;
  className?: string;
}

const NUMBER = /^(\D*?)(\d+(?:\.\d+)?)(.*)$/;

/** Counts the numeric part of a metric up from 0 when it scrolls into view. */
export function CountUp({ value, duration = 1600, className }: CountUpProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.4 });
  const match = value.match(NUMBER);
  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match?.[2].split('.')[1]?.length ?? 0;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!match || !isVisible) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || target === 0) {
      setCurrent(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setCurrent(target * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, target, duration]);

  return (
    <span ref={ref as unknown as RefObject<HTMLSpanElement>} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {match ? `${match[1]}${current.toFixed(decimals)}${match[3]}` : value}
      </span>
    </span>
  );
}
