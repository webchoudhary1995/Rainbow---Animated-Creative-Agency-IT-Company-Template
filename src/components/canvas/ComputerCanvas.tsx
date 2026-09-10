"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  color: string; size: number;
}

const RAINBOW = ["#FF3B3B","#FF8C00","#FFD700","#00C853","#0288D1","#5C6BC0","#7C4DFF"];

// Polyfill roundRect
function polyfillRoundRect(ctx: CanvasRenderingContext2D) {
  const proto = ctx as unknown as Record<string, unknown>;
  if (proto["_rrPatched"]) return;
  proto["_rrPatched"] = true;
  if (!("roundRect" in ctx)) {
    (ctx as unknown as Record<string, unknown>)["roundRect"] = function(
      this: CanvasRenderingContext2D,
      x: number, y: number, w: number, h: number, r: number = 0
    ) {
      const rad = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
      this.beginPath();
      this.moveTo(x + rad, y);
      this.lineTo(x + w - rad, y);
      this.quadraticCurveTo(x + w, y, x + w, y + rad);
      this.lineTo(x + w, y + h - rad);
      this.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
      this.lineTo(x + rad, y + h);
      this.quadraticCurveTo(x, y + h, x, y + h - rad);
      this.lineTo(x, y + rad);
      this.quadraticCurveTo(x, y, x + rad, y);
      this.closePath();
    };
  }
}

// Helper that calls roundRect safely
function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  (ctx as unknown as { roundRect: (x: number, y: number, w: number, h: number, r: number) => void })
    .roundRect(x, y, w, h, r);
}

export default function ComputerCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxRaw = canvas.getContext("2d");
    if (!ctxRaw) return;
    const ctx: CanvasRenderingContext2D = ctxRaw;
    polyfillRoundRect(ctx);

    let W = 0, H = 0;
    let t = 0;
    const particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function spawnParticle(ox: number, oy: number) {
      particles.push({
        x: ox, y: oy,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -1 - Math.random() * 2,
        life: 0,
        maxLife: 60 + Math.random() * 60,
        color: RAINBOW[Math.floor(Math.random() * RAINBOW.length)],
        size: 2 + Math.random() * 4,
      });
    }

    function drawLaptop() {
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2 + 20;
      const scale = Math.min(W, H) / 420;
      const openAngle = 0.08 + Math.sin(t * 0.018) * 0.03;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      // Base
      ctx.beginPath();
      rr(ctx, -120, 60, 240, 18, 6);
      ctx.fillStyle = "#1e293b";
      ctx.fill();
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Lid
      ctx.save();
      ctx.translate(0, 60);
      ctx.rotate(-openAngle * Math.PI);

      // Screen bezel
      ctx.beginPath();
      rr(ctx, -110, -155, 220, 160, 8);
      ctx.fillStyle = "#0f172a";
      ctx.fill();
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Screen glow
      const sg = ctx.createLinearGradient(-100, -145, 100, 0);
      sg.addColorStop(0, "rgba(124,77,255,0.25)");
      sg.addColorStop(0.5, "rgba(2,136,209,0.15)");
      sg.addColorStop(1, "rgba(0,200,83,0.1)");
      ctx.beginPath();
      rr(ctx, -100, -145, 200, 145, 4);
      ctx.fillStyle = sg;
      ctx.fill();

      // Code lines
      const lines = [
        { y: -130, w: 80,  color: "#7C4DFF" },
        { y: -115, w: 130, color: "#0288D1" },
        { y: -100, w: 60,  color: "#00C853" },
        { y: -85,  w: 110, color: "#FFD700" },
        { y: -70,  w: 90,  color: "#FF8C00" },
        { y: -55,  w: 140, color: "#FF3B3B" },
        { y: -40,  w: 75,  color: "#5C6BC0" },
        { y: -25,  w: 120, color: "#7C4DFF" },
        { y: -10,  w: 50,  color: "#0288D1" },
      ];
      lines.forEach(({ y, w, color }) => {
        ctx.beginPath();
        rr(ctx, -90, y, w, 6, 3);
        ctx.fillStyle = color + "cc";
        ctx.fill();
        if (Math.sin(t * 0.06 + y) > 0.5) {
          ctx.beginPath();
          ctx.rect(-90 + w + 3, y + 1, 2, 5);
          ctx.fillStyle = "#fff";
          ctx.fill();
        }
      });

      // Floating chip 1
      const c1x = 70 + Math.sin(t * 0.04) * 6;
      const c1y = -90 + Math.cos(t * 0.035) * 5;
      ctx.beginPath();
      rr(ctx, c1x, c1y, 55, 22, 6);
      ctx.fillStyle = "rgba(124,77,255,0.35)";
      ctx.strokeStyle = "#7C4DFF";
      ctx.lineWidth = 1;
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 8px sans-serif";
      ctx.fillText("AI ✦", c1x + 8, c1y + 14);

      // Floating chip 2
      const c2x = -145 + Math.cos(t * 0.038) * 5;
      const c2y = -105 + Math.sin(t * 0.04) * 6;
      ctx.beginPath();
      rr(ctx, c2x, c2y, 60, 22, 6);
      ctx.fillStyle = "rgba(2,136,209,0.3)";
      ctx.strokeStyle = "#0288D1";
      ctx.lineWidth = 1;
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 8px sans-serif";
      ctx.fillText("Deploy →", c2x + 6, c2y + 14);

      ctx.restore(); // lid

      // Keyboard
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 14; col++) {
          const kx = -105 + col * 15.5;
          const ky = 65 + row * 11;
          ctx.beginPath();
          rr(ctx, kx, ky, 13, 8, 2);
          ctx.fillStyle = row === 0 && col === 6 ? "rgba(124,77,255,0.6)" : "#1e293b";
          ctx.strokeStyle = "#334155";
          ctx.lineWidth = 0.5;
          ctx.fill(); ctx.stroke();
        }
      }

      // Glow halo
      const halo = ctx.createRadialGradient(0, 0, 10, 0, 0, 180);
      halo.addColorStop(0, "rgba(124,77,255,0.12)");
      halo.addColorStop(1, "rgba(124,77,255,0)");
      ctx.beginPath();
      ctx.ellipse(0, 0, 180, 130, 0, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();

      ctx.restore();

      // Spawn particles
      if (t % 4 === 0) {
        const px = cx + (Math.random() - 0.5) * 160 * scale;
        const py = cy - 60 * scale + (Math.random() - 0.5) * 80 * scale;
        spawnParticle(px, py);
      }

      // Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const alpha = 1 - p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(alpha * 220).toString(16).padStart(2, "0");
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.98; p.vy *= 0.98;
        p.life++;
        if (p.life >= p.maxLife) particles.splice(i, 1);
      }

      t++;
      raf.current = requestAnimationFrame(drawLaptop);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    drawLaptop();

    return () => { cancelAnimationFrame(raf.current); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-label="Animated 3D laptop illustration"
    />
  );
}
