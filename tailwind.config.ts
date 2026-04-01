import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: "#1a1f2e",
        storm: "#0d111a",
        rune: "#6fd3ff",
        forge: "#2c3447"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(111,211,255,.35), 0 0 28px rgba(73,163,255,.25)",
      },
      backgroundImage: {
        "hud-grid": "radial-gradient(circle at 1px 1px, rgba(111,211,255,.12) 1px, transparent 0)",
      }
    },
  },
  plugins: [],
} satisfies Config;
