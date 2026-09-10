"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const RainCanvas   = dynamic(() => import("@/components/canvas/RainCanvas"),   { ssr: false });
const ParticleMesh = dynamic(() => import("@/components/canvas/ParticleMesh"), { ssr: false });
const LaptopMockup = dynamic(() => import("@/components/canvas/LaptopMockup"), { ssr: false });

const WORDS = ["Rainbow Spectrum", "Digital Reality", "Infinite Possibilities", "Living Experiences"];

function RotatingWord() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % WORDS.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <motion.span
      key={idx}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
      exit={{    opacity: 0, y: -20, filter: "blur(8px)" }}
      transition={{ duration: 0.55 }}
      className="rainbow-text inline-block"
    >
      {WORDS[idx]}
    </motion.span>
  );
}

const stagger = { show: { transition: { staggerChildren: 0.1 } } };
const fadeUp  = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const scrollDown = () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* ── Layers ── */}
      <div className="absolute inset-0 z-0">
        <ParticleMesh density={0.8} />
      </div>
      <div className="absolute inset-0 z-[1] opacity-30">
        <RainCanvas density={0.7} />
      </div>

      {/* Ambient gradient orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle,#7C4DFF,transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle,#FF3B3B,transparent 70%)", filter: "blur(60px)", animation: "float 10s ease-in-out infinite reverse" }} />
        <div className="absolute top-[35%] left-[40%] w-[30vw] h-[30vw] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle,#0288D1,transparent 70%)", filter: "blur(50px)", animation: "float 8s ease-in-out infinite" }} />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 z-[1] opacity-[0.025]" aria-hidden="true"
        style={{
          backgroundImage: "linear-gradient(rgba(124,77,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(124,77,255,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-6">

            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase glass border border-violet-500/30 text-violet-300">
                <motion.span
                  className="w-2 h-2 rounded-full bg-emerald-400"
                  animate={{ scale: [1,1.6,1], opacity: [1,0.4,1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
                Full-Spectrum Creative Agency
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="font-display font-extrabold text-[2.6rem] md:text-5xl xl:text-6xl leading-[1.08] text-white">
              Transforming Digital Concepts
              <br className="hidden sm:block" /> into{" "}
              <RotatingWord />
            </motion.h1>

            {/* Sub */}
            <motion.p variants={fadeUp} className="text-slate-400 text-lg leading-relaxed max-w-xl">
              Rainbow engineers immersive digital experiences — from blazing-fast
              web apps to AI-powered systems, wrapped in design that genuinely
              moves people.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                href="/#contact"
                onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="relative group px-7 py-3.5 rounded-xl text-base font-bold text-white overflow-hidden"
                style={{ background: "linear-gradient(135deg,#818cf8,#a78bfa,#f472b6)", backgroundSize: "200% 200%" }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Our Spectrum <ArrowRight size={16} />
                </span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                  style={{ boxShadow: "0 0 30px rgba(124,77,255,0.7)", background: "linear-gradient(135deg,#7C4DFF,#0288D1)" }} />
              </Link>

              <button
                onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-ghost px-7 py-3.5 rounded-xl text-base flex items-center gap-2"
              >
                <Play size={14} className="fill-current" /> View Our Work
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-6 pt-2">
              {[
                { n: "200+", l: "Projects Shipped" },
                { n: "50+",  l: "Happy Clients"    },
                { n: "7×",   l: "Spectrum Services" },
              ].map(({ n, l }) => (
                <div key={l} className="flex flex-col">
                  <span className="font-display font-extrabold text-2xl rainbow-text">{n}</span>
                  <span className="text-xs text-slate-500 mt-0.5">{l}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — 3D laptop */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="hidden lg:block"
          >
            <LaptopMockup />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
      >
        <span className="text-[10px] tracking-widest uppercase">scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center pt-1.5"
          whileHover={{ borderColor: "#7C4DFF" }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-violet-400"
            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </motion.div>
      </motion.button>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to bottom,transparent,#020617)" }} aria-hidden="true" />
    </section>
  );
}
