"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Star, Building2 } from "lucide-react";

type BillingMode = "monthly" | "project";

const PLANS = [
  {
    name: "Starter", icon: Zap, color: "#0288D1",
    monthly: 0, project: 2500,
    desc: "For startups and early-stage products.",
    features: ["Up to 2 services","1 dedicated PM","4-week delivery","Basic analytics","Email support"],
    popular: false,
  },
  {
    name: "Spectrum", icon: Star, color: "#7C4DFF",
    monthly: 3499, project: 9900,
    desc: "Full-spectrum delivery for growth-stage teams.",
    features: ["All 7 services","Squad of 3–5","2-week sprints","Advanced analytics","Priority Slack","Unlimited revisions","CI/CD included","3-month support"],
    popular: true,
  },
  {
    name: "Enterprise", icon: Building2, color: "#FF8C00",
    monthly: -1, project: -1,
    desc: "Bespoke engagement for enterprises at scale.",
    features: ["Everything in Spectrum","10+ person team","White-glove onboarding","Custom SLAs","Security audits","24/7 support","Quarterly reviews"],
    popular: false,
  },
];

const ADD_ONS = [
  { label: "Brand & Identity",      price: "$1,200" },
  { label: "SEO Audit & Roadmap",   price: "$800"   },
  { label: "AI Strategy Workshop",  price: "$2,500" },
  { label: "Performance Boost",     price: "$600"   },
];

export default function Pricing() {
  const [billing, setBilling] = useState<BillingMode>("monthly");

  return (
    <section id="pricing" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%,rgba(124,77,255,0.07),transparent)" }}
        aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-12">
          <p className="section-label mb-3">Pricing</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">
            Transparent <span className="rainbow-text">Spectrum Pricing</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">No hidden fees. No surprises. Clear investment in your digital future.</p>

          {/* Rainbow toggle */}
          <div className="inline-flex items-center p-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {(["monthly","project"] as BillingMode[]).map((mode) => (
              <motion.button
                key={mode}
                onClick={() => setBilling(mode)}
                className="relative px-6 py-2 rounded-full text-sm font-semibold capitalize transition-colors duration-200"
                style={{ color: billing === mode ? "#fff" : "#64748b" }}
              >
                {billing === mode && (
                  <motion.span
                    layoutId="billing-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "linear-gradient(135deg,#7C4DFF,#0288D1)", boxShadow: "0 0 20px rgba(124,77,255,0.4)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{mode === "monthly" ? "Monthly Retainer" : "Per Project"}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PLANS.map((plan, i) => {
            const Icon  = plan.icon;
            const price = billing === "monthly" ? plan.monthly : plan.project;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: plan.popular
                    ? "linear-gradient(145deg,rgba(124,77,255,0.12),rgba(2,136,209,0.08),rgba(255,255,255,0.03))"
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${plan.popular ? plan.color + "55" : "rgba(255,255,255,0.07)"}`,
                  backdropFilter: "blur(16px)",
                  boxShadow: plan.popular ? `0 0 40px ${plan.color}22, 0 20px 60px rgba(0,0,0,0.3)` : "0 4px 24px rgba(0,0,0,0.15)",
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="btn-rainbow px-4 py-1.5 rounded-full text-xs font-bold">✦ Most Popular</span>
                  </div>
                )}

                {/* Top rainbow bar for popular */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-[1px] rounded-t-2xl"
                    style={{ background: "linear-gradient(90deg,transparent,#7C4DFF,#0288D1,transparent)" }} />
                )}

                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: plan.color + "18", border: `1px solid ${plan.color}33` }}>
                  <Icon size={20} style={{ color: plan.color }} />
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-5">{plan.desc}</p>

                <AnimatePresence mode="wait">
                  <motion.div key={billing + plan.name}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }} className="flex items-end gap-1 mb-6">
                    {price < 0 ? (
                      <span className="font-display font-extrabold text-4xl text-white">Let&apos;s Talk</span>
                    ) : price === 0 ? (
                      <span className="font-display font-extrabold text-4xl text-white">Free</span>
                    ) : (
                      <>
                        <span className="font-display font-extrabold text-5xl text-white">${price.toLocaleString()}</span>
                        <span className="text-slate-500 text-sm mb-1.5">{billing === "monthly" ? "/mo" : " flat"}</span>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                <ul className="space-y-2.5 mb-7 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check size={14} className="flex-shrink-0" style={{ color: plan.color }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 ${plan.popular ? "btn-rainbow" : "btn-ghost"}`}
                >
                  {price < 0 ? "Contact Sales" : "Get Started"}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Add-ons */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-2xl p-7"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}>
          <h3 className="font-display font-bold text-lg text-white mb-5 text-center">Optional Add-ons</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ADD_ONS.map((a) => (
              <div key={a.label} className="flex items-center justify-between p-4 rounded-xl transition-colors hover:border-violet-500/30"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-slate-400 text-sm">{a.label}</span>
                <span className="text-violet-400 font-bold text-sm ml-2 whitespace-nowrap">{a.price}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
