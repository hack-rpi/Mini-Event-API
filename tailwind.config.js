/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    fontFamily: {
      sans: ["Helvetica", "Arial", "sans-serif"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        hackrpi: {
          primary: "#74b7ef",
          secondary: "#88b63a",
          accent: "#edd559",
          neutral: "#efefef",
          "base-100": "#27303b",
        },
      },
    ],
  },
};
