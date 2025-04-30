import React from "react";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative bg-[#1f2937]	text-white py-24 px-6 overflow-hidden">
      {/* Floating crypto icons background (optional) */}
      <div className="absolute inset-0 opacity-10 bg-[url('/images/crypto-bg-pattern.png')] bg-cover bg-center pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Grow Your Wealth with Secure Bitcoin Mining Profits
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10">
          Invest today. Watch your Bitcoin multiply safely.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/sign-up")}
            className="bg-yellow-400 text-black font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-yellow-300 transition"
          >
            Start Investing
          </button>
          <button className="bg-transparent border border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-black transition">
            <a href="#how-it-works">Learn How It Works</a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
