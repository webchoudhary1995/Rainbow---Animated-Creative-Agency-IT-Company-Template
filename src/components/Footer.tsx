"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Github, Twitter, Linkedin, Instagram } from "lucide-react";

const RainCanvas = dynamic(() => import("@/components/canvas/RainCanvas"), { ssr: false });

const SITEMAP = {
  Services:  ["Web Development","Mobile Apps","AI Solutions","UI/UX Design","Cloud Infrastructure","SEO & Marketing","DevOps"],
  Company:   ["About","Story","Portfolio","Careers","Blog"],
  Legal:     ["Privacy Policy","Terms of Service","Cookie Settings"],
  Connect:   ["Contact","Book a Call","Start a Project","Newsletter"],
};

const LEGAL_HREFS: Record<string, string> = {
  "Privacy Policy":   "/legal/privacy",
  "Terms of Service": "/legal/terms",
  "Cookie Settings":  "/legal/cookies",
};

const SOCIAL = [
  { icon: Github,    href: "#", label: "GitHub"    },
  { icon: Twitter,   href: "#", label: "Twitter"   },
  { icon: Linkedin,  href: "#", label: "LinkedIn"  },
  { icon: Instagram, href: "#", label: "Instagram" },
];

function smoothScroll(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;
    setSubbed(true);
    setEmail("");
  }

  return (
    <footer className="relative overflow-hidden border-t border-slate-800/60">
      {/* Rain bg (low density) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <RainCanvas density={0.4} mouseInteractive={false} />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "rgba(2,6,23,0.82)" }}
        aria-hidden="true"
      />

      <div className="relative z-[2]">
        {/* ── Animated rainbow separator ── */}
        <div className="rainbow-line h-[2px]" />

        {/* ── Main footer content ── */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl">🌈</span>
                <span className="font-display font-extrabold text-2xl rainbow-text">Rainbow</span>
              </div>
              <p className="text-slate-500 text-xs italic mb-4">"Two in the Rain"</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
                Full-spectrum creative agency & IT company. Transforming digital
                experiences from seed to full bloom.
              </p>
              {/* Social links */}
              <div className="flex gap-3">
                {SOCIAL.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Sitemap columns */}
            {Object.entries(SITEMAP).map(([group, links]) => (
              <div key={group}>
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">
                  {group}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => {
                    const legalHref = LEGAL_HREFS[link];
                    const sectionId = link.toLowerCase().replace(/\s/g, "-").replace(/&/g, "");
                    return (
                      <li key={link}>
                        {legalHref ? (
                          <Link
                            href={legalHref}
                            className="text-slate-500 hover:text-slate-200 text-sm transition-colors"
                          >
                            {link}
                          </Link>
                        ) : (
                          <button
                            onClick={() => smoothScroll(sectionId)}
                            className="text-slate-500 hover:text-slate-200 text-sm transition-colors text-left"
                          >
                            {link}
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* ── Newsletter ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center gap-6"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-xl text-white mb-1">
                Stay in the{" "}
                <span className="rainbow-text">Spectrum</span>
              </h3>
              <p className="text-slate-400 text-sm">
                Monthly insights on design, tech trends, and what we&apos;re building.
                No spam, ever.
              </p>
            </div>
            {subbed ? (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <span className="text-xl">✓</span> You&apos;re subscribed!
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex gap-2 w-full md:w-auto"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input flex-1 md:w-64 rounded-xl px-4 py-2.5 text-sm"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="btn-rainbow px-4 py-2.5 rounded-xl text-sm flex items-center gap-1.5 whitespace-nowrap"
                >
                  Subscribe <ArrowRight size={13} />
                </button>
              </form>
            )}
          </motion.div>

          {/* ── Bottom bar ── */}
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-600 text-xs">
              © 2026 Rainbow Agency Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-slate-600 text-xs">
              <span>Made with</span>
              <span className="rainbow-text font-bold mx-1">♥</span>
              <span>under the rainbow</span>
            </div>
            <div className="flex gap-5">
              {Object.entries(LEGAL_HREFS).map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-slate-600 hover:text-slate-400 text-xs transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom rainbow line ── */}
        <div className="rainbow-line h-[2px]" />
      </div>
    </footer>
  );
}
