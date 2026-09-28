'use client';

import { useEffect, useRef, useState } from 'react';
import genesData from '@/data/genes.json';

/**
 * DnaHelix — 代码生成的双螺旋背景动画
 * 白色画布上，一条缓慢旋转的 DNA 双螺旋横贯屏幕，
 * 碱基对按 A-T / C-G 上色，另有几枚缓缓漂移的"细胞"光斑。
 * 桌面端把鼠标悬停到某个碱基竖道上，会随机弹出一枚「基因小卡」
 * （内容来自 data/genes.json 基因库），左下角按钮可随时开关该功能；
 * 屏幕宽度 ≤560px 时整个组件自动隐藏。
 * 支持暂停 / 播放，并尊重系统的 prefers-reduced-motion 设置。
 */

interface Gene {
  symbol: string;
  name: string;
  zh: string;
  en: string;
}
const GENES = genesData as Gene[];

// 碱基配色（白底下的柔和版本）
const BASE_PAIR_COLORS = [
  ['#2e7d4f', '#c1503f'], // A - T
  ['#2f6fb2', '#d9a514'], // C - G
];
const STRAND_FRONT = '#286e44'; // 深绿主链
const STRAND_BACK = '#0d9488'; // 青绿主链

const RUNG_GAP = 24; // 碱基对间距
const HIT_RADIUS = 14; // 鼠标命中竖道的横向容差

interface Cell {
  r: number;
  cx: number;
  cy: number;
  sx: number;
  sy: number;
  px: number;
  py: number;
  hue: string;
}

interface Rung {
  key: number;
  x: number;
  ya: number;
  yb: number;
}

interface Tip {
  x: number;
  y: number;
  gene: Gene;
}

function HelixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const labelsOnRef = useRef(true);
  const [labelsOn, setLabelsOn] = useState(true); // 基因标签开关
  const rafRef = useRef<number>(0);
  const rungsRef = useRef<Rung[]>([]); // 上一帧所有可见竖道的位置
  const hoverKeyRef = useRef<number>(-1); // 当前悬停的竖道
  const sizeRef = useRef({ w: 0, h: 0 });
  const [tip, setTip] = useState<Tip | null>(null);

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
      sizeRef.current = { w: width, h: height };
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
      const margin = 40;

      const y1 = (x: number) => cy + Math.sin(x * k + t) * amp;
      const y2 = (x: number) => cy + Math.sin(x * k + t + Math.PI) * amp;
      const depth1 = (x: number) => Math.cos(x * k + t); // 1=最前 -1=最后

      // 先画碱基对横档（只在近似"侧面"时可见，模拟真实螺旋）
      const rungs: Rung[] = [];
      for (let x = -margin; x <= width + margin; x += RUNG_GAP) {
        const d = depth1(x);
        const visibility = Math.abs(d); // 正对侧面时横档最长最清晰
        if (visibility < 0.12) continue;
        const key = Math.round(x / RUNG_GAP);
        const pair = BASE_PAIR_COLORS[key % 2 === 0 ? 0 : 1];
        const ya = y1(x);
        const yb = y2(x);
        const midY = (ya + yb) / 2;
        const hovered = key === hoverKeyRef.current;
        const alpha = hovered ? 1 : 0.16 + visibility * 0.5;

        rungs.push({ key, x, ya, yb });

        ctx.lineCap = 'round';
        ctx.lineWidth = hovered ? 4 : 2.4;
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
        ctx.arc(x, ya, (hovered ? 1.6 : 1) * (2.2 + visibility * 1.6), 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = pair[1];
        ctx.beginPath();
        ctx.arc(x, yb, (hovered ? 1.6 : 1) * (2.2 + visibility * 1.6), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      rungsRef.current = rungs;

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

  const toggleLabels = () => {
    const next = !labelsOn;
    setLabelsOn(next);
    labelsOnRef.current = next;
    if (!next) {
      // 关闭时立刻清掉当前悬停状态和已弹出的小卡
      hoverKeyRef.current = -1;
      setTip(null);
    }
  };

  // 悬停命中检测：找到离鼠标最近、且纵坐标落在竖道范围内的碱基对
  const handleMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!labelsOnRef.current) return; // 标签已关闭，不做命中检测
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let best: Rung | null = null;
    let bestDist = HIT_RADIUS;
    for (const r of rungsRef.current) {
      const dx = Math.abs(mx - r.x);
      const yTop = Math.min(r.ya, r.yb) - 10;
      const yBot = Math.max(r.ya, r.yb) + 10;
      if (dx < bestDist && my >= yTop && my <= yBot) {
        best = r;
        bestDist = dx;
      }
    }

    if (!best) {
      if (hoverKeyRef.current !== -1) {
        hoverKeyRef.current = -1;
        setTip(null);
      }
      return;
    }
    if (best.key !== hoverKeyRef.current) {
      hoverKeyRef.current = best.key;
      setTip({ x: mx, y: my, gene: GENES[Math.floor(Math.random() * GENES.length)] });
    } else {
      setTip((prev) => (prev ? { ...prev, x: mx, y: my } : prev));
    }
  };

  const handleLeave = () => {
    hoverKeyRef.current = -1;
    setTip(null);
  };

  // 基因小卡定位：默认在光标右上方，靠近边缘时收回来
  const CARD_W = 264;
  const CARD_H = 150;
  const { w: cw, h: ch } = sizeRef.current;
  const tipLeft = tip ? Math.max(8, Math.min(tip.x + 18, cw - CARD_W - 8)) : 0;
  const tipTop = tip ? Math.max(8, Math.min(tip.y - 20, ch - CARD_H - 8)) : 0;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      />
      {tip && labelsOn && (
        <div
          className="pointer-events-none absolute z-30 w-[264px] rounded-lg border border-teal-100 bg-white/95 px-4 py-3 shadow-lg backdrop-blur"
          style={{ left: tipLeft, top: tipTop }}
        >
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base font-bold text-teal-700">{tip.gene.symbol}</span>
            <span className="truncate text-[10px] text-slate-400">{tip.gene.name}</span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-700">{tip.gene.zh}</p>
          <p className="mt-1 text-[10px] leading-relaxed text-slate-400">{tip.gene.en}</p>
        </div>
      )}
      <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 z-20 flex gap-2">
        <button
          onClick={togglePause}
          className="rounded-full border border-dashed border-slate-400 bg-white/70 backdrop-blur px-3 py-1 text-[11px] text-slate-500 hover:border-teal-600 hover:text-teal-700 transition-colors"
        >
          {paused ? '播放动画 Play' : '暂停动画 Pause'}
        </button>
        <button
          onClick={toggleLabels}
          className={`rounded-full border border-dashed px-3 py-1 text-[11px] backdrop-blur transition-colors ${
            labelsOn
              ? 'border-teal-500 bg-teal-50/70 text-teal-700 hover:border-teal-600'
              : 'border-slate-400 bg-white/70 text-slate-500 hover:border-teal-600 hover:text-teal-700'
          }`}
        >
          {labelsOn ? '基因标签：开' : '基因标签：关'}
        </button>
      </div>
    </>
  );
}

/** 屏幕宽度 ≤560px（覆盖最宽的手机）时不渲染，避免动画被压缩得难以辨认 */
export default function DnaHelix() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 561px)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  if (!enabled) return null;
  return <HelixCanvas />;
}
