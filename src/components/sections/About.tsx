"use client";

import { motion } from "framer-motion";

const TEAM = [
  { name: "Aria Chen",      role: "CEO & Co-founder",    emoji: "👩‍💼", color: "#FF3B3B" },
  { name: "Marcus Rivera",  role: "CTO",                  emoji: "👨‍💻", color: "#FF8C00" },
  { name: "Priya Nair",     role: "Creative Director",    emoji: "🎨", color: "#FFD700" },
  { name: "James Okafor",   role: "Head of AI",           emoji: "🤖", color: "#00C853" },
  { name: "Sofia Müller",   role: "Cloud Architect",      emoji: "☁️", color: "#0288D1" },
  { name: "Kenji Tanaka",   role: "Lead Designer",        emoji: "✏️", color: "#5C6BC0" },
  { name: "Amara Diallo",   role: "DevOps Lead",          emoji: "🔧", color: "#7C4DFF" },
];

const VALUES = [
  { icon: "🌈", title: "Full Spectrum",  desc: "We bring every color of expertise to every project." },
  { icon: "🌧️", title: "Growth Mindset", desc: "We thrive in challenge, like trees in the rain."     },
  { icon: "✨", title: "Pixel Perfect",   desc: "We obsess over details that make the difference."    },
  { icon: "🤝", title: "True Partners",  desc: "Your goals become our goals. Always."                },
];

const itemVar = {
  hidden: { opacity: 0, y: 30 },
  show:   (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 80% 20%,rgba(92,107,192,0.08),transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-16 items-center mb-24"
        >
          <div>
            <p className="section-label mb-3">About Rainbow</p>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-6">
              We Are the{" "}
              <span className="rainbow-text">Architects</span>{" "}
              of Digital Tomorrow
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              Founded in 2018, Rainbow is a creative agency and IT powerhouse
              that lives at the intersection of bold design and precise
              engineering. Our tagline{" "}
              <em className="text-violet-300">"Two in the Rain"</em> reflects our
              dual nature — creativity and technology, inseparable and powerful
              together.
            </p>
            <p className="text-slate-400 leading-relaxed">
              We have shipped over 200 products across 30+ industries, partnering
              with startups, scale-ups, and Fortune 500s who share one thing: the
              ambition to lead their market.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                { n: "200+", l: "Projects" },
                { n: "50+",  l: "Team"     },
                { n: "30+",  l: "Industries" },
              ].map(({ n, l }) => (
                <div key={l} className="glass rounded-xl p-4 text-center">
                  <span className="font-display font-extrabold text-2xl rainbow-text">{n}</span>
                  <p className="text-xs text-slate-500 mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-2 gap-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i}
                variants={itemVar}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="glass rounded-2xl p-5 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-3xl mb-3 block">{v.icon}</span>
                <h3 className="font-display font-bold text-white text-sm mb-1">{v.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="section-label mb-3">The Spectrum Team</p>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white">
              People who make the{" "}
              <span className="rainbow-text">magic happen</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                custom={i}
                variants={itemVar}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col items-center gap-3 group cursor-default"
              >
                {/* Rainbow ring avatar */}
                <div
                  className="relative w-20 h-20 rounded-full p-[2px] transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `conic-gradient(${member.color}, #FF8C00, #FFD700, #00C853, #0288D1, #5C6BC0, ${member.color})`,
                    boxShadow: `0 0 0 0 ${member.color}`,
                    animation: "glow-pulse 3s ease-in-out infinite",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-4xl">
                    {member.emoji}
                  </div>
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `0 0 20px ${member.color}88` }}
                    aria-hidden="true"
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-white text-xs leading-tight">{member.name}</p>
                  <p className="text-slate-500 text-[10px] mt-0.5">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
