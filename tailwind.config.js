/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enables dark mode based on the 'class' in HTML.
  // This allows you to toggle dark mode manually by adding/removing 'dark' class.
  darkMode: "class",

  // Specifies files where Tailwind should look for classes to include in the output CSS.
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // Extend Tailwind's default theme with custom values.
  theme: {
    extend: {
      // Custom font families
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"], // Used consistently across components
      },

      // Custom keyframes for animations
      keyframes: {
        // Existing fadeInUp keyframe (for AOS-like effects)
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        // Keyframes for the 'blob' background animation (used in CertificateSection, FAQSection)
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        // Custom spin keyframe for the loader (if default 'spin' is not slow enough)
        // Tailwind's default 'spin' is 1s linear infinite.
        // We'll define a slower one and use it in animation below.
        slowSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        // Tailwind's default 'pulse' keyframe is usually sufficient,
        // but if you need a custom one, you'd define it here.
        // pulse: { /* ... */ }
      },

      // Custom animation utilities, mapping keyframes to durations/functions
      animation: {
        // Existing fade-in-up animations
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in-up-delay-200": "fadeInUp 0.8s ease-out 0.2s forwards",
        "fade-in-up-delay-400": "fadeInUp 0.8s ease-out 0.4s forwards",

        // Animation for the new LoadingSpinner
        spinSlow: "slowSpin 3s linear infinite", // Slower spin for the loader
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite", // Ensure pulse is here or remove from component if not used

        // Animation for background 'blob' effects
        blob: "blob 7s infinite cubic-bezier(0.6, 0.01, 0.3, 0.9)", // Slower, more fluid blob
        // Add variations if needed for different delays
        "blob-delay-2s":
          "blob 7s infinite cubic-bezier(0.6, 0.01, 0.3, 0.9) -2s",
        "blob-delay-4s":
          "blob 7s infinite cubic-bezier(0.6, 0.01, 0.3, 0.9) -4s",
      },

      // Custom box shadows
      boxShadow: {
        glow: "0 0 15px rgba(0, 191, 254, 0.7), 0 0 25px rgba(167, 0, 255, 0.5)",
        // Added for deeper shadows used in components
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },

      // Custom color palette
      colors: {
        darkBackground: "#0d1117",
        cardBackground: "#121212",
        sidebarBackground: "#000000",
        borderColor: "#374151",
        textPrimary: "#f5f5f5",
        textSecondary: "#a0a0a0",
        blueAccent: "#00befe", // Used in your original gradients
        purpleAccent: "#a700ff", // Used in your original gradients
        greenSuccess: "#10B981",
        redError: "#EF4444",

        // Add shades for better design flexibility (e.g., used in gradients like blue-500, purple-600)
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937", // Used in many components
          900: "#111827", // Used in CTA section
          950: "#070b13", // Deepest dark background
        },
        blue: {
          // Assuming these are your primary blue shades
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6", // Used in CertificateSection, Spinner
          600: "#2563eb", // Used in CTA button
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        purple: {
          // Assuming these are your primary purple shades
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea", // Used in CertificateSection, Spinner
          700: "#7e22ce", // Used in CTA button
          800: "#6b21a8",
          900: "#581c87",
        },
        pink: {
          // For the spinner gradient, or other accents
          400: "#f472b6",
          500: "#ec4899", // Used in Spinner
        },
        yellow: {
          // For transaction amounts
          400: "#facc15",
        },
        green: {
          // For deposit icons
          400: "#4ade80",
        },
        red: {
          // For withdrawal icons
          400: "#f87171",
        },
      },

      // Custom border radii
      borderRadius: {
        xl: "1rem", // 16px
        "2xl": "1.5rem", // 24px
      },

      // Custom font sizes (already well-defined)
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
