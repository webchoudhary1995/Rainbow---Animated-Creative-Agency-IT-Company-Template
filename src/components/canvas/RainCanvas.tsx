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
  density = 1.2,
  className = "",
  mouseInteractive = true,
}: RainCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxRaw = canvas.getContext("2d");
    if (!ctxRaw) return;
    const ctx: CanvasRenderingContext2D = ctxRaw;

    let drops: Drop[] = [];
    let W = 0, H = 0;

    function resize() {
      if (!canvas) return;
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      initDrops();
    }

    function initDrops() {
      const count = Math.floor((W / 100) * density * 12);
      drops = Array.from({ length: count }, () =>
        makeDropAt(Math.random() * W, Math.random() * H)
      );
    }

    function makeDropAt(x: number, y: number): Drop {
      return {
        x, y,
        speed:    2 + Math.random() * 5,
        length:   15 + Math.random() * 35,
        opacity:  0.15 + Math.random() * 0.55,
        colorIdx: Math.floor(Math.random() * COLORS.length),
      };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1;

      for (const d of drops) {
        if (mouseInteractive) {
          const dx = d.x - mouse.current.x;
          const dy = d.y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) d.x += (dx / dist) * 0.8;
        }

        const col = COLORS[d.colorIdx];
        const grad = ctx.createLinearGradient(d.x, d.y, d.x - 2, d.y + d.length);
        grad.addColorStop(0,   col + "0)");
        grad.addColorStop(0.3, col + d.opacity + ")");
        grad.addColorStop(1,   col + "0)");

        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 2, d.y + d.length);
        ctx.strokeStyle = grad;
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
    if (mouseInteractive) canvas.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      if (mouseInteractive) canvas.removeEventListener("mousemove", onMouseMove);
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
