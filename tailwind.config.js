const { heroui } = require('@heroui/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/renderer/index.html',
    './src/renderer/src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#F4F8FE',
        blue: '#85A2E8',
        blue_light: '#CFDAF5',
        blue_dark: '#3B4B64',
        gray: '#C6CBD8',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
      screens: {
        'desktop-height': {
          raw: '(min-height: 768px)',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('tailwind-scrollbar'),
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#85A2E8',
              foreground: '#F4F8FE',
            },
            danger: {
              DEFAULT: '#ff6467',
            },
          },
        },
      },
    }),
  ],
};
