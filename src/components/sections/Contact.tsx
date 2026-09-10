"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, Check } from "lucide-react";

type Step = 1 | 2 | 3;

interface FormData {
  // Step 1
  name: string; email: string; company: string;
  // Step 2
  service: string; budget: string; timeline: string;
  // Step 3
  message: string;
}

const SERVICES_LIST = [
  "Web Development","Mobile Apps","AI Solutions",
  "UI/UX Design","Cloud Infrastructure","SEO & Marketing","DevOps",
];
const BUDGETS = ["< $5,000","$5k – $15k","$15k – $50k","$50k – $100k","$100k+"];
const TIMELINES = ["ASAP (< 1 month)","1–3 months","3–6 months","6+ months","Flexible"];

const CONTACT_INFO = [
  { icon: Mail,    label: "Email",  value: "hello@rainbow.agency", href: "mailto:hello@rainbow.agency" },
  { icon: Phone,   label: "Phone",  value: "+1 (555) 000-0000",    href: "tel:+15550000000" },
  { icon: MapPin,  label: "Office", value: "NYC · London · Singapore", href: "#" },
];

const STEP_LABELS = ["Your Info", "Project Details", "Message"];

export default function Contact() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>({
    name:"", email:"", company:"",
    service:"", budget:"", timeline:"",
    message:"",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [sent, setSent] = useState(false);

  function validateStep(): boolean {
    const e: Partial<FormData> = {};
    if (step === 1) {
      if (!form.name.trim())  e.name  = "Required";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    }
    if (step === 2) {
      if (!form.service) e.service = "Please select a service";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validateStep()) return;
    if (step < 3) setStep((s) => (s + 1) as Step);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep()) return;
    setSent(true);
  }

  const f = (field: keyof FormData, val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  return (
    <section id="contact" className="section-pad relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 0% 50%,rgba(2,136,209,0.07),transparent)," +
            "radial-gradient(ellipse 40% 30% at 100% 80%,rgba(124,77,255,0.06),transparent)",
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
          className="text-center mb-16"
        >
          <p className="section-label mb-3">Contact</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">
            Let&apos;s Build Something{" "}
            <span className="rainbow-text">Extraordinary</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Tell us about your project. We&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: contact info + map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center group-hover:bg-violet-500/25 transition-colors">
                  <Icon size={18} className="text-violet-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                  <p className="text-white text-sm font-medium">{value}</p>
                </div>
              </a>
            ))}

            {/* Map placeholder */}
            <div className="glass rounded-2xl overflow-hidden h-48 relative flex items-center justify-center">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%,rgba(2,136,209,0.12),rgba(15,23,42,0.95))",
                }}
              />
              <div className="relative text-center">
                <div className="text-4xl mb-2">🗺️</div>
                <p className="text-slate-400 text-sm">Global — Remote-first</p>
                <p className="text-slate-600 text-xs mt-1">NYC · London · Singapore</p>
              </div>
            </div>

            {/* Quick booking */}
            <div className="glass rounded-2xl p-5">
              <h3 className="font-bold text-white text-sm mb-1">Prefer a call?</h3>
              <p className="text-slate-400 text-xs mb-3">
                Book a free 30-min discovery call directly.
              </p>
              <a
                href="mailto:hello@rainbow.agency?subject=Discovery Call Request"
                className="btn-rainbow w-full py-2.5 rounded-xl text-sm text-center block"
              >
                Book a Call →
              </a>
            </div>
          </motion.div>

          {/* Right: multi-step form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-8">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-emerald-400" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-slate-400 mb-6">
                    Thanks, {form.name.split(" ")[0]}! We&apos;ll be in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSent(false); setStep(1); setForm({ name:"",email:"",company:"",service:"",budget:"",timeline:"",message:"" }); }}
                    className="btn-ghost px-6 py-2.5 rounded-xl text-sm"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Step indicator */}
                  <div className="flex items-center gap-2 mb-8">
                    {STEP_LABELS.map((label, i) => {
                      const n = i + 1;
                      const isActive = step === n;
                      const isDone   = step > n;
                      return (
                        <div key={label} className="flex items-center gap-2 flex-1">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                                isDone  ? "bg-emerald-500 text-white" :
                                isActive ? "bg-violet-600 text-white" :
                                "bg-slate-800 text-slate-500"
                              }`}
                            >
                              {isDone ? <Check size={13} /> : n}
                            </div>
                            <span
                              className={`text-xs hidden sm:block transition-colors ${
                                isActive ? "text-white font-semibold" : "text-slate-500"
                              }`}
                            >
                              {label}
                            </span>
                          </div>
                          {i < 2 && <div className="flex-1 h-px bg-slate-800 mx-2" />}
                        </div>
                      );
                    })}
                  </div>

                  <form onSubmit={submit} noValidate>
                    <AnimatePresence mode="wait">
                      {/* ── Step 1 ── */}
                      {step === 1 && (
                        <motion.div
                          key="s1"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{   opacity: 0, x: -30 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <h3 className="font-display font-bold text-xl text-white mb-4">
                            Tell us about yourself
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-slate-400 block mb-1">Full Name *</label>
                              <input type="text" placeholder="Jane Smith"
                                value={form.name} onChange={(e) => f("name", e.target.value)}
                                className="form-input w-full rounded-lg px-3 py-2.5 text-sm" />
                              {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
                            </div>
                            <div>
                              <label className="text-xs text-slate-400 block mb-1">Work Email *</label>
                              <input type="email" placeholder="jane@co.com"
                                value={form.email} onChange={(e) => f("email", e.target.value)}
                                className="form-input w-full rounded-lg px-3 py-2.5 text-sm" />
                              {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-slate-400 block mb-1">Company (optional)</label>
                            <input type="text" placeholder="Acme Inc."
                              value={form.company} onChange={(e) => f("company", e.target.value)}
                              className="form-input w-full rounded-lg px-3 py-2.5 text-sm" />
                          </div>
                        </motion.div>
                      )}

                      {/* ── Step 2 ── */}
                      {step === 2 && (
                        <motion.div
                          key="s2"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{   opacity: 0, x: -30 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-5"
                        >
                          <h3 className="font-display font-bold text-xl text-white mb-4">
                            About your project
                          </h3>
                          <div>
                            <label className="text-xs text-slate-400 block mb-2">Service Needed *</label>
                            <div className="grid grid-cols-2 gap-2">
                              {SERVICES_LIST.map((s) => (
                                <button
                                  key={s} type="button"
                                  onClick={() => f("service", s)}
                                  className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all duration-200 ${
                                    form.service === s
                                      ? "bg-violet-600 text-white"
                                      : "glass text-slate-400 hover:text-white"
                                  }`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                            {errors.service && <p className="text-rose-400 text-xs mt-1">{errors.service}</p>}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-slate-400 block mb-2">Budget Range</label>
                              <select
                                value={form.budget} onChange={(e) => f("budget", e.target.value)}
                                className="form-input w-full rounded-lg px-3 py-2.5 text-sm"
                              >
                                <option value="">Select…</option>
                                {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="text-xs text-slate-400 block mb-2">Timeline</label>
                              <select
                                value={form.timeline} onChange={(e) => f("timeline", e.target.value)}
                                className="form-input w-full rounded-lg px-3 py-2.5 text-sm"
                              >
                                <option value="">Select…</option>
                                {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* ── Step 3 ── */}
                      {step === 3 && (
                        <motion.div
                          key="s3"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{   opacity: 0, x: -30 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <h3 className="font-display font-bold text-xl text-white mb-4">
                            Anything else to share?
                          </h3>
                          <div>
                            <label className="text-xs text-slate-400 block mb-1">
                              Project description / goals
                            </label>
                            <textarea
                              rows={6}
                              placeholder="Tell us about your vision, challenges, or anything that helps us understand your project..."
                              value={form.message}
                              onChange={(e) => f("message", e.target.value)}
                              className="form-input w-full rounded-lg px-3 py-2.5 text-sm resize-none"
                            />
                          </div>
                          {/* Summary */}
                          <div className="glass rounded-xl p-4 text-xs text-slate-400 space-y-1">
                            <p><span className="text-slate-300">Name:</span> {form.name}</p>
                            <p><span className="text-slate-300">Email:</span> {form.email}</p>
                            {form.service && <p><span className="text-slate-300">Service:</span> {form.service}</p>}
                            {form.budget  && <p><span className="text-slate-300">Budget:</span> {form.budget}</p>}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-800">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={() => setStep((s) => (s - 1) as Step)}
                          className="btn-ghost px-5 py-2.5 rounded-xl text-sm"
                        >
                          ← Back
                        </button>
                      ) : <div />}

                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={next}
                          className="btn-rainbow px-6 py-2.5 rounded-xl text-sm flex items-center gap-2"
                        >
                          Next <ArrowRight size={14} />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn-rainbow px-6 py-2.5 rounded-xl text-sm flex items-center gap-2"
                        >
                          Send Message →
                        </button>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
