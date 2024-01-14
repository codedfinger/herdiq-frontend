/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        white: {
          '100': '#ffffff'
        },
        yellow: {
          '400': '#FFD700', // Change this color code to your desired yellow color
        },
        green: {
          '500': '#80CBC4'
        },
        greenbg: {
          '600': '#004D40'
        },
        gray: {
          '700': '#555555', // Change this color code to your desired gray color
        },
      },
    },
  },
  plugins: [],
}
