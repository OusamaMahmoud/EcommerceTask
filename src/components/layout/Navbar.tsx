import { useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router"; 
import { FaBars, FaSignOutAlt, FaTimes } from "react-icons/fa";
import ThemeToggle from "../common/ThemeToggle";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "react-toastify";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { logout, isLoggedIn, user } = useAuthStore();
  const navigate = useNavigate();

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  const linkClasses = "hover:text-textPrimary transition duration-300";

  const getActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `text-textPrimary ${linkClasses}` : linkClasses;

  const handleLogout = () => {
    logout();
    toast.success("Logout successful. See you soon!");
    navigate("/login");
  };

  const handleOpenModal = () => {
    const modal = document.getElementById("logout_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <nav className="bg-primary text-white shadow-md font-semibold py-2">
      <div className="max-w-6xl mx-auto flex justify-between items-center relative px-4">
        {/* Logo */}
        <div className="text-2xl font-semibold font-serif">
          <NavLink
            to="/"
            className={`${getActiveClass} flex items-center gap-2`}
          >
            <img
              src="../../../public/assets/logo-dark.png"
              alt="logo"
              className="w-14 h-14 object-contain"
            />
            NextCart
          </NavLink>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-6 text-lg font-mono">
          <li>
            <NavLink to="/" className={getActiveClass}>
              Home
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

        {/* Theme Toggle & Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          <p className="text-lg capitalize font-mono max-w-[120px] overflow-x-clip text-ellipsis whitespace-nowrap">
            Hello, {user?.username}
          </p>
          <ThemeToggle />

          {!isLoggedIn ? (
            <NavLink
              to="/register"
              className={`${getActiveClass} py-2 px-4 rounded bg-primary text-white hover:bg-primary-dark transition`}
            >
              Register
            </NavLink>
          ) : (
            <div className="relative">
              <button
                onClick={handleOpenModal}
                className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition flex items-center gap-2"
              >
                <span>Logout</span>
                <FaSignOutAlt />
              </button>
            </div>
          )}
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
            <div className="mt-4 flex flex-col gap-4">
              {!isLoggedIn ? (
                <NavLink
                  to="/register"
                  onClick={toggleMenu}
                  className={getActiveClass}
                >
                  Register
                </NavLink>
              ) : (
                <button onClick={handleOpenModal} className="my-1">
                  Logout
                </button>
              )}
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>

      {/* Logout Modal */}
      <dialog id="logout_modal" className="modal">
        <div className="modal-box">
          <p className="py-2 text-black dark:text-white text-lg font-semibold">
            Are you sure you want to logout? <br /> You will be redirected to
            the login page.
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button
                onClick={handleLogout}
                className="text-black dark:text-white btn bg-primary"
              >
                LogOut
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </nav>
  );
};

export default Navbar;
