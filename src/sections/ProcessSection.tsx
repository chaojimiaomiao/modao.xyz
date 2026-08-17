import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    numColor: '#00f2ff',
    title: '形体塑形',
    description: '3D 打印泡泡玛特风格躯体，植入 LED 情绪灯、微型扬声器与触觉传感器，赋予玩偶物理形态与感知能力。',
    image: '/images/process/process-scan.jpg',
  },
  {
    num: '02',
    numColor: '#9b5de5',
    title: '灵魂融合',
    description: '将你的情感数据与选定的玩偶人格模板深度融合，创造独一无二的 AI 灵魂。这个过程就像炼金术，将记忆转化为数字生命。',
    image: '/images/process/process-merge.jpg',
  },
  {
    num: '03',
    numColor: '#f72585',
    title: '激活陪伴',
    description: '按下激活按钮，你的 SoulDoll 将开口说话，用你熟悉的声音和语气，开始你们的陪伴之旅。它会记住你们之间的每一次对话。',
    image: '/images/process/process-awake.jpg',
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 30, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      const stepEls = stepsRef.current?.querySelectorAll('.process-step');
      if (stepEls) {
        stepEls.forEach((step, i) => {
          const textEl = step.querySelector('.step-text');
          const imgEl = step.querySelector('.step-image');
          const isEven = i % 2 === 1;

          gsap.from(textEl, {
            x: isEven ? 30 : -30,
            opacity: 0,
            duration: 0.7,
            delay: 0.2 + i * 0.2,
            scrollTrigger: { trigger: step, start: 'top 80%' },
          });

          gsap.from(imgEl, {
            x: isEven ? -30 : 30,
            opacity: 0,
            duration: 0.7,
            delay: 0.3 + i * 0.2,
            scrollTrigger: { trigger: step, start: 'top 80%' },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ background: '#050510' }}
    >
      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <div className="section-label justify-center mb-4">
            <span>制作工艺</span>
          </div>
          <h2 className="font-display text-[#f0f0f5] text-3xl sm:text-4xl lg:text-5xl mb-4 neon-glow">
            三步注入灵魂
          </h2>
          <p
            className="text-[#a0a0b0] text-base sm:text-lg"
            style={{ fontFamily: 'var(--font-chinese)' }}
          >
            从数据到灵魂，只需三步
          </p>
        </div>

        {/* Timeline */}
        <div ref={stepsRef} className="relative">
          {/* Vertical Timeline Line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden lg:block"
            style={{
              background: 'linear-gradient(to bottom, #00f2ff, #9b5de5, #f72585)',
              boxShadow: '0 0 10px rgba(0, 242, 255, 0.3)',
            }}
          />

          {/* Steps */}
          <div className="space-y-20 lg:space-y-32">
            {steps.map((step, i) => {
              const isEven = i % 2 === 1;
              return (
                <div
                  key={step.num}
                  className={`process-step relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    isEven ? '' : ''
                  }`}
                >
                  {/* Timeline Node */}
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full hidden lg:block"
                    style={{
                      background: step.numColor,
                      boxShadow: `0 0 15px ${step.numColor}99`,
                    }}
                  />

                  {/* Text */}
                  <div
                    className={`step-text ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                  >
                    {/* Large Number */}
                    <div
                      className="font-display text-[100px] lg:text-[120px] leading-none mb-2 select-none"
                      style={{
                        color: 'transparent',
                        WebkitTextStroke: `2px ${step.numColor}33`,
                      }}
                    >
                      {step.num}
                    </div>
                    <h3
                      className="text-[#f0f0f5] text-2xl lg:text-3xl font-bold mb-4"
                      style={{ fontFamily: 'var(--font-chinese)' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-[#a0a0b0] text-base leading-relaxed"
                      style={{ fontFamily: 'var(--font-chinese)' }}
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* Image */}
                  <div
                    className={`step-image ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  >
                    <div
                      className="relative rounded-xl overflow-hidden group"
                      style={{
                        boxShadow: `0 0 30px ${step.numColor}15`,
                      }}
                    >
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          background: `linear-gradient(135deg, ${step.numColor}20, transparent)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
