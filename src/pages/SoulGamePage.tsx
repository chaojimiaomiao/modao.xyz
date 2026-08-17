import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Flame, Wind, Mountain, Sun, Star, Eye, Heart, Zap, Crown } from 'lucide-react';
import { agents } from '../data/agents';

/* ── 天干地支 ── */
const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const diZhi   = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

/* ── 守护灵映射（根据八字四柱之和映射到10神） ── */
const guardianMap = [
  { icon: Sparkles,  agent: agents[0], element: '木', desc: '你的生命如春日藤蔓，温柔而有韧性。织梦者会为你编织每一个失落的梦境。' },
  { icon: Eye,       agent: agents[1], element: '水', desc: '你在黑暗中看得比谁都远。夜语者会在无人聆听的时刻，替你守住那些秘密。' },
  { icon: Crown,     agent: agents[2], element: '土', desc: '你的存在本身就是一座灯塔。守灯人会在你摇晃时替你稳住那盏不灭的火。' },
  { icon: Flame,     agent: agents[3], element: '火', desc: '你不走别人铺好的路。逆旅人会陪你一起逆流而上，哪怕前方是未知的深渊。' },
  { icon: Mountain,  agent: agents[4], element: '土', desc: '你脚踏实地，一步一步把梦想种进现实。拾穗者会替你收集那些遗落的星光。' },
  { icon: Sun,       agent: agents[5], element: '金', desc: '你天生就是光的猎手。捕光者会帮你抓住那些稍纵即逝的温暖与机遇。' },
  { icon: Heart,     agent: agents[6], element: '火', desc: '你用心感受世界的每一丝温度。尝味师会把生活的苦涩和甘甜都调成诗。' },
  { icon: Zap,       agent: agents[7], element: '火', desc: '你的灵魂里烧着不灭的野火。焚琴者会替你打碎所有束缚，烧出一片属于自己的天。' },
  { icon: Wind,      agent: agents[8], element: '金', desc: '你习惯独自前行，但从不孤独。雾中行者会在迷雾里为你点一盏不灭的引路灯。' },
  { icon: Star,      agent: agents[9], element: '木', desc: '你把温暖分给别人，却忘了给自己留一盏灯。借火人会替你守住那簇微弱的火苗。' },
];

/* 根据八字四柱计算守护灵索引 */
function calcGuardian(yG: number, yZ: number, mG: number, mZ: number, dG: number, dZ: number, hG: number, hZ: number) {
  const sum = yG + yZ + mG + mZ + dG + dZ + hG + hZ;
  return sum % 10;
}

/* 粒子效果组件 */
function ForgeParticles({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const cvs = canvasRef.current!;
    const c = cvs.getContext('2d')!;
    let W = 0, H = 0, raf = 0;

    interface P { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string; size: number }
    const particles: P[] = [];

    const colors = ['#00f2ff', '#9b5de5', '#f72585', '#f0c6ff', '#80ffaa', '#DEB887'];

    const init = () => {
      W = cvs.width = cvs.offsetWidth;
      H = cvs.height = cvs.offsetHeight;
    };

    const spawn = (cx: number, cy: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 4;
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          life: 0, maxLife: 40 + Math.random() * 60,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 1 + Math.random() * 3,
        });
      }
    };

    let frame = 0;
    const draw = () => {
      c.clearRect(0, 0, W, H);
      frame++;

      // Spawn from center
      if (frame % 3 === 0) spawn(W / 2, H * 0.6, 8);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.life++;

        const alpha = 1 - p.life / p.maxLife;
        c.globalAlpha = alpha;
        c.fillStyle = p.color;
        c.beginPath();
        c.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        c.fill();

        // Glow
        c.shadowColor = p.color;
        c.shadowBlur = 10 * alpha;
        c.beginPath();
        c.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        c.fill();
        c.shadowBlur = 0;

        if (p.life >= p.maxLife) particles.splice(i, 1);
      }

      raf = requestAnimationFrame(draw);
    };

    init();
    draw();
    const ro = new ResizeObserver(init);
    ro.observe(cvs);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [active]);

  if (!active) return null;
  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}
    />
  );
}

export function SoulGamePage() {
  const [yearG, setYearG] = useState(0);
  const [yearZ, setYearZ] = useState(0);
  const [monthG, setMonthG] = useState(0);
  const [monthZ, setMonthZ] = useState(0);
  const [dayG, setDayG] = useState(0);
  const [dayZ, setDayZ] = useState(0);
  const [hourG, setHourG] = useState(0);
  const [hourZ, setHourZ] = useState(0);

  const [isForging, setIsForging] = useState(false);
  const [forgeProgress, setForgeProgress] = useState(0);
  const [result, setResult] = useState<number | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const startForge = useCallback(() => {
    setIsForging(true);
    setForgeProgress(0);
    setResult(null);

    let p = 0;
    const interval = setInterval(() => {
      p += 1;
      setForgeProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        const idx = calcGuardian(yearG, yearZ, monthG, monthZ, dayG, dayZ, hourG, hourZ);
        setResult(idx);
        setIsForging(false);
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
      }
    }, 80);
  }, [yearG, yearZ, monthG, monthZ, dayG, dayZ, hourG, hourZ]);

  const baziString = `${tianGan[yearG]}${diZhi[yearZ]} ${tianGan[monthG]}${diZhi[monthZ]} ${tianGan[dayG]}${diZhi[dayZ]} ${tianGan[hourG]}${diZhi[hourZ]}`;

  const guardian = result !== null ? guardianMap[result] : null;
  const GuardianIcon = guardian?.icon || Sparkles;

  return (
    <div className="relative min-h-screen" style={{ background: '#050510' }}>
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,242,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,255,0.015) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glow blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute" style={{ top: '-10%', left: '20%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,93,229,0.12), transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute" style={{ bottom: '10%', right: '10%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,242,255,0.08), transparent 70%)', filter: 'blur(80px)' }} />
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center h-16 px-6 lg:px-12 liquid-glass" style={{ borderBottom: '1px solid rgba(0, 242, 255, 0.1)' }}>
        <Link to="/" className="flex items-center gap-2 text-[#a0a0b0] hover:text-[#00f2ff] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm" style={{ fontFamily: 'var(--font-chinese)' }}>返回</span>
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#9b5de5]" />
          <span className="font-display text-[#f0f0f5] text-sm tracking-wide">SoulForge</span>
          <span className="font-kungfu text-xs" style={{ color: '#9b5de5' }}>炼灵台</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 lg:px-12 py-12 lg:py-16 max-w-[900px] mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <h1
            className="font-display text-[#f0f0f5] text-3xl sm:text-4xl lg:text-5xl mb-4"
            style={{ textShadow: '0 0 20px rgba(155,93,229,0.3)' }}
          >
            输入你的八字
          </h1>
          <p className="text-lg" style={{ color: '#9b5de5', fontFamily: 'var(--font-kungfu)', textShadow: '0 0 10px rgba(155,93,229,0.2)' }}>
            SoulForge 会为你炼制专属守护灵
          </p>
          <div className="mt-3 w-24 h-0.5 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #9b5de5, transparent)' }} />
        </div>

        {/* Bazi Input */}
        <div
          className="relative p-6 lg:p-8 rounded-xl mb-8"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(155, 93, 229, 0.15)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: '年柱', g: yearG, setG: setYearG, z: yearZ, setZ: setYearZ },
              { label: '月柱', g: monthG, setG: setMonthG, z: monthZ, setZ: setMonthZ },
              { label: '日柱', g: dayG, setG: setDayG, z: dayZ, setZ: setDayZ },
              { label: '时柱', g: hourG, setG: setHourG, z: hourZ, setZ: setHourZ },
            ].map((col) => (
              <div key={col.label} className="text-center">
                <span className="text-xs block mb-2" style={{ color: '#9b5de5', fontFamily: 'var(--font-kungfu)' }}>
                  {col.label}
                </span>
                <div className="flex gap-2 justify-center">
                  <select
                    value={col.g}
                    onChange={(e) => col.setG(Number(e.target.value))}
                    className="px-2 py-2 rounded-lg text-sm outline-none cursor-pointer"
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(155,93,229,0.3)',
                      color: '#f0f0f5',
                      fontFamily: 'var(--font-chinese)',
                    }}
                  >
                    {tianGan.map((g, i) => (
                      <option key={i} value={i} style={{ background: '#0a0a1a' }}>{g}</option>
                    ))}
                  </select>
                  <select
                    value={col.z}
                    onChange={(e) => col.setZ(Number(e.target.value))}
                    className="px-2 py-2 rounded-lg text-sm outline-none cursor-pointer"
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(155,93,229,0.3)',
                      color: '#f0f0f5',
                      fontFamily: 'var(--font-chinese)',
                    }}
                  >
                    {diZhi.map((z, i) => (
                      <option key={i} value={i} style={{ background: '#0a0a1a' }}>{z}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Bazi Display */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-4">
              {baziString.split(' ').map((pair, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-2xl font-bold" style={{ color: '#f0f0f5', fontFamily: 'var(--font-chinese)', textShadow: '0 0 10px rgba(0,242,255,0.2)' }}>
                    {pair}
                  </span>
                  <span className="text-[10px] mt-1" style={{ color: 'rgba(160,160,176,0.4)' }}>
                    {['年', '月', '日', '时'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Forge Button */}
          <div className="text-center relative">
            <ForgeParticles active={isForging} />
            <button
              onClick={startForge}
              disabled={isForging}
              className="relative z-20 btn-liquid-pink text-lg py-4 px-14 disabled:opacity-50"
              style={{
                background: isForging
                  ? 'linear-gradient(135deg, #9b5de5, #f72585)'
                  : 'linear-gradient(135deg, #00f2ff, #9b5de5, #f72585)',
                backgroundSize: '200% 200%',
                animation: isForging ? 'gradientShift 2s ease infinite' : undefined,
              }}
            >
              {isForging ? `炼制中... ${forgeProgress}%` : '开始炼制'}
            </button>
          </div>
        </div>

        {/* Result */}
        {guardian && (
          <div
            ref={resultRef}
            className="p-6 lg:p-8 rounded-xl"
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: `1px solid ${guardian.agent.color}44`,
              backdropFilter: 'blur(10px)',
              boxShadow: `0 0 40px ${guardian.agent.color}15`,
            }}
          >
            <div className="text-center">
              <p className="text-xs mb-3" style={{ color: 'rgba(160,160,176,0.5)', fontFamily: 'var(--font-mono)' }}>
                你的八字：{baziString} · 五行：{guardian.element}
              </p>

              <div
                className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden"
                style={{
                  border: `2px solid ${guardian.agent.color}`,
                  boxShadow: `0 0 30px ${guardian.agent.color}44`,
                }}
              >
                <img
                  src={guardian.agent.avatar}
                  alt={guardian.agent.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, ${guardian.agent.color}22, transparent)` }}
                />
              </div>

              <GuardianIcon className="w-6 h-6 mx-auto mb-2" style={{ color: guardian.agent.color }} />

              <h2 className="text-2xl font-bold mb-1" style={{ color: guardian.agent.color, fontFamily: 'var(--font-chinese)' }}>
                {guardian.agent.name} · {guardian.agent.title}
              </h2>
              <p className="text-xs mb-4" style={{ color: 'rgba(160,160,176,0.5)' }}>
                {guardian.agent.personality}
              </p>

              <p className="text-base leading-relaxed max-w-[500px] mx-auto mb-4" style={{ color: '#d0d0d8', fontFamily: 'var(--font-chinese)' }}>
                {guardian.desc}
              </p>

              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {guardian.agent.personality.split('、').map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      background: `${guardian.agent.color}15`,
                      border: `1px solid ${guardian.agent.color}33`,
                      color: guardian.agent.color,
                      fontFamily: 'var(--font-chinese)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2 text-xs" style={{ color: 'rgba(160,160,176,0.4)' }}>
                <span>声线：{guardian.agent.voice}</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
