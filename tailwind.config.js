/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-blue': '#5684AE',
        'dark-blue': '#0F4C81',
        'light-orange': '#FFE4C8',
        'dark-orange': '#F9BE81',
        'calendar-tile': '#E4F6ED',
      },
      padding: {
        '16': '1rem',
        '24': '1.5rem',
        'x-16': '1rem',
        'y-16': '1rem',
      },
      gap: {
        '16': '1rem',
        '24': '1.5rem',
      },
    },
  },
  plugins: [],
};