/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "var(--color-white)",
        gray: "var(--color-gray)",
        red: "var(--color-red)",
        yellow: "var(--color-yellow)",
      },
    },
  },
  plugins: [],
};
