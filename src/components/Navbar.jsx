import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="flex items-center justify-between bg-[#111827] text-white px-4 py-2 relative">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img className="w-[50px] h-auto bg-cover" src={logo} alt="logo" />
        </div>

        {/* Nav Links - centered (using absolute positioning) */}
        <ul className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 font-sans">
          <li className="hover:text-yellow-400">Home</li>
          <li className="hover:text-yellow-400">About</li>
          <li className="hover:text-yellow-400">Pricing</li>
          <li className="hover:text-yellow-400">Contact</li>
        </ul>

        {/* Right - Google Translate on Desktop */}

        {/* Hamburger Menu for Mobile */}
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
        <div className="flex justify-between items-center p-4 border-b border-[#374151]">
          <span className="text-xl font-semibold">Menu</span>
          <button onClick={() => setIsOpen(false)} aria-label="Close Menu">
            <X size={24} />
          </button>
        </div>

        <ul className="p-4 space-y-4 font-sans">
          <li className="hover:text-yellow-400">Home</li>
          <li className="hover:text-yellow-400">About</li>
          <li className="hover:text-yellow-400">Pricing</li>
          <li className="hover:text-yellow-400">Contact</li>
        </ul>

        {/* Translate shown under nav links */}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
