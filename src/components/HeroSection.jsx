import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Reimagined slides with stronger, more benefit-oriented titles and descriptions
const slides = [
  {
    image: "/images/file_00000000f2d0620a91ca2fb1d36a2755.png", // Original path
    title: "Unlock Your Financial Future with AI",
    description:
      "Leverage cutting-edge artificial intelligence for smarter investments and optimized returns across diverse markets.",
  },
  {
    image: "/images/file_0000000019dc62468b0cf45585d91e12.png", // Original path
    title: "Seamless Crypto Mining, Sustainable Growth",
    description:
      "Join our eco-friendly, industrial-scale Bitcoin mining operations powered by renewable energy. Earn passively, responsibly.",
  },
  {
    image: "/images/file_00000000f2d0620a91ca2fb1d36a2755.png", // Original path (repeated from first, consider unique image)
    title: "Track Your Wealth, Anytime, Anywhere",
    description:
      "Our intuitive dashboard provides real-time insights into your portfolio and crypto valuations, right from your device.",
  },
  {
    image: "/images/newfileii.png", // Original path
    title: "Global Markets at Your Fingertips",
    description:
      "Access a world of opportunities. Trade Forex, commodities, and crypto with expert guidance and secure execution.",
  },
  {
    image: "/images/newfile.png", // Original path
    title: "Build Your Legacy with Confidence",
    description:
      "Our seasoned financial experts are dedicated to crafting secure and strategic investment paths tailored for your prosperity.",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1200, // Slightly slower transition for smoothness
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000, // Longer display time per slide
    fade: true,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    arrows: false, // Often removed for clean hero sections, dots suffice
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden font-montserrat">
      <Slider {...settings} className="h-full">
        {slides.map((slide, index) => (
          <div key={index} className="relative h-screen w-full transform-gpu">
            {/* Background Image with Enhanced Parallax (simulated via scale and positioning) */}
            <div
              className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-1000 ease-out"
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: "scale(1.05)", // Slight scale for subtle zoom effect
                backgroundPosition: "center", // Ensures image is centered
              }}
            ></div>
            {/* Dynamic Overlay for visual appeal */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-transparent to-purple-900/70 mix-blend-multiply transition-opacity duration-500 opacity-80"></div>
            <div className="absolute inset-0 bg-black/40"></div>{" "}
            {/* Darker overlay for text readability */}
            {/* Bottom Fade Gradient - subtle transition to content below */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
            {/* Content Area */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center text-white md:px-8 lg:px-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-lg max-w-4xl animate-fade-in-up">
                {slide.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 mt-4 max-w-3xl drop-shadow-md animate-fade-in-up delay-200">
                {slide.description}
              </p>
              <button
                onClick={() => navigate("/sign-in")} // Always navigate to /sign-in
                className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold text-lg rounded-full shadow-2xl hover:scale-105 hover:shadow-glow transition-all duration-300 transform animate-fade-in-up delay-400
                           focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-75"
              >
                Get started for free
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;
