"use client";

import { useEffect, useRef } from "react";

interface Leaf {
  x: number; y: number;
  angle: number; size: number;
  color: string; alpha: number;
  born: number;
}

interface Bird {
  x: number; y: number;
  speed: number; amp: number;
  phase: number; scale: number;
  colorIdx: number;
}

const LEAF_COLORS = ["#FF3B3B","#FF8C00","#FFD700","#00C853","#0288D1","#5C6BC0","#7C4DFF"];

export default function StoryCanvas({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);
  const tRef = useRef(0);
  const progressRef = useRef(progress);

  // Keep progressRef in sync without restarting the loop
  useEffect(() => { progressRef.current = progress; }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxRaw = canvas.getContext("2d");
    if (!ctxRaw) return;
    const ctx: CanvasRenderingContext2D = ctxRaw;

    let W = 0, H = 0;
    const leaves: Leaf[] = [];
    const birds: Bird[] = Array.from({ length: 5 }, (_, i) => ({
      x: -80 - i * 120,
      y: 60 + i * 25,
      speed: 0.8 + i * 0.3,
      amp: 12 + i * 6,
      phase: i * 0.8,
      scale: 0.6 + i * 0.12,
      colorIdx: i % LEAF_COLORS.length,
    }));

    function resize() {
      if (!canvas) return;
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function drawBird(bx: number, by: number, s: number, color: string) {
      ctx.save();
      ctx.translate(bx, by);
      ctx.scale(s, s);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-12, -8, -20, -4, -24, 0);
      ctx.bezierCurveTo(-20, 4, -12, 2, 0, 0);
      ctx.bezierCurveTo(12, -2, 20, -4, 24, 0);
      ctx.bezierCurveTo(20, 4, 12, 8, 0, 0);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    }

    function drawTree(gf: number) {
      const cx = W / 2;
      const base = H - 20;

      function branch(x: number, y: number, angle: number, len: number, depth: number, maxDepth: number) {
        if (depth > maxDepth || len < 3) return;
        const ex = x + Math.cos(angle) * len;
        const ey = y + Math.sin(angle) * len;
        const grad = ctx.createLinearGradient(x, y, ex, ey);
        grad.addColorStop(0, `rgba(120,80,40,${0.9 - depth * 0.12})`);
        grad.addColorStop(1, `rgba(80,50,20,${0.5 - depth * 0.06})`);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.max(0.5, (maxDepth - depth + 1) * 1.8);
        ctx.stroke();

        if (depth >= maxDepth - 1) {
          const leafAlpha = Math.min(1, (gf - 0.5) * 2);
          if (leafAlpha > 0) {
            const lc = LEAF_COLORS[depth % LEAF_COLORS.length];
            ctx.beginPath();
            ctx.arc(ex, ey, 6 + Math.sin(tRef.current * 0.05 + depth) * 2, 0, Math.PI * 2);
            ctx.fillStyle = lc + Math.floor(leafAlpha * 200).toString(16).padStart(2, "0");
            ctx.fill();
            if (Math.random() < 0.004 * gf) {
              leaves.push({ x: ex, y: ey, angle: Math.random() * Math.PI * 2, size: 3 + Math.random() * 5, color: lc, alpha: 0.8, born: tRef.current });
            }
          }
        }

        const spread = 0.45 + depth * 0.04;
        branch(ex, ey, angle - spread, len * 0.72, depth + 1, maxDepth);
        branch(ex, ey, angle + spread, len * 0.68, depth + 1, maxDepth);
        if (depth < 3) branch(ex, ey, angle - 0.12, len * 0.65, depth + 1, maxDepth);
      }

      const trunkH = 180 * gf;
      const tg = ctx.createLinearGradient(cx, base, cx, base - trunkH);
      tg.addColorStop(0, "#78503a"); tg.addColorStop(1, "#4a3020");
      ctx.beginPath();
      ctx.moveTo(cx - 10, base); ctx.lineTo(cx - 6, base - trunkH);
      ctx.lineTo(cx + 6, base - trunkH); ctx.lineTo(cx + 10, base);
      ctx.fillStyle = tg; ctx.fill();

      const maxDepth = Math.floor(5 * gf) + 1;
      branch(cx, base - trunkH, -Math.PI / 2, 90 * gf, 0, Math.max(2, maxDepth));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const gf = Math.min(1, Math.max(0, progressRef.current));

      const gg = ctx.createRadialGradient(W / 2, H, 0, W / 2, H, W * 0.4);
      gg.addColorStop(0, "rgba(0,200,83,0.08)");
      gg.addColorStop(1, "transparent");
      ctx.fillStyle = gg;
      ctx.fillRect(0, 0, W, H);

      drawTree(gf);

      for (let i = leaves.length - 1; i >= 0; i--) {
        const l = leaves[i];
        const age = (tRef.current - l.born) / 120;
        if (age > 1) { leaves.splice(i, 1); continue; }
        l.y += 0.8;
        l.x += Math.sin(tRef.current * 0.05 + l.angle) * 0.6;
        l.angle += 0.03;
        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.angle);
        ctx.globalAlpha = l.alpha * (1 - age);
        ctx.beginPath();
        ctx.ellipse(0, 0, l.size, l.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = l.color;
        ctx.fill();
        ctx.restore();
      }
      ctx.globalAlpha = 1;

      birds.forEach((b) => {
        b.x += b.speed * gf;
        const by2 = b.y + Math.sin(tRef.current * 0.04 + b.phase) * b.amp;
        const color = LEAF_COLORS[b.colorIdx] + "cc";
        const bscale = b.scale * (1 + Math.sin(tRef.current * 0.18 + b.phase) * 0.1);
        drawBird(b.x, by2, bscale, color);
        if (b.x > W + 80) b.x = -80;
      });

      tRef.current++;
      raf.current = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();
    return () => { cancelAnimationFrame(raf.current); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-label="Animated blooming tree with flying birds"
    />
  );
}
