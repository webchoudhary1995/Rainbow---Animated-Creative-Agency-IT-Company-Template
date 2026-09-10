"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Play, X } from "lucide-react";

const CATEGORIES = ["All", "Web", "Mobile", "AI", "Design", "Cloud"] as const;
type Category = typeof CATEGORIES[number];

interface Project {
  title: string; client: string; category: Exclude<Category,"All">;
  color: string; emoji: string; desc: string;
  tags: string[]; live?: string;
}

const PROJECTS: Project[] = [
  { title: "NovaPay Dashboard",    client: "FinTech Corp",     category: "Web",    color: "#FF3B3B", emoji: "💳", desc: "Real-time payment analytics platform with AI fraud detection.", tags: ["Next.js","D3.js","Postgres"], live: "#" },
  { title: "GreenRoute App",       client: "EcoMove Ltd",      category: "Mobile", color: "#00C853", emoji: "🗺️", desc: "Carbon footprint tracker and sustainable routing for commuters.", tags: ["React Native","Maps","Firebase"] },
  { title: "MindBridge AI",        client: "EdTech Startup",   category: "AI",     color: "#FFD700", emoji: "🧠", desc: "Personalized learning assistant powered by GPT-4 and RAG.", tags: ["LangChain","OpenAI","FastAPI"], live: "#" },
  { title: "Luminary Design OS",   client: "Creative Studio",  category: "Design", color: "#7C4DFF", emoji: "🎨", desc: "End-to-end design system for a 60-person product org.", tags: ["Figma","Tokens","Storybook"] },
  { title: "SkyStack Platform",    client: "CloudNine Inc",    category: "Cloud",  color: "#0288D1", emoji: "☁️", desc: "Multi-tenant SaaS infra on AWS with zero-downtime deploys.", tags: ["Terraform","EKS","Datadog"], live: "#" },
  { title: "Pulse E-commerce",     client: "RetailBrand",      category: "Web",    color: "#FF8C00", emoji: "🛒", desc: "High-traffic headless commerce with 200ms global TTFB.", tags: ["Next.js","Shopify","Redis"], live: "#" },
  { title: "FieldOps Mobile",      client: "LogiCorp",         category: "Mobile", color: "#5C6BC0", emoji: "📱", desc: "Offline-first field service management for 500 technicians.", tags: ["Flutter","SQLite","WebSockets"] },
  { title: "SentimentIQ",          client: "Media Analytics",  category: "AI",     color: "#FF3B3B", emoji: "📊", desc: "Real-time social sentiment scoring with custom NLP models.", tags: ["PyTorch","Kafka","ElasticSearch"] },
  { title: "Aurora Brand Identity",client: "Series B Startup", category: "Design", color: "#00C853", emoji: "✨", desc: "Full rebrand: logo, motion, web identity, and marketing kit.", tags: ["Illustrator","After Effects","Framer"] },
];

const cardVar = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  show:   { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.45, ease: "easeOut" } },
  exit:   { opacity: 0, scale: 0.94, y: 10, transition: { duration: 0.25 } },
};

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<Category>("All");
  const [preview, setPreview] = useState<Project | null>(null);

  const filtered = activeTab === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeTab);

  return (
    <section id="portfolio" className="section-pad relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 50%,rgba(255,59,59,0.05),transparent)",
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
          className="text-center mb-12"
        >
          <p className="section-label mb-3">Portfolio</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">
            Work that Speaks{" "}
            <span className="rainbow-text">Louder than Words</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A curated selection of projects that reflect our spectrum of expertise.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === cat
                  ? "btn-rainbow"
                  : "glass text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                variants={cardVar}
                initial="hidden"
                animate="show"
                exit="exit"
                className="group relative glass rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-300"
                onClick={() => setPreview(project)}
              >
                {/* Colour band */}
                <div
                  className="h-1.5 w-full"
                  style={{ background: project.color }}
                />

                {/* Fake video thumbnail */}
                <div
                  className="relative h-44 flex items-center justify-center text-6xl"
                  style={{
                    background: `radial-gradient(circle at 30% 40%, ${project.color}22, rgba(15,23,42,0.9))`,
                  }}
                >
                  <span className="animate-float">{project.emoji}</span>
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center glass">
                      <Play size={18} className="text-white fill-current ml-0.5" />
                    </div>
                  </div>
                  {/* Category badge */}
                  <span
                    className="absolute top-3 right-3 tag"
                    style={{ background: project.color + "33", color: project.color }}
                  >
                    {project.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-display font-bold text-white text-base mb-0.5">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-xs mb-2">{project.client}</p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">{project.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[10px] rounded-full bg-slate-800 text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.live && (
                    <a
                      href={project.live}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      <ExternalLink size={11} /> Live Preview
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Preview modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            style={{ background: "rgba(2,6,23,0.85)", backdropFilter: "blur(6px)" }}
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1,   y: 0  }}
              exit={{   scale: 0.9, y: 20  }}
              className="glass rounded-3xl max-w-lg w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreview(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                aria-label="Close preview"
              >
                <X size={16} />
              </button>
              <div className="text-5xl mb-4">{preview.emoji}</div>
              <span
                className="tag text-[11px] mb-3"
                style={{ background: preview.color + "33", color: preview.color }}
              >
                {preview.category}
              </span>
              <h3 className="font-display font-extrabold text-2xl text-white mt-2 mb-1">
                {preview.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4">{preview.client}</p>
              <p className="text-slate-300 leading-relaxed mb-6">{preview.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {preview.tags.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs">
                    {t}
                  </span>
                ))}
              </div>
              {preview.live ? (
                <a
                  href={preview.live}
                  className="btn-rainbow px-6 py-2.5 rounded-xl text-sm inline-flex items-center gap-2"
                >
                  <ExternalLink size={14} /> View Live Project
                </a>
              ) : (
                <p className="text-slate-500 text-sm italic">Case study coming soon.</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
