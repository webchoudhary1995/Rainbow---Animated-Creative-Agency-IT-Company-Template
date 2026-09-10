"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CookiePrefs {
  essential:   boolean;
  analytics:   boolean;
  marketing:   boolean;
  preferences: boolean;
}

const COOKIE_TYPES = [
  {
    key:         "essential" as const,
    name:        "Essential Cookies",
    desc:        "Required for core website functionality — authentication, security, and session management. Cannot be disabled.",
    required:    true,
    color:       "#00C853",
  },
  {
    key:         "analytics" as const,
    name:        "Analytics Cookies",
    desc:        "Help us understand how visitors interact with our website. Data is aggregated and anonymised (via Google Analytics 4).",
    required:    false,
    color:       "#0288D1",
  },
  {
    key:         "marketing" as const,
    name:        "Marketing Cookies",
    desc:        "Used to deliver relevant advertisements and track campaign performance across platforms.",
    required:    false,
    color:       "#FF8C00",
  },
  {
    key:         "preferences" as const,
    name:        "Preference Cookies",
    desc:        "Remember your settings and personalisation choices (e.g., language, theme) to improve your experience.",
    required:    false,
    color:       "#7C4DFF",
  },
] as const;

export default function CookiesPage() {
  const [prefs, setPrefs] = useState<CookiePrefs>({
    essential:   true,
    analytics:   false,
    marketing:   false,
    preferences: false,
  });
  const [saved, setSaved] = useState(false);

  function togglePref(key: keyof CookiePrefs) {
    if (key === "essential") return;
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
    setSaved(false);
  }

  function acceptAll() {
    setPrefs({ essential: true, analytics: true, marketing: true, preferences: true });
    setSaved(false);
  }

  function rejectAll() {
    setPrefs({ essential: true, analytics: false, marketing: false, preferences: false });
    setSaved(false);
  }

  function save() { setSaved(true); }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-300 text-sm mb-8 transition-colors"
        >
          ← Back to Rainbow
        </Link>

        <div className="mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-violet-400">Legal</span>
          <h1 className="font-display font-extrabold text-4xl text-white mt-2 mb-2">
            Cookie Settings
          </h1>
          <p className="text-slate-500 text-sm">Last updated: September 10, 2026</p>
        </div>

        <p className="text-slate-400 leading-relaxed mb-10">
          We use cookies to improve your experience on our website. You can
          choose which categories to allow below. Essential cookies are always
          active as they are required for the website to function. For more
          information, see our{" "}
          <Link href="/legal/privacy" className="text-violet-400 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={acceptAll}
            className="btn-rainbow px-5 py-2.5 rounded-xl text-sm"
          >
            Accept All
          </button>
          <button
            onClick={rejectAll}
            className="btn-ghost px-5 py-2.5 rounded-xl text-sm"
          >
            Reject Optional
          </button>
        </div>

        {/* Cookie toggles */}
        <div className="space-y-4 mb-8">
          {COOKIE_TYPES.map((ct) => {
            const enabled = prefs[ct.key];
            return (
              <motion.div
                key={ct.key}
                whileHover={{ y: -1 }}
                className="glass rounded-2xl p-6 flex items-start gap-5"
                style={{ borderColor: enabled ? ct.color + "44" : undefined }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: ct.color, boxShadow: `0 0 8px ${ct.color}` }}
                    />
                    <h3 className="font-bold text-white text-sm">{ct.name}</h3>
                    {ct.required && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{ct.desc}</p>
                </div>

                {/* Toggle */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={enabled}
                  onClick={() => togglePref(ct.key)}
                  disabled={ct.required}
                  className={`flex-shrink-0 mt-0.5 w-12 h-6 rounded-full relative transition-all duration-300 ${
                    ct.required ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                  }`}
                  style={{
                    background: enabled
                      ? `linear-gradient(135deg,${ct.color},${ct.color}cc)`
                      : "#1e293b",
                    border: "1px solid " + (enabled ? ct.color + "88" : "#334155"),
                  }}
                  aria-label={`Toggle ${ct.name}`}
                >
                  <span
                    className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300"
                    style={{ transform: enabled ? "translateX(26px)" : "translateX(2px)" }}
                  />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Save button */}
        <div className="flex items-center gap-4">
          <button
            onClick={save}
            className="btn-rainbow px-8 py-3 rounded-xl font-bold"
          >
            Save Preferences
          </button>
          {saved && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium"
            >
              <Check size={15} /> Preferences saved!
            </motion.div>
          )}
        </div>

        {/* Info section */}
        <div className="mt-12 space-y-8 text-slate-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-display font-bold text-lg mb-2">What Are Cookies?</h2>
            <p>Cookies are small text files stored on your device when you visit websites. They help websites remember your preferences and improve your experience over subsequent visits.</p>
          </section>
          <section>
            <h2 className="text-white font-display font-bold text-lg mb-2">How Long Do Cookies Last?</h2>
            <p>Essential session cookies expire when you close your browser. Persistent cookies (analytics, preferences) may last up to 2 years. You can clear all cookies at any time through your browser settings.</p>
          </section>
          <section>
            <h2 className="text-white font-display font-bold text-lg mb-2">Third-Party Cookies</h2>
            <p>Some cookies are set by third-party services (e.g., Google Analytics). These are governed by those parties' own privacy policies. We only enable third-party cookies for services you have opted into.</p>
          </section>
          <section>
            <h2 className="text-white font-display font-bold text-lg mb-2">Contact</h2>
            <p>
              Questions about our cookie use? Email{" "}
              <a href="mailto:privacy@rainbow.agency" className="text-violet-400 hover:underline">
                privacy@rainbow.agency
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
