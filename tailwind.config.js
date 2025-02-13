/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        primary: '#18A0FB',
        secondary: colors.slate[950],
        destructive: colors.red[600],
        muted: {
          foreground: colors.gray[400],
          background: '#F3F4F6',
        },
      },
      backgroundImage: {
        'gradient-10':
          'linear-gradient(0deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1))',
        'gradient-30':
          'linear-gradient(0deg, rgba(255,255,255,0.3), rgba(255,255,255,0.3))',
        'gradient-50':
          'linear-gradient(0deg, rgba(255,255,255,0.5), rgba(255,255,255,0.5))',
      },
      fontFamily: {
        sans: ['Pretendard', 'Arial', 'sans-serif'],
      },
      width: {
        responsive_container: 'min(100%, 600px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
