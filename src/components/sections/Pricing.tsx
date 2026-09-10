"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Star, Building2 } from "lucide-react";

type BillingMode = "monthly" | "project";

const PLANS = [
  {
    name:    "Starter",
    icon:    Zap,
    color:   "#0288D1",
    monthly: 999,
    project: 2500,
    desc:    "For startups and early-stage products needing quality at speed.",
    features: [
      "Up to 2 services",
      "1 dedicated PM",
      "4-week delivery",
      "Basic analytics",
      "Email support",
      "1 revision round",
    ],
    popular: false,
  },
  {
    name:    "Spectrum",
    icon:    Star,
    color:   "#7C4DFF",
    monthly: 3499,
    project: 9900,
    desc:    "Our most popular plan — full-spectrum delivery for growth-stage teams.",
    features: [
      "All 7 services",
      "Dedicated squad (3–5 people)",
      "2-week sprints",
      "Advanced analytics & reporting",
      "Priority Slack support",
      "Unlimited revisions",
      "CI/CD pipeline included",
      "3-month post-launch support",
    ],
    popular: true,
  },
  {
    name:    "Enterprise",
    icon:    Building2,
    color:   "#FF8C00",
    monthly: "Custom",
    project: "Custom",
    desc:    "Bespoke engagement for enterprises needing scale, compliance, and SLAs.",
    features: [
      "Everything in Spectrum",
      "Dedicated 10+ person team",
      "White-glove onboarding",
      "Custom SLAs & contracts",
      "Security audits & compliance",
      "24/7 dedicated support",
      "Executive quarterly reviews",
      "On-site workshops",
    ],
    popular: false,
  },
];

const ADD_ONS = [
  { label: "Brand & Identity Package",   price: "$1,200" },
  { label: "SEO Audit & Roadmap",         price: "$800"   },
  { label: "AI Strategy Workshop",        price: "$2,500" },
  { label: "Performance Optimisation",    price: "$600"   },
];

export default function Pricing() {
  const [billing, setBilling] = useState<BillingMode>("monthly");

  return (
    <section id="pricing" className="section-pad relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%,rgba(124,77,255,0.07),transparent)",
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
          <p className="section-label mb-3">Pricing</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">
            Transparent{" "}
            <span className="rainbow-text">Spectrum Pricing</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
            No hidden fees. No surprises. Just clear, fair investment in your digital future.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center glass rounded-full p-1 gap-1">
            {(["monthly","project"] as BillingMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setBilling(mode)}
                className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${
                  billing === mode
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {mode === "monthly" ? "Monthly Retainer" : "Per Project"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PLANS.map((plan, i) => {
            const Icon = plan.icon;
            const price = billing === "monthly" ? plan.monthly : plan.project;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular
                    ? "bg-gradient-to-b from-slate-900 to-slate-950 border-2"
                    : "glass"
                }`}
                style={{
                  borderColor: plan.popular ? plan.color + "88" : undefined,
                  boxShadow: plan.popular
                    ? `0 0 40px ${plan.color}33, 0 0 0 1px ${plan.color}44`
                    : undefined,
                }}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="btn-rainbow px-4 py-1.5 rounded-full text-xs font-bold">
                      ✦ Most Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: plan.color + "22", border: `1px solid ${plan.color}44` }}
                >
                  <Icon size={22} style={{ color: plan.color }} />
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-1">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-6">{plan.desc}</p>

                {/* Price */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={billing + plan.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{   opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-end gap-1 mb-6"
                  >
                    {typeof price === "number" ? (
                      <>
                        <span className="text-5xl font-extrabold text-white font-display">
                          ${price.toLocaleString()}
                        </span>
                        <span className="text-slate-400 text-sm mb-1.5">
                          {billing === "monthly" ? "/mo" : " flat"}
                        </span>
                      </>
                    ) : (
                      <span className="text-4xl font-extrabold text-white font-display">
                        Let&apos;s Talk
                      </span>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Features */}
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check size={15} className="mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 ${
                    plan.popular
                      ? "btn-rainbow"
                      : "btn-ghost"
                  }`}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8"
        >
          <h3 className="font-display font-bold text-xl text-white mb-6 text-center">
            Optional Add-ons
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADD_ONS.map((a) => (
              <div
                key={a.label}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-800/60 border border-slate-700 hover:border-violet-500/40 transition-colors"
              >
                <span className="text-slate-300 text-sm">{a.label}</span>
                <span className="text-violet-400 font-bold text-sm ml-3 whitespace-nowrap">{a.price}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
