import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        figtree: ["Figtree", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#EBF0FF",
          100: "#D7E1FF",
          200: "#AEC2FF",
          300: "#86A4FF",
          400: "#5D85FF",
          500: "#3567FF",
          600: "#2A53CE",
          700: "#2A53CE",
          800: "#152B6D",
          900: "#12204C",
        },
        grey: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#101010",
        },
        stone: {
          50: "#FCFCFD",
          100: "#F3F4F6",
          200: "#E8E8E8",
          300: "#D6D6D6",
          400: "#A5A5A5",
          500: "#757575",
          600: "#575757",
          700: "#404040",
          800: "#2E2E2E",
          900: "#1F1F1F",
        },
      },
      keyframes: {
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
