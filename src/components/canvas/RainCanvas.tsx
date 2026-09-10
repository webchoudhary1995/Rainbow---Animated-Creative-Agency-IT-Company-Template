"use client";

import { useEffect, useRef } from "react";

interface Drop {
  x: number; y: number;
  speed: number; length: number;
  opacity: number; colorIdx: number;
}

const COLORS = [
  "rgba(255,59,59,",
  "rgba(255,140,0,",
  "rgba(255,215,0,",
  "rgba(0,200,83,",
  "rgba(2,136,209,",
  "rgba(92,107,192,",
  "rgba(124,77,255,",
];

interface RainCanvasProps {
  density?: number;
  className?: string;
  mouseInteractive?: boolean;
}

export default function RainCanvas({
  density = 1,
  className = "",
  mouseInteractive = false,
}: RainCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef(0);
  const mouse     = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const raw = canvas.getContext("2d");
    if (!raw) return;
    const ctx: CanvasRenderingContext2D = raw;

    let drops: Drop[] = [];
    let W = 0, H = 0;

    function resize() {
      W = canvas!.width  = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
      const count = Math.floor((W / 100) * density * 10);
      drops = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        speed:    2.5 + Math.random() * 4,
        length:   12 + Math.random() * 28,
        opacity:  0.08 + Math.random() * 0.22,
        colorIdx: Math.floor(Math.random() * COLORS.length),
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (const d of drops) {
        if (mouseInteractive) {
          const dx = d.x - mouse.current.x;
          const dy = d.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) d.x += (dx / dist) * 0.5;
        }

        const col = COLORS[d.colorIdx];
        const g = ctx.createLinearGradient(d.x, d.y, d.x - 1.5, d.y + d.length);
        g.addColorStop(0,   col + "0)");
        g.addColorStop(0.4, col + d.opacity + ")");
        g.addColorStop(1,   col + "0)");

        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1.5, d.y + d.length);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1;
        ctx.stroke();

        d.y += d.speed;
        if (d.y > H + d.length) {
          d.y = -d.length;
          d.x = Math.random() * W;
          d.colorIdx = Math.floor(Math.random() * COLORS.length);
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    if (mouseInteractive) window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      if (mouseInteractive) window.removeEventListener("mousemove", onMouseMove);
    };
  }, [density, mouseInteractive]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
