import React from "react";
import { Coins, Gem, Rocket } from "lucide-react";

const plans = [
  {
    icon: <Coins className="w-8 h-8 text-yellow-400" />,
    title: "Starter Plan",
    price: "$50 Minimum",
    returnRate: "5% Daily for 7 Days",
    features: ["Instant Activation", "24/7 Support", "Daily Profits"],
  },
  {
    icon: <Gem className="w-8 h-8 text-yellow-400" />,
    title: "Premium Plan",
    price: "$500 Minimum",
    returnRate: "7% Daily for 14 Days",
    features: ["Priority Support", "Higher Returns", "Instant Withdrawals"],
    recommended: true,
  },
  {
    icon: <Rocket className="w-8 h-8 text-yellow-400" />,
    title: "Ultimate Plan",
    price: "$2000 Minimum",
    returnRate: "10% Daily for 30 Days",
    features: [
      "Top-Tier Returns",
      "Dedicated Account Manager",
      "Live Dashboard",
    ],
  },
];

const InvestmentPlans = () => {
  return (
    <section className="bg-[#111827] py-20 px-6 text-gray-200">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Investment Plans
        </h2>
        <p className="text-gray-400 mb-12">
          Choose the plan that suits you best
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl shadow-md p-8 bg-[#1f2937] hover:shadow-xl transition duration-300 relative ${
                plan.recommended ? "border-2 border-yellow-400" : ""
              }`}
            >
              <div className="flex justify-center mb-4">{plan.icon}</div>
              <h3 className="text-xl font-semibold text-white">{plan.title}</h3>
              <p className="text-yellow-400 text-lg font-bold mt-2">
                {plan.price}
              </p>
              <p className="text-gray-400 mt-1">{plan.returnRate}</p>

              <ul className="mt-6 text-sm text-gray-400 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i}>• {feature}</li>
                ))}
              </ul>

              <button className="mt-6 bg-yellow-400 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-300 transition">
                Invest Now
              </button>

              {plan.recommended && (
                <span className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-bl">
                  Best Value
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentPlans;
