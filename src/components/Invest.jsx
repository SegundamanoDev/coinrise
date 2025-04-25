import React from "react";
import { useNavigate } from "react-router-dom";

const InvestComponent = () => {
  const navigate = useNavigate();

  // Define your investment plans here
  const plans = [
    { id: "plan1", name: "Basic Plan", amount: 100, profit: 10 },
    { id: "plan2", name: "Premium Plan", amount: 500, profit: 50 },
    { id: "plan3", name: "Gold Plan", amount: 1000, profit: 100 },
    { id: "plan4", name: "Diamond Plan", amount: 2000, profit: 200 },
    { id: "plan5", name: "Silver Plan", amount: 150, profit: 15 },
    { id: "plan6", name: "Platinum Plan", amount: 5000, profit: 500 },
    { id: "plan7", name: "Titanium Plan", amount: 10000, profit: 1000 },
    { id: "plan8", name: "VIP Plan", amount: 20000, profit: 2000 },
  ];

  const handleCardClick = (planId) => {
    // Redirect to the confirmation page with the selected plan
    navigate(`/invest/confirm/${planId}`);
  };

  return (
    <div className="p-6 bg-[#1f2937] text-white min-h-screen">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">
        Investment Plans
      </h2>

      {/* Grid Layout for Investment Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-[#374151] p-5 rounded-xl shadow-lg border border-[#2d3a47] cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={() => handleCardClick(plan.id)}
          >
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">
              {plan.name}
            </h3>
            <p className="text-2xl font-bold text-yellow-400 mb-4">
              ₿{plan.amount}
            </p>
            <p className="text-sm text-gray-400 mb-4">Profit: ₿{plan.profit}</p>
            <button
              onClick={handleCardClick}
              className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
            >
              Invest Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestComponent;
