/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Roboto", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 2.5s linear infinite",
        fadeIn: "fadeIn 2s ease-in-out",
        fadeLetter: "fadeLetter 1s ease-in-out forwards",
        pulseSlow: "pulse 1s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeLetter: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "50%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0.8" },
        },
      },
      colors: {
        background: "#000000",
        textPrimary: "#ffffff",
        textSecondary: "#b3b3b3",
        divider: "#2a2a2a",
        highlightStart: "#00befe",
        highlightEnd: "#a700ff",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
    },
  },
  plugins: [],
};
