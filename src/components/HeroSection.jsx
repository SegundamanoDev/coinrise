import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    image: "/images/file_00000000f2d0620a91ca2fb1d36a2755.png",
    title: "TRADE SMARTER, NOT HARDER",
    description:
      "Experience the power of AI-backed Forex trading with expert insights and real-time analytics.",
  },
  {
    image: "/images/file_0000000019dc62468b0cf45585d91e12.png",
    title: "MODERN BITCOIN MINING",
    description:
      "Tap into industrial-grade crypto mining powered by renewable energy and cutting-edge tech.",
  },
  {
    image: "/images/file_00000000f2d0620a91ca2fb1d36a2755.png",
    title: "TRACK YOUR PROFITS ON THE GO",
    description:
      "Monitor your earnings, investments, and real-time BTC/USD values directly from your mobile.",
  },
  {
    image: "/images/newfileii.png",
    title: "GLOBAL ACCESS, LOCAL EXPERTISE",
    description:
      "Join a worldwide network of traders with access to global markets and currencies.",
  },
  {
    image: "/images/newfile.png",
    title: "GROW YOUR WEALTH CONFIDENTLY",
    description:
      "Our professionals ensure your money is put to work in safe, strategic investments.",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    cssEase: "ease-in-out",
    pauseOnHover: false,
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      <Slider {...settings} className="h-full parallax-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative h-screen w-full will-change-transform transform-gpu"
          >
            <div
              className="absolute inset-0 h-full w-full bg-center bg-cover transition-transform duration-1000"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#00befe] via-transparent to-[#a700ff] opacity-60 mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10"></div>
            <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-xl">
                {slide.title}
              </h1>
              <p className="text-[#e0e0e0] mt-4 max-w-2xl drop-shadow-md">
                {slide.description}
              </p>
              <button
                onClick={() => navigate("/sign-in")}
                className="mt-8 bg-gradient-to-r from-[#00befe] to-[#a700ff] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all"
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
