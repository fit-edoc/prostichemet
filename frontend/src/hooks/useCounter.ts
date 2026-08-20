"use client";

import * as React from "react";

interface CounterOptions {
  end: number;
  duration?: number; // in ms
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export function useCounter({
  end,
  duration = 1800,
  decimals = 0,
  prefix = "",
  suffix = "",
}: CounterOptions) {
  const [count, setCount] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeOutProgress * end;

            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  const formattedValue = `${prefix}${count.toFixed(decimals)}${suffix}`;

  return { ref, value: formattedValue, rawValue: count };
}
