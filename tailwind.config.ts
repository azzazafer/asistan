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
        sovereign: {
          black: "#000000",
          blue: "#3b82f6",
          magenta: "#ff00ff",
          cyan: "#00ffff",
          green: "#00ff88",
          gold: "#ffd700",
          red: "#ff2244",
          slate: "#0a0a1a",
          panel: "#0d0d1f",
          border: "#1a1a3a",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "liquid-gradient": "linear-gradient(135deg, #3b82f6 0%, #8b00ff 50%, #ff00ff 100%)",
        "sovereign-gradient": "linear-gradient(135deg, #000000 0%, #0a0a1a 50%, #000000 100%)",
        "neural-grid": "radial-gradient(ellipse at 50% 50%, #3b82f6 0%, transparent 70%)",
      },
      animation: {
        "liquid-flow": "liquidFlow 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "terminal-blink": "terminalBlink 1s step-end infinite",
        "scan-line": "scanLine 3s linear infinite",
        "float-up": "floatUp 6s ease-in-out infinite",
        "matrix-fall": "matrixFall 4s linear infinite",
        "sigma-wave": "sigmaWave 5s ease-in-out infinite",
        "border-flow": "borderFlow 3s linear infinite",
        "glitch": "glitch 3s infinite",
      },
      keyframes: {
        liquidFlow: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px #3b82f6, 0 0 40px #3b82f680" },
          "50%": { boxShadow: "0 0 40px #ff00ff, 0 0 80px #ff00ff80" },
        },
        terminalBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        floatUp: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        matrixFall: {
          "0%": { transform: "translateY(-100%)", opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        sigmaWave: {
          "0%, 100%": { transform: "scaleX(1) scaleY(1)" },
          "50%": { transform: "scaleX(1.05) scaleY(0.95)" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "300% 50%" },
        },
        glitch: {
          "0%, 90%, 100%": { transform: "translate(0)" },
          "92%": { transform: "translate(-3px, 1px)" },
          "94%": { transform: "translate(3px, -1px)" },
          "96%": { transform: "translate(-1px, 2px)" },
          "98%": { transform: "translate(2px, -2px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
