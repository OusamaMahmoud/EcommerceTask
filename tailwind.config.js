/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable class-based dark mode

  theme: {
    extend: {
      colors: {
        primary: "#FFC107", // Coral Red
        secondary: "#4CAF50", // Green
        background: "#F5F5F5", // Light Gray
        textPrimary: "#333333", // Dark Gray
        textSecondary: "#757575", // Medium Gray
        error: "#F44336", // Red
        success: "#8BC34A", // Light Green
        link: "#1E88E5", // Blue
      },
    },
  },
  plugins: [daisyui],
};
