import { useEffect, useRef } from 'react';

interface GlowBlobProps {
  color: string;
  size: number;
  top: string;
  left: string;
  blur?: number;
  opacity?: number;
}

function GlowBlob({ color, size, top, left, blur = 80, opacity = 0.15 }: GlowBlobProps) {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = blobRef.current;
    if (!el) return;

    let raf = 0;
    let time = 0;
    const element = el;

    function animate() {
      time += 0.008;
      const scale = 1 + Math.sin(time) * 0.15;
      const hueShift = Math.sin(time * 0.7) * 20;
      element.style.transform = `scale(${scale})`;
      element.style.filter = `blur(${blur}px) hue-rotate(${hueShift}deg)`;
      raf = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(raf);
  }, [blur]);

  return (
    <div
      ref={blobRef}
      style={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

interface OrganicGlowBlobsProps {
  variant?: 'tech' | 'dolls' | 'stories';
}

export function OrganicGlowBlobs({ variant = 'tech' }: OrganicGlowBlobsProps) {
  const configs = {
    tech: [
      { color: '#9b5de5', size: 400, top: '-10%', left: '-5%', blur: 100, opacity: 0.15 },
      { color: '#00f2ff', size: 350, top: '40%', left: '60%', blur: 90, opacity: 0.12 },
      { color: '#f72585', size: 300, top: '70%', left: '20%', blur: 80, opacity: 0.1 },
    ],
    dolls: [
      { color: '#9b5de5', size: 500, top: '-15%', left: '70%', blur: 120, opacity: 0.08 },
      { color: '#00f2ff', size: 400, top: '50%', left: '-10%', blur: 100, opacity: 0.08 },
      { color: '#f72585', size: 350, top: '80%', left: '50%', blur: 90, opacity: 0.06 },
    ],
    stories: [
      { color: '#00f2ff', size: 350, top: '10%', left: '80%', blur: 90, opacity: 0.1 },
      { color: '#f72585', size: 300, top: '60%', left: '10%', blur: 80, opacity: 0.08 },
    ],
  };

  const blobs = configs[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {blobs.map((blob, index) => (
        <GlowBlob key={index} {...blob} />
      ))}
    </div>
  );
}
