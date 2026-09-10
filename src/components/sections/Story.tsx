"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const StoryCanvas = dynamic(() => import("@/components/canvas/StoryCanvas"), { ssr: false });

const MILESTONES = [
  { year: "2018", title: "Planted the Seed",    desc: "Rainbow was founded with a vision to merge creativity and technology."    },
  { year: "2020", title: "First Bloom",          desc: "Launched 40+ projects across 12 countries. Team grew to 20 people."       },
  { year: "2022", title: "Spectrum Expanded",    desc: "Added AI, DevOps, and Cloud services. Reached $5M ARR milestone."         },
  { year: "2024", title: "Full Rainbow",         desc: "200+ clients, 50+ team members, offices in 3 cities."                    },
  { year: "2026", title: "Beyond the Horizon",   desc: "Pioneering AI-first digital transformation at enterprise scale."         },
];

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      // remap 0.1–0.7 → 0–1
      const mapped = Math.min(1, Math.max(0, (v - 0.1) / 0.6));
      setProgress(mapped);
    });
  }, [scrollYProgress]);

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y       = useTransform(scrollYProgress, [0, 0.15], [60, 0]);

  return (
    <section id="story" ref={sectionRef} className="section-pad relative overflow-hidden">
      {/* bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%,rgba(0,200,83,0.06),transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div style={{ opacity, y }}>
          {/* Header */}
          <div className="text-center mb-16">
            <p className="section-label mb-3">Our Journey</p>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">
              Growth, Blooming{" "}
              <span className="rainbow-text">Under the Rain</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Like a tree in the rain, Rainbow has grown steadily — putting down deep roots
              while reaching ever higher.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Canvas side */}
            <div className="relative h-[420px] rounded-3xl overflow-hidden glass">
              <StoryCanvas progress={progress} />
              {/* progress bar */}
              <div className="absolute bottom-4 left-6 right-6 h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "var(--rainbow-h)",
                    width: `${progress * 100}%`,
                  }}
                />
              </div>
              <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-slate-500 whitespace-nowrap">
                Scroll to watch us grow
              </p>
            </div>

            {/* Timeline side */}
            <div className="relative pl-6 border-l border-slate-800">
              {MILESTONES.map((m, i) => {
                const visible = progress > i / MILESTONES.length;
                return (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: 20 }}
                    animate={visible ? { opacity: 1, x: 0 } : { opacity: 0.25, x: 20 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="mb-8 relative"
                  >
                    {/* dot */}
                    <div
                      className="absolute -left-[2.1rem] top-1 w-4 h-4 rounded-full border-2 transition-all duration-500"
                      style={{
                        borderColor: visible ? "#7C4DFF" : "#334155",
                        background: visible ? "#7C4DFF" : "#0f172a",
                        boxShadow: visible ? "0 0 12px #7C4DFF88" : "none",
                      }}
                    />
                    <span className="text-xs font-bold text-violet-400 tracking-widest uppercase">
                      {m.year}
                    </span>
                    <h3 className="font-display font-bold text-lg text-white mt-0.5 mb-1">
                      {m.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{m.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
