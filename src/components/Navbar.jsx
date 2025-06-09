import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../features/users/authSlice"; // Adjust path if necessary

import { Menu, X, User, LogOut } from "lucide-react";
import {
  Home as HomeIcon,
  Info as InfoIcon,
  HardDrive as AffiliateIcon,
  Mail as MailIcon,
  LogIn as SignInIcon,
  LogOut as SignOutIcon,
} from "lucide-react";

import logo from "../assets/trustvest.png"; // Assuming this path is correct

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastScrollY = useRef(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.users);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    closeMobileMenu();
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
        className={`fixed top-0 w-full z-50 px-4 py-3 sm:px-6 transition-all duration-300 flex items-center justify-between font-montserrat text-white
          ${
            scrolled
              ? "bg-gray-900/80 backdrop-blur-md shadow-lg"
              : "bg-transparent"
          }
          ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <Link to="/" className="flex-shrink-0">
          <img
            className="h-9 sm:h-11 object-contain"
            src={logo}
            alt="TrustVest Logo"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center space-x-6 lg:space-x-8 text-lg font-medium">
          <li>
            <Link
              className="hover:text-blue-300 transition-colors duration-200"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-blue-300 transition-colors duration-200"
              to="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-blue-300 transition-colors duration-200"
              to="/affiliate"
            >
              Affiliate
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-blue-300 transition-colors duration-200"
              to="/contact"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {!user ? (
            <Link
              to="/sign-in"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Sign In
            </Link>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="p-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                title="Logout"
              >
                <LogOut size={28} />
              </button>
              {/* Desktop User Avatar Link */}
              <Link
                to="/dashboard"
                className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
                title={user?.fullName || "Dashboard"}
              >
                {/* Avatar Container: Ensures perfect rounding */}
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-400">
                  {profile?.avatar?.secure_url ? (
                    <img
                      src={profile.avatar.secure_url}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/96x96/555/FFF?text=${
                          user?.fullName ? user.fullName[0].toUpperCase() : "U"
                        }`;
                        e.target.style.objectFit = "contain";
                        e.target.style.backgroundColor = "#2563eb"; // blue-600
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
                      {user?.fullName ? user.fullName[0].toUpperCase() : "U"}
                    </div>
                  )}
                </div>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button
          className="md:hidden z-50 text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open mobile menu"
        >
          <Menu size={30} />
        </button>
      </nav>

      {/* Sidebar Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 sm:w-80 bg-gray-900 text-gray-100 z-50 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="relative p-5 flex justify-between items-center border-b border-gray-700 bg-gray-800 shadow-md">
          <span className="text-2xl font-bold text-blue-400">Navigation</span>
          <button
            onClick={closeMobileMenu}
            className="text-gray-400 hover:text-white p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Close mobile menu"
          >
            <X size={28} />
          </button>
        </div>

        {user && (
          <div className="p-6 border-b border-gray-700 bg-gray-800 flex items-center gap-4">
            {/* Avatar Container: Ensures perfect rounding */}
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-400 shadow-md">
              {profile?.avatar?.secure_url ? (
                <img
                  src={profile.avatar.secure_url}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/96x96/555/FFF?text=${
                      user?.fullName ? user.fullName[0].toUpperCase() : "U"
                    }`;
                    e.target.style.objectFit = "contain";
                    e.target.style.backgroundColor = "#2563eb"; // blue-600
                  }}
                />
              ) : (
                <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  {user?.fullName ? user.fullName[0].toUpperCase() : "U"}
                </div>
              )}
            </div>
            <div>
              <p className="text-xl font-semibold text-white">
                {user?.fullName || "Guest User"}
              </p>
              <Link
                to="/dashboard"
                onClick={closeMobileMenu}
                className="text-blue-300 hover:text-white text-sm transition-colors duration-200 flex items-center mt-1"
              >
                <User size={16} className="mr-1" /> View Dashboard
              </Link>
            </div>
          </div>
        )}

        <ul className="flex-grow p-6 space-y-4 text-lg font-medium overflow-y-auto custom-scroll">
          <li>
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <HomeIcon size={24} className="text-green-400" /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <InfoIcon size={24} className="text-purple-400" /> About
            </Link>
          </li>
          <li>
            <Link
              to="/affiliate"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <AffiliateIcon size={24} className="text-yellow-400" /> Affiliate
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              <MailIcon size={24} className="text-red-400" /> Contact
            </Link>
          </li>

          {/* Removed Google Translate Widget for Mobile Menu */}

          {!user ? (
            <li>
              <Link
                to="/sign-in"
                onClick={closeMobileMenu}
                className="mt-6 flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-md"
              >
                <SignInIcon size={24} className="mr-2" /> Sign In
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="mt-6 flex items-center justify-center w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300 shadow-md"
              >
                <SignOutIcon size={24} className="mr-2" /> Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
