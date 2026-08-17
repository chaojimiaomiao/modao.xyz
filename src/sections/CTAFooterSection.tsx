import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SimpleBubbles } from '../components/SimpleBubbles';

gsap.registerPlugin(ScrollTrigger);

const footerLinks: Record<string, { title: string; links: { label: string; href?: string }[] }> = {
  product: { title: '产品', links: [
    { label: 'SoulDoll 系列' },
    { label: '灵魂蒸馏盒' },
    { label: 'AI 语音芯片' },
    { label: '配件商店' },
  ]},
  support: { title: '支持', links: [
    { label: '使用指南' },
    { label: '常见问题' },
    { label: '隐私政策' },
    { label: '服务条款' },
  ]},
  about: { title: '关于', links: [
    { label: '品牌故事' },
    { label: '加入我们' },
    { label: '联系我们', href: 'https://xiandao.space' },
    { label: '媒体资源' },
  ]},
};

export function CTAFooterSection() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ctaEls = ctaRef.current?.querySelectorAll('.cta-animate');
      if (ctaEls) {
        gsap.from(Array.from(ctaEls), {
          y: 40, opacity: 0, duration: 0.8, stagger: 0.15,
          scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
        });
      }
      const footerCols = footerRef.current?.querySelectorAll('.footer-col');
      if (footerCols) {
        gsap.from(Array.from(footerCols), {
          y: 20, opacity: 0, duration: 0.5, stagger: 0.1,
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* CTA Section — static background instead of particle rain */}
      <section id="cta" ref={ctaRef} className="relative py-16 lg:py-20 overflow-hidden" style={{ background: '#050510' }}>
        {/* Giant transparent bubbles */}
        <SimpleBubbles count={5} minR={60} maxR={140} />
        <div className="relative max-w-[800px] mx-auto px-6 lg:px-12 text-center" style={{ zIndex: 1 }}>
          <h2 className="cta-animate font-display text-[#f0f0f5] text-3xl sm:text-4xl lg:text-6xl mb-6 neon-glow whitespace-nowrap">
            定制一个不会离开的存在...
          </h2>
          <p className="cta-animate text-[#f0c6ff] text-lg sm:text-xl mb-4" style={{ fontFamily: 'var(--font-chinese)' }}>
            送父母 · 送闺蜜 · 送自己 · 限量 100 体
          </p>
          <p className="cta-animate font-display text-[#00f2ff] text-3xl sm:text-4xl mb-10 neon-glow">
            ¥?99 起
          </p>
          <span
            className="cta-animate btn-liquid-pink text-lg py-4 px-12 neon-pulse-pink inline-block text-center cursor-pointer"
            onClick={() => { alert('请添加微信node_tech定制服务'); window.open('https://store.weixin.qq.com/shop/a/upJ0s3y6KFxh6zk', '_blank'); }}
            role="button"
            tabIndex={0}
          >
            立即预购
          </span>
        </div>
      </section>

      <footer ref={footerRef} className="relative py-10 px-6 lg:px-12" style={{ background: 'rgba(5, 5, 16, 0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(0, 242, 255, 0.1)' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="footer-col col-span-2 md:col-span-1">
              <div className="cursor-pointer" onClick={scrollToTop}>
                <h3 className="font-display text-[#00f2ff] text-xl mb-1">SoulForge</h3>
                <p className="font-kungfu text-[#f0c6ff] text-xs mb-3">梦核宇宙</p>
              </div>
              <p className="text-[#a0a0b0] text-sm mb-6" style={{ fontFamily: 'var(--font-chinese)' }}>
                可定制智能手办 · 缓解孤独的科技礼物
              </p>
              <div className="flex gap-3">
                {['微信', '微博', '小红书', 'B站'].map((platform) => (
                  <div key={platform} className="w-8 h-8 rounded-full flex items-center justify-center text-[#a0a0b0] hover:text-[#00f2ff] hover:scale-110 transition-all duration-300 cursor-pointer" style={{ background: 'rgba(255,255,255,0.05)', fontSize: '10px', fontFamily: 'var(--font-chinese)' }} title={platform}>
                    {platform[0]}
                  </div>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key} className="footer-col">
                <h4 className="text-[#f0f0f5] text-sm font-bold mb-4" style={{ fontFamily: 'var(--font-chinese)' }}>
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-[#a0a0b0] text-sm hover:text-[#00f2ff] transition-colors" style={{ fontFamily: 'var(--font-chinese)' }}>
                          {link.label}
                        </a>
                      ) : (
                        <span className="text-[#a0a0b0] text-sm hover:text-[#00f2ff] transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-chinese)' }}>
                          {link.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ICP */}
        <div className="pt-3 pb-1 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="text-[10px] transition-colors hover:text-[#00f2ff]" style={{ color: 'rgba(160,160,176,0.35)', fontFamily: 'var(--font-mono)' }}>
            沪ICP备2026030951号
          </a>
        </div>
      </footer>
    </>
  );
}
