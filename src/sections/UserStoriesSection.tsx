import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stories } from '../data/stories';
import { OrganicGlowBlobs } from '../components/OrganicGlowBlobs';

gsap.registerPlugin(ScrollTrigger);

export function UserStoriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 30, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(Array.from(cards), {
          y: 40, opacity: 0, duration: 0.7, stagger: 0.15,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stories"
      ref={sectionRef}
      className="relative py-10 lg:py-16 cyber-grid overflow-hidden"
    >
      <OrganicGlowBlobs variant="stories" />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12" style={{ zIndex: 1 }}>
        {/* Header */}
        <div ref={titleRef} className="text-center mb-8">
          <div className="section-label justify-center mb-4">
            <span>用户故事</span>
          </div>
          <h2 className="font-display text-[#f0f0f5] text-3xl sm:text-4xl lg:text-5xl mb-4 neon-glow-pink">
            真实的故事，真实的陪伴
          </h2>
        </div>

        {/* Desktop: 3 cards side by side */}
        <div
          ref={cardsRef}
          className="hidden md:grid grid-cols-3 gap-6"
        >
          {stories.map((story, i) => (
            <div
              key={story.id}
              className="story-card"
              style={{
                opacity: activeIndex === i ? 1 : 0.7,
                boxShadow:
                  activeIndex === i
                    ? 'inset 0 1px 1px rgba(255,255,255,0.15), 0 0 40px rgba(0, 242, 255, 0.2), 0 12px 40px rgba(0, 0, 0, 0.25)'
                    : undefined,
                transition: 'all 0.5s ease',
              }}
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-full overflow-hidden"
                  style={{
                    border: `2px solid ${story.borderColor}`,
                    boxShadow: `0 0 10px ${story.borderColor}66`,
                  }}
                >
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4
                    className="text-[#f0f0f5] text-lg font-bold"
                    style={{ fontFamily: 'var(--font-chinese)' }}
                  >
                    {story.name}
                  </h4>
                  <span
                    className="inline-block px-3 py-0.5 rounded-full text-xs text-[#a0a0b0] mt-1"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      fontFamily: 'var(--font-chinese)',
                    }}
                  >
                    {story.role}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <p
                className="text-[#a0a0b0] text-base leading-relaxed mb-6 italic"
                style={{ fontFamily: 'var(--font-chinese)' }}
              >
                {story.content}
              </p>

              {/* Doll name */}
              <p
                className="text-sm"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: story.borderColor,
                }}
              >
                {story.dollName}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <div className="story-card">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-full overflow-hidden"
                style={{
                  border: `2px solid ${stories[activeIndex].borderColor}`,
                  boxShadow: `0 0 10px ${stories[activeIndex].borderColor}66`,
                }}
              >
                <img
                  src={stories[activeIndex].avatar}
                  alt={stories[activeIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4
                  className="text-[#f0f0f5] text-lg font-bold"
                  style={{ fontFamily: 'var(--font-chinese)' }}
                >
                  {stories[activeIndex].name}
                </h4>
                <span
                  className="inline-block px-3 py-0.5 rounded-full text-xs text-[#a0a0b0] mt-1"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    fontFamily: 'var(--font-chinese)',
                  }}
                >
                  {stories[activeIndex].role}
                </span>
              </div>
            </div>

            <p
              className="text-[#a0a0b0] text-base leading-relaxed mb-6 italic"
              style={{ fontFamily: 'var(--font-chinese)' }}
            >
              {stories[activeIndex].content}
            </p>

            <p
              className="text-sm"
              style={{
                fontFamily: 'var(--font-mono)',
                color: stories[activeIndex].borderColor,
              }}
            >
              共鸣玩偶：{stories[activeIndex].dollName}
            </p>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {stories.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: activeIndex === i ? '#00f2ff' : 'rgba(255,255,255,0.3)',
                  boxShadow: activeIndex === i ? '0 0 8px rgba(0,242,255,0.5)' : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
