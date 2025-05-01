// About.jsx
import React from "react";

const About = () => {
  return (
    <section className="bg-gray-900 text-gray-300 py-20 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          About Coinrise
        </h2>
        <p className="text-lg text-gray-400 leading-relaxed">
          Coinrise is a secure, transparent, and user-focused cryptocurrency
          investment and mining platform. Built with trust and simplicity in
          mind, our mission is to make crypto investing accessible to everyone —
          whether you're a beginner or an experienced investor.
        </p>
        <p className="mt-6 text-gray-400">
          With real mining infrastructure, instant withdrawals, and world-class
          support, Coinrise stands out as your go-to choice for reliable crypto
          growth.
        </p>
      </div>
    </section>
  );
};

export default About;
