import { Globe } from "lucide-react";
import React from "react";
import GoogleTranslate from "./GoogleTranslate";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-4">
          Useful <span className="text-yellow-500">Links</span>
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
          </ul>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Company
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                AML Policy
              </a>
            </li>
          </ul>
        </div>

        <div className="text-gray-500 text-xs">
          <p>123 Coinrise Avenue, Silicon Valley, CA, USA</p>
          <p>&copy; 2008 - 2025 COINRISE. All rights reserved.</p>
        </div>
        <div className="flex ml-auto mr-4">
          <Globe />
          <GoogleTranslate />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
