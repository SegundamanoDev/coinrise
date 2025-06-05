// components/UpgradeAccount.jsx
import React, { useState } from "react"; // Added useState for the collapsible section
import ReuseableForm from "./ReuseableForm";
import {
  CheckCircle,
  Zap,
  DollarSign,
  Shield,
  Users,
  Lock, // Added Lock icon for the policy banner
  ChevronDown, // Added ChevronDown for collapsible
  ChevronUp, // Added ChevronUp for collapsible
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Added for collapsible animation

const UpgradeAccount = () => {
  // State to manage the collapse/expand behavior of the policy section
  const [showPolicyDetails, setShowPolicyDetails] = useState(true); // Start expanded by default

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

        {/* --- IMPORTANT ACCOUNT POLICY SECTION --- */}
        <div
          className={`rounded-xl shadow-lg border p-6 mb-8
            bg-blue-900/20 border-blue-700 text-white`}
        >
          <div
            className="flex justify-between items-center cursor-pointer pb-2"
            onClick={() => setShowPolicyDetails(!showPolicyDetails)}
          >
            <h2 className="text-xl font-bold text-blue-300 flex items-center gap-2">
              <Lock size={24} className="text-blue-400" />
              Important: Account Security & Upgrade Policy
            </h2>
            {showPolicyDetails ? (
              <ChevronUp size={28} className="text-blue-300" />
            ) : (
              <ChevronDown size={28} className="text-blue-300" />
            )}
          </div>

          <AnimatePresence>
            {showPolicyDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden" // Ensures content doesn't overflow during animation
              >
                <div className="mt-4 text-gray-200 space-y-4">
                  <p>
                    At TrustVest, the security and integrity of your investments
                    are paramount. We employ cutting-edge security measures to
                    ensure that{" "}
                    <strong>
                      only you, the authorized account holder, can initiate and
                      complete operations on your account.
                    </strong>{" "}
                    This multi-layered protection is designed to safeguard your
                    assets and personal information at all times.
                  </p>

                  <h3 className="text-lg font-semibold text-blue-200">
                    Why Upgrades Require External Deposits: Maintaining
                    Integrity and Compliance
                  </h3>
                  <p>
                    Due to the exceptional Return on Investment (ROI) offered
                    across our diverse trading plans and to adhere strictly to
                    evolving <strong>global financial regulations</strong>{" "}
                    (including stringent Anti-Money Laundering - AML - and Know
                    Your Customer - KYC - compliance standards), we have
                    implemented specific protocols for account upgrades:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>
                      <strong>Enhanced Security & Transparency:</strong> To
                      ensure a clear and auditable financial trail for all
                      significant account changes and to prevent any potential
                      unauthorized activity, upgrade fees cannot be deducted
                      directly from your existing in-platform balance.
                    </li>
                    <li>
                      <strong>Compliance with Financial Regulations:</strong>{" "}
                      This policy is in line with international best practices
                      for preventing illicit financial transactions and
                      maintaining the robust integrity of our high-performing
                      platform. All upgrade payments are processed through
                      secure external channels to ensure compliance.
                    </li>
                    <li>
                      <strong>Protecting Your Funds:</strong> This separation of
                      funds helps us maintain the highest level of security for
                      your primary trading balance while streamlining the
                      upgrade process through a dedicated, compliant flow.
                    </li>
                  </ul>
                  <p>
                    <strong>
                      Therefore, to upgrade your account, the required fee must
                      be remitted directly to our designated management wallet
                      via an external deposit.
                    </strong>
                  </p>

                  <h3 className="text-lg font-semibold text-blue-200">
                    How to Proceed with Your Upgrade
                  </h3>
                  <p>
                    Please follow the instructions provided on this page to
                    securely send your upgrade payment to the specified wallet
                    address. Once your deposit is confirmed, your account
                    upgrade will be processed swiftly, unlocking the full
                    benefits of your chosen plan.
                  </p>
                  <p>
                    Thank you for your understanding and cooperation as we
                    continue to build the most secure and profitable trading
                    environment for our valued users.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* --- END IMPORTANT ACCOUNT POLICY SECTION --- */}

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
          desc="Your account will be upgraded immediately after 2 network confirmations of your payment."
          btn="Submit Upgrade Payment"
          formType="upgrade" // New prop to differentiate form type
        />
      </div>
    </div>
  );
};

export default UpgradeAccount;
