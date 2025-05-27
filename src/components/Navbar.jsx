import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout as logoutAction } from "../features/users/authSlice";

import { Menu, X, User, LogOut } from "lucide-react";
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 30);
      setHidden(currentScrollY > lastScrollY.current && currentScrollY > 100);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 px-4 py-2 transition-all duration-300 flex items-center justify-between font-[Montserrat] text-white shadow-md
        ${scrolled ? "bg-black/10 backdrop-blur-md" : "bg-transparent"} 
        ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <Link to="/">
          <img className="h-10 object-contain" src={logo} alt="trustvest" />
        </Link>

        <ul className="hidden md:flex items-center space-x-6">
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
        </ul>

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
                className="text-red-400 hover:text-white"
              >
                <LogOut size={24} />
              </button>
              <Link to="/dashboard" className="hover:text-[#b3b3b3]">
                <User size={24} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden z-50" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </nav>

      {/* Sidebar Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 max-w-[80vw] font-[Montserrat] bg-black text-[#b3b3b3] z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 overflow-y-auto`}
      >
        <div className="relative p-4 flex justify-between items-center border-b border-gray-600">
          <span className="text-xl font-semibold">Menu</span>
          <button onClick={closeMenu}>
            <X size={24} />
          </button>
        </div>

        {user && (
          <div className="p-4 flex justify-center">
            <button
              onClick={() => {
                navigate("/dashboard");
                closeMenu();
              }}
              className="text-[#b3b3b3] p-2 rounded-full flex-col items-center"
            >
              <User size={28} />
              <p>Dashboard</p>
            </button>
          </div>
        )}

        <ul className="p-4 space-y-6">
          <li className="flex items-center space-x-2 py-2">
            <FontAwesomeIcon icon={faHouse} />
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="flex items-center space-x-2 py-2">
            <FontAwesomeIcon icon={faInfoCircle} />
            <Link to="/about" onClick={closeMenu}>
              About
            </Link>
          </li>
          <li className="flex items-center space-x-2 py-2">
            <FontAwesomeIcon icon={faServer} />
            <Link to="/affiliate" onClick={closeMenu}>
              Affiliate
            </Link>
          </li>
          <li className="flex items-center space-x-2 py-2">
            <FontAwesomeIcon icon={faEnvelope} />
            <Link to="/contact" onClick={closeMenu}>
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
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        />
      )}
    </>
  );
}
