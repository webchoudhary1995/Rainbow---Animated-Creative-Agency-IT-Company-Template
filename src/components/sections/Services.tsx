"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Smartphone, BrainCircuit, Palette, Cloud, TrendingUp, GitBranch, ArrowUpRight } from "lucide-react";

const SERVICES = [
  { icon: Code2,        title: "Web Development",     desc: "Next.js-powered web apps with edge-ready architectures and sub-100ms loads.", color: "#FF3B3B", tag: "Red Spectrum",    tech: ["Next.js","TypeScript","Postgres"] },
  { icon: Smartphone,   title: "Mobile Apps",         desc: "Native-feel cross-platform apps for iOS & Android using React Native.", color: "#FF8C00", tag: "Orange Spectrum",  tech: ["React Native","Flutter","Firebase"] },
  { icon: BrainCircuit, title: "AI Solutions",        desc: "Custom LLM integrations, computer vision, and intelligent automation.", color: "#FFD700", tag: "Yellow Spectrum",  tech: ["OpenAI","LangChain","Python"] },
  { icon: Palette,      title: "UI/UX Design",        desc: "Award-worthy interfaces from wireframe to polished, accessible design.", color: "#00C853", tag: "Green Spectrum",   tech: ["Figma","Framer","Lottie"] },
  { icon: Cloud,        title: "Cloud Infrastructure",desc: "Resilient multi-cloud on AWS, GCP, and Azure with auto-scaling SLAs.", color: "#0288D1", tag: "Blue Spectrum",    tech: ["AWS","Terraform","Kubernetes"] },
  { icon: TrendingUp,   title: "SEO & Marketing",     desc: "Technical SEO audits, content strategy, paid acquisition, analytics.", color: "#5C6BC0", tag: "Indigo Spectrum",  tech: ["GA4","Ahrefs","HubSpot"] },
  { icon: GitBranch,    title: "DevOps & CI/CD",      desc: "Streamlined delivery pipelines, container orchestration, and monitoring.", color: "#7C4DFF", tag: "Violet Spectrum",  tech: ["GitHub Actions","Docker","Datadog"] },
];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%,rgba(124,77,255,0.06),transparent)" }} />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
          <p className="section-label mb-3">Our Spectrum</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">
            Seven Colors of <span className="rainbow-text">Digital Mastery</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Each service is a band in our spectrum — distinct, powerful, stunning when combined.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            const isH  = hovered === i;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                className="relative rounded-2xl p-6 cursor-default overflow-hidden transition-all duration-300"
                style={{
                  background: isH
                    ? `linear-gradient(135deg,${svc.color}14,rgba(255,255,255,0.03))`
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isH ? svc.color + "44" : "rgba(255,255,255,0.06)"}`,
                  backdropFilter: "blur(16px)",
                  transform: isH ? "translateY(-6px) scale(1.01)" : undefined,
                  boxShadow: isH ? `0 0 30px ${svc.color}22, 0 16px 40px rgba(0,0,0,0.3)` : "0 4px 24px rgba(0,0,0,0.15)",
                }}
              >
                {/* Top glow bar */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-2xl transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg,transparent,${svc.color},transparent)`, opacity: isH ? 1 : 0.3 }} />

                {/* Icon */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{
                    background: svc.color + "18",
                    border: `1px solid ${svc.color}33`,
                    boxShadow: isH ? `0 0 18px ${svc.color}44` : "none",
                  }}>
                  <Icon size={20} style={{ color: svc.color }} />
                </div>

                <span className="tag text-[10px] mb-3 block" style={{ background: svc.color + "18", color: svc.color }}>
                  {svc.tag}
                </span>
                <h3 className="font-display font-bold text-white text-base mb-2">{svc.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{svc.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {svc.tech.map(t => (
                    <span key={t} className="px-2 py-0.5 text-[10px] rounded-full text-slate-500"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold transition-colors"
                  style={{ color: isH ? svc.color : "#64748b" }}>
                  Learn more <ArrowUpRight size={11} />
                </div>

                {/* Corner glow */}
                {isH && (
                  <div className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ background: `radial-gradient(circle at 0% 0%,${svc.color}0d,transparent 60%)` }}
                    aria-hidden="true" />
                )}
              </motion.div>
            );
          })}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.56 }}
            className="rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-1"
            style={{ border: "1px dashed rgba(124,77,255,0.3)", background: "rgba(124,77,255,0.04)", backdropFilter: "blur(12px)" }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
              style={{ background: "linear-gradient(135deg,#FF3B3B,#FF8C00,#FFD700,#00C853,#0288D1,#5C6BC0,#7C4DFF)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.div>
            <p className="text-slate-300 font-semibold text-sm text-center">Need something custom?</p>
            <p className="text-slate-600 text-xs text-center">Let&apos;s build it together</p>
            <span className="btn-rainbow px-4 py-2 rounded-lg text-xs">Talk to Us →</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
