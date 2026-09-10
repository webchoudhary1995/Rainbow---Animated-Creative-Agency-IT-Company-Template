"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2, Smartphone, BrainCircuit, Palette,
  Cloud, TrendingUp, GitBranch, Server,
  Database, ShieldCheck, ArrowUpRight,
} from "lucide-react";

const SERVICES = [
  {
    icon: Code2,
    emoji: "🌐",
    title: "Web Development",
    desc: "Next.js-powered web apps with edge-ready architectures, sub-100ms loads, and pixel-perfect UIs.",
    color: "#FF3B3B",
    glow:  "rgba(255,59,59,0.35)",
    tag:   "Red Spectrum",
    tech:  ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    icon: Server,
    emoji: "⚙️",
    title: "Backend Development",
    desc: "Scalable REST & GraphQL APIs, microservices, real-time systems — built for millions of users.",
    color: "#FF8C00",
    glow:  "rgba(255,140,0,0.35)",
    tag:   "Orange Spectrum",
    tech:  ["Node.js", "Python", "Go", "Redis"],
  },
  {
    icon: Smartphone,
    emoji: "📱",
    title: "Mobile Apps",
    desc: "Native-feel cross-platform apps for iOS & Android. Beautiful, fast, offline-capable.",
    color: "#FFD700",
    glow:  "rgba(255,215,0,0.35)",
    tag:   "Yellow Spectrum",
    tech:  ["React Native", "Flutter", "Firebase"],
  },
  {
    icon: BrainCircuit,
    emoji: "🤖",
    title: "AI Solutions",
    desc: "Custom LLM integrations, RAG pipelines, computer vision, and intelligent automation workflows.",
    color: "#00C853",
    glow:  "rgba(0,200,83,0.35)",
    tag:   "Green Spectrum",
    tech:  ["OpenAI", "LangChain", "PyTorch"],
  },
  {
    icon: Palette,
    emoji: "🎨",
    title: "UI/UX Design",
    desc: "Award-worthy interfaces grounded in research, accessibility, and delight — wireframe to handoff.",
    color: "#0288D1",
    glow:  "rgba(2,136,209,0.35)",
    tag:   "Blue Spectrum",
    tech:  ["Figma", "Framer", "Lottie"],
  },
  {
    icon: Cloud,
    emoji: "☁️",
    title: "Cloud & DevOps",
    desc: "Multi-cloud deployments on AWS, GCP, Azure with Terraform, Kubernetes, and zero-downtime CI/CD.",
    color: "#5C6BC0",
    glow:  "rgba(92,107,192,0.35)",
    tag:   "Indigo Spectrum",
    tech:  ["AWS", "Terraform", "Kubernetes"],
  },
  {
    icon: TrendingUp,
    emoji: "📈",
    title: "SEO & Marketing",
    desc: "Data-driven growth — technical SEO audits, content strategy, paid acquisition, and analytics.",
    color: "#7C4DFF",
    glow:  "rgba(124,77,255,0.35)",
    tag:   "Violet Spectrum",
    tech:  ["GA4", "Ahrefs", "HubSpot"],
  },
];

// Rainbow color order for icon ring
const RING_COLORS = [
  "#FF3B3B","#FF8C00","#FFD700","#00C853","#0288D1","#5C6BC0","#7C4DFF",
];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="section-pad relative overflow-hidden">
      {/* Rich rainbow top glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 90% 40% at 50% 0%," +
            "rgba(124,77,255,0.1),transparent 60%)," +
            "radial-gradient(ellipse 50% 30% at 0% 50%,rgba(255,59,59,0.06),transparent)," +
            "radial-gradient(ellipse 50% 30% at 100% 50%,rgba(2,136,209,0.06),transparent)",
        }} />

      {/* Animated rainbow top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rainbow-line opacity-60" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          {/* Rainbow spectrum dots */}
          <div className="flex items-center justify-center gap-2 mb-5">
            {RING_COLORS.map((c, i) => (
              <motion.div key={i}
                className="w-3 h-3 rounded-full"
                style={{ background: c, boxShadow: `0 0 10px ${c}` }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>

          <p className="section-label mb-3">Our Spectrum</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">
            Seven Colors of{" "}
            <span className="rainbow-text">Digital Mastery</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Each service is a unique band in our rainbow — from blazing red web apps to deep violet DevOps.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
                onHoverEnd={()  => setHovered(null)}
                className="relative rounded-2xl p-6 cursor-default overflow-hidden transition-all duration-300"
                style={{
                  background: isH
                    ? `linear-gradient(145deg,${svc.color}1a,rgba(255,255,255,0.04) 60%)`
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isH ? svc.color + "55" : "rgba(255,255,255,0.07)"}`,
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  transform: isH ? "translateY(-8px) scale(1.02)" : undefined,
                  boxShadow: isH
                    ? `0 0 0 1px ${svc.color}33, 0 20px 50px ${svc.color}18, 0 8px 24px rgba(0,0,0,0.4)`
                    : "0 4px 24px rgba(0,0,0,0.18)",
                }}
              >
                {/* Top rainbow accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                  style={{
                    background: `linear-gradient(90deg,transparent,${svc.color},transparent)`,
                    opacity: isH ? 1 : 0.4,
                    transition: "opacity 0.3s",
                  }}
                />

                {/* Big icon with glowing ring */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="relative w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg,${svc.color}30,${svc.color}10)`,
                      border: `1.5px solid ${svc.color}55`,
                      boxShadow: isH
                        ? `0 0 0 4px ${svc.color}22, 0 0 30px ${svc.glow}`
                        : `0 0 0 0px ${svc.color}00`,
                      transition: "box-shadow 0.3s, transform 0.3s",
                      transform: isH ? "rotate(-6deg) scale(1.12)" : "rotate(0deg) scale(1)",
                    }}
                  >
                    {/* Emoji big visible label */}
                    <span className="text-2xl leading-none">{svc.emoji}</span>

                    {/* Lucide icon as subtle overlay bottom-right */}
                    <div
                      className="absolute bottom-0.5 right-0.5 w-5 h-5 rounded-lg flex items-center justify-center"
                      style={{ background: svc.color + "30" }}
                    >
                      <Icon size={11} style={{ color: svc.color }} />
                    </div>
                  </div>

                  <div>
                    <span
                      className="tag text-[9px] mb-1 block"
                      style={{ background: svc.color + "20", color: svc.color, border: `1px solid ${svc.color}30` }}
                    >
                      {svc.tag}
                    </span>
                    <h3 className="font-display font-bold text-white text-sm leading-tight">{svc.title}</h3>
                  </div>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-4">{svc.desc}</p>

                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {svc.tech.map(t => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] rounded-full font-medium"
                      style={{
                        background: svc.color + "12",
                        border: `1px solid ${svc.color}25`,
                        color: svc.color + "dd",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div
                  className="flex items-center gap-1 text-xs font-semibold transition-colors"
                  style={{ color: isH ? svc.color : "#475569" }}
                >
                  Learn more <ArrowUpRight size={11} />
                </div>

                {/* Hover corner glow */}
                {isH && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 10% 10%,${svc.color}0f,transparent 55%)`,
                    }}
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            );
          })}

          {/* Custom CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.6 }}
            className="rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer group transition-all duration-300 hover:-translate-y-2"
            style={{
              border: "1.5px dashed rgba(124,77,255,0.4)",
              background: "rgba(124,77,255,0.05)",
              backdropFilter: "blur(14px)",
            }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            {/* Spinning rainbow ring */}
            <div className="relative w-16 h-16">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(#FF3B3B,#FF8C00,#FFD700,#00C853,#0288D1,#5C6BC0,#7C4DFF,#FF3B3B)",
                  padding: "2px",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[3px] rounded-full bg-[#020617] flex items-center justify-center text-2xl">
                ✦
              </div>
            </div>

            <div className="text-center">
              <p className="text-white font-semibold text-sm mb-1">Need something custom?</p>
              <p className="text-slate-600 text-xs">Let&apos;s build it together</p>
            </div>

            <span
              className="btn-rainbow px-5 py-2 rounded-xl text-xs font-bold"
            >
              Talk to Us →
            </span>
          </motion.div>
        </div>

        {/* Bottom rainbow strip */}
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }}
          className="mt-16 rainbow-line h-[1.5px] rounded-full"
        />
      </div>
    </section>
  );
}
