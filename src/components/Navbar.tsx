import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, Menu, X, Radio } from 'lucide-react';

type NavItem =
  | { label: string; href: string }
  | { label: string; to: string };

const navItems: NavItem[] = [
  { label: '核心科技', href: '#core-tech' },
  { label: '互动实验室', href: '#lab' },
  { label: '灵魂游戏', to: '/soul-game' },
  { label: '用户故事', href: '#stories' },
];

export function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const anchorItems = navItems.filter((item): item is { label: string; href: string } => 'href' in item);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = anchorItems.map((item) => {
        const el = document.querySelector(item.href);
        if (!el) return { id: item.href, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: item.href, top: rect.top };
      });
      const current = sections.reduce((closest, section) => {
        if (section.top <= 100 && section.top > closest.top) return section;
        return closest;
      }, { id: '', top: -Infinity });
      setActiveSection(current.id);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-12 transition-all duration-500 ${
          scrolled ? 'liquid-glass' : 'bg-transparent'
        }`}
        style={scrolled ? { borderBottom: '1px solid rgba(0, 242, 255, 0.1)' } : {}}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <Cpu className="w-5 h-5 text-[#00f2ff] neon-pulse-blue" />
          <div className="flex flex-col">
            <span className="font-display text-[#00f2ff] text-lg leading-tight tracking-wide">
              SoulForge
            </span>
            <span className="font-kungfu text-base leading-tight tracking-widest" style={{ color: '#f0c6ff' }}>
              梦核宇宙
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {isHome && navItems.map((item) => {
            if ('to' in item) {
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative text-sm font-medium transition-colors duration-300 text-[#a0a0b0] hover:text-[#00f2ff]`}
                  style={{ fontFamily: 'var(--font-chinese)' }}
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.href
                    ? 'text-[#00f2ff]'
                    : 'text-[#a0a0b0] hover:text-[#00f2ff]'
                }`}
                style={{ fontFamily: 'var(--font-chinese)' }}
              >
                {item.label}
                {activeSection === item.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00f2ff] shadow-[0_0_8px_rgba(0,242,255,0.6)]" />
                )}
              </button>
            );
          })}

          {/* 灵魂游戏 Link */}
          <Link
            to="/agents"
            className={`relative flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
              location.pathname === '/agents'
                ? 'text-[#f72585]'
                : 'text-[#a0a0b0] hover:text-[#f72585]'
            }`}
            style={{ fontFamily: 'var(--font-chinese)' }}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>镜像世界</span>
            {location.pathname === '/agents' && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#f72585] shadow-[0_0_8px_rgba(247,37,133,0.6)]" />
            )}
          </Link>

          <a
            href="https://store.weixin.qq.com/shop/b/5FUeJZM8fdGQaJm?entrance_id=h5"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-liquid text-sm py-2 px-5 neon-pulse-blue"
          >
            立即定制
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#00f2ff]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu md:hidden">
          <button
            className="absolute top-5 right-6 text-[#00f2ff]"
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>
          {isHome && navItems.map((item) => {
            if ('to' in item) {
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl text-[#f0f0f5] hover:text-[#00f2ff] transition-colors"
                  style={{ fontFamily: 'var(--font-chinese)' }}
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-2xl text-[#f0f0f5] hover:text-[#00f2ff] transition-colors"
                style={{ fontFamily: 'var(--font-chinese)' }}
              >
                {item.label}
              </button>
            );
          })}
          <Link
            to="/agents"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 text-2xl text-[#f72585] hover:text-[#f72585] transition-colors"
            style={{ fontFamily: 'var(--font-chinese)' }}
          >
            <Radio className="w-5 h-5" />
            镜像世界
          </Link>
        </div>
      )}
    </>
  );
}
