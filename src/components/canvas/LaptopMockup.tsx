"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const CODE_LINES = [
  { w: "75%",  color: "#7C4DFF", indent: 0  },
  { w: "55%",  color: "#0288D1", indent: 16 },
  { w: "85%",  color: "#00C853", indent: 32 },
  { w: "40%",  color: "#FFD700", indent: 16 },
  { w: "70%",  color: "#FF8C00", indent: 32 },
  { w: "60%",  color: "#FF3B3B", indent: 16 },
  { w: "90%",  color: "#5C6BC0", indent: 0  },
  { w: "50%",  color: "#7C4DFF", indent: 16 },
  { w: "65%",  color: "#0288D1", indent: 32 },
  { w: "45%",  color: "#00C853", indent: 16 },
];

const CHIPS = [
  { label: "AI ✦",      color: "#7C4DFF", x: "78%",  y: "18%" },
  { label: "Deploy →",  color: "#0288D1", x: "-8%",  y: "28%" },
  { label: "Live ●",    color: "#00C853", x: "70%",  y: "72%" },
  { label: "/ tsx",     color: "#FFD700", x: "-4%",  y: "65%" },
];

export default function LaptopMockup() {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotX  = useSpring(rawX, { stiffness: 120, damping: 22 });
  const rotY  = useSpring(rawY, { stiffness: 120, damping: 22 });

  const perspX = useTransform(rotX, v => `${v}deg`);
  const perspY = useTransform(rotY, v => `${v}deg`);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    rawX.set(-y * 18);
    rawY.set( x * 18);
  }

  function onMouseLeave() { rawX.set(0); rawY.set(0); }

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[480px] mx-auto select-none"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{ rotateX: perspX, rotateY: perspY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Floating chips */}
        {CHIPS.map((c) => (
          <motion.div
            key={c.label}
            className="absolute z-20 px-3 py-1.5 rounded-xl text-[11px] font-bold text-white"
            style={{
              left: c.x, top: c.y,
              background: `${c.color}28`,
              border: `1px solid ${c.color}66`,
              boxShadow: `0 0 16px ${c.color}44`,
              backdropFilter: "blur(8px)",
              translateZ: 30,
            }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3 + Math.random(), repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
          >
            {c.label}
          </motion.div>
        ))}

        {/* Laptop lid */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "rgba(15,23,42,0.85)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 0 0 1px rgba(124,77,255,0.15)," +
              "0 30px 80px rgba(0,0,0,0.6)," +
              "inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Rainbow top bar */}
          <div
            className="h-[2px] w-full"
            style={{ background: "linear-gradient(90deg,#FF3B3B,#FF8C00,#FFD700,#00C853,#0288D1,#5C6BC0,#7C4DFF)" }}
          />

          {/* Screen */}
          <div className="p-4">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1.5">
                {["#FF3B3B","#FFD700","#00C853"].map(c => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
                ))}
              </div>
              <div
                className="flex-1 rounded-md h-5 flex items-center px-2"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="text-[9px] text-slate-500">rainbow.agency</span>
              </div>
            </div>

            {/* Code editor */}
            <div
              className="rounded-xl p-3 space-y-1.5"
              style={{ background: "rgba(2,6,23,0.7)", border: "1px solid rgba(255,255,255,0.04)" }}
            >
              {CODE_LINES.map((line, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <span className="text-[9px] text-slate-700 w-3 text-right select-none">{i + 1}</span>
                  <div className="flex-1" style={{ paddingLeft: line.indent }}>
                    <div
                      className="h-[5px] rounded-full"
                      style={{
                        width: line.w,
                        background: `linear-gradient(90deg, ${line.color}cc, ${line.color}44)`,
                        boxShadow: `0 0 6px ${line.color}55`,
                      }}
                    />
                  </div>
                  {i % 3 === 0 && (
                    <motion.div
                      className="w-[2px] h-[10px] rounded-sm"
                      style={{ background: line.color }}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between mt-3 px-1">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-[9px] text-slate-500">Build: Success</span>
              </div>
              <span className="text-[9px] text-slate-600">TypeScript · Next.js 15</span>
            </div>
          </div>
        </div>

        {/* Laptop base */}
        <div
          className="mx-auto mt-0.5 h-3 rounded-b-xl"
          style={{
            width: "92%",
            background: "linear-gradient(180deg,rgba(30,41,59,0.9),rgba(15,23,42,0.7))",
            border: "1px solid rgba(255,255,255,0.05)",
            borderTop: "none",
          }}
        />
        <div
          className="mx-auto h-1.5 rounded-b-2xl"
          style={{
            width: "75%",
            background: "rgba(15,23,42,0.8)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          }}
        />

        {/* Reflection glow */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 blur-2xl opacity-40 pointer-events-none"
          style={{ background: "linear-gradient(90deg,#FF3B3B,#7C4DFF,#0288D1)" }}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}
