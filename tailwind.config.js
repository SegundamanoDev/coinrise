/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
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
        // Define your custom colors for consistency
        darkBackground: "#0d1117",
        cardBackground: "#121212",
        sidebarBackground: "#000000",
        borderColor: "#374151",
        textPrimary: "#f5f5f5",
        textSecondary: "#a0a0a0",
        blueAccent: "#00befe",
        purpleAccent: "#a700ff",
        greenSuccess: "#10B981",
        redError: "#EF4444",
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
