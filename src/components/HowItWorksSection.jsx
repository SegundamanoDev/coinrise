import React, { useEffect } from "react";
import {
  UserPlus,
  Wallet,
  Settings, // Keeping Settings for potential future use if a "Configure" step is added
  TrendingUp,
  ArrowDownCircle,
  Zap, // Adding Zap for a "Quick Start" feel
  Rocket, // Adding Rocket for "Launch" or "Grow"
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const steps = [
  {
    icon: <UserPlus />,
    title: "1. Create Your Secure Account",
    description:
      "Sign up in minutes and verify your identity to ensure a safe and compliant investing environment.",
  },
  {
    icon: <Wallet />,
    title: "2. Fund Your Investment Wallet",
    description:
      "Easily deposit funds using a variety of secure crypto methods to get started.",
  },
  {
    icon: <Zap />, // Changed icon for a more dynamic feel
    title: "3. Choose Your Strategy & Invest",
    description:
      "Select from our expert-curated investment strategies or customize your own path to growth.",
  },
  {
    icon: <TrendingUp />,
    title: "4. Watch Your Wealth Grow Daily",
    description:
      "Monitor real-time profits and see your investments flourish with transparent, consistent returns.",
  },
  {
    icon: <ArrowDownCircle />,
    title: "5. Withdraw Your Earnings Anytime",
    description:
      "Access your profits securely and without delay, whenever you need them.",
  },
];

const HowItWorksSection = () => {
  useEffect(() => {
    AOS.init({ once: true, offset: 50, duration: 800 }); // Adjusted AOS init for better feel
  }, []);

  return (
    <section
      className="bg-gray-950 py-20 px-4 font-montserrat relative overflow-hidden"
      id="how-it-works"
    >
      {/* Background Gradients/Shapes for visual interest */}
      <div
        className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        style={{ animationDelay: "-2s" }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        style={{ animationDelay: "-4s" }}
      ></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 relative z-10
                     before:content-[''] before:absolute before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-32 before:h-1.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Your Journey to Financial Growth
        </h2>
        <p
          className="mb-16 text-gray-300 text-lg md:text-xl max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          Getting started with TrustVest is simple. Follow these straightforward
          steps to begin transforming your financial future.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center
                         transform hover:scale-105 hover:shadow-2xl transition-all duration-300
                         group border border-gray-800 hover:border-blue-500"
              data-aos="fade-up" // Changed to fade-up for a smoother reveal
              data-aos-delay={index * 150} // Staggered animation
              data-aos-duration="800"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="mb-6 bg-gray-800 p-4 rounded-full inline-flex justify-center items-center shadow-inner">
                {React.cloneElement(step.icon, {
                  className:
                    "text-blue-400 w-10 h-10 group-hover:text-blue-300 transition-colors duration-300",
                })}
              </div>

              <h3 className="text-2xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-base text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}

          {/* Optional: Add a call to action card if less than 5 steps or to fill out grid */}
          {steps.length < 5 && (
            <div
              className="relative bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center text-center
                         transform hover:scale-105 hover:shadow-2xl transition-all duration-300
                         group border border-gray-800 hover:border-purple-500 min-h-[220px]" // Added min-h to match other cards
              data-aos="fade-up"
              data-aos-delay={steps.length * 150}
              data-aos-duration="800"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">
                Ready to Begin?
              </h3>
              <p className="text-base text-gray-400 leading-relaxed mb-6">
                Join thousands already growing their wealth with TrustVest.
              </p>
              <button
                onClick={() => (window.location.href = "/sign-in")} // Direct navigation
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-glow transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-75"
              >
                Sign Up Now
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
