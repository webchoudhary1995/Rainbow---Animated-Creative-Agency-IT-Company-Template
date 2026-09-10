"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Briefcase, Upload, X, Check } from "lucide-react";

const JOBS = [
  { title: "Senior Full-Stack Engineer",  dept: "Engineering",  loc: "Remote / NYC",  type: "Full-time", color: "#7C4DFF" },
  { title: "AI/ML Engineer",              dept: "AI Lab",        loc: "London / Remote", type: "Full-time", color: "#FFD700" },
  { title: "Lead Product Designer",       dept: "Design",       loc: "Remote",        type: "Full-time", color: "#00C853" },
  { title: "Cloud Solutions Architect",   dept: "Infrastructure", loc: "Singapore / Remote", type: "Full-time", color: "#0288D1" },
  { title: "Growth Marketing Manager",    dept: "Marketing",    loc: "Remote",        type: "Full-time", color: "#FF8C00" },
  { title: "DevOps Engineer",             dept: "Engineering",  loc: "Remote",        type: "Contract",  color: "#5C6BC0" },
];

const PERKS = [
  { icon: "🌏", label: "100% Remote-first"       },
  { icon: "🏥", label: "Full health coverage"    },
  { icon: "📚", label: "$2k learning budget/year"},
  { icon: "🌈", label: "Rainbow team retreats"   },
  { icon: "💰", label: "Competitive equity"      },
  { icon: "⏰", label: "Async-friendly hours"    },
];

interface ResumeForm {
  name: string; email: string; role: string; message: string; file: File | null;
}

export default function Careers() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [form, setForm] = useState<ResumeForm>({ name:"", email:"", role:"", message:"", file:null });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Partial<ResumeForm>>({});
  const fileRef = useRef<HTMLInputElement>(null);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (modalOpen) {
      setSent(false); setErrors({});
      setForm((f) => ({ ...f, role: selectedJob }));
      setTimeout(() => firstRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen, selectedJob]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setModalOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  function validate() {
    const e: Partial<ResumeForm> = {};
    if (!form.name.trim())  e.name  = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.role.trim())  e.role  = "Required";
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSent(true);
  }

  function openModal(jobTitle?: string) {
    setSelectedJob(jobTitle ?? "");
    setModalOpen(true);
  }

  return (
    <section id="careers" className="section-pad relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 70% 60%,rgba(255,140,0,0.06),transparent)",
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
          <p className="section-label mb-3">Careers</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-4">
            Join the{" "}
            <span className="rainbow-text">Spectrum Team</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We hire builders, dreamers, and people who make things happen. Fully
            remote, fully human.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Jobs list */}
          <div className="lg:col-span-2 space-y-4">
            {JOBS.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: job.color, boxShadow: `0 0 8px ${job.color}` }}
                    />
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {job.dept}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-white text-base group-hover:text-violet-300 transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1 text-slate-500 text-xs">
                      <MapPin size={11} /> {job.loc}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 text-xs">
                      <Clock size={11} /> {job.type}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 text-xs">
                      <Briefcase size={11} /> {job.dept}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => openModal(job.title)}
                  className="btn-ghost px-5 py-2 rounded-xl text-sm whitespace-nowrap flex-shrink-0"
                >
                  Apply Now →
                </button>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center pt-4"
            >
              <p className="text-slate-500 text-sm mb-3">
                Don&apos;t see your role? We&apos;re always looking for great people.
              </p>
              <button onClick={() => openModal()} className="btn-rainbow px-6 py-2.5 rounded-xl text-sm">
                Send Open Application
              </button>
            </motion.div>
          </div>

          {/* Perks sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="font-display font-bold text-xl text-white mb-6">
              Life at Rainbow
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {PERKS.map((perk) => (
                <div
                  key={perk.label}
                  className="glass rounded-xl p-4 flex flex-col items-center text-center gap-2 hover:border-violet-500/40 transition-colors"
                >
                  <span className="text-2xl">{perk.icon}</span>
                  <span className="text-xs text-slate-300 font-medium leading-tight">{perk.label}</span>
                </div>
              ))}
            </div>

            {/* Culture blurb */}
            <div className="mt-6 glass rounded-2xl p-5">
              <p className="text-slate-400 text-sm leading-relaxed">
                <span className="rainbow-text font-bold">Rainbow culture</span> is
                built on trust, async work, and genuine care for our people. We believe
                the best work happens when you have the freedom to do it your way.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Resume Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            style={{ background: "rgba(2,6,23,0.88)", backdropFilter: "blur(6px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
            role="dialog" aria-modal="true" aria-labelledby="careers-modal-title"
          >
            <motion.div
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1,    y: 0  }}
              exit={{   scale: 0.92, y: 20  }}
              className="glass rounded-3xl w-full max-w-lg p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {sent ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="font-display font-bold text-2xl text-white mb-2">Application Sent!</h3>
                  <p className="text-slate-400 mb-6">We&apos;ll review your application and be in touch within 5 business days.</p>
                  <button onClick={() => setModalOpen(false)} className="btn-rainbow px-6 py-2.5 rounded-xl text-sm">
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <h2 id="careers-modal-title" className="font-display font-extrabold text-2xl text-white mb-1">
                    Apply to Rainbow
                  </h2>
                  {selectedJob && (
                    <p className="text-violet-400 text-sm mb-4">Position: {selectedJob}</p>
                  )}
                  <form onSubmit={handleSubmit} noValidate className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Full Name *</label>
                        <input
                          ref={firstRef}
                          type="text" placeholder="Jane Smith"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="form-input w-full rounded-lg px-3 py-2 text-sm"
                        />
                        {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Email *</label>
                        <input
                          type="email" placeholder="jane@example.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="form-input w-full rounded-lg px-3 py-2 text-sm"
                        />
                        {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Role Applying For *</label>
                      <input
                        type="text" placeholder="e.g. Full-Stack Engineer"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="form-input w-full rounded-lg px-3 py-2 text-sm"
                      />
                      {errors.role && <p className="text-rose-400 text-xs mt-1">{errors.role}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Why Rainbow? (optional)</label>
                      <textarea
                        rows={3} placeholder="Tell us what excites you about joining..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="form-input w-full rounded-lg px-3 py-2 text-sm resize-none"
                      />
                    </div>
                    {/* File upload */}
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Resume / CV (optional)</label>
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="w-full border-2 border-dashed border-slate-700 hover:border-violet-500 rounded-xl p-4 flex flex-col items-center gap-2 transition-colors"
                      >
                        {form.file ? (
                          <><Check size={18} className="text-green-400" /><span className="text-slate-300 text-xs">{form.file.name}</span></>
                        ) : (
                          <><Upload size={18} className="text-slate-500" /><span className="text-slate-500 text-xs">Click to upload PDF / DOC</span></>
                        )}
                      </button>
                      <input
                        ref={fileRef} type="file" className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setForm({ ...form, file: e.target.files?.[0] ?? null })}
                      />
                    </div>
                    <button type="submit" className="btn-rainbow w-full py-3 rounded-xl font-bold text-sm">
                      Submit Application →
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
