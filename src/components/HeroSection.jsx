import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section
      className="relative bg-[#1f2937] text-white py-24 px-6 overflow-hidden"
      id="hero"
    >
      <div
        className="relative z-10 max-w-4xl mx-auto text-center"
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          PLACE YOUR MONEY ON THE BEST INVESTMENTS
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10">
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

        <div
          className="flex flex-col md:flex-row justify-center gap-4"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
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
