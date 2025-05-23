import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../components/context/ThemeContext";
import { logout as logoutAction } from "../features/users/authSlice";

import { Menu, X, User, Globe, LogOut } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faInfoCircle,
  faServer,
  faEnvelope,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../assets/trustvest.png";
import GoogleTranslate from "./GoogleTranslate";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutAction());
    closeMenu();
    navigate("/sign-in");
  };

  return (
    <>
      {/* Sticky Top Navbar */}
      <nav className="flex items-center justify-between font-[Montserrat] bg-[#000000] text-[#ffffff] px-4 py-2 sticky top-0 z-50 shadow-md overflow-x-hidden">
        <Link to="/">
          <img className="h-10 object-contain" src={logo} alt="trustvest" />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center space-x-6 font-[Montserrat]">
          <li>
            <Link className="hover:text-[#b3b3b3]" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-[#b3b3b3]" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="hover:text-[#b3b3b3]" to="/affiliate">
              Affiliate
            </Link>
          </li>
          <li>
            <Link className="hover:text-[#b3b3b3]" to="/contact">
              Contact
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <Globe />
            <GoogleTranslate />
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <Link
              to="/sign-in"
              className="bg-gradient-to-r from-[#00befe] to-[#a700ff] text-white px-3 py-1 rounded"
            >
              Sign In
            </Link>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-white transition"
                title="Logout"
              >
                <LogOut size={24} />
              </button>
              <Link className="hover:text-[#b3b3b3]" to="/dashboard">
                <User size={24} />
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(true)}
          aria-label="Open Menu"
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full max-w-[80vw] w-64 font-[Montserrat] bg-[#000000] text-[#b3b3b3] z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="relative p-4 flex justify-between items-center border-b border-divider">
          <span className="text-xl font-semibold">Menu</span>
          <button onClick={closeMenu} aria-label="Close Menu">
            <X size={24} />
          </button>
        </div>

        {user && (
          <div className="p-4 flex justify-center items-center">
            <button
              onClick={() => {
                navigate("/dashboard");
                closeMenu();
              }}
              className="text-[#b3b3b3] p-2 rounded-full flex-col items-center justify-center"
            >
              <User size={28} />
              <p>Dashboard</p>
            </button>
          </div>
        )}

        <ul className="p-4 space-y-6 font-[Montserrat]">
          <li className="flex items-center space-x-2 py-2">
            <FontAwesomeIcon icon={faHouse} />
            <Link to="/" onClick={closeMenu} className="hover:text-[#ffffff]">
              Home
            </Link>
          </li>
          <li className="flex items-center space-x-2 py-2">
            <FontAwesomeIcon icon={faInfoCircle} />
            <Link
              to="/about"
              onClick={closeMenu}
              className="hover:text-[#b3b3b3]"
            >
              About
            </Link>
          </li>
          <li className="flex items-center space-x-2 py-2">
            <FontAwesomeIcon icon={faServer} />
            <Link
              to="/affiliate"
              onClick={closeMenu}
              className="hover:text-[#b3b3b3]"
            >
              Affiliate
            </Link>
          </li>
          <li className="flex items-center space-x-2 py-2">
            <FontAwesomeIcon icon={faEnvelope} />
            <Link
              to="/contact"
              onClick={closeMenu}
              className="hover:text-[#b3b3b3]"
            >
              Contact
            </Link>
          </li>

          {!user ? (
            <li className="flex items-center space-x-2 py-2">
              <FontAwesomeIcon icon={faSignInAlt} />
              <Link
                to="/sign-in"
                onClick={closeMenu}
                className="bg-gradient-to-r from-[#00befe] to-[#a700ff] text-white px-3 py-1 rounded"
              >
                Sign In
              </Link>
            </li>
          ) : (
            <li className="flex items-center space-x-2 py-2 text-red-400">
              <FontAwesomeIcon icon={faSignOutAlt} />
              <button onClick={handleLogout} className="hover:text-white">
                Logout
              </button>
            </li>
          )}
        </ul>

        <div className="flex items-center space-x-2 ml-4 py-2">
          <Globe />
          <GoogleTranslate />
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        />
      )}
    </>
  );
}
