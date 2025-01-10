/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: ["var(--font-roboto)"],
      },
      screens: {
        'md2': '900px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}; 