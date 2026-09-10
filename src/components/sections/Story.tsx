"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import dynamic from "next/dynamic";

const DigitalTree = dynamic(() => import("@/components/canvas/DigitalTree"), { ssr: false });

const MILESTONES = [
  { year: "2018", title: "Planted the Seed",   desc: "Rainbow was founded with a vision to merge creativity and technology into one beautiful force.",   color: "#FF3B3B" },
  { year: "2020", title: "First Bloom",         desc: "Launched 40+ projects across 12 countries. Team grew to 20 people. First enterprise client.",       color: "#FFD700" },
  { year: "2022", title: "Spectrum Expanded",   desc: "Added AI, DevOps, and Cloud services. Reached $5M ARR. Series A raised.",                          color: "#00C853" },
  { year: "2024", title: "Full Rainbow",        desc: "200+ clients, 50+ team members, offices in NYC, London, and Singapore.",                            color: "#0288D1" },
  { year: "2026", title: "Beyond the Horizon",  desc: "Pioneering AI-first digital transformation at enterprise scale globally.",                           color: "#7C4DFF" },
];

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      // Tighter range — tree grows faster and is fully visible mid-scroll
      setProgress(Math.min(1, Math.max(0, (v - 0.05) / 0.45)));
    });
  }, [scrollYProgress]);

  return (
    <section id="story" ref={sectionRef} className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%,rgba(0,200,83,0.05),transparent)" }}
        aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
          <p className="section-label mb-3">Our Journey</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">
            Growth Blooming <span className="rainbow-text">Under the Rain</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Like a neon tree reaching skyward in a digital storm — we grow with every challenge.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Digital tree canvas */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              height: 560,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
            }}
          >
            <DigitalTree progress={progress} />
          </motion.div>

          {/* Timeline */}
          <div className="relative pl-6 border-l border-slate-800">
            {MILESTONES.map((m, i) => {
              const visible = progress > i / MILESTONES.length;
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: 24 }}
                  animate={visible ? { opacity: 1, x: 0 } : { opacity: 0.2, x: 24 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="mb-8 relative"
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute -left-[2.2rem] top-1 w-4 h-4 rounded-full border-2"
                    animate={visible ? { borderColor: m.color, background: m.color, boxShadow: `0 0 14px ${m.color}99` }
                                    : { borderColor: "#334155", background: "#0f172a", boxShadow: "none" }}
                    transition={{ duration: 0.4 }}
                  />

                  <span className="text-[10px] font-bold tracking-widest uppercase mb-1 block"
                    style={{ color: visible ? m.color : "#475569" }}>
                    {m.year}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white mb-1">{m.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{m.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
