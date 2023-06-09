/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["light", "dark"],
  },
  // theme: {
  //   extend: {
  //     colors: {
  //       primary: "#09ccd0",
  //       secondary: "#ff6f69",
  //     },
  //   },
  // },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
