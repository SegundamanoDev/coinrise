import { useState } from "react";
import { useTheme } from "../components/context/ThemeContext";
import { Menu, X, User, Globe, Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/trustvest.png";
import GoogleTranslate from "./GoogleTranslate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faInfoCircle,
  faServer,
  faEnvelope,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Sticky Top Navbar */}
      <nav className="flex items-center justify-between font-[Montserrat] bg-[#111827] text-white px-4 py-2 sticky top-0 z-50 shadow-md overflow-x-hidden">
        {/* Logo */}
        <Link to="/">
          <img className="h-10 object-contain" src={logo} alt="trustvest" />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center space-x-6 font-[Montserrat]">
          <li>
            <Link className="hover:text-yellow-400" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-yellow-400" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="hover:text-yellow-400" to="/mining-pool">
              Mining-Pool
            </Link>
          </li>
          <li>
            <Link className="hover:text-yellow-400" to="/contact">
              Contact
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <Globe />
            <GoogleTranslate />
          </li>
        </ul>

        {/* Auth Links */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={toggleTheme} className="text-yellow-400">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/sign-in" className="text-yellow-400 hover:underline">
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
          >
            Sign Up
          </Link>
          <Link className="hover:text-yellow-400" to="/dashboard">
            <User size={24} />
          </Link>
        </div>

        {/* Hamburger Menu Button */}
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
        className={`fixed top-0 left-0 h-full max-w-[80vw] font-[Montserrat] w-64 bg-[#1f2937] text-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="relative p-4 flex justify-between items-center border-b border-[#374151]">
          <span className="text-xl font-semibold">Menu</span>
          <button onClick={closeMenu} aria-label="Close Menu">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 flex justify-between items-center">
          <button
            onClick={() => {
              navigate("/dashboard");
              closeMenu();
            }}
            className="bg-yellow-400 p-2 rounded-full"
          >
            <User size={28} />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-yellow-400"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <ul className="p-4 space-y-6 font-sans">
          <li className="flex items-center space-x-2 py-2">
            <FontAwesomeIcon icon={faHouse} />
            <Link to="/" onClick={closeMenu} className="hover:text-yellow-400">
              Home
            </Link>
          </li>
          <li className="flex items-center space-x-2 py-2">
            <FontAwesomeIcon icon={faInfoCircle} />
            <Link
              to="/about"
              onClick={closeMenu}
              className="hover:text-yellow-400"
            >
              About
            </Link>
          </li>
          <li className="flex items-center space-x-2 py-2">
            <FontAwesomeIcon icon={faServer} />
            <Link
              to="/mining-pool"
              onClick={closeMenu}
              className="hover:text-yellow-400"
            >
              Mining-Pool
            </Link>
          </li>
          <li className="flex items-center space-x-2 py-2">
            <FontAwesomeIcon icon={faEnvelope} />
            <Link
              to="/contact"
              onClick={closeMenu}
              className="hover:text-yellow-400"
            >
              Contact
            </Link>
          </li>
          <li className="flex items-center space-x-2 py-2">
            <FontAwesomeIcon icon={faSignInAlt} />
            <Link to="/sign-in" onClick={closeMenu}>
              Sign In
            </Link>
          </li>
          <li className="flex items-center space-x-2 py-2">
            <FontAwesomeIcon icon={faUserPlus} />
            <Link to="/sign-up" onClick={closeMenu}>
              Sign Up
            </Link>
          </li>
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
