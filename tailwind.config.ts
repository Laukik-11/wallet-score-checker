import type { Config } from 'tailwindcss';

/** Explicit content paths — avoids Tailwind v4 source-resolution issues in some Next dev setups. */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        background: '#070c18',
        foreground: '#f8fafc',
        muted: '#a8b6d4',
        accent: {
          DEFAULT: '#63a4ff',
          strong: '#4d8ef5',
        },
        card: {
          DEFAULT: 'rgb(22 30 52 / 0.92)',
          muted: 'rgb(12 17 30 / 0.94)',
        },
        border: 'rgba(130, 158, 220, 0.26)',
        success: '#34d399',
        destructive: '#fb7185',
      },
    },
  },
  plugins: [],
} satisfies Config;
