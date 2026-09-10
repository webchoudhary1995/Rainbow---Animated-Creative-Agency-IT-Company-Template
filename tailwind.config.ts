import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rain: {
          red:    "#FF3B3B",
          orange: "#FF8C00",
          yellow: "#FFD700",
          green:  "#00C853",
          blue:   "#0288D1",
          indigo: "#5C6BC0",
          violet: "#7C4DFF",
        },
        glass: {
          DEFAULT: "rgba(15,23,42,0.65)",
          light:   "rgba(30,41,59,0.55)",
          border:  "rgba(129,140,248,0.2)",
        },
      },
      backgroundImage: {
        "rainbow-gradient":
          "linear-gradient(135deg,#FF3B3B,#FF8C00,#FFD700,#00C853,#0288D1,#5C6BC0,#7C4DFF)",
        "rainbow-h":
          "linear-gradient(90deg,#FF3B3B,#FF8C00,#FFD700,#00C853,#0288D1,#5C6BC0,#7C4DFF)",
        "dark-base":
          "radial-gradient(ellipse at 20% 50%,rgba(92,107,192,0.15),transparent 60%),radial-gradient(ellipse at 80% 50%,rgba(124,77,255,0.12),transparent 60%),linear-gradient(135deg,#020617,#0a0f2e,#020617)",
      },
      animation: {
        "rainbow-shift": "rainbow-shift 6s linear infinite",
        "float":         "float 6s ease-in-out infinite",
        "float-slow":    "float 9s ease-in-out infinite",
        "bird-fly":      "bird-fly 12s linear infinite",
        "rain-fall":     "rain-fall 1.2s linear infinite",
        "glow-pulse":    "glow-pulse 3s ease-in-out infinite",
        "spin-slow":     "spin 20s linear infinite",
        "slide-up":      "slide-up 0.6s ease forwards",
        "fade-in":       "fade-in 0.8s ease forwards",
        "gradient-x":    "gradient-x 8s ease infinite",
      },
      keyframes: {
        "rainbow-shift": {
          "0%,100%": { "background-position": "0% 50%" },
          "50%":     { "background-position": "100% 50%" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-18px)" },
        },
        "bird-fly": {
          "0%":   { transform: "translateX(-120px) translateY(0px)" },
          "25%":  { transform: "translateX(25vw) translateY(-30px)" },
          "50%":  { transform: "translateX(50vw) translateY(10px)" },
          "75%":  { transform: "translateX(75vw) translateY(-20px)" },
          "100%": { transform: "translateX(110vw) translateY(0px)" },
        },
        "rain-fall": {
          "0%":   { transform: "translateY(-10px)", opacity: "0" },
          "10%":  { opacity: "0.8" },
          "90%":  { opacity: "0.4" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        "glow-pulse": {
          "0%,100%": { opacity: "0.6", transform: "scale(1)" },
          "50%":     { opacity: "1",   transform: "scale(1.04)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "gradient-x": {
          "0%,100%": { "background-position": "0% 50%" },
          "50%":     { "background-position": "100% 50%" },
        },
      },
      backdropBlur: { xs: "2px" },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body:    ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
