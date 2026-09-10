"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const RainCanvas    = dynamic(() => import("@/components/canvas/RainCanvas"),    { ssr: false });
const ComputerCanvas = dynamic(() => import("@/components/canvas/ComputerCanvas"), { ssr: false });
const AuroraBackground = dynamic(() => import("@/components/canvas/AuroraBackground"), { ssr: false });

const WORDS = ["Websites", "Mobile Apps", "AI Products", "Digital Brands", "Cloud Systems"];

function TypewriterWords() {
  return (
    <motion.span
      key="tw"
      className="rainbow-text font-display"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Digital Experiences
    </motion.span>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  function scrollToServices() {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      {/* ── Background video ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-10"
          aria-hidden="true"
        >
          {/* Fallback gradient if no video source */}
        </video>
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 60%,rgba(92,107,192,0.18),transparent 55%)," +
              "radial-gradient(ellipse at 80% 40%,rgba(124,77,255,0.15),transparent 55%)," +
              "linear-gradient(180deg,#020617 0%,#060d24 50%,#020617 100%)",
          }}
        />
      </div>

      {/* ── Aurora orbs ── */}
      <AuroraBackground />

      {/* ── Rain overlay ── */}
      <div className="absolute inset-0 z-[1]">
        <RainCanvas density={0.9} mouseInteractive={true} />
      </div>

      {/* ── Grid pattern ── */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(129,140,248,0.8) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(129,140,248,0.8) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* Left: text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase glass border border-violet-500/30 text-violet-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Full-Spectrum Creative Agency
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={item}
              className="font-display font-extrabold text-5xl md:text-6xl xl:text-7xl leading-[1.05] text-white"
            >
              Transforming{" "}
              <br />
              <TypewriterWords />
              <br />
              <span className="text-slate-300">Under the</span>{" "}
              <span className="rainbow-text">Rainbow</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={item}
              className="text-lg text-slate-400 max-w-lg leading-relaxed"
            >
              Rainbow is your full-spectrum partner — from pixel-perfect UI to
              enterprise cloud infrastructure. We turn ambitious ideas into
              living, breathing digital realities.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-4">
              <button
                onClick={scrollToServices}
                className="btn-rainbow px-7 py-3.5 rounded-xl text-base flex items-center gap-2"
              >
                Explore Our Spectrum <ArrowRight size={16} />
              </button>
              <Link
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-ghost px-7 py-3.5 rounded-xl text-base flex items-center gap-2"
              >
                <Play size={15} className="fill-current" /> Start a Project
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="flex gap-8 pt-4">
              {[
                { n: "200+", label: "Projects Shipped" },
                { n: "50+",  label: "Happy Clients"    },
                { n: "7",    label: "Spectrum Services" },
              ].map(({ n, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="font-display font-extrabold text-2xl rainbow-text">{n}</span>
                  <span className="text-xs text-slate-500 mt-0.5">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D computer */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full aspect-square max-w-[500px]">
              {/* Glow ring */}
              <div
                className="absolute inset-8 rounded-full animate-glow-pulse"
                style={{
                  background:
                    "radial-gradient(circle,rgba(124,77,255,0.2),rgba(2,136,209,0.1),transparent 70%)",
                  filter: "blur(30px)",
                }}
                aria-hidden="true"
              />
              <ComputerCanvas />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors"
        aria-label="Scroll to services"
      >
        <span className="text-xs tracking-widest uppercase">Explore</span>
        <ChevronDown size={18} className="animate-bounce" />
      </motion.button>

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to bottom,transparent,#020617)" }}
        aria-hidden="true"
      />
    </section>
  );
}
