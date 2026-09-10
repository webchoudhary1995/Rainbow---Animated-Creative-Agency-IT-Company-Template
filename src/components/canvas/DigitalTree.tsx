"use client";

import { useEffect, useRef } from "react";

interface Orb {
  x: number; y: number;
  tx: number; ty: number;
  r: number;
  colorIdx: number;
  alpha: number;
  pulse: number;
}

interface Beam {
  ax: number; ay: number;
  bx: number; by: number;
  colorIdx: number;
  alpha: number;
}

const COLS = [
  [255, 59,  59 ],
  [255, 140,  0 ],
  [255, 215,  0 ],
  [0,   200, 83 ],
  [2,   136, 209],
  [92,  107, 192],
  [124,  77, 255],
];

function buildTree(
  cx: number, cy: number, scale: number, progress: number
): { orbs: Orb[]; beams: Beam[] } {
  const orbs: Orb[] = [];
  const beams: Beam[] = [];
  let ci = 0;

  function branch(
    x: number, y: number,
    angle: number, len: number,
    depth: number, maxDepth: number,
    parentX: number, parentY: number
  ) {
    if (depth > maxDepth) return;
    const depthRatio = depth / maxDepth;
    if (depthRatio > progress * 1.4) return;

    const ex = x + Math.cos(angle) * len * scale;
    const ey = y + Math.sin(angle) * len * scale;
    const nodeAlpha = Math.min(1, (progress * 1.4 - depthRatio) * 3);
    const col = ci++ % COLS.length;

    beams.push({ ax: parentX, ay: parentY, bx: ex, by: ey, colorIdx: col, alpha: nodeAlpha * 0.55 });
    orbs.push({
      x: parentX, y: parentY,
      tx: ex, ty: ey,
      r: Math.max(1.5, (maxDepth - depth + 1) * 1.6 - depth * 0.4),
      colorIdx: col,
      alpha: nodeAlpha,
      pulse: Math.random() * Math.PI * 2,
    });

    if (depth === maxDepth) {
      // Leaf glow
      orbs.push({ x: ex, y: ey, tx: ex, ty: ey, r: 3.5 + Math.random() * 2, colorIdx: col, alpha: nodeAlpha * 0.9, pulse: Math.random() * Math.PI * 2 });
    }

    const spread = 0.42 + depth * 0.05;
    branch(ex, ey, angle - spread, len * 0.68, depth + 1, maxDepth, ex, ey);
    branch(ex, ey, angle + spread, len * 0.65, depth + 1, maxDepth, ex, ey);
    if (depth < 2) branch(ex, ey, angle - 0.1, len * 0.62, depth + 1, maxDepth, ex, ey);
  }

  const base = { x: cx, y: cy };
  const maxD = Math.max(2, Math.floor(6 * progress));
  branch(cx, cy - 10 * scale, -Math.PI / 2, 55, 0, maxD, base.x, base.y);
  return { orbs, beams };
}

export default function DigitalTree({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  const rafRef = useRef(0);
  const tRef = useRef(0);

  useEffect(() => { progressRef.current = progress; }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const raw = canvas.getContext("2d");
    if (!raw) return;
    const ctx: CanvasRenderingContext2D = raw;

    let W = 0, H = 0;

    function resize() {
      W = canvas!.width  = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const p = progressRef.current;
      const cx = W / 2, cy = H * 0.92;
      const scale = Math.min(W, H) / 340;
      const t = tRef.current;

      const { orbs, beams } = buildTree(cx, cy, scale, p);

      // Draw beams
      for (const b of beams) {
        const [r, g, bv] = COLS[b.colorIdx];
        const grad = ctx.createLinearGradient(b.ax, b.ay, b.bx, b.by);
        grad.addColorStop(0, `rgba(${r},${g},${bv},0)`);
        grad.addColorStop(0.5, `rgba(${r},${g},${bv},${b.alpha})`);
        grad.addColorStop(1, `rgba(${r},${g},${bv},0)`);
        ctx.beginPath();
        ctx.moveTo(b.ax, b.ay);
        ctx.lineTo(b.bx, b.by);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Draw orbs
      for (const o of orbs) {
        const [r, g, bv] = COLS[o.colorIdx];
        const pulse = 1 + Math.sin(t * 0.04 + o.pulse) * 0.25;
        const radius = o.r * pulse;

        // Glow
        const glow = ctx.createRadialGradient(o.tx, o.ty, 0, o.tx, o.ty, radius * 8);
        glow.addColorStop(0, `rgba(${r},${g},${bv},${o.alpha * 0.3})`);
        glow.addColorStop(1, `rgba(${r},${g},${bv},0)`);
        ctx.beginPath();
        ctx.arc(o.tx, o.ty, radius * 8, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(o.tx, o.ty, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${bv},${o.alpha})`;
        ctx.fill();
      }

      // Floating light orbs (birds reimagined)
      const orbCount = 6;
      for (let i = 0; i < orbCount; i++) {
        const [r, g, bv] = COLS[i % COLS.length];
        const speed = 0.4 + i * 0.15;
        const ox = ((t * speed * 0.8 + i * (W / orbCount)) % (W + 120)) - 60;
        const oy = H * 0.3 + Math.sin(t * 0.025 + i * 1.2) * H * 0.12 + i * 18;
        const alpha = 0.5 + Math.sin(t * 0.03 + i) * 0.3;
        const size = 3 + Math.sin(t * 0.04 + i * 0.7) * 1.5;

        const g2 = ctx.createRadialGradient(ox, oy, 0, ox, oy, size * 10);
        g2.addColorStop(0, `rgba(${r},${g},${bv},${alpha * 0.6})`);
        g2.addColorStop(0.4, `rgba(${r},${g},${bv},${alpha * 0.15})`);
        g2.addColorStop(1, `rgba(${r},${g},${bv},0)`);
        ctx.beginPath();
        ctx.arc(ox, oy, size * 10, 0, Math.PI * 2);
        ctx.fillStyle = g2;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(ox, oy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${bv},${alpha})`;
        ctx.fill();

        // Trail
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(ox - speed * 18, oy);
        const trail = ctx.createLinearGradient(ox - speed * 18, oy, ox, oy);
        trail.addColorStop(0, `rgba(${r},${g},${bv},0)`);
        trail.addColorStop(1, `rgba(${r},${g},${bv},${alpha * 0.4})`);
        ctx.strokeStyle = trail;
        ctx.lineWidth = size * 0.6;
        ctx.stroke();
      }

      tRef.current++;
      rafRef.current = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-label="Digital neon particle tree with floating light orbs"
    />
  );
}
