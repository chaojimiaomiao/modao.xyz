import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { dolls } from '../data/dolls';
import { OrganicGlowBlobs } from '../components/OrganicGlowBlobs';

gsap.registerPlugin(ScrollTrigger);

export function DollCollectionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 30, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.from(Array.from(cards), {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ background: '#050510' }}
    >
      <OrganicGlowBlobs variant="dolls" />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-12" style={{ zIndex: 1 }}>
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="section-label justify-center mb-4">
            <span>灵魂收藏</span>
          </div>
          <h2 className="font-display text-[#f0f0f5] text-3xl sm:text-4xl lg:text-5xl mb-4 neon-glow-purple">
            十神命格
          </h2>
          <p
            className="text-[#a0a0b0] text-base sm:text-lg max-w-[600px] mx-auto"
            style={{ fontFamily: 'var(--font-chinese)' }}
          >
            每一个玩偶都对应八字中的一神，承载独特的灵魂印记
          </p>
        </div>

        {/* Dolls Grid — 5 columns for 10 gods */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {dolls.map((doll) => (
            <div
              key={doll.id}
              className="group cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backgroundBlendMode: 'luminosity',
                backdropFilter: 'blur(6px) saturate(140%)',
                WebkitBackdropFilter: 'blur(6px) saturate(140%)',
                borderRadius: '12px',
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), 0 8px 32px rgba(0, 0, 0, 0.15)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                transform: hoveredId === doll.id ? 'translateY(-6px) scale(1.02)' : undefined,
              }}
              onMouseEnter={() => setHoveredId(doll.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Colored top border */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-400"
                style={{
                  background: `linear-gradient(90deg, ${doll.color}, ${doll.color}88)`,
                  opacity: hoveredId === doll.id ? 1 : 0.6,
                  boxShadow: hoveredId === doll.id ? `0 0 12px ${doll.color}66` : 'none',
                }}
              />

              {/* Image */}
              <div className="relative aspect-square overflow-hidden" style={{ borderRadius: '12px 12px 0 0' }}>
                <img
                  src={doll.image}
                  alt={doll.name}
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{ transform: hoveredId === doll.id ? 'scale(1.05)' : 'scale(1)' }}
                  loading="lazy"
                />
                {/* Subtle gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, ${doll.color}15, transparent 60%)`,
                  }}
                />
              </div>

              {/* Text */}
              <div className="p-3">
                {/* Bazi title */}
                <p
                  className="text-[10px] mb-1 truncate"
                  style={{
                    fontFamily: 'var(--font-kungfu)',
                    color: doll.color,
                  }}
                >
                  {doll.trait}
                </p>
                {/* Name */}
                <h3
                  className="text-[#f0f0f5] text-sm font-bold mb-1"
                  style={{ fontFamily: 'var(--font-chinese)' }}
                >
                  {doll.name}
                </h3>
                {/* Trait tags */}
                <p
                  className="text-[10px] mb-1.5"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'rgba(160, 160, 176, 0.7)',
                  }}
                >
                  {doll.trait}
                </p>
                {/* Description - only show on hover */}
                <p
                  className="text-xs leading-relaxed transition-all duration-300 overflow-hidden"
                  style={{
                    fontFamily: 'var(--font-chinese)',
                    color: '#a0a0b0',
                    maxHeight: hoveredId === doll.id ? '80px' : '0px',
                    opacity: hoveredId === doll.id ? 1 : 0,
                  }}
                >
                  {doll.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
