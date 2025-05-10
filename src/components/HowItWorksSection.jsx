import React from "react";
import {
  UserPlus,
  Wallet,
  Settings,
  TrendingUp,
  ArrowDownCircle,
} from "lucide-react";

const steps = [
  {
    icon: <UserPlus className="text-[#ffffff] w-8 h-8" />,
    title: "Create an Account",
    description:
      "Sign up in minutes to get started with your secure crypto journey.",
  },
  {
    icon: <Wallet className="text-[#ffffff] w-8 h-8" />,
    title: "Fund Your Wallet",
    description:
      "Deposit your preferred amount using Bitcoin or other crypto methods.",
  },

  {
    icon: <TrendingUp className="text-[#ffffff] w-8 h-8" />,
    title: "Earn Daily Profits",
    description:
      "Watch your returns grow automatically with consistent payouts.",
  },
  {
    icon: <ArrowDownCircle className="text-[#ffffff] w-8 h-8" />,
    title: "Withdraw Anytime",
    description: "Withdraw your earnings securely at any time — no delays.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className=" py-20 px-6" id="how-it-works">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-3xl text-[#ffffff] md:text-4xl font-bold mb-4"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          How It Works
        </h2>
        <p className=" mb-12" data-aos="fade-up" data-aos-delay="100">
          Start investing in 5 easy steps
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className=" border border-divider rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300"
              data-aos="zoom-in"
              data-aos-delay={index * 150}
              data-aos-duration="800"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold text-[#ffffff] ">
                {step.title}
              </h3>
              <p className="text-sm mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
