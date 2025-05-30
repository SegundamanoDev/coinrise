// components/TradingPlans.jsx
import React from "react";
import {
  DollarSign,
  Clock,
  Percent,
  Handshake,
  CheckCircle,
  XCircle,
  Zap,
} from "lucide-react"; // Import icons from lucide-react

const TradingPlans = ({ plan }) => {
  // Destructure properties from the 'plan' prop, now using 'amount'
  const {
    name,
    amount, // Changed from minAmount/maxAmount to a single 'amount'
    roiPercent,
    durationHours,
    commissionPercent,
    capitalInsurancePercent,
    support,
    dailyReport,
  } = plan;

  // Calculate Promised Return: Investment Amount * (1 + ROI/100)
  const promisedReturn = amount * (1 + roiPercent / 100);
  const netProfit = promisedReturn - amount;

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 flex flex-col transform hover:scale-105 transition-transform duration-300">
      <h3 className="text-2xl font-bold text-center mb-4 text-yellow-400">
        {name}
      </h3>

      <div className="text-center mb-6">
        <p className="text-xl font-semibold mb-1">
          <Zap className="inline-block w-5 h-5 mr-2 text-blue-400" />
          Investment: ${amount.toLocaleString()}{" "}
          {/* Displaying the single 'amount' */}
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
          <Shield className="w-5 h-5 mr-3 text-yellow-400" />{" "}
          {/* Using Shield for Capital Insurance */}
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

      <button className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-md transition duration-300">
        Invest Now
      </button>
    </div>
  );
};

export default TradingPlans;
