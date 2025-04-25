/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Roboto", "sans-serif"],
      },

      colors: {
        // Dashboard Colors
        dashboardBg: "#0D1117",
        dashboardCard: "#161B22",
        dashboardText: "#F1F1F1",
        accent: "#F4B400",

        // Homepage Colors
        homeBg: "#111827", // Very dark background
        homeCard: "#1f2937", // Slightly lighter dark for cards
        homeCardBorder: "#374151", // Border color
        homeText: "#f5f5f5", // Clean white text
        homeHighlight: "#facc15", // Gold accent
        homeButtonHover: "#eab308", // Darker hover yellow
        homeButtonText: "#111827", // Button text
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
