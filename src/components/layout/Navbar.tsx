import { useState } from "react";
import { NavLink } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeToggle from "../common/ThemeToggle";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const linkClasses = "hover:text-textPrimary transition duration-300";

  const getActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `text-textPrimary ${linkClasses}` : linkClasses;

  return (
    <nav className="bg-primary text-white py-4 shadow-md font-semibold">
      {" "}
      <div className="max-w-6xl mx-auto flex justify-between items-center relative px-4">
        {" "}
        {/* Logo */}{" "}
        <div className="text-2xl font-semibold font-serif">
          {" "}
          <NavLink to="/" className={getActiveClass}>
            {" "}
            Makna{" "}
          </NavLink>{" "}
        </div>
        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-6 text-lg font-mono">
          <li>
            <NavLink to="/" className={getActiveClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className={getActiveClass}>
              Register
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={getActiveClass}>
              My Cart
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={getActiveClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={getActiveClass}>
              Contact
            </NavLink>
          </li>
        </ul>
        {/* Theme Toggle */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        {/* Burger Icon */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-primary p-4 md:hidden z-50">
            <ul className="flex flex-col space-y-4 text-lg font-mono">
              <li>
                <NavLink to="/" onClick={toggleMenu} className={getActiveClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  onClick={toggleMenu}
                  className={getActiveClass}
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  onClick={toggleMenu}
                  className={getActiveClass}
                >
                  My Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onClick={toggleMenu}
                  className={getActiveClass}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  onClick={toggleMenu}
                  className={getActiveClass}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="mt-4">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
