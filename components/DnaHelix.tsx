'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * DnaHelix — 代码生成的双螺旋背景动画
 * 白色画布上，一条缓慢旋转的 DNA 双螺旋横贯屏幕，
 * 碱基对按 A-T / C-G 上色，另有几枚缓缓漂移的"细胞"光斑。
 * 支持暂停 / 播放，并尊重系统的 prefers-reduced-motion 设置。
 */

// 碱基配色（白底下的柔和版本）
const BASE_PAIR_COLORS = [
  ['#2e7d4f', '#c1503f'], // A - T
  ['#2f6fb2', '#d9a514'], // C - G
];
const STRAND_FRONT = '#286e44'; // 深绿主链
const STRAND_BACK = '#0d9488'; // 青绿主链

interface Cell {
  r: number;
  cx: number; // 相对中心偏移系数
  cy: number;
  sx: number; // 漂移速度
  sy: number;
  px: number; // 相位
  py: number;
  hue: string;
}

export default function DnaHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      pausedRef.current = true;
      setPaused(true);
    }

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // 漂移的"细胞"光斑
    const cells: Cell[] = [
      { r: 0.16, cx: -0.32, cy: -0.22, sx: 0.00021, sy: 0.00016, px: 0.0, py: 1.3, hue: '13,148,136' },
      { r: 0.13, cx: 0.34, cy: 0.18, sx: 0.00017, sy: 0.00023, px: 2.1, py: 0.4, hue: '40,110,68' },
      { r: 0.1, cx: 0.05, cy: 0.34, sx: 0.00025, sy: 0.00013, px: 4.2, py: 3.1, hue: '13,148,136' },
      { r: 0.08, cx: -0.12, cy: 0.05, sx: 0.00014, sy: 0.0002, px: 1.1, py: 5.0, hue: '217,165,20' },
    ];

    let t = 0; // 螺旋旋转相位
    let last = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (!pausedRef.current) t += dt * 0.00045;

      ctx.clearRect(0, 0, width, height);

      // ---- 背景细胞光斑 ----
      for (const c of cells) {
        const bx = width * 0.5 + width * (c.cx + 0.06 * Math.sin(now * c.sx + c.px));
        const by = height * 0.5 + height * (c.cy + 0.08 * Math.cos(now * c.sy + c.py));
        const r = Math.max(width, height) * c.r;
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, r);
        g.addColorStop(0, `rgba(${c.hue},0.07)`);
        g.addColorStop(1, `rgba(${c.hue},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(bx, by, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- DNA 双螺旋 ----
      const cy = height * 0.5;
      const amp = Math.min(height * 0.24, 150);
      const waveLen = Math.max(300, width * 0.32); // 一个螺距的像素宽度
      const k = (Math.PI * 2) / waveLen;
      const rungGap = 24; // 碱基对间距
      const margin = 40;

      const y1 = (x: number) => cy + Math.sin(x * k + t) * amp;
      const y2 = (x: number) => cy + Math.sin(x * k + t + Math.PI) * amp;
      const depth1 = (x: number) => Math.cos(x * k + t); // 1=最前 -1=最后

      // 先画碱基对横档（只在近似"侧面"时可见，模拟真实螺旋）
      for (let x = -margin; x <= width + margin; x += rungGap) {
        const d = depth1(x);
        const visibility = Math.abs(d); // 正对侧面时横档最长最清晰
        if (visibility < 0.12) continue;
        const pair = BASE_PAIR_COLORS[Math.round(x / rungGap) % 2 === 0 ? 0 : 1];
        const ya = y1(x);
        const yb = y2(x);
        const midY = (ya + yb) / 2;
        const alpha = 0.16 + visibility * 0.5;

        ctx.lineCap = 'round';
        ctx.lineWidth = 2.4;
        // 半档上色：各自归属一条链上的碱基
        ctx.strokeStyle = pair[0];
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(x, ya);
        ctx.lineTo(x, midY);
        ctx.stroke();
        ctx.strokeStyle = pair[1];
        ctx.beginPath();
        ctx.moveTo(x, midY);
        ctx.lineTo(x, yb);
        ctx.stroke();
        // 碱基节点
        ctx.fillStyle = pair[0];
        ctx.beginPath();
        ctx.arc(x, ya, 2.2 + visibility * 1.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = pair[1];
        ctx.beginPath();
        ctx.arc(x, yb, 2.2 + visibility * 1.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // 主链：后链（透明度低）先画，前链后画，形成穿插的空间感
      const drawStrand = (yFn: (x: number) => number, depthSign: 1 | -1, color: string) => {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        const step = 5;
        let segStart = -margin;
        for (let x = -margin; x <= width + margin; x += step) {
          const d = depthSign * depth1(x); // 该链在此处的深浅
          const front = d > 0;
          ctx.strokeStyle = color;
          ctx.globalAlpha = front ? 0.85 : 0.22;
          ctx.lineWidth = front ? 3 : 2;
          ctx.beginPath();
          ctx.moveTo(segStart, yFn(segStart));
          ctx.lineTo(x, yFn(x));
          ctx.stroke();
          segStart = x;
        }
        ctx.globalAlpha = 1;
      };

      drawStrand(y2, -1, STRAND_BACK);
      drawStrand(y1, 1, STRAND_FRONT);

      if (!pausedRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    rafRef.current = requestAnimationFrame(draw);

    // 供暂停按钮恢复动画
    const resume = () => {
      last = performance.now();
      rafRef.current = requestAnimationFrame(draw);
    };
    (canvas as any).__resume = resume;

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  const togglePause = () => {
    const next = !paused;
    setPaused(next);
    pausedRef.current = next;
    if (!next && canvasRef.current) {
      (canvasRef.current as any).__resume?.();
    }
  };

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <button
        onClick={togglePause}
        className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 z-20 rounded-full border border-dashed border-slate-400 bg-white/70 backdrop-blur px-3 py-1 text-[11px] text-slate-500 hover:border-teal-600 hover:text-teal-700 transition-colors"
      >
        {paused ? '播放动画 Play' : '暂停动画 Pause'}
      </button>
    </>
  );
}
