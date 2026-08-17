import { useEffect, useRef } from 'react';

interface Props {
  count?: number;
  minR?: number;
  maxR?: number;
}

export function SimpleBubbles({ count = 6, minR = 40, maxR = 100 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = canvasRef.current!;
    const c = cvs.getContext('2d')!;
    let W = 0, H = 0, raf = 0;

    const bubbles: {
      x: number; y: number; r: number;
      speed: number; wobble: number; wobbleSpeed: number;
      hue: number;
    }[] = [];

    const createBubble = (fromBottom: boolean) => ({
      x: Math.random() * W,
      y: fromBottom ? H + minR : Math.random() * H,
      r: minR + Math.random() * (maxR - minR),
      speed: 0.15 + Math.random() * 0.3,
      wobble: Math.random() * 6.28,
      wobbleSpeed: 0.002 + Math.random() * 0.006,
      hue: 170 + Math.random() * 70, // cyan to pink range
    });

    const init = () => {
      W = cvs.width = cvs.offsetWidth;
      H = cvs.height = cvs.offsetHeight;
      bubbles.length = 0;
      for (let i = 0; i < count; i++) bubbles.push(createBubble(false));
    };

    let visible = true;
    const onVis = () => { visible = !document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      c.clearRect(0, 0, W, H);

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.y -= b.speed;
        b.wobble += b.wobbleSpeed;

        if (b.y < -b.r - 20) {
          bubbles[i] = createBubble(true);
          continue;
        }

        const wx = b.x + Math.sin(b.wobble) * 20;

        // Ultra-transparent filled circle — the main dreamy bubble body
        c.beginPath();
        c.arc(wx, b.y, b.r, 0, 6.28);
        c.fillStyle = `hsla(${b.hue}, 40%, 70%, 0.025)`;
        c.fill();

        // Ultra-thin rim — barely visible edge
        c.beginPath();
        c.arc(wx, b.y, b.r, 0, 6.28);
        c.strokeStyle = `hsla(${b.hue}, 35%, 80%, 0.08)`;
        c.lineWidth = 0.6;
        c.stroke();

        // Tiny highlight — the glossy reflection point
        c.beginPath();
        c.arc(wx - b.r * 0.25, b.y - b.r * 0.25, b.r * 0.12, 0, 6.28);
        c.fillStyle = `hsla(${b.hue + 30}, 30%, 95%, 0.15)`;
        c.fill();
      }
    };

    const ro = new ResizeObserver(init);
    ro.observe(cvs);
    init();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
      ro.disconnect();
    };
  }, [count, minR, maxR]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
