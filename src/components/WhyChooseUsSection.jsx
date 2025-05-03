import React from "react";
import {
  ShieldCheck,
  Server,
  Wallet,
  Headphones,
  BarChart3,
  DollarSign,
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="text-yellow-400 w-8 h-8" />,
    title: "Secure Platform",
    description: "Enterprise-grade security protects your funds and data 24/7.",
  },
  {
    icon: <Server className="text-yellow-400 w-8 h-8" />,
    title: "Real Bitcoin Mining",
    description: "Backed by real, high-performance mining infrastructure.",
  },
  {
    icon: <Wallet className="text-yellow-400 w-8 h-8" />,
    title: "Instant Withdrawals",
    description: "Withdraw profits anytime — processed within minutes.",
  },
  {
    icon: <Headphones className="text-yellow-400 w-8 h-8" />,
    title: "24/7 Support",
    description: "Always-on support to help you with your investment journey.",
  },
  {
    icon: <BarChart3 className="text-yellow-400 w-8 h-8" />,
    title: "Transparent Profits",
    description: "Track your daily returns with our live dashboard.",
  },
  {
    icon: <DollarSign className="text-yellow-400 w-8 h-8" />,
    title: "Low Minimum Investment",
    description: "Get started with as little as $250 and grow from there.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="bg-[#111827] py-20 px-6 text-gray-200">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Why Choose Us
        </h2>
        <p
          className="text-gray-400 mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Powerful benefits that set us apart
        </p>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#1f2937] rounded-xl shadow-sm p-6 hover:shadow-lg transition duration-300 text-center"
              data-aos="flip-up"
              data-aos-delay={index * 150}
              data-aos-duration="800"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
