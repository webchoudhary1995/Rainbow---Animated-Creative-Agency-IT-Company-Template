"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2, Smartphone, BrainCircuit, Palette,
  Cloud, TrendingUp, GitBranch, ArrowRight,
} from "lucide-react";

const SERVICES = [
  {
    icon:  Code2,
    title: "Web Development",
    desc:  "Blazing-fast, SEO-optimised web apps built with Next.js, React, and edge-ready architectures.",
    color: "#FF3B3B",
    glow:  "glow-red",
    tag:   "Red Spectrum",
    tech:  ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    icon:  Smartphone,
    title: "Mobile Apps",
    desc:  "Native-feel cross-platform apps for iOS and Android using React Native and Flutter.",
    color: "#FF8C00",
    glow:  "glow-orange",
    tag:   "Orange Spectrum",
    tech:  ["React Native", "Flutter", "Firebase"],
  },
  {
    icon:  BrainCircuit,
    title: "AI Solutions",
    desc:  "Custom LLM integrations, computer vision pipelines, and intelligent automation workflows.",
    color: "#FFD700",
    glow:  "glow-yellow",
    tag:   "Yellow Spectrum",
    tech:  ["OpenAI", "LangChain", "Python"],
  },
  {
    icon:  Palette,
    title: "UI/UX Design",
    desc:  "Award-worthy interfaces grounded in research, accessibility, and delight — from wireframe to handoff.",
    color: "#00C853",
    glow:  "glow-green",
    tag:   "Green Spectrum",
    tech:  ["Figma", "Framer", "Lottie"],
  },
  {
    icon:  Cloud,
    title: "Cloud Infrastructure",
    desc:  "Resilient multi-cloud deployments on AWS, GCP, and Azure with IaC, auto-scaling, and 99.99% SLA.",
    color: "#0288D1",
    glow:  "glow-blue",
    tag:   "Blue Spectrum",
    tech:  ["AWS", "Terraform", "Kubernetes"],
  },
  {
    icon:  TrendingUp,
    title: "SEO & Marketing",
    desc:  "Data-driven growth — technical SEO audits, content strategy, paid acquisition, and analytics.",
    color: "#5C6BC0",
    glow:  "glow-indigo",
    tag:   "Indigo Spectrum",
    tech:  ["GA4", "Ahrefs", "HubSpot"],
  },
  {
    icon:  GitBranch,
    title: "DevOps & CI/CD",
    desc:  "Streamlined delivery pipelines, container orchestration, monitoring, and incident management.",
    color: "#7C4DFF",
    glow:  "glow-violet",
    tag:   "Violet Spectrum",
    tech:  ["GitHub Actions", "Docker", "Datadog"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show:   (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.09, ease: "easeOut" },
  }),
};

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="section-pad relative overflow-hidden">
      {/* Subtle bg gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%,rgba(124,77,255,0.07),transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Our Spectrum</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">
            Seven Colors of{" "}
            <span className="rainbow-text">Digital Mastery</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Each service is a band of our spectrum — distinct, powerful, and
            brilliant when combined.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            const isHovered = hovered === i;
            return (
              <motion.div
                key={svc.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                className={`relative glass rounded-2xl p-6 cursor-default transition-all duration-300 group ${
                  isHovered ? svc.glow : ""
                }`}
                style={{
                  borderColor: isHovered ? svc.color + "55" : undefined,
                  transform:   isHovered ? "translateY(-6px)" : undefined,
                }}
              >
                {/* Color top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-opacity duration-300"
                  style={{
                    background: svc.color,
                    opacity: isHovered ? 1 : 0.4,
                  }}
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{
                    background: svc.color + "22",
                    border: `1px solid ${svc.color}44`,
                    boxShadow: isHovered ? `0 0 20px ${svc.color}55` : "none",
                  }}
                >
                  <Icon size={22} style={{ color: svc.color }} />
                </div>

                {/* Tag */}
                <span
                  className="tag text-[10px] mb-3"
                  style={{ background: svc.color + "22", color: svc.color }}
                >
                  {svc.tag}
                </span>

                <h3 className="font-display font-bold text-lg text-white mb-2 mt-1">
                  {svc.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {svc.desc}
                </p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {svc.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] rounded-full bg-slate-800 text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  className="flex items-center gap-1 text-xs font-semibold transition-colors"
                  style={{ color: isHovered ? svc.color : "#94a3b8" }}
                  aria-label={`Learn more about ${svc.title}`}
                >
                  Learn more <ArrowRight size={12} />
                </button>

                {/* Hover glow overlay */}
                {isHovered && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 0%,${svc.color}12,transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            );
          })}

          {/* "All services" card */}
          <motion.div
            custom={7}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:glow-violet transition-all duration-300 group border-dashed border-slate-700 hover:border-violet-500"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-rainbow-gradient animate-spin-slow opacity-80">
              <span className="text-2xl">✦</span>
            </div>
            <p className="text-center text-slate-300 font-semibold text-sm">
              Need something custom?
            </p>
            <p className="text-center text-slate-500 text-xs">
              Let&apos;s build it together
            </p>
            <button className="btn-rainbow px-4 py-2 rounded-lg text-xs mt-1">
              Talk to Us <ArrowRight size={12} className="inline ml-1" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
