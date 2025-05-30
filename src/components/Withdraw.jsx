// components/WithdrawFunds.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { createTransactionW } from "../features/transaction/transaction";
import CryptoTicker from "./CryptoTicker";
import { toast } from "react-toastify";
import {
  Lightbulb,
  Bitcoin,
  Banknote,
  CreditCard,
  DollarSign,
  Loader2, // Import Loader2 for consistent loading state
} from "lucide-react"; // Icons for payment methods and notes

import UpgradeRequiredModal from "./UpgradeRequiredModal"; // Import the new modal

const WithdrawFunds = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate hook

  const theme = useSelector((state) => state.ui?.theme || "dark");
  const user = useSelector((state) => state.auth.user);
  const availableBalance = user?.balance || 0;
  // Get the user's current plan (assuming it's part of the user object)
  const currentUserPlan = user?.currentPlan || "free"; // Default to 'free' if not set

  const { creating, createError, createSuccess, createMessage } = useSelector(
    (state) => state.transaction
  ); // Added createSuccess, createMessage

  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [details, setDetails] = useState({});
  const [showUpgradeModal, setShowUpgradeModal] = useState(false); // New state for modal visibility

  const paymentMethods = [
    { label: "Bitcoin", value: "bitcoin", icon: <Bitcoin size={18} /> },
    { label: "Bank Transfer", value: "bank", icon: <Banknote size={18} /> },
    { label: "CashApp", value: "cashapp", icon: <DollarSign size={18} /> },
    { label: "PayPal", value: "paypal", icon: <CreditCard size={18} /> },
  ];

  // Effect to handle success/error messages after transaction creation attempt
  useEffect(() => {
    if (createSuccess) {
      toast.success(
        createMessage || "Withdrawal request submitted successfully!"
      );
      // Reset form fields after successful dispatch
      setAmount("");
      setPaymentMethod("");
      setDetails({});
      // Optionally dispatch an action to clear transaction status if needed
      // dispatch(resetCreateTransactionStatus()); // if you have such an action
    } else if (createError) {
      toast.error(createError);
    }
    // No need to reset createError directly here, Redux state handles it
  }, [createSuccess, createError, createMessage, dispatch]);

  const handleWithdraw = () => {
    // Basic validation
    if (!amount || parseFloat(amount) <= 0 || !paymentMethod) {
      toast.warning("Please enter a valid amount and select a payment method.");
      return;
    }

    // Check if amount exceeds available balance
    if (parseFloat(amount) > availableBalance) {
      toast.error(
        `Insufficient balance. Your available balance is $${availableBalance.toFixed(
          2
        )}.`
      );
      return;
    }

    const requiredFields = {
      bitcoin: ["walletAddress"],
      bank: ["accountName", "accountNumber", "bankName", "swiftCode"],
      cashapp: ["cashTag"],
      paypal: ["paypalEmail"],
    };

    // Check for missing payment method specific details
    // Ensure `requiredFields[paymentMethod]` exists before calling .some
    const isMissingDetails = requiredFields[paymentMethod]?.some(
      (field) => !details[field] || details[field].trim() === ""
    );

    if (isMissingDetails) {
      toast.warning("Please complete all required payment details.");
      return;
    }

    // --- NEW: Check user's current plan before proceeding ---
    if (currentUserPlan === "free") {
      setShowUpgradeModal(true); // Display the upgrade modal
      return; // Stop the withdrawal process here
    }
    // --- END NEW CHECK ---

    const methodMap = {
      bitcoin: "BTC",
      bank: "Bank Transfer",
      cashapp: "CashApp",
      paypal: "PayPal",
    };

    dispatch(
      createTransactionW({
        type: "withdrawal",
        amount: parseFloat(amount),
        method: methodMap[paymentMethod],
        details,
      })
    );

    // Form fields are now reset in the useEffect after successful dispatch
  };

  const handleUpgradeNow = () => {
    setShowUpgradeModal(false); // Close the modal
    // Redirect to the deposit-upgrade page, which uses ReuseableForm for upgrades
    navigate("/deposit-upgrade"); // Make sure this route is configured in your App.js
  };

  const renderPaymentFields = () => {
    const inputClass = `w-full p-3 rounded-lg border focus:ring-blue-500 focus:border-blue-500
      ${
        theme === "dark"
          ? "bg-[#1f2937] border-borderColor text-textPrimary placeholder:text-textSecondary"
          : "bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500"
      }
    `;

    switch (paymentMethod) {
      case "bitcoin":
        return (
          <input
            type="text"
            value={details.walletAddress || ""}
            onChange={(e) =>
              setDetails({ ...details, walletAddress: e.target.value })
            }
            placeholder="Enter BTC Wallet Address (e.g., 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa)"
            className={inputClass}
          />
        );
      case "bank":
        return (
          <>
            <input
              type="text"
              value={details.accountName || ""}
              onChange={(e) =>
                setDetails({ ...details, accountName: e.target.value })
              }
              placeholder="Account Name (e.g., John Doe)"
              className={`${inputClass} mb-3`}
            />
            <input
              type="text"
              value={details.accountNumber || ""}
              onChange={(e) =>
                setDetails({ ...details, accountNumber: e.target.value })
              }
              placeholder="Account Number (e.g., 0123456789)"
              className={`${inputClass} mb-3`}
            />
            <input
              type="text"
              value={details.bankName || ""}
              onChange={(e) =>
                setDetails({ ...details, bankName: e.target.value })
              }
              placeholder="Bank Name (e.g., First National Bank)"
              className={`${inputClass} mb-3`}
            />
            <input
              type="text"
              value={details.swiftCode || ""}
              onChange={(e) =>
                setDetails({ ...details, swiftCode: e.target.value })
              }
              placeholder="SWIFT/BIC Code (e.g., FNBKUS33)"
              className={inputClass}
            />
          </>
        );
      case "cashapp":
        return (
          <input
            type="text"
            value={details.cashTag || ""}
            onChange={(e) =>
              setDetails({ ...details, cashTag: e.target.value })
            }
            placeholder="CashApp Tag (e.g., $YourCashTag)"
            className={inputClass}
          />
        );
      case "paypal":
        return (
          <input
            type="email"
            value={details.paypalEmail || ""}
            onChange={(e) =>
              setDetails({ ...details, paypalEmail: e.target.value })
            }
            placeholder="PayPal Email (e.g., your@email.com)"
            className={inputClass}
          />
        );
      default:
        return (
          <p
            className={`${
              theme === "dark" ? "text-textSecondary" : "text-gray-600"
            } text-sm`}
          >
            Please select a payment method to enter details.
          </p>
        );
    }
  };

  return (
    <div
      className={`p-4 md:p-8 min-h-screen font-poppins
      ${
        theme === "dark"
          ? "bg-darkBackground text-textPrimary"
          : "bg-gray-100 text-gray-900"
      }
    `}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-textPrimary">
        Withdraw Funds
      </h1>
      <div
        className={`rounded-2xl shadow-lg border p-6 mb-8
        ${
          theme === "dark"
            ? "bg-cardBackground border-borderColor"
            : "bg-white border-gray-200"
        }
      `}
      >
        <h2
          className={`text-xl font-bold mb-5 ${
            theme === "dark" ? "text-textPrimary" : "text-gray-900"
          }`}
        >
          Withdrawal Request
        </h2>

        <div
          className={`mb-6 p-4 rounded-lg
          ${
            theme === "dark"
              ? "bg-[#1f2937] border border-borderColor"
              : "bg-blue-50 border-blue-200"
          }
        `}
        >
          <p
            className={`text-sm font-semibold mb-1 ${
              theme === "dark" ? "text-textSecondary" : "text-blue-700"
            }`}
          >
            Your Current Balance:
          </p>
          <p
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-green-400" : "text-green-600"
            }`}
          >
            ${availableBalance.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Your Current Plan:{" "}
            <span className="font-semibold text-blue-300 capitalize">
              {currentUserPlan}
            </span>
          </p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="amount-input"
            className={`block text-sm font-semibold mb-2 ${
              theme === "dark" ? "text-textSecondary" : "text-gray-700"
            }`}
          >
            Amount to Withdraw (USD):
          </label>
          <input
            id="amount-input"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
            className={`w-full p-3 rounded-lg border focus:ring-blue-500 focus:border-blue-500
              ${
                theme === "dark"
                  ? "bg-[#1f2937] border-borderColor text-textPrimary placeholder:text-textSecondary"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500"
              }
            `}
          />
        </div>

        <div className="mb-6">
          <label
            className={`block text-sm font-semibold mb-2 ${
              theme === "dark" ? "text-textSecondary" : "text-gray-700"
            }`}
          >
            Select Payment Method:
          </label>
          <div className="flex flex-wrap gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.value}
                type="button"
                onClick={() => {
                  setPaymentMethod(method.value);
                  setDetails({}); // Clear details when method changes
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap
                  ${
                    paymentMethod === method.value
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : `${
                          theme === "dark"
                            ? "bg-[#1f2937] border border-borderColor text-textSecondary hover:bg-[#28374d]"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`
                  }
                `}
              >
                {method.icon}
                {method.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label
            className={`block text-sm font-semibold mb-2 ${
              theme === "dark" ? "text-textSecondary" : "text-gray-700"
            }`}
          >
            Payment Details:
          </label>
          {renderPaymentFields()}
        </div>

        <div
          className={`p-4 rounded-lg ${
            theme === "dark"
              ? "bg-yellow-900/20 border border-yellow-800 text-yellow-300"
              : "bg-yellow-100 border border-yellow-300 text-yellow-800"
          }`}
        >
          <Lightbulb
            size={20}
            className="inline-block mr-2 align-text-bottom"
          />
          <span className="font-semibold">Important Notes:</span>
          <ul className="list-disc list-inside text-sm mt-1 space-y-1">
            <li>
              Withdrawal requests are typically processed within **24-48
              hours**.
            </li>
            <li>
              Ensure all payment details are **accurate** to avoid delays or
              loss of funds.
            </li>
            <li>
              Minimum withdrawal amount may apply. Please refer to our terms.
            </li>
            <li>
              Network fees may be deducted from cryptocurrency withdrawals.
            </li>
          </ul>
        </div>

        {createError && (
          <p className="text-red-500 text-sm text-center mt-4">
            Error: {createError}
          </p>
        )}

        <button
          onClick={handleWithdraw}
          disabled={
            creating ||
            !amount ||
            parseFloat(amount) <= 0 ||
            !paymentMethod ||
            (paymentMethod &&
              Object.values(details).some((val) => !val || val.trim() === ""))
          } // Refined disabled condition
          className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 mt-6 flex items-center justify-center
            ${
              creating ||
              !amount ||
              parseFloat(amount) <= 0 ||
              !paymentMethod ||
              (paymentMethod &&
                Object.values(details).some((val) => !val || val.trim() === ""))
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.01]"
            }
          `}
        >
          {creating ? (
            <>
              <Loader2 className="animate-spin w-5 h-5 mr-3" /> Processing
              Withdrawal...
            </>
          ) : (
            "Submit Withdrawal Request"
          )}
        </button>
      </div>

      {/* The Upgrade Required Modal - Rendered here */}
      <UpgradeRequiredModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgradeClick={handleUpgradeNow}
      />
    </div>
  );
};

export default WithdrawFunds;
