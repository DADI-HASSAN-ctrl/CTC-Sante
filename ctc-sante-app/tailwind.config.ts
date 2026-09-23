import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // CTC Santé Branding
        primary: {
          50: '#f0f7f7',
          100: '#d9ecec',
          200: '#b3d9d9',
          300: '#8dc5c5',
          400: '#66b2b2',
          500: '#3a8b8b', // Primary teal
          600: '#2f7171',
          700: '#245757',
          800: '#1a3d3d',
          900: '#0f2424',
        },
        secondary: {
          50: '#f5f8fa',
          100: '#e8f0f6',
          200: '#d1e1ed',
          300: '#b5cfe1',
          400: '#7da8c7',
          500: '#5a8ab5',
          600: '#466b8a',
          700: '#2c4a5e', // Dark blue
          800: '#1f3447',
          900: '#141f2e',
        },
        accent: {
          50: '#fffbf0',
          100: '#fef5dd',
          200: '#fcecc0',
          300: '#fae2a3',
          400: '#f6d170',
          500: '#c9a854', // Taxi yellow
          600: '#b89542',
          700: '#8a6f31',
          800: '#5c4a21',
          900: '#3d3115',
        },
        neutral: {
          50: '#f9f9f9',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#727272',
          600: '#525252',
          700: '#3d3d3d',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '0.75rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
}

export default config
