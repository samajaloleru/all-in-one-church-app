import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ['var(--font-lexend)'],
        jakarta: ['var(--font-jakarta)'],
        mono: ['var(--font-space-mono)'],
      },
    },
  },
  plugins: [],
};

export default config;
