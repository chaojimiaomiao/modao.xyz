import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Radio, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OrganicGlowBlobs } from '../components/OrganicGlowBlobs';
import { agents, initialBroadcasts } from '../data/agents';

gsap.registerPlugin(ScrollTrigger);

export function CoreTechSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        x: -20, opacity: 0, duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from(titleRef.current, {
        y: 30, opacity: 0, duration: 0.8, delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from(subtitleRef.current, {
        y: 20, opacity: 0, duration: 0.6, delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from(imageRef.current, {
        y: 30, opacity: 0, scale: 0.95, duration: 0.8, delay: 0.4,
        scrollTrigger: { trigger: imageRef.current, start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="core-tech"
      ref={sectionRef}
      className="relative py-8 lg:py-12 cyber-grid overflow-hidden"
    >
      <OrganicGlowBlobs variant="tech" />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="text-center mb-6">
          <div ref={labelRef} className="section-label justify-center mb-3">
            <span>核心科技</span>
          </div>
          <h2
            ref={titleRef}
            className="font-display text-[#f0f0f5] text-3xl sm:text-4xl lg:text-5xl mb-3 neon-glow"
          >
            你的模样，你的声音，你的陪伴
          </h2>
          <p
            ref={subtitleRef}
            className="text-[#a0a0b0] text-base sm:text-lg max-w-[700px] mx-auto"
            style={{ fontFamily: 'var(--font-chinese)' }}
          >
            真人形象定制 + 声音克隆 + 智能对话陪伴 + 唱跳投影互动
          </p>
        </div>

        {/* Girl Doll Showcase Image — fused with dark background */}
        <div ref={imageRef} className="mb-6 max-w-[800px] mx-auto">
          <div
            className="relative rounded-xl overflow-hidden"
            style={{
              border: '1px solid rgba(0, 242, 255, 0.1)',
              boxShadow: '0 0 40px rgba(0, 242, 255, 0.06), 0 20px 60px rgba(0, 0, 0, 0.5)',
            }}
          >
            <img
              src="/images/girl-doll.jpg"
              alt="3D打印真人风格玩偶"
              className="w-full object-cover"
              style={{
                display: 'block',
                filter: 'contrast(1.05) saturate(0.85)',
              }}
              loading="lazy"
            />
            {/* Top gradient — blend into section above */}
            <div
              className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, #050510, transparent)' }}
            />
            {/* Bottom gradient — blend into section below */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
              style={{ background: 'linear-gradient(to top, #050510, transparent)' }}
            />
            {/* Cyan edge glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 60px rgba(0, 242, 255, 0.04)',
              }}
            />
          </div>
        </div>

        {/* Agents Broadcast Preview */}
        <div className="max-w-[1000px] mx-auto">
          <Link
            to="/agents"
            className="block group transition-all duration-400 hover:scale-[1.01]"
          >
            <div
              className="relative p-6 rounded-xl overflow-hidden"
              style={{
                background: 'rgba(0, 0, 0, 0.35)',
                border: '1px solid rgba(0, 242, 255, 0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#f72585] animate-pulse" />
                  <span
                    className="text-sm font-bold"
                    style={{ color: '#f0f0f5', fontFamily: 'var(--font-chinese)' }}
                  >
                    镜像世界 · 玩偶们的深夜电台
                  </span>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(247, 37, 133, 0.15)',
                      color: '#f72585',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    LIVE
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-3 h-3 text-[#a0a0b0]" />
                  <span className="text-[10px]" style={{ color: '#a0a0b0', fontFamily: 'var(--font-mono)' }}>
                    进入镜像世界 →
                  </span>
                </div>
              </div>

              {/* Broadcast messages preview */}
              <div className="space-y-3">
                {initialBroadcasts.slice(0, 5).map((msg) => {
                  const agent = agents.find((a) => a.id === msg.agentId);
                  if (!agent) return null;
                  return (
                    <div
                      key={msg.id}
                      className="flex items-start gap-3 p-3 rounded-lg"
                      style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                    >
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        style={{ border: `1.5px solid ${agent.color}` }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold" style={{ color: agent.color }}>
                            {agent.name} · {agent.title}
                          </span>
                        </div>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: '#a0a0b0', fontFamily: 'var(--font-chinese)' }}
                        >
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom gradient fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)',
                }}
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
