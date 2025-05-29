// components/UpgradeAccount.jsx
import React from "react";
import ReuseableForm from "./ReuseableForm"; // Ensure this path is correct
import { CheckCircle, Zap, DollarSign, Shield, Users } from "lucide-react"; // Import more icons

const UpgradeAccount = () => {
  // Define a fixed upgrade fee for this example
  const UPGRADE_FEE = 500; // Example: $250 for account upgrade

  const upgradeBenefits = [
    {
      icon: <DollarSign size={24} className="text-green-400" />,
      title: "Increased Investment Limits",
      description: "Unlock higher investment caps for greater returns.",
    },
    {
      icon: <Zap size={24} className="text-blue-400" />,
      title: "Faster Withdrawals",
      description: "Expedited processing times for your payout requests.",
    },
    {
      icon: <CheckCircle size={24} className="text-purple-400" />,
      title: "Exclusive Features",
      description: "Access advanced tools and analytics for better decisions.",
    },
    {
      icon: <Users size={24} className="text-cyan-400" />,
      title: "Priority Support",
      description: "Get dedicated 24/7 assistance from our expert team.",
    },
    {
      icon: <Shield size={24} className="text-yellow-400" />,
      title: "Enhanced Security",
      description: "Additional layers of protection for your assets.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-white font-[Montserrat] p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-fade-in-down">
          Upgrade Your Account
        </h1>
        <p className="text-lg md:text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-200">
          Unlock premium features, higher limits, and dedicated support to
          supercharge your investment journey.
        </p>

        {/* Benefits Section */}
        <div className="bg-gray-900 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-800 mb-12 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Why Upgrade?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upgradeBenefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ReuseableForm for Upgrade Payment */}
        <ReuseableForm
          heading="Complete Account Upgrade"
          title={`Make sure that you are sending funds to the correct wallet address and blockchain network. Sending coins or tokens other than {selectedCoin} to this address may result in loss of your deposit.`}
          note={`A one-time upgrade fee of ${formatMoney(
            UPGRADE_FEE
          )} is required.`}
          desc="Your account will be upgraded immediately after 2 network confirmations of your payment."
          btn="Submit Upgrade Payment"
          formType="upgrade" // New prop to differentiate form type
          fixedAmount={UPGRADE_FEE} // Pass the fixed upgrade amount
        />
      </div>

      {/* Optionally, you might have other components like TradingPlans here if relevant to the upgrade context */}
      {/* <TradingPlans /> */}
    </div>
  );
};

// Helper for formatting money (can be global utility)
const formatMoney = (amount, currency = "USD") => {
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount || 0);
  } catch (error) {
    return `${currency} ${parseFloat(amount || 0).toFixed(2)}`;
  }
};

export default UpgradeAccount;
