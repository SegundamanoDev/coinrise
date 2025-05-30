// components/TradingPlans.jsx
import React, { useState } from "react"; // Import useState for local loading state
import {
  DollarSign,
  Clock,
  Percent,
  Handshake,
  CheckCircle,
  XCircle,
  Zap,
  Shield,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux"; // Keep useSelector for potential future use, though not directly used for card display
import { investInPlan } from "../features/investment/investmentsSlice"; // Import the investInPlan action

const TradingPlans = ({ plan }) => {
  const dispatch = useDispatch();
  const [isInvesting, setIsInvesting] = useState(false); // Local state for button loading

  // Destructure properties from the 'plan' prop
  const {
    _id, // Assuming _id is the unique identifier for the plan from your backend
    name,
    amount,
    roiPercent,
    durationHours,
    commissionPercent,
    capitalInsurancePercent,
    support,
    dailyReport,
  } = plan;

  // Calculate Promised Return and Net Profit
  const promisedReturn = amount * (1 + roiPercent / 100);
  const netProfit = promisedReturn - amount;

  const handleInvestNow = async () => {
    setIsInvesting(true); // Set loading state to true

    try {
      // Dispatch the investInPlan thunk with the required details
      await dispatch(
        investInPlan({
          amount: amount,
          planId: _id, // Pass the plan's unique ID
          roi: roiPercent, // Pass the ROI percentage
          duration: durationHours, // Pass the duration in hours
        })
      ).unwrap(); // .unwrap() allows us to catch errors here if the thunk rejects
      // Success toast is handled by the thunk itself
    } catch (error) {
      // Error toast is handled by the thunk itself
      console.error("Investment failed:", error);
    } finally {
      setIsInvesting(false); // Reset loading state
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 flex flex-col transform hover:scale-105 transition-transform duration-300">
      <h3 className="text-2xl font-bold text-center mb-4 text-yellow-400">
        {name}
      </h3>

      <div className="text-center mb-6">
        <p className="text-xl font-semibold mb-1">
          <Zap className="inline-block w-5 h-5 mr-2 text-blue-400" />
          Investment: ${amount.toLocaleString()}
        </p>
        <p className="text-3xl font-extrabold text-green-400">
          Return: ${promisedReturn.toLocaleString()}
        </p>
        <p className="text-lg font-medium text-gray-300">
          Net Profit: ${netProfit.toLocaleString()}
        </p>
      </div>

      <ul className="text-gray-300 space-y-2 mb-6 flex-grow">
        <li className="flex items-center">
          <Percent className="w-5 h-5 mr-3 text-yellow-400" />
          ROI: {roiPercent}%
        </li>
        <li className="flex items-center">
          <Clock className="w-5 h-5 mr-3 text-yellow-400" />
          Duration: {durationHours} Hours
        </li>
        <li className="flex items-center">
          <Handshake className="w-5 h-5 mr-3 text-yellow-400" />
          Commission: {commissionPercent}%
        </li>
        <li className="flex items-center">
          <Shield className="w-5 h-5 mr-3 text-yellow-400" />
          Capital Insurance: {capitalInsurancePercent}%
        </li>
        <li className="flex items-center">
          {support ? (
            <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 mr-3 text-red-500" />
          )}
          24/7 Customer Support
        </li>
        <li className="flex items-center">
          {dailyReport ? (
            <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 mr-3 text-red-500" />
          )}
          Daily Report
        </li>
      </ul>

      <button
        onClick={handleInvestNow}
        disabled={isInvesting} // Disable button while investing
        className={`mt-auto bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-md transition duration-300
          ${isInvesting ? "opacity-70 cursor-not-allowed" : ""}
        `}
      >
        {isInvesting ? "Investing..." : "Invest Now"}
      </button>
    </div>
  );
};

export default TradingPlans;
