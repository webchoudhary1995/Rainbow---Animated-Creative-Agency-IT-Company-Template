"use client";

import { useEffect, useRef } from "react";

/* ─── Service icons as Unicode symbols shown on branch tips ─── */
const SERVICE_ICONS = ["🌐", "⚙️", "📱", "🤖", "🎨", "☁️", "📈"];
const SERVICE_LABELS = [
  "Web Dev", "Backend", "Mobile",
  "AI / ML", "UI/UX", "Cloud", "SEO",
];

/* ─── Rainbow palette ─── */
const RAINBOW = [
  "#FF3B3B", "#FF8C00", "#FFD700",
  "#00C853", "#0288D1", "#5C6BC0", "#7C4DFF",
];

/* ─── Leaf green shades ─── */
const GREENS = [
  "#00e676", "#69f0ae", "#00c853",
  "#b9f6ca", "#1de9b6", "#76ff03", "#ccff90",
];

interface TipNode {
  x: number;
  y: number;
  colorIdx: number;
  iconIdx: number;
  alpha: number;
  depth: number;
}

/* ─── Deterministic pseudo-random ─── */
function pr(seed: number) {
  const x = Math.sin(seed + 1) * 43758.5453;
  return x - Math.floor(x);
}

export default function DigitalTree({ progress }: { progress: number }) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  const rafRef      = useRef(0);
  const tRef        = useRef(0);

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

    // ─── Draw a single round leaf cluster ───
    function drawLeafCluster(
      cx: number, cy: number,
      radius: number, alpha: number,
      greenIdx: number, t: number, seed: number
    ) {
      const count = 8;
      for (let i = 0; i < count; i++) {
        const a   = (i / count) * Math.PI * 2 + Math.sin(t * 0.015 + seed) * 0.2;
        const r   = radius * (0.55 + pr(seed + i) * 0.6);
        const lx  = cx + Math.cos(a) * r;
        const ly  = cy + Math.sin(a) * r * 0.75;
        const lr  = (radius * 0.42 + pr(seed + i + 100) * radius * 0.22);
        const col = GREENS[(greenIdx + i) % GREENS.length];

        // Leaf glow
        const g = ctx.createRadialGradient(lx, ly, 0, lx, ly, lr * 2.5);
        g.addColorStop(0,   hexAlpha(col, alpha * 0.55));
        g.addColorStop(0.5, hexAlpha(col, alpha * 0.18));
        g.addColorStop(1,   hexAlpha(col, 0));
        ctx.beginPath();
        ctx.arc(lx, ly, lr * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Leaf body
        ctx.save();
        ctx.translate(lx, ly);
        ctx.rotate(a + t * 0.008 + seed);
        ctx.beginPath();
        ctx.ellipse(0, 0, lr, lr * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = hexAlpha(col, alpha * 0.82);
        ctx.fill();
        ctx.restore();
      }

      // Centre dense cluster
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.65);
      cg.addColorStop(0,   hexAlpha(GREENS[greenIdx], alpha * 0.7));
      cg.addColorStop(1,   hexAlpha(GREENS[greenIdx], 0));
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.65, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
    }

    // ─── Draw service icon (emoji + label) at a tip node ───
    function drawServiceIcon(
      x: number, y: number, iconIdx: number,
      color: string, alpha: number, t: number, scale: number
    ) {
      if (alpha < 0.08) return;
      const bob  = Math.sin(t * 0.04 + iconIdx * 1.1) * 4 * scale;
      const iy   = y + bob - 28 * scale;
      const ix   = x;
      const sz   = Math.max(16, 26 * scale);

      // Glowing halo behind icon
      const halo = ctx.createRadialGradient(ix, iy, 0, ix, iy, sz * 2.2);
      halo.addColorStop(0,   hexAlpha(color, alpha * 0.45));
      halo.addColorStop(0.5, hexAlpha(color, alpha * 0.12));
      halo.addColorStop(1,   hexAlpha(color, 0));
      ctx.beginPath();
      ctx.arc(ix, iy, sz * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      // Circle background
      ctx.beginPath();
      ctx.arc(ix, iy, sz * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = hexAlpha("#020617", alpha * 0.85);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ix, iy, sz * 0.9, 0, Math.PI * 2);
      ctx.strokeStyle = hexAlpha(color, alpha * 0.9);
      ctx.lineWidth   = 2 * scale;
      ctx.stroke();

      // Emoji
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font        = `${sz * 0.9}px serif`;
      ctx.textAlign   = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(SERVICE_ICONS[iconIdx % SERVICE_ICONS.length], ix, iy);

      // Label below
      ctx.font        = `bold ${Math.max(9, 11 * scale)}px Inter,sans-serif`;
      ctx.fillStyle   = color;
      ctx.textAlign   = "center";
      ctx.textBaseline = "top";
      ctx.fillText(SERVICE_LABELS[iconIdx % SERVICE_LABELS.length], ix, iy + sz * 1.1);
      ctx.restore();
    }

    // ─── Recursive branch draw ───
    function drawBranch(
      x1: number, y1: number,
      angle: number, len: number,
      depth: number, maxDepth: number,
      branchSeed: number,
      tips: TipNode[]
    ) {
      if (depth > maxDepth || len < 5) return;

      const x2      = x1 + Math.cos(angle) * len;
      const y2      = y1 + Math.sin(angle) * len;
      const thick   = Math.max(0.8, (maxDepth - depth + 1) * 3.5 - depth * 0.8);
      const colIdx  = depth % RAINBOW.length;
      const col     = RAINBOW[colIdx];
      const p       = progressRef.current;
      const depthFrac = depth / maxDepth;
      const alpha   = Math.min(1, Math.max(0, (p * 1.4 - depthFrac) * 2.8));

      if (alpha <= 0) return;

      const t = tRef.current;
      const sway = depth > 0
        ? Math.sin(t * 0.016 + depth * 0.7 + branchSeed) * depth * 2.2
        : 0;
      const ex = x2 + sway;
      const ey = y2;

      // Branch line — brown trunk, rainbow neon edge glow
      const brownR = Math.max(40,  101 - depth * 8);
      const brownG = Math.max(20,   67 - depth * 6);
      const brownB = Math.max(10,   33 - depth * 4);

      // Glow
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = hexAlpha(col, alpha * 0.22);
      ctx.lineWidth   = thick * 3.5;
      ctx.lineCap     = "round";
      ctx.stroke();

      // Core trunk
      const bg = ctx.createLinearGradient(x1, y1, ex, ey);
      bg.addColorStop(0, `rgba(${brownR},${brownG},${brownB},${alpha})`);
      bg.addColorStop(1, `rgba(${Math.min(255, brownR + 20)},${Math.min(130, brownG + 50)},${Math.min(50, brownB + 10)},${alpha * 0.85})`);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = bg;
      ctx.lineWidth   = thick;
      ctx.lineCap     = "round";
      ctx.stroke();

      // Tip leaf clusters & icons
      if (depth >= maxDepth - 1) {
        const leafAlpha = Math.min(1, Math.max(0, (p * 1.4 - depthFrac) * 3.5));
        if (leafAlpha > 0.05) {
          const leafR = Math.max(14, (maxDepth - depth + 2) * 9 * (W / 500));
          drawLeafCluster(ex, ey, leafR, leafAlpha, colIdx, t, branchSeed * 17 + depth);
          tips.push({ x: ex, y: ey, colorIdx: colIdx, iconIdx: colIdx, alpha: leafAlpha, depth });
        }
      }

      // Recurse
      const spreadBase = 0.36 + depth * 0.042;
      const lenDecay   = 0.64 + pr(branchSeed + depth) * 0.09;
      drawBranch(ex, ey, angle - spreadBase,        len * lenDecay,        depth + 1, maxDepth, branchSeed + 1,  tips);
      drawBranch(ex, ey, angle + spreadBase,        len * (lenDecay - 0.04), depth + 1, maxDepth, branchSeed + 3,  tips);
      if (depth < 3) {
        drawBranch(ex, ey, angle - spreadBase * 0.4, len * (lenDecay - 0.07), depth + 1, maxDepth, branchSeed + 7,  tips);
      }
      if (depth < 2) {
        drawBranch(ex, ey, angle + spreadBase * 0.6, len * (lenDecay - 0.1),  depth + 1, maxDepth, branchSeed + 11, tips);
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const p  = progressRef.current;
      const t  = tRef.current;
      const cx = W / 2;
      const cy = H - 30;
      const sc = Math.min(W, H) / 480;

      // ── Ground glow ──
      const gg = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.45);
      gg.addColorStop(0,   "rgba(0,200,83,0.18)");
      gg.addColorStop(0.5, "rgba(0,200,83,0.05)");
      gg.addColorStop(1,   "transparent");
      ctx.fillStyle = gg;
      ctx.fillRect(0, 0, W, H);

      // ── Draw tree ──
      const tips: TipNode[] = [];
      const maxD = Math.min(7, Math.max(1, Math.round(7 * p)));
      const trunkLen = 90 * sc;
      drawBranch(cx, cy, -Math.PI / 2, trunkLen, 0, maxD, 42, tips);

      // ── Draw service icons on tip nodes (after all branches) ──
      for (const tip of tips) {
        drawServiceIcon(tip.x, tip.y, tip.iconIdx, RAINBOW[tip.colorIdx], tip.alpha, t, sc);
      }

      // ── Floating rainbow light orbs ──
      for (let i = 0; i < 7; i++) {
        const col   = RAINBOW[i];
        const speed = 0.3 + i * 0.1;
        const ox    = ((t * speed * 0.65 + i * (W / 7)) % (W + 120)) - 60;
        const oy    = H * 0.22 + Math.sin(t * 0.02 + i * 1.1) * H * 0.08 + i * 14;
        const sz    = (2 + Math.sin(t * 0.04 + i * 0.8) * 1) * sc;
        const alpha = 0.4 + Math.sin(t * 0.03 + i) * 0.22;

        const og = ctx.createRadialGradient(ox, oy, 0, ox, oy, sz * 9);
        og.addColorStop(0,   hexAlpha(col, alpha * 0.6));
        og.addColorStop(0.4, hexAlpha(col, alpha * 0.1));
        og.addColorStop(1,   hexAlpha(col, 0));
        ctx.beginPath();
        ctx.arc(ox, oy, sz * 9, 0, Math.PI * 2);
        ctx.fillStyle = og;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(ox, oy, sz, 0, Math.PI * 2);
        ctx.fillStyle = hexAlpha(col, alpha);
        ctx.fill();

        const trail = ctx.createLinearGradient(ox - speed * 20, oy, ox, oy);
        trail.addColorStop(0, hexAlpha(col, 0));
        trail.addColorStop(1, hexAlpha(col, alpha * 0.4));
        ctx.beginPath();
        ctx.moveTo(ox - speed * 20, oy);
        ctx.lineTo(ox, oy);
        ctx.strokeStyle = trail;
        ctx.lineWidth   = sz;
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
      aria-label="Growing digital tree with service icons"
    />
  );
}

/* ─── hex color to rgba with alpha ─── */
function hexAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
}
