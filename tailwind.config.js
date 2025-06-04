/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}', // adjust if needed
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
          san: ['Roboto','sans-serif'] // Replace default sans with Poppins
        },
      },
    },
    plugins: [],
  };
  