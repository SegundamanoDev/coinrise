import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react"; // Added User icon
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import TranslateComponent from "./GoogleTranslate";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Top Navbar */}
      <nav className="flex items-center justify-between bg-[#111827] text-white px-4 py-2 relative sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img className="w-[50px] h-auto bg-cover" src={logo} alt="logo" />
        </div>

        {/* Nav Links - centered */}
        <ul className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 font-sans">
          <li
            className="hover:text-yellow-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className="hover:text-yellow-400 cursor-pointer"
            onClick={() => navigate("/about")}
          >
            About
          </li>
          <li
            className="hover:text-yellow-400 cursor-pointer"
            onClick={() => navigate("/mining-pool")}
          >
            Mining-Pool
          </li>
          <li
            className="hover:text-yellow-400 cursor-pointer"
            onClick={() => navigate("/contact")}
          >
            Contact
          </li>
          <li className="hover:text-yellow-400 cursor-pointer">
            <TranslateComponent />
          </li>
          {/* Avatar Icon for Desktop */}
          <li
            className="hover:text-yellow-400 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <User size={24} />
          </li>
        </ul>

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
        className={`fixed top-0 left-0 h-full w-64 bg-[#1f2937] text-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Avatar Icon in Mobile Sidebar (at the top) */}
        <div className="flex justify-center p-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-yellow-400 p-2 rounded-full"
          >
            <User size={28} />
          </button>
        </div>

        <div className="flex justify-between items-center p-4 border-b border-[#374151]">
          <span className="text-xl font-semibold">Menu</span>
          <button onClick={() => setIsOpen(false)} aria-label="Close Menu">
            <X size={24} />
          </button>
        </div>

        <ul className="p-4 space-y-4 font-sans">
          <li className="hover:text-yellow-400" onClick={() => navigate("/")}>
            Home
          </li>
          <li
            className="hover:text-yellow-400"
            onClick={() => navigate("/about")}
          >
            About
          </li>
          <li
            className="hover:text-yellow-400"
            onClick={() => navigate("/mining-pool")}
          >
            Mining-pool
          </li>
          <li
            className="hover:text-yellow-400"
            onClick={() => navigate("/contact")}
          >
            Contact
          </li>
        </ul>

        {/* Translate Dropdown on bottom (mobile) */}
        <div className="p-4 border-t border-[#374151]">
          <TranslateComponent />
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Clone the translate element into the mobile sidebar once loaded */}
      {useEffect(() => {
        const interval = setInterval(() => {
          const desktopElement = document.getElementById(
            "google_translate_element"
          );
          const mobileContainer = document.getElementById(
            "google_translate_element_mobile"
          );

          if (
            desktopElement?.children.length &&
            mobileContainer?.children.length === 0
          ) {
            mobileContainer.appendChild(
              desktopElement.firstChild.cloneNode(true)
            );
            clearInterval(interval);
          }
        }, 500);

        return () => clearInterval(interval);
      }, [])}
    </>
  );
}
