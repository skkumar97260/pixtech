/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],  // Modern and clean font
        inter: ['Inter', 'sans-serif'],  // Great for readability
        montserrat: ['Montserrat', 'sans-serif'], // Stylish and elegant
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  variants: {},
  plugins: [],
};
