/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A2E52",
        accent: "#2DB4FF",
        surface: "#0E1B1F",
        muted: "#C7D2FE",
        success: "#22C55E",
        danger: "#EF4444",
      },
      maxWidth: {
        content: "900px",
      },
      borderRadius: {
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
};


