import type { Config } from "tailwindcss";

/**
 * Design tokens for the Andrea Zucca universe.
 * The palette is intentionally minimal: absolute black, blood red, metallic silver.
 * Each project route can override accents via CSS variables (see globals.css).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand palette
        ink: {
          DEFAULT: "#050505", // absolute black background
          900: "#0a0a0a",
          800: "#111111",
          700: "#161616",
        },
        blood: {
          DEFAULT: "#c1121f", // blood red accent
          bright: "#e10600",
          deep: "#7a0a12",
        },
        silver: {
          DEFAULT: "#c9c9c9", // metallic silver secondary text
          dim: "#8a8a8a",
          bright: "#e8e8e8",
        },
        // Per-project accents
        cage: "#d9d9d9",
        cuff: "#7a5cff", // purple/satin for ear cuff
      },
      fontFamily: {
        // Mapped to next/font CSS variables (see lib/fonts.ts)
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        brutal: "0.18em",
        wide2: "0.35em",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-5%,-10%)" },
          "20%": { transform: "translate(-15%,5%)" },
          "30%": { transform: "translate(7%,-25%)" },
          "40%": { transform: "translate(-5%,25%)" },
          "50%": { transform: "translate(-15%,10%)" },
          "60%": { transform: "translate(15%,0%)" },
          "70%": { transform: "translate(0%,15%)" },
          "80%": { transform: "translate(3%,-35%)" },
          "90%": { transform: "translate(-10%,10%)" },
        },
        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 100%": { opacity: "1" },
          "20%, 21.999%, 63%, 63.999%": { opacity: "0.35" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollDot: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translateY(14px)", opacity: "0" },
        },
      },
      animation: {
        grain: "grain 8s steps(10) infinite",
        flicker: "flicker 6s linear infinite",
        marquee: "marquee 28s linear infinite",
        scrollDot: "scrollDot 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
