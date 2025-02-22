import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        background: "#f9fafb", // Light gray
        foreground: "#1f2937", // Dark text
        border: "#e5e7eb", // Light border color
        ring: "#3b82f6", // Blue outline
        green: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          400: "#4ade80",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
