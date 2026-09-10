"use client";

import { useEffect, useRef } from "react";

/** Soft glowing aurora orbs that shift with mouse movement */
export default function AuroraBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth  - 0.5) * 30;
      const cy = (e.clientY / window.innerHeight - 0.5) * 30;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden transition-transform duration-500 ease-out"
      aria-hidden="true"
    >
      {/* Red / orange orb */}
      <div
        className="absolute rounded-full blur-[120px] opacity-20 animate-float"
        style={{
          width: "40vw", height: "40vw",
          top: "-10%", left: "-5%",
          background: "radial-gradient(circle,#FF3B3B,#FF8C00)",
        }}
      />
      {/* Violet / indigo orb */}
      <div
        className="absolute rounded-full blur-[140px] opacity-25"
        style={{
          width: "45vw", height: "45vw",
          bottom: "-15%", right: "-5%",
          background: "radial-gradient(circle,#7C4DFF,#5C6BC0)",
          animation: "float 9s ease-in-out infinite reverse",
        }}
      />
      {/* Green / blue centre orb */}
      <div
        className="absolute rounded-full blur-[100px] opacity-15 animate-float-slow"
        style={{
          width: "30vw", height: "30vw",
          top: "30%", left: "35%",
          background: "radial-gradient(circle,#0288D1,#00C853)",
        }}
      />
    </div>
  );
}
