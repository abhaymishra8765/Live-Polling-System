/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          primaryFrom: '#6B46FF',  // adjust to your figma purple
          primaryTo: '#7C5CFF',
          darkGray: '#222222',
          muted: '#6B7280'
        },
        fontFamily: {
          inter: ['Inter', 'ui-sans-serif', 'system-ui']
        }
      },
    },
    plugins: [],
  }
  