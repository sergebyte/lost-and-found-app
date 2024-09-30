/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'radial-gradient1': 'radial-gradient(circle, #C3D6F9, #F1FBFF)',
        'linear-gradient1': 'linear-gradient(to right, #F1FBFF, #C3D6F9)',
        'linear-gradient2': 'linear-gradient(to right, #C3D6F9, #F1FBFF',
      },
      fontFamily:{
        montserrat: ['Montserrat', 'sans-serif'],
        sourceSerif: ['Source Serif Pro', 'serif'],
      }
    },
  },
  plugins: [],
}

