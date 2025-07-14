import { useState, useEffect, RefObject } from 'react';

export function useScrollPosition(ref: RefObject<HTMLElement>) {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      setScrollTop(element.scrollTop);
    };

    element.addEventListener('scroll', handleScroll);
    // Викликаємо один раз при монтуванні, щоб отримати початкову позицію
    handleScroll(); 

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return scrollTop;
}