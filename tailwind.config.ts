import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design system colour tokens — "Refined Edge" palette
        bg: "#F5F2EE",
        dark: "#1A1A1A",
        "accent-green": "#3D5A36",
        "accent-earth": "#8B6F47",
        text: "#2E2E2E",
        muted: "#7A7268",
        border: "#D6CFC4",
        surface: "#EDEBE6",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        "dm-sans": ["var(--font-dm-sans)", "sans-serif"],
        "dm-mono": ["var(--font-dm-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
