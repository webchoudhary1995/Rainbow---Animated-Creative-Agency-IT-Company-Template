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

function smooth(href: string) {
  const hash = href.split("#")[1];
  if (!hash) return;
  document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.split("#")[1]).filter(Boolean);
    const obs = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActiveHash(id); }, { threshold: 0.3 });
      o.observe(el);
      return o;
    }).filter(Boolean);
    return () => obs.forEach(o => o?.disconnect());
  }, [pathname]);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      setMobileOpen(false);
      if (pathname === "/") smooth(href);
      else window.location.href = href;
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={scrolled ? {
          background: "rgba(2,6,23,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
        } : { background: "transparent" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 group">
            <motion.span className="text-2xl" whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>🌈</motion.span>
            <span className="font-display font-extrabold text-xl rainbow-text tracking-wide">Rainbow</span>
            <span className="hidden sm:block text-[10px] text-slate-600 font-light ml-1 mt-1 italic">Two in the Rain</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const hash = href.split("#")[1];
              const isActive = activeHash === hash;
              return (
                <Link key={href} href={href} onClick={e => handleLink(e, href)}
                  className="relative px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors rounded-lg">
                  {isActive && (
                    <motion.span layoutId="nav-active"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: "rgba(124,77,255,0.15)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                  )}
                  <span className="relative z-10">{label}</span>
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/#contact" onClick={e => handleLink(e, "/#contact")}
              className="text-sm text-slate-400 hover:text-white px-3 py-2 transition-colors">
              Sign In
            </Link>
            <Link href="/#contact" onClick={e => handleLink(e, "/#contact")}
              className="btn-rainbow px-5 py-2 rounded-xl text-sm flex items-center gap-1.5">
              <Zap size={13} /> Start a Project
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Rainbow underline */}
        <motion.div
          className="h-[1px] rainbow-line"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 0.4 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="fixed top-[70px] left-0 right-0 z-[99] px-6 py-5 flex flex-col gap-3"
            style={{ background: "rgba(2,6,23,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} onClick={e => handleLink(e, href)}
                className="text-slate-300 hover:text-white font-medium py-2 border-b border-white/5 transition-colors">
                {label}
              </Link>
            ))}
            <Link href="/#contact" onClick={e => handleLink(e, "/#contact")}
              className="btn-rainbow mt-2 px-5 py-3 rounded-xl text-sm text-center">
              Start a Project →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
