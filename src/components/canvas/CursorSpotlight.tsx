"use client";

import { useEffect, useRef } from "react";

/** Multi-color radial glow that follows the cursor across the entire page */
export default function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;

    let raf = 0;
    let tx = -300, ty = -300;
    let cx = -300, cy = -300;

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener("mousemove", onMove, { passive: true });

    function tick() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      if (el) {
        el.style.transform = `translate(${cx - 300}px, ${cy - 300}px)`;
      }
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] w-[600px] h-[600px]"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(circle at center," +
          "rgba(124,77,255,0.12) 0%," +
          "rgba(2,136,209,0.08) 25%," +
          "rgba(0,200,83,0.05) 50%," +
          "transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
