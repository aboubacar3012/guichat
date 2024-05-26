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
        primary: '#1c1c1e',
        secondary: '#2c2c2e',
        accent: '#0a84ff',
        textPrimary: '#ffffff',
        textSecondary: '#8e8e93',
      },
      height: {
        'screen-safe': 'calc(100vh - var(--safe-area-inset-top) - var(--safe-area-inset-bottom))',
      }
    },
  },
  plugins: [
    require('tailwindcss-safe-area-capacitor')
  ],
};
export default config;
