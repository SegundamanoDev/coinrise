import React from "react";
import logo from "../assets/trustvest.png";

const letters = "TrustVestFx".split("");
const colors = [
  "text-yellow-400",
  "text-green-400",
  "text-blue-400",
  "text-purple-400",
  "text-pink-400",
  "text-indigo-400",
  "text-red-400",
  "text-teal-400",
  "text-orange-400",
  "text-cyan-400",
  "text-amber-400",
];

const Loader = () => {
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center rounded-[15px]">
      <img
        src={logo}
        alt="TrustVest Logo"
        className="h-20 md:h-24 object-contain mb-4 animate-pulseSlow rounded-[15px]"
      />
      <div className="flex space-x-1 text-2xl md:text-3xl font-semibold tracking-wider">
        {letters.map((letter, index) => (
          <span
            key={index}
            className={`${colors[index % colors.length]} animate-fadeLetter`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Loader;
