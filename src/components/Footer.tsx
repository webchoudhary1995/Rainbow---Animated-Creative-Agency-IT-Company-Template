"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Github, Twitter, Linkedin, Instagram } from "lucide-react";

const RainCanvas = dynamic(() => import("@/components/canvas/RainCanvas"), { ssr: false });

const SITEMAP = {
  Services: ["Web Development","Mobile Apps","AI Solutions","UI/UX Design","Cloud Infrastructure","SEO & Marketing","DevOps"],
  Company:  ["About","Story","Portfolio","Careers","Blog"],
  Legal:    ["Privacy Policy","Terms of Service","Cookie Settings"],
};

const LEGAL_HREFS: Record<string,string> = {
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

function scrollTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);

  function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;
    setSubbed(true); setEmail("");
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.05]">
      {/* Rain bg */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <RainCanvas density={0.4} />
      </div>
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "rgba(2,6,23,0.88)" }} aria-hidden="true" />

      <div className="relative z-[2]">
        {/* Animated rainbow top line */}
        <div className="rainbow-line h-[1.5px]" />

        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-14">
            {/* Brand */}
            <div className="col-span-2 md:col-span-4 lg:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">🌈</span>
                <span className="font-display font-extrabold text-2xl rainbow-text">Rainbow</span>
              </div>
              <p className="text-slate-600 text-xs italic mb-4">"Two in the Rain"</p>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
                Full-spectrum creative agency & IT company. We transform digital concepts into living, breathing realities.
              </p>
              <div className="flex gap-2.5">
                {SOCIAL.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} aria-label={label}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Sitemap */}
            {Object.entries(SITEMAP).map(([group, links]) => (
              <div key={group}>
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">{group}</h4>
                <ul className="space-y-2.5">
                  {links.map(link => {
                    const lh = LEGAL_HREFS[link];
                    const id = link.toLowerCase().replace(/\s/g,"-").replace(/[&/]/g,"");
                    return (
                      <li key={link}>
                        {lh ? (
                          <Link href={lh} className="text-slate-600 hover:text-slate-300 text-sm transition-colors">{link}</Link>
                        ) : (
                          <button onClick={() => scrollTo(id)} className="text-slate-600 hover:text-slate-300 text-sm transition-colors text-left">{link}</button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl p-7 mb-12 flex flex-col md:flex-row items-center gap-6"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(124,77,255,0.18)", backdropFilter: "blur(12px)" }}>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-xl text-white mb-1">
                Stay in the <span className="rainbow-text">Spectrum</span>
              </h3>
              <p className="text-slate-500 text-sm">Monthly insights on design, tech trends, and what we&apos;re building.</p>
            </div>
            {subbed ? (
              <p className="text-emerald-400 font-semibold text-sm flex items-center gap-2">✓ You&apos;re subscribed!</p>
            ) : (
              <form onSubmit={subscribe} className="flex gap-2 w-full md:w-auto">
                <input type="email" placeholder="your@email.com" value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="form-input flex-1 md:w-60 rounded-xl px-4 py-2.5 text-sm"
                  aria-label="Email for newsletter" />
                <button type="submit" className="btn-rainbow px-4 py-2.5 rounded-xl text-sm flex items-center gap-1.5 whitespace-nowrap">
                  Subscribe <ArrowRight size={13} />
                </button>
              </form>
            )}
          </motion.div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-700 text-xs">© 2026 Rainbow Agency Inc. All rights reserved.</p>
            <div className="flex items-center gap-1 text-slate-700 text-xs">
              Made with <span className="rainbow-text font-bold mx-1">♥</span> under the rainbow
            </div>
            <div className="flex gap-5">
              {Object.entries(LEGAL_HREFS).map(([label, href]) => (
                <Link key={href} href={href} className="text-slate-700 hover:text-slate-400 text-xs transition-colors">{label}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="rainbow-line h-[1.5px]" />
      </div>
    </footer>
  );
}
