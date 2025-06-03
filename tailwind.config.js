const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#5684AE',
        'dark-blue': '#0F4C81',
        'light-orange': '#FFE4C8',
        'dark-orange': '#F9BE81',
        'deep-orange': '#FF6600',
        'calendar-tile': '#E4F6ED',
      },
      padding: {
        '1': '1rem',
        '1.5': '1.5rem',
        'x-1': '1rem',
        'y-1': '1rem',
      },
      gap: {
        '1': '1rem',
        '1.5': '1.5rem',
      },
    },
  },
  plugins: [
    nextui(),
  ],
};