"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const NAV_LINKS = [
  { label: "Services",  href: "/#services"  },
  { label: "Story",     href: "/#story"     },
  { label: "About",     href: "/#about"     },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Pricing",   href: "/#pricing"   },
  { label: "Careers",   href: "/#careers"   },
  { label: "Contact",   href: "/#contact"   },
];

function smoothScroll(href: string) {
  const hash = href.includes("#") ? href.split("#")[1] : null;
  if (!hash) return;
  const el = document.getElementById(hash);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeHash,  setActiveHash]  = useState("");
  const pathname = usePathname();

  /* scroll shadow */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* active section via IntersectionObserver */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.split("#")[1]).filter(Boolean);
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveHash(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      setMobileOpen(false);
      if (pathname === "/") {
        smoothScroll(href);
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "glass border-b border-[var(--glass-border)] shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl select-none">🌈</span>
            <span className="font-display font-extrabold text-xl rainbow-text tracking-wide">
              Rainbow
            </span>
            <span className="hidden sm:block text-xs text-slate-500 font-light ml-1 mt-1 italic">
              Two in the Rain
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const hash = href.split("#")[1];
              const isActive = activeHash === hash;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={(e) => handleLink(e, href)}
                  className="relative px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "rgba(124,77,255,0.18)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop CTAs ── */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/#contact"
              onClick={(e) => handleLink(e, "/#contact")}
              className="btn-ghost px-4 py-2 rounded-lg text-sm"
            >
              Sign In
            </Link>
            <Link
              href="/#contact"
              onClick={(e) => handleLink(e, "/#contact")}
              className="btn-rainbow px-5 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <Zap size={14} /> Start a Project
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* ── Rainbow underline ── */}
        <div className="rainbow-line h-[1.5px] opacity-60" />
      </motion.header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{  opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[72px] left-0 right-0 z-[99] glass border-b border-[var(--glass-border)] px-6 py-6 flex flex-col gap-3"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={(e) => handleLink(e, href)}
                className="text-slate-300 hover:text-white font-medium py-2 border-b border-slate-800 transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={(e) => handleLink(e, "/#contact")}
              className="btn-rainbow mt-2 px-5 py-3 rounded-xl text-sm text-center"
            >
              Start a Project →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
