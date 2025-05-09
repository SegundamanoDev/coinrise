import { Check, X } from "lucide-react";
import React from "react";

const plans = [
  {
    title: "BASIC",
    price: "$1,100.00",
    details: [
      "$1,100.00 - $1,999.00",
      "65% 24hours",
      "24/7 Support",
      "Daily Status Report",
      "5% commission",
      "Capital Insurance: None",
    ],
    buttonColor: "bg-yellow-400",
  },
  {
    title: "STANDARD",
    price: "$2,100.00",
    recommended: true,
    details: [
      "$2,100.00 - $3,999.00",
      "70% 24hours",
      "24/7 Support",
      "Daily Status Report",
      "10% commission",
      "Capital Insurance: 20%",
    ],
    buttonColor: "bg-yellow-400",
  },
  {
    title: "PLATINUM",
    price: "$3,100.00",
    details: [
      "$4,100.00 - $4,999.00",
      "75% 24hours",
      "24/7 Support",
      "Daily Status Report",
      "12% commission",
      "Capital Insurance: 80%",
    ],
    buttonColor: "bg-yellow-400",
  },
  {
    title: "DIAMOND",
    price: "$5,000.00",
    details: [
      "$5,000.00 - $99,999,999.00",
      "80% 24hours",
      "24/7 Support",
      "Daily Status Report",
      "15% commission",
      "Capital Insurance: 85%",
    ],
    buttonColor: "bg-yellow-400",
  },
];

const TradingPlans = () => {
  return (
    <section className="py-10 px-4 bg-[#111827]">
      <h2 className="text-2xl font-bold text-center mb-8 text-white">
        TRADING PLANS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="p-6 bg-[#1f2937] rounded-xl shadow-md hover:shadow-xl flex flex-col justify-between"
          >
            {plan.recommended && (
              <span className="text-sm text-white font-semibold mb-2">
                Recommended
              </span>
            )}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">
                {plan.title}
              </h3>
              <p className="text-2xl font-bold mb-4 text-white">{plan.price}</p>
              <ul className="space-y-1 mb-4 text-sm text-gray-300">
                {plan.details.map((detail, i) => (
                  <li key={i}> {detail}</li>
                ))}
              </ul>
            </div>
            <button
              className={`w-full py-2 text-white font-semibold rounded-full ${plan.buttonColor}`}
            >
              JOIN
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TradingPlans;
