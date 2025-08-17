import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  // додано лише щоб задовольнити типи; у v4 Tailwind це фактично ігнорується
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
};

export default config;
