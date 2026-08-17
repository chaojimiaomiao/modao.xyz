import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SimpleBubbles } from '../components/SimpleBubbles';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: 200,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Entrance animations
      gsap.fromTo(tagRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power3.out' }
      );
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.6, ease: 'power3.out' }
      );
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 2.0, ease: 'power3.out' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex items-center overflow-hidden"
      style={{ background: '#050510' }}
    >
      {/* Background Image with Parallax */}
      <div ref={bgRef} className="absolute inset-0 w-full h-[120%]" style={{ zIndex: 1 }}>
        <img
          src="/images/cyberpunk-city.jpg"
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050510]/60 via-transparent to-[#050510]" />
      </div>

      {/* Giant transparent bubbles floating upward */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <SimpleBubbles count={7} minR={50} maxR={120} />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-[1200px] mx-auto px-6 lg:px-12 py-32" style={{ zIndex: 10 }}>
        <div className="max-w-[700px]">
          {/* Tag */}
          <div
            ref={tagRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 opacity-0"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span className="font-kungfu text-lg tracking-wide" style={{ color: '#00f2ff' }}>
              SoulForge <span style={{ color: '#f0c6ff' }}>梦核宇宙</span> · AI 玩具定制
            </span>
          </div>

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="font-display text-[#f0f0f5] text-4xl sm:text-5xl lg:text-7xl leading-[1.1] mb-6 opacity-0"
          >
            <span className="block">你的陪伴，永远不会缺席</span>
            <span
              className="block mt-2"
              style={{
                background: 'linear-gradient(135deg, #00f2ff, #9b5de5, #f72585)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ——会做梦的AI玩偶
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-[#f0e040] text-base sm:text-lg leading-relaxed max-w-[600px] mb-10 opacity-0"
            style={{
              fontFamily: 'var(--font-chinese)',
              textShadow: '0 0 12px rgba(240,224,64,0.2), 0 0 40px rgba(240,224,64,0.1)',
            }}
          >
            用你自己的声音和模样，定制一个独一无二的智能手办。
            <br />
            送给留守的父母，代替远行的你陪伴左右。
            <br />
            送给独居的自己，缓解深夜的孤独与寂寞。
            <br />
            送给最好的闺蜜，一份小众又高级的心意。
          </p>

          {/* CTA */}
          <a
            ref={ctaRef}
            href="https://store.weixin.qq.com/shop/b/5FUeJZM8fdGQaJm?entrance_id=h5"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-liquid text-base opacity-0 inline-block text-center"
          >
            探索梦核宇宙
          </a>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 hidden lg:block" style={{ zIndex: 5 }}>
        <div className="relative w-[300px] h-[300px] opacity-20">
          <div
            className="absolute inset-0 border border-[#00f2ff] rounded-lg"
            style={{
              transform: 'rotateX(60deg) rotateZ(45deg)',
              animation: 'spin 20s linear infinite',
              boxShadow: '0 0 30px rgba(0,242,255,0.2), inset 0 0 30px rgba(0,242,255,0.1)',
            }}
          />
          <div
            className="absolute inset-4 border border-[#9b5de5] rounded-lg"
            style={{
              transform: 'rotateX(60deg) rotateZ(-30deg)',
              animation: 'spin 15s linear infinite reverse',
            }}
          />
        </div>
      </div>
    </section>
  );
}
