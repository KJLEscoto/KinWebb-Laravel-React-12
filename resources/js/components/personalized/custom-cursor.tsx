import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const innerPos = useRef({ x: 0, y: 0 });

  const requestRef = useRef<number | undefined>(undefined);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      const target = e.target as HTMLElement;
      const cursorStyle = window.getComputedStyle(target).cursor;
      setIsPointer(cursorStyle === 'pointer');
    };

    const lerp = (start: number, end: number, amt: number) => {
      return start + (end - start) * amt;
    };

    const animate = () => {
      // Outer follows mouse directly
      outerPos.current.x = lerp(outerPos.current.x, mousePos.current.x, 0.25);
      outerPos.current.y = lerp(outerPos.current.y, mousePos.current.y, 0.25);

      // Inner follows outer (with delay)
      innerPos.current.x = lerp(innerPos.current.x, outerPos.current.x, 0.15);
      innerPos.current.y = lerp(innerPos.current.y, outerPos.current.y, 0.15);

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px)`;
      }

      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${innerPos.current.x}px, ${innerPos.current.y}px)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        className="fixed z-[9999] w-8 h-8 border border-white rounded-full pointer-events-none mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={innerRef}
        className={`fixed z-[9999] rounded-full pointer-events-none mix-blend-difference -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${isPointer ? 'w-8 h-8 bg-white' : 'w-2.5 h-2.5 bg-white'
          }`}
      />
    </>
  );
}
