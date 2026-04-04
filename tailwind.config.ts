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
        background: '#000000',
        surface: '#000000',
        accent: {
          DEFAULT: '#ffffff',
          hover: '#f0f0f0',
        },
        textMain: '#ffffff',
        textMuted: '#707070',
        borderSubtle: '#222222',
        card: "#000000",
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