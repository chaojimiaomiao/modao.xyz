import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  direction?: 'up' | 'left' | 'right' | 'scale';
  distance?: string;
  duration?: number;
  delay?: number;
  start?: string;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      direction = 'up',
      distance = '40px',
      duration = 0.8,
      delay = 0,
      start = 'top 85%',
    } = options;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    };

    if (direction === 'up') {
      fromVars.y = distance;
    } else if (direction === 'left') {
      fromVars.x = `-${distance}`;
    } else if (direction === 'right') {
      fromVars.x = distance;
    } else if (direction === 'scale') {
      fromVars.scale = 0.9;
    }

    gsap.from(el, fromVars);

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return ref;
}
