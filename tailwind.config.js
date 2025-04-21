/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        primary: "#FFC107",
        secondary: "#4CAF50",
        background: "#F5F5F5",
        textPrimary: "#333333",
        textSecondary: "#757575",
        error: "#F44336",
        success: "#8BC34A",
        link: "#1E88E5",
      },
    },
  },
  plugins: [daisyui],
};
