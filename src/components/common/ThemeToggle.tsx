import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  // Check the user's system preference (dark or light mode)
  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    // Check if a theme is saved in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
      document.documentElement.classList.add(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      setIsDark(systemTheme === "dark");
      document.documentElement.classList.add(systemTheme);
      document.documentElement.setAttribute("data-theme", systemTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark ? "dark" : "light";
    setIsDark(!isDark);
    // Save the user's theme preference in localStorage
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button onClick={toggleTheme} className="p-2">
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggle;
