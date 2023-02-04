/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        back: "url('../alfa-weather-app/src/assets/img/back-image.jpg')",
      },
    },
  },
  plugins: [],
};
