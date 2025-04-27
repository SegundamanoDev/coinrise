import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // social icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Logo */}
        <div className="flex items-center space-x-3 mb-6 md:mb-0">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-bold">YourBrand</span>
        </div>

        {/* Center Section - Links */}
        <div className="flex space-x-6 text-sm mb-6 md:mb-0">
          <a href="#" className="hover:text-white transition">
            Home
          </a>
          <a href="#" className="hover:text-white transition">
            About
          </a>
          <a href="#" className="hover:text-white transition">
            Services
          </a>
          <a href="#" className="hover:text-white transition">
            Contact
          </a>
        </div>

        {/* Right Section - Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-500 transition">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-blue-700 transition">
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-8 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
