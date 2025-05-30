import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS CSS

const CallToAction = () => {
  useEffect(() => {
    AOS.init({ once: true, offset: 50, duration: 1000 }); // Initialize AOS for this final section
  }, []);

  return (
    <section
      className="relative py-24 px-4 text-center font-montserrat overflow-hidden
                 bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white" // A deep, subtle gradient background
    >
      {/* Subtle radial gradient overlay for depth */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, rgba(30, 60, 100, 0.2) 0%, transparent 70%)",
        }}
      ></div>
      <div
        className="absolute inset-0 z-0 opacity-15"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(100, 30, 100, 0.1) 0%, transparent 70%)",
        }}
      ></div>

      <div className="max-w-3xl mx-auto relative z-10">
        {" "}
        {/* Ensure content is above background effects */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6"
          data-aos="fade-up"
          data-aos-delay="0"
        >
          Ready to Start Earning?
        </h2>
        <p
          className="max-w-2xl mx-auto mb-12 text-gray-300 text-lg md:text-xl leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Join thousands of smart investors who are already experiencing
          consistent growth by mining and trading crypto with a trusted,
          regulated platform.
        </p>
        <Link
          data-aos="zoom-in"
          data-aos-delay="400"
          to="/sign-up"
          className="inline-flex items-center justify-center
                     px-10 py-4
                     text-xl font-bold rounded-full
                     bg-gradient-to-r from-blue-600 to-purple-700
                     hover:from-blue-700 hover:to-purple-800
                     transition-all duration-300 ease-in-out
                     text-white shadow-xl hover:shadow-2xl
                     transform hover:scale-105" // Added transform for subtle pop
        >
          Get Started Now <ArrowRight className="ml-3 w-6 h-6" />
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
