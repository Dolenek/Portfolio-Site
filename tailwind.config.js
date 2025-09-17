import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2563eb",
          foreground: "#f8fafc",
          muted: "#1d4ed8"
        },
        background: "#0f172a",
        foreground: "#f8fafc"
      },
      fontFamily: {
        sans: ["'Inter Variable'", "'Inter'", "system-ui", "sans-serif"],
        display: ["'Cal Sans'", "'Inter Variable'", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 45px -20px rgba(37, 99, 235, 0.55)",
        card: "0 12px 40px -24px rgba(15, 23, 42, 0.75)"
      },
      backgroundImage: {
        'grid-light':
          "linear-gradient(90deg, rgba(148, 163, 184, 0.12) 1px, transparent 0), linear-gradient(180deg, rgba(148, 163, 184, 0.12) 1px, transparent 0)",
        'grid-dark':
          "linear-gradient(90deg, rgba(15, 23, 42, 0.35) 1px, transparent 0), linear-gradient(180deg, rgba(15, 23, 42, 0.35) 1px, transparent 0)"
      }
    }
  },
  plugins: [forms, typography]
};
