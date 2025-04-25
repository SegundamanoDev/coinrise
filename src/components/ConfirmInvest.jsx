import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import SuccessModal from "./SuccMsg";

const ConfirmInvestComponent = () => {
  const { planId } = useParams(); // Get the planId from the URL
  const navigate = useNavigate();

  // Define your investment plans here (you can move this to a separate file if you like)
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

  // Find the plan based on the planId
  const selectedPlan = plans.find((plan) => plan.id === planId);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  if (!selectedPlan) {
    return <div>Plan not found!</div>;
  }

  return (
    <div className="p-6 bg-[#1f2937] text-white min-h-screen">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">
        Confirm Investment
      </h2>
      <div className="bg-[#374151] p-5 rounded-xl shadow-lg border border-[#2d3a47]">
        <h3 className="text-xl font-semibold text-yellow-400 mb-2">
          {selectedPlan.name}
        </h3>
        <p className="text-2xl font-bold text-yellow-400 mb-4">
          ₿{selectedPlan.amount}
        </p>
        <p className="text-sm text-gray-400 mb-4">
          Profit: ₿{selectedPlan.profit}
        </p>
        <button
          className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
          onClick={() => navigate("/confirm-success")} // Navigate to the success page after confirmation
        >
          Confirm Investment
        </button>
      </div>
      {isModalOpen && <SuccessModal onClose={handleCloseModal} />}
    </div>
  );
};

export default ConfirmInvestComponent;
