import { useTransform, useScroll, MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

export function useParallax(distance: number, direction: 'up' | 'down' = 'up'): MotionValue<number> {
  const [elementTop, setElementTop] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    const element = document.getElementById('parallax-container');
    if (element) {
      setElementTop(element.offsetTop);
    }
  }, []);

  return useTransform(
    scrollY,
    [elementTop, elementTop + distance],
    direction === 'up' ? [0, -distance] : [0, distance]
  );
}

