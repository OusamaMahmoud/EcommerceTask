import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  // Check if dark mode preference is already saved in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark"); // Set data-theme attribute to 'dark'
    } else {
      document.documentElement.setAttribute("data-theme", "light"); // Set data-theme attribute to 'light'
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // Save theme preference in localStorage
    if (!isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark"); // Set data-theme attribute to 'dark'
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light"); // Set data-theme attribute to 'light'
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button className=" " onClick={toggleTheme}>
      {isDark ? <FaSun /> : <FaMoon />} {/* Use icons instead of text */}
    </button>
  );
};

export default ThemeToggle;
