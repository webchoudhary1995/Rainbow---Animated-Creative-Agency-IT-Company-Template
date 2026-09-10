"use client";

import { useEffect, useRef } from "react";

/* ── Tech icons with labels ── */
const TECH = [
  { emoji: "⚛️",  label: "React",      color: "#61DAFB" },
  { emoji: "▲",   label: "Next.js",    color: "#ffffff" },
  { emoji: "🐍",  label: "Python",     color: "#FFD700" },
  { emoji: "☁️",  label: "AWS",        color: "#FF8C00" },
  { emoji: "🐳",  label: "Docker",     color: "#0288D1" },
  { emoji: "🔷",  label: "TypeScript", color: "#5C6BC0" },
  { emoji: "🟢",  label: "Node.js",    color: "#00C853" },
  { emoji: "🎨",  label: "Figma",      color: "#FF3B3B" },
  { emoji: "🤖",  label: "OpenAI",     color: "#7C4DFF" },
  { emoji: "🔥",  label: "Firebase",   color: "#FF6D00" },
  { emoji: "🐙",  label: "GitHub",     color: "#e2e8f0" },
  { emoji: "⚡",  label: "Vite",       color: "#FFD700" },
  { emoji: "🎯",  label: "Flutter",    color: "#0288D1" },
  { emoji: "🦀",  label: "Rust",       color: "#FF8C00" },
  { emoji: "📦",  label: "Webpack",    color: "#5C6BC0" },
  { emoji: "🌊",  label: "Tailwind",   color: "#00C853" },
];

const RAINBOW = [
  "#FF3B3B","#FF8C00","#FFD700",
  "#00C853","#0288D1","#5C6BC0","#7C4DFF",
];

interface IconOrbit {
  theta: number;   // longitude
  phi: number;     // latitude
  speed: number;   // orbit speed
  orbitR: number;  // orbit radius ratio
  techIdx: number;
}

export default function TechGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const raw = canvas.getContext("2d");
    if (!raw) return;
    const ctx: CanvasRenderingContext2D = raw;

    let W = 0, H = 0;
    let t = 0;
    let mouseX = 0, mouseY = 0;
    let rotX = 0, rotY = 0; // globe tilt from mouse

    /* Distribute icons on sphere surface */
    const orbits: IconOrbit[] = TECH.map((_, i) => ({
      theta:   (i / TECH.length) * Math.PI * 2,
      phi:     Math.acos(2 * (i / TECH.length) - 1), // uniform distribution
      speed:   0.004 + (i % 4) * 0.002,
      orbitR:  1.15 + (i % 3) * 0.18,
      techIdx: i,
    }));

    const onMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - r.left) / W - 0.5) * 2;
      mouseY = ((e.clientY - r.top)  / H - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    function resize() {
      W = canvas!.width  = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
    }

    /* Project 3D point to 2D screen */
    function project(
      x3: number, y3: number, z3: number,
      cx: number, cy: number, R: number
    ): { x: number; y: number; z: number } {
      // Apply Y-axis rotation (auto spin + mouse)
      const ry   = t * 0.004 + rotY * 0.4;
      const rx   = rotX * 0.3;

      // Rotate Y
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const x1   = x3 * cosY + z3 * sinY;
      const z1   = -x3 * sinY + z3 * cosY;
      const y1   = y3;

      // Rotate X
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const y2   = y1 * cosX - z1 * sinX;
      const z2   = y1 * sinX + z1 * cosX;

      return {
        x: cx + x1 * R,
        y: cy + y2 * R,
        z: z2,
      };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Smooth mouse influence
      rotY += (mouseX - rotY) * 0.04;
      rotX += (mouseY * -0.5 - rotX) * 0.04;

      const cx = W / 2;
      const cy = H / 2;
      const R  = Math.min(W, H) * 0.32;

      /* ── Globe body ── */
      // Outer ambient glow
      const outerGlow = ctx.createRadialGradient(cx, cy, R * 0.5, cx, cy, R * 1.6);
      outerGlow.addColorStop(0,   "rgba(124,77,255,0.10)");
      outerGlow.addColorStop(0.5, "rgba(2,136,209,0.06)");
      outerGlow.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // Globe fill
      const globeGrad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.05, cx, cy, R);
      globeGrad.addColorStop(0,   "rgba(92,107,192,0.22)");
      globeGrad.addColorStop(0.4, "rgba(15,23,42,0.55)");
      globeGrad.addColorStop(1,   "rgba(2,6,23,0.75)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = globeGrad;
      ctx.fill();

      /* ── Latitude lines ── */
      const latCount = 7;
      for (let li = 1; li < latCount; li++) {
        const latAngle = (li / latCount) * Math.PI;
        const sinLat   = Math.sin(latAngle);
        const cosLat   = Math.cos(latAngle);
        const yr       = cy + cosLat * R;
        const xr       = sinLat * R;
        if (xr < 2) continue;
        ctx.beginPath();
        ctx.ellipse(cx, yr, xr, xr * 0.18, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(129,140,248,0.10)`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }

      /* ── Longitude lines ── */
      const lonCount = 8;
      for (let lo = 0; lo < lonCount; lo++) {
        const angle = (lo / lonCount) * Math.PI + t * 0.004;
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.08) {
          const sx = Math.cos(a) * Math.cos(angle);
          const sy = Math.sin(a);
          const sz = Math.cos(a) * Math.sin(angle);
          const p  = project(sx, sy, sz, cx, cy, R);
          const alpha = Math.max(0, (p.z + 1) / 2) * 0.12;
          if (a === 0) ctx.moveTo(p.x, p.y);
          else {
            ctx.strokeStyle = `rgba(129,140,248,${alpha})`;
            ctx.lineWidth   = 0.5;
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.stroke();
      }

      /* ── Rainbow equator ring ── */
      const segments = 60;
      for (let s = 0; s < segments; s++) {
        const a1  = (s / segments) * Math.PI * 2;
        const a2  = ((s + 1) / segments) * Math.PI * 2;
        const col = RAINBOW[s % RAINBOW.length];
        const p1  = project(Math.cos(a1), 0, Math.sin(a1), cx, cy, R * 1.04);
        const p2  = project(Math.cos(a2), 0, Math.sin(a2), cx, cy, R * 1.04);
        const alpha = Math.max(0, (p1.z + 1) / 2) * 0.7;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = col + Math.floor(alpha * 255).toString(16).padStart(2, "0");
        ctx.lineWidth   = 2.5;
        ctx.stroke();
      }

      /* ── Globe edge glow ── */
      const edgeGrad = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R * 1.02);
      edgeGrad.addColorStop(0,   "rgba(124,77,255,0)");
      edgeGrad.addColorStop(0.7, "rgba(124,77,255,0.12)");
      edgeGrad.addColorStop(1,   "rgba(124,77,255,0.35)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = edgeGrad;
      ctx.lineWidth   = 6;
      ctx.stroke();

      /* ── Highlight ── */
      const hl = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.38, 0, cx - R * 0.2, cy - R * 0.2, R * 0.55);
      hl.addColorStop(0,   "rgba(255,255,255,0.12)");
      hl.addColorStop(1,   "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = hl;
      ctx.fill();

      /* ── Tech icons orbiting ── */
      // Sort by z depth so front icons render last (on top)
      const rendered = orbits.map((orb) => {
        orb.theta += orb.speed;
        const sx = Math.sin(orb.phi) * Math.cos(orb.theta);
        const sy = Math.cos(orb.phi);
        const sz = Math.sin(orb.phi) * Math.sin(orb.theta);
        const rr = R * orb.orbitR;
        const p  = project(sx, sy, sz, cx, cy, rr);
        return { ...orb, px: p.x, py: p.y, pz: p.z };
      }).sort((a, b) => a.pz - b.pz);

      for (const item of rendered) {
        const tech     = TECH[item.techIdx];
        const depth    = (item.pz + 1.5) / 3;           // 0..1
        const scale    = 0.55 + depth * 0.75;
        const alpha    = 0.3 + depth * 0.7;
        const fontSize = Math.round((14 + depth * 16) * scale);
        const bobY     = Math.sin(t * 0.04 + item.techIdx * 0.9) * 3 * scale;

        // Glow halo
        const halo = ctx.createRadialGradient(item.px, item.py + bobY, 0, item.px, item.py + bobY, 28 * scale);
        halo.addColorStop(0, tech.color + Math.floor(alpha * 0.6 * 255).toString(16).padStart(2,"0"));
        halo.addColorStop(1, tech.color + "00");
        ctx.beginPath();
        ctx.arc(item.px, item.py + bobY, 28 * scale, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // Icon background circle
        ctx.beginPath();
        ctx.arc(item.px, item.py + bobY, 15 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(2,6,23,${alpha * 0.75})`;
        ctx.fill();
        ctx.strokeStyle = tech.color + Math.floor(alpha * 200).toString(16).padStart(2,"0");
        ctx.lineWidth   = 1.5 * scale;
        ctx.stroke();

        // Emoji
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.font        = `${fontSize}px serif`;
        ctx.textAlign   = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(tech.emoji, item.px, item.py + bobY);

        // Label
        ctx.font        = `bold ${Math.max(7, 9 * scale)}px Inter,sans-serif`;
        ctx.fillStyle   = tech.color;
        ctx.textBaseline = "top";
        ctx.fillText(tech.label, item.px, item.py + bobY + 16 * scale);
        ctx.restore();
      }

      t++;
      rafRef.current = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-label="Rotating 3D tech globe with orbiting technology icons"
    />
  );
}
