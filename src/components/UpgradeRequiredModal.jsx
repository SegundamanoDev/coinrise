// components/UpgradeRequiredModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // For close icon

const UPGRADE_PLANS = [
  {
    id: "basic",
    name: "Basic Tier",
    amount: 950,
  },
  {
    id: "standard",
    name: "Standard Pro",
    amount: 3000,
  },
  {
    id: "premium",
    name: "Premium Elite",
    amount: 7500,
  },
];

const UpgradeRequiredModal = ({ isOpen, onClose, onUpgradeClick }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            // Apply max-h and overflow-y-auto here
            className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-6 w-full max-w-md mx-auto relative text-white
                       max-h-[90vh] overflow-y-auto" // Key changes here
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors z-10" // Added z-10 to ensure it's on top of content
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-red-500 text-center mb-4">
              Important Notice: Account Upgrade Required
            </h2>

            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Due to the high activity and ROI on your account, your current
              plan has reached its operational limit. To process this withdrawal
              and stay compliant with our investment policies, please upgrade
              your account.
            </p>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              Your account triggered security protocols aligned with{" "}
              <span className="font-semibold text-blue-400">SEC</span> and{" "}
              <span className="font-semibold text-blue-400">MIFID</span>{" "}
              standards to prevent limitations and protect your assets.
            </p>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Upgrade Options:
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {UPGRADE_PLANS.map((plan) => (
                  <li key={plan.id}>
                    <span className="font-medium text-white">{plan.name}</span>{" "}
                    -{" "}
                    <span className="font-bold text-green-400">
                      {formatMoney(plan.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              You may choose any of the above upgrade options based on your
              preference or account needs. Your dedicated account manager is
              available to guide you through the process.
            </p>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              If you need assistance, please don't hesitate to contact customer
              support for immediate help.
            </p>

            {/* Sticky footer for buttons (optional but recommended for long content) */}
            {/* If you want the buttons to always be visible even when scrolling,
                you'd wrap them in a separate sticky footer div.
                For now, let's keep them in the flow and rely on overflow-y-auto. */}
            <div className="flex flex-col space-y-3">
              <button
                onClick={onUpgradeClick}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-800 transition-colors duration-300"
              >
                Upgrade Now
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-700 text-gray-300 py-3 rounded-lg font-semibold text-lg hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Helper for formatting money (same as in ReuseableForm)
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

export default UpgradeRequiredModal;
