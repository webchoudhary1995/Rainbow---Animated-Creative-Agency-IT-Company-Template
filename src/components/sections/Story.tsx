"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const TechGlobe = dynamic(() => import("@/components/canvas/TechGlobe"), { ssr: false });

const MILESTONES = [
  { year: "2018", title: "Planted the Seed",   desc: "Rainbow was founded with a vision to merge creativity and technology into one beautiful force.",  color: "#FF3B3B" },
  { year: "2020", title: "First Bloom",         desc: "Launched 40+ projects across 12 countries. Team grew to 20 people. First enterprise client.",      color: "#FFD700" },
  { year: "2022", title: "Spectrum Expanded",   desc: "Added AI, DevOps, and Cloud services. Reached $5M ARR. Series A raised.",                         color: "#00C853" },
  { year: "2024", title: "Full Rainbow",        desc: "200+ clients, 50+ team members, offices in NYC, London, and Singapore.",                           color: "#0288D1" },
  { year: "2026", title: "Beyond the Horizon",  desc: "Pioneering AI-first digital transformation at enterprise scale globally.",                          color: "#7C4DFF" },
];

export default function Story() {
  return (
    <section id="story" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%,rgba(124,77,255,0.06),transparent)" }}
        aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Our Tech Stack & Journey</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">
            Powered by the <span className="rainbow-text">Full Spectrum</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            World-class technologies orbiting one mission — to build extraordinary digital products.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              height: 480,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(124,77,255,0.15)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 60px rgba(124,77,255,0.08)",
            }}
          >
            <TechGlobe />
          </motion.div>

          {/* Timeline */}
          <div className="relative pl-6 border-l border-slate-800">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="mb-8 relative group"
              >
                {/* Dot */}
                <div
                  className="absolute -left-[2.2rem] top-1 w-4 h-4 rounded-full border-2 transition-all duration-300"
                  style={{
                    borderColor: m.color,
                    background:  m.color,
                    boxShadow:   `0 0 12px ${m.color}88`,
                  }}
                />

                <span className="text-[10px] font-bold tracking-widest uppercase mb-1 block"
                  style={{ color: m.color }}>
                  {m.year}
                </span>
                <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:text-violet-300 transition-colors">
                  {m.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
