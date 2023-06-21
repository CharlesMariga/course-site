/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("prettier-plugin-tailwindcss"),
  ],
};
