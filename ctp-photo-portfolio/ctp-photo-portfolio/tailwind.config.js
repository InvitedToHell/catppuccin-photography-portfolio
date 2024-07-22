/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisycss: {
    themes: ["pastel", "black"],
    darkMode: ["class", '[data-theme="black"]'],
  },
};
