import { useNavigate } from "react-router-dom";
import React from "react";
import hero from "../assets/hero.png";
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Background image */}
      <img
        src={hero}
        alt="Hero"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      {/* Overlay color splash using gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00befe] via-transparent to-[#a700ff] opacity-60 mix-blend-screen"></div>

      {/* Fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#ffffff] leading-tight">
          PLACE YOUR MONEY ON THE BEST INVESTMENTS
        </h1>
        <p className="text-[#b3b3b3] mt-4 max-w-xl">
          When you leave your money in the bank, it diminishes gradually with
          the current exchange rate. Let's help your money grow by putting it to
          work. Gone are those days you need to be an expert with years of
          experience, have millions of Pounds or stay fully committed to begin
          making profits trading. Financial Trading and Investing are risky
          fields that require proven experience and expertise for players to
          mitigate the downsides. Our team of traders and investors ensure not
          only that your funds are at work, but are put in carefully planned
          investments and trades.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/sign-in")}
          className="mt-8 bg-gradient-to-r from-[#00befe] to-[#a700ff] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all"
        >
          Get started for free
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
