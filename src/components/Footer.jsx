import { Globe } from "lucide-react";
import React from "react";
import GoogleTranslate from "./GoogleTranslate";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 - Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-yellow-500">COINRISE</h2>
          <p className="text-sm text-gray-400">
            123 Coinrise Avenue, Silicon Valley, CA, USA
          </p>
          <p className="text-sm text-gray-400 mt-2">
            &copy; 2008 - 2025 COINRISE. All rights reserved.
          </p>
        </div>

        {/* Column 2 - Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-500">
            Useful Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="/aml-policy" className="hover:underline">
                AML Policy
              </a>
            </li>
            <li>
              <a href="/terms-conditions" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:underline">
                Privacy & Policy
              </a>
            </li>
            <li>
              <a href="/payment-policy" className="hover:underline">
                Payment Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Language */}
        <div className="flex flex-col items-start gap-4">
          <h3 className="text-xl font-semibold text-yellow-500">Language</h3>
          <div className="flex items-center gap-2">
            <Globe className="text-yellow-500" />
            <GoogleTranslate />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
