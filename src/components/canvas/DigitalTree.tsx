"use client";

import { useEffect, useRef } from "react";

// Trunk & branch brown tones
const TRUNK_COLOR = [101, 67, 33] as const;

// Leaf greens — lush, multi-shade
const LEAF_GREENS = [
  [0,   200,  83],
  [34,  197,  94],
  [22,  163,  74],
  [74,  222, 128],
  [16,  185, 129],
  [0,   230,  64],
  [134, 239, 172],
] as const;

// Rainbow accent for orbs / beams
const RAINBOW = [
  [255, 59,  59 ],
  [255, 140,  0 ],
  [255, 215,  0 ],
  [0,   200,  83],
  [2,   136, 209],
  [92,  107, 192],
  [124,  77, 255],
] as const;

interface Leaf {
  x: number; y: number;
  r: number;
  ci: number;       // leaf green index
  alpha: number;
  pulse: number;
  swing: number;    // horizontal sway offset
}

interface Branch {
  x1: number; y1: number;
  x2: number; y2: number;
  thickness: number;
  depth: number;
  alpha: number;
  leaves: Leaf[];
}

function buildBranches(
  cx: number, cy: number, scale: number, progress: number
): Branch[] {
  const branches: Branch[] = [];
  let leafSeed = 0;

  function rand(seed: number) {
    // deterministic pseudo-random so tree stays stable
    const x = Math.sin(seed * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  }

  function branch(
    x: number, y: number,
    angle: number, len: number,
    depth: number, maxDepth: number
  ) {
    if (depth > maxDepth || len < 3) return;
    const depthRatio = depth / maxDepth;
    if (depthRatio > progress * 1.35) return;

    const nodeAlpha = Math.min(1, (progress * 1.35 - depthRatio) * 2.5);
    const ex = x + Math.cos(angle) * len * scale;
    const ey = y + Math.sin(angle) * len * scale;
    const thickness = Math.max(0.8, (maxDepth - depth + 1) * 2.2 - depth * 0.6);

    // Build leaves for tip branches
    const leaves: Leaf[] = [];
    if (depth >= maxDepth - 1) {
      const leafCount = 3 + Math.floor(rand(leafSeed++) * 5);
      for (let l = 0; l < leafCount; l++) {
        const spread = 28 * scale;
        const lx = ex + (rand(leafSeed++) - 0.5) * spread;
        const ly = ey + (rand(leafSeed++) - 0.5) * spread * 0.7 - rand(leafSeed++) * 14 * scale;
        leaves.push({
          x: lx, y: ly,
          r: (4 + rand(leafSeed++) * 6) * scale,
          ci: Math.floor(rand(leafSeed++) * LEAF_GREENS.length),
          alpha: nodeAlpha * (0.7 + rand(leafSeed++) * 0.3),
          pulse: rand(leafSeed++) * Math.PI * 2,
          swing: rand(leafSeed++) * Math.PI * 2,
        });
      }
    }

    branches.push({ x1: x, y1: y, x2: ex, y2: ey, thickness, depth, alpha: nodeAlpha, leaves });

    const spreadAngle = 0.38 + depth * 0.045;
    const lenDecay    = 0.66 + rand(leafSeed++) * 0.08;
    branch(ex, ey, angle - spreadAngle,        len * lenDecay,        depth + 1, maxDepth);
    branch(ex, ey, angle + spreadAngle,        len * (lenDecay - 0.04), depth + 1, maxDepth);
    if (depth < 3) {
      branch(ex, ey, angle - spreadAngle * 0.25, len * (lenDecay - 0.06), depth + 1, maxDepth);
    }
    if (depth < 2) {
      branch(ex, ey, angle + spreadAngle * 0.55, len * (lenDecay - 0.1),  depth + 1, maxDepth);
    }
  }

  const maxD = Math.min(7, Math.max(2, Math.floor(7 * progress)));
  branch(cx, cy, -Math.PI / 2, 62, 0, maxD);
  return branches;
}

export default function DigitalTree({ progress }: { progress: number }) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  const rafRef     = useRef(0);
  const tRef       = useRef(0);

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
      const p   = progressRef.current;
      const t   = tRef.current;
      const cx  = W / 2;
      const cy  = H * 0.9;
      const sc  = Math.min(W, H) / 380;

      // ── Ground glow ──
      const gg = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.4);
      gg.addColorStop(0,   "rgba(0,200,83,0.12)");
      gg.addColorStop(0.5, "rgba(0,200,83,0.04)");
      gg.addColorStop(1,   "transparent");
      ctx.fillStyle = gg;
      ctx.fillRect(0, 0, W, H);

      // ── Trunk base glow ──
      const tg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60 * sc);
      tg.addColorStop(0,   "rgba(0,200,83,0.18)");
      tg.addColorStop(1,   "transparent");
      ctx.fillStyle = tg;
      ctx.beginPath();
      ctx.arc(cx, cy, 60 * sc, 0, Math.PI * 2);
      ctx.fill();

      const branches = buildBranches(cx, cy, sc, p);

      // ── Draw branches (trunk color, thicker near root) ──
      for (const b of branches) {
        const sway = Math.sin(t * 0.018 + b.depth * 0.4) * (b.depth * 1.5) * sc;
        const ex2  = b.x2 + sway;
        const ey2  = b.y2;

        // Trunk gradient: brown → greenish at tips
        const bg = ctx.createLinearGradient(b.x1, b.y1, ex2, ey2);
        const depthFrac = b.depth / 7;
        const r1 = TRUNK_COLOR[0], g1 = TRUNK_COLOR[1], bv1 = TRUNK_COLOR[2];
        const r2 = Math.round(r1 + (0   - r1) * depthFrac * 0.6);
        const g2 = Math.round(g1 + (160 - g1) * depthFrac * 0.6);
        const b2 = Math.round(bv1 + (60  - bv1) * depthFrac * 0.4);

        bg.addColorStop(0, `rgba(${r1},${g1},${bv1},${b.alpha * 0.9})`);
        bg.addColorStop(1, `rgba(${r2},${g2},${b2},${b.alpha * 0.7})`);

        ctx.beginPath();
        ctx.moveTo(b.x1, b.y1);
        ctx.lineTo(ex2, ey2);
        ctx.strokeStyle = bg;
        ctx.lineWidth   = b.thickness;
        ctx.lineCap     = "round";
        ctx.stroke();

        // Rainbow neon edge glow on branches (subtle)
        const rc = RAINBOW[b.depth % RAINBOW.length];
        ctx.beginPath();
        ctx.moveTo(b.x1, b.y1);
        ctx.lineTo(ex2, ey2);
        ctx.strokeStyle = `rgba(${rc[0]},${rc[1]},${rc[2]},${b.alpha * 0.12})`;
        ctx.lineWidth   = b.thickness * 2.5;
        ctx.stroke();

        // ── Draw leaves ──
        for (const lf of b.leaves) {
          const pulse = 1 + Math.sin(t * 0.035 + lf.pulse) * 0.18;
          const swayX = Math.sin(t * 0.022 + lf.swing) * 4 * sc;
          const swayY = Math.cos(t * 0.018 + lf.swing) * 2 * sc;
          const lx    = lf.x + sway + swayX;
          const ly    = lf.y + swayY;
          const lr    = lf.r * pulse;

          const [gr, gg2, gb] = LEAF_GREENS[lf.ci];

          // Outer glow
          const leafGlow = ctx.createRadialGradient(lx, ly, 0, lx, ly, lr * 4);
          leafGlow.addColorStop(0,   `rgba(${gr},${gg2},${gb},${lf.alpha * 0.35})`);
          leafGlow.addColorStop(0.5, `rgba(${gr},${gg2},${gb},${lf.alpha * 0.1})`);
          leafGlow.addColorStop(1,   `rgba(${gr},${gg2},${gb},0)`);
          ctx.beginPath();
          ctx.arc(lx, ly, lr * 4, 0, Math.PI * 2);
          ctx.fillStyle = leafGlow;
          ctx.fill();

          // Leaf body — ellipse
          ctx.save();
          ctx.translate(lx, ly);
          ctx.rotate(lf.swing + t * 0.008);
          ctx.beginPath();
          ctx.ellipse(0, 0, lr, lr * 0.6, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${gr},${gg2},${gb},${lf.alpha * 0.85})`;
          ctx.fill();
          // Leaf vein
          ctx.beginPath();
          ctx.moveTo(-lr * 0.7, 0);
          ctx.lineTo( lr * 0.7, 0);
          ctx.strokeStyle = `rgba(${gr},${gg2},${gb},${lf.alpha * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.restore();
        }
      }

      // ── Rainbow sparkle particles on canopy ──
      if (p > 0.4) {
        const sparkCount = Math.floor(p * 18);
        for (let i = 0; i < sparkCount; i++) {
          const angle  = (i / sparkCount) * Math.PI * 2 + t * 0.01;
          const radius = (60 + i * 8) * sc * p;
          const px2    = cx + Math.cos(angle) * radius;
          const py2    = cy - (H * 0.35 * p) + Math.sin(angle * 2) * radius * 0.4;
          const [sr, sg, sb] = RAINBOW[i % RAINBOW.length];
          const sparklePulse = 0.5 + Math.sin(t * 0.06 + i * 1.1) * 0.5;
          const sr2 = (1.5 + sparklePulse * 2.5) * sc;

          const spGlow = ctx.createRadialGradient(px2, py2, 0, px2, py2, sr2 * 5);
          spGlow.addColorStop(0,   `rgba(${sr},${sg},${sb},${sparklePulse * 0.7})`);
          spGlow.addColorStop(1,   `rgba(${sr},${sg},${sb},0)`);
          ctx.beginPath();
          ctx.arc(px2, py2, sr2 * 5, 0, Math.PI * 2);
          ctx.fillStyle = spGlow;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px2, py2, sr2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${sr},${sg},${sb},${sparklePulse * 0.9})`;
          ctx.fill();
        }
      }

      // ── Floating rainbow light orbs (bird-like drifters) ──
      for (let i = 0; i < 7; i++) {
        const [r, g, bv] = RAINBOW[i];
        const speed = 0.35 + i * 0.12;
        const ox    = ((t * speed * 0.7 + i * (W / 7)) % (W + 140)) - 70;
        const oy    = H * 0.25 + Math.sin(t * 0.022 + i * 1.1) * H * 0.1 + i * 16;
        const sz    = (2.5 + Math.sin(t * 0.04 + i * 0.8) * 1.2) * sc;
        const alpha = 0.45 + Math.sin(t * 0.03 + i) * 0.25;

        const orbGlow = ctx.createRadialGradient(ox, oy, 0, ox, oy, sz * 9);
        orbGlow.addColorStop(0,   `rgba(${r},${g},${bv},${alpha * 0.55})`);
        orbGlow.addColorStop(0.4, `rgba(${r},${g},${bv},${alpha * 0.12})`);
        orbGlow.addColorStop(1,   `rgba(${r},${g},${bv},0)`);
        ctx.beginPath();
        ctx.arc(ox, oy, sz * 9, 0, Math.PI * 2);
        ctx.fillStyle = orbGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(ox, oy, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${bv},${alpha})`;
        ctx.fill();

        // Trail
        const trail = ctx.createLinearGradient(ox - speed * 22, oy, ox, oy);
        trail.addColorStop(0, `rgba(${r},${g},${bv},0)`);
        trail.addColorStop(1, `rgba(${r},${g},${bv},${alpha * 0.45})`);
        ctx.beginPath();
        ctx.moveTo(ox - speed * 22, oy);
        ctx.lineTo(ox, oy);
        ctx.strokeStyle = trail;
        ctx.lineWidth   = sz * 0.8;
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
      aria-label="Lush digital tree with rainbow sparkles and floating orbs"
    />
  );
}
