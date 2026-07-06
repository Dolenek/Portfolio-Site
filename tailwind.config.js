/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2563eb",
          foreground: "#f8fafc"
        }
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Fira Code'", "Consolas", "monospace"]
      },
      backgroundImage: {
        'grid-light':
          "linear-gradient(90deg, rgba(148, 163, 184, 0.12) 1px, transparent 0), linear-gradient(180deg, rgba(148, 163, 184, 0.12) 1px, transparent 0)",
        'grid-dark':
          "linear-gradient(90deg, rgba(15, 23, 42, 0.35) 1px, transparent 0), linear-gradient(180deg, rgba(15, 23, 42, 0.35) 1px, transparent 0)"
      }
    }
  }
};
