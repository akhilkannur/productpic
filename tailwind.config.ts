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
        background: '#0a0a0a',
        surface: '#121212',
        accent: {
          DEFAULT: 'rgb(210, 180, 140)',
          hover: 'rgb(190, 160, 120)',
        },
        textMain: '#f5f5f5',
        textMuted: '#888888',
        borderSubtle: 'rgba(255, 255, 255, 0.06)',
        card: "#121212",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;