import { Globe } from "lucide-react";
import React from "react";
import GoogleTranslate from "./GoogleTranslate";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 md:py-10 py-7">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 ">TrustVestFx</h2>
          <span className="text-sm text-[#ffffff]">
            123 TrustVestFx Avenue, Silicon Valley, CA, USA
          </span>
          <span className="text-sm text-[#ffffff] mt-2">
            &cospany; 2025 TrustVestFx. All rights reserved.
          </span>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 ">Useful Links</h2>
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
          <h2 className="text-xl font-semibold ">Language</h2>
          <div className="flex items-center gap-2">
            <Globe />
            <GoogleTranslate />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
