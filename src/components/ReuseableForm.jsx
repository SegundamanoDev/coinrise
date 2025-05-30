// components/ReuseableForm.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  UploadCloud,
  CheckCircle,
  XCircle,
  Loader2,
  Star,
  TrendingUp,
} from "lucide-react"; // Added Star, TrendingUp icons
import Barcode from "react-barcode";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  initiateUpgradeDeposit,
  resetDepositStatus,
} from "../features/transaction/transaction";

// Placeholder for dynamic wallet addresses (from an API in real app)
const WALLET_ADDRESSES = {
  BTC: "bc1q5n7kkd6hmzsdrpvgl4223e7s8g2g8s",
  ETH: "0x742d35Cc6634C0532925a3b844Bc454e4438f444",
  LTC: "ltc1qnx5y252c8w38x4d37s39a7a9g2c8x7w6d",
  USDT: "0x742d35Cc6634C0532925a3b844Bc454e4438f444", // USDT on Ethereum network
};

// Coin options
const coinOptions = ["BTC", "ETH", "LTC", "USDT"];

// Plan data (This would typically come from an API in a real application)
const UPGRADE_PLANS = [
  {
    id: "basic",
    name: "Basic Tier",
    amount: 950,
    description: "Unlock essential features with our Basic Tier.",
    incentiveText: "Great for starters!",
    highlight: false,
  },
  {
    id: "standard",
    name: "Standard Pro",
    amount: 2500,
    description:
      "Access advanced tools, priority support, and enhanced returns.",
    incentiveText: "🚀 Our Most Popular Choice!", // The "trick" text
    highlight: true, // Visually highlight this one
  },
  {
    id: "premium",
    name: "Premium Elite",
    amount: 5500,
    description:
      "Exclusive features, dedicated account manager, and top-tier returns.",
    incentiveText: "💎 Maximize Your Earnings! The ultimate experience.", // The "trick" text
    highlight: false,
  },
];

const ReuseableForm = ({
  heading,
  title,
  desc,
  note,
  btn,
  formType, // 'deposit' or 'upgrade'
  // fixedAmount, // No longer needed directly as it comes from selected plan
}) => {
  const dispatch = useDispatch();
  const { depositStatus, depositError, depositMessage } = useSelector(
    (state) => state.transaction
  );

  const [selectedCoin, setSelectedCoin] = useState("");
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState(null); // State for selected plan
  // Amount is now derived from selectedUpgradePlan if formType is 'upgrade'
  const [amount, setAmount] = useState(""); // General amount for 'deposit' type

  const [file, setFile] = useState(null);
  const [amountError, setAmountError] = useState("");
  const [fileError, setFileError] = useState("");
  const [copyStatusMessage, setCopyStatusMessage] = useState("");

  // Determine the effective amount for submission
  const effectiveAmount =
    formType === "upgrade" && selectedUpgradePlan
      ? selectedUpgradePlan.amount
      : parseFloat(amount) || 0; // Fallback for general deposit

  const currentWalletAddress = selectedCoin
    ? WALLET_ADDRESSES[selectedCoin]
    : "Select a coin to see wallet address";

  useEffect(() => {
    if (depositStatus === "succeeded") {
      toast.success(depositMessage);
      setSelectedCoin("");
      // Reset amount based on form type (empty for deposit, null for upgrade plan)
      setAmount(formType === "deposit" ? "" : "");
      setSelectedUpgradePlan(null); // Clear selected plan
      setFile(null);
      if (document.getElementById("proof-file-input")) {
        document.getElementById("proof-file-input").value = "";
      }
      dispatch(resetDepositStatus());
    } else if (depositStatus === "failed") {
      toast.error(
        depositError || "Failed to submit request. Please try again."
      );
      dispatch(resetDepositStatus());
    }
  }, [depositStatus, depositMessage, depositError, dispatch, formType]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentWalletAddress);
      setCopyStatusMessage("Wallet address copied!");
      setTimeout(() => setCopyStatusMessage(""), 3000);
    } catch (err) {
      setCopyStatusMessage("Failed to copy address.");
      setTimeout(() => setCopyStatusMessage(""), 3000);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setFileError("File size should not exceed 5MB.");
        setFile(null);
      } else if (!selectedFile.type.startsWith("image/")) {
        setFileError("Only image files are allowed.");
        setFile(null);
      } else {
        setFileError("");
        setFile(selectedFile);
      }
    } else {
      setFile(null);
      setFileError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAmountError("");
    setFileError("");

    if (!selectedCoin) {
      toast.error("Please select a cryptocurrency.");
      return;
    }

    // Validation specific to upgrade vs. deposit form types
    let submissionAmount;
    if (formType === "upgrade") {
      if (!selectedUpgradePlan) {
        toast.error("Please select an upgrade plan.");
        return;
      }
      submissionAmount = selectedUpgradePlan.amount;
    } else {
      // 'deposit' formType
      submissionAmount = parseFloat(amount);
      if (isNaN(submissionAmount) || submissionAmount <= 0) {
        setAmountError("Please enter a valid positive amount.");
        toast.error("Please enter a valid amount.");
        return;
      }
    }

    if (!file) {
      setFileError("Proof of payment is required.");
      toast.error("Please upload proof of payment.");
      return;
    }

    const formData = new FormData();
    formData.append("amount", submissionAmount); // Use the derived amount
    formData.append("coin", selectedCoin);
    formData.append("proof", file);
    formData.append(
      "type",
      formType === "upgrade" ? "upgrade_deposit" : "deposit"
    );

    // Add plan details if it's an upgrade
    if (formType === "upgrade" && selectedUpgradePlan) {
      formData.append("planId", selectedUpgradePlan.id);
      formData.append("planName", selectedUpgradePlan.name);
    }

    dispatch(initiateUpgradeDeposit(formData));
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto rounded-xl shadow-2xl bg-gray-900 border border-gray-700 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        {heading}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upgrade Plan Selection (only for 'upgrade' formType) */}
        {formType === "upgrade" && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Choose Your Upgrade Plan
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {UPGRADE_PLANS.map((plan) => (
                <motion.div
                  key={plan.id}
                  className={`relative p-5 rounded-lg border-2 cursor-pointer transition-all duration-300
                    ${
                      selectedUpgradePlan?.id === plan.id
                        ? "border-blue-500 shadow-lg scale-105 bg-blue-900/20" // Selected style
                        : plan.highlight
                        ? "border-yellow-500 bg-yellow-900/10 shadow-lg hover:border-yellow-400" // Highlighted style
                        : "border-gray-700 bg-gray-800 hover:border-gray-600" // Default style
                    }
                  `}
                  onClick={() => setSelectedUpgradePlan(plan)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Star
                        size={14}
                        className="text-white"
                        fill="currentColor"
                      />{" "}
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-white mb-2 text-center">
                    {plan.name}
                  </h3>
                  <p className="text-3xl font-extrabold text-blue-400 mb-2 text-center">
                    {formatMoney(plan.amount)}
                  </p>
                  <p className="text-sm text-gray-400 text-center mb-3">
                    {plan.description}
                  </p>
                  {plan.incentiveText && (
                    <p
                      className={`text-xs font-semibold text-center mt-2 ${
                        plan.highlight ? "text-yellow-300" : "text-blue-300"
                      }`}
                    >
                      {plan.incentiveText}
                    </p>
                  )}
                  {selectedUpgradePlan?.id === plan.id && (
                    <CheckCircle
                      className="absolute top-2 right-2 text-blue-400"
                      size={20}
                    />
                  )}
                </motion.div>
              ))}
            </div>
            {!selectedUpgradePlan && (
              <p className="text-red-400 text-sm mt-2">
                Please select a plan to upgrade.
              </p>
            )}
            {selectedUpgradePlan && (
              <div className="bg-blue-900/30 border border-blue-700 p-4 rounded-lg flex items-center justify-between shadow-inner mt-4">
                <span className="text-lg font-semibold text-blue-300">
                  Selected Plan Cost:
                </span>
                <span className="text-2xl font-bold text-blue-200">
                  {formatMoney(selectedUpgradePlan.amount)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Select Coin */}
        <div>
          <label
            htmlFor="coin-select"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Select Cryptocurrency
          </label>
          <select
            id="coin-select"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
          >
            <option value="" className="text-gray-400">
              -- Select Coin --
            </option>
            {coinOptions.map((coin) => (
              <option key={coin} value={coin} className="text-white">
                {coin}
              </option>
            ))}
          </select>
          {selectedCoin && (
            <p className="text-sm text-gray-400 mt-2">
              {note.replace("{selectedCoin}", selectedCoin)}
            </p>
          )}
        </div>

        {/* Amount Input (only for general deposits, not for fixed-amount upgrades) */}
        {formType !== "upgrade" && (
          <div>
            <label
              htmlFor="amount-input"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Amount
            </label>
            <input
              id="amount-input"
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setAmountError("");
              }}
              placeholder="Enter amount"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
            {amountError && (
              <p className="text-red-400 text-sm mt-2">{amountError}</p>
            )}
          </div>
        )}

        {/* Wallet Address & Barcode Section */}
        <AnimatePresence>
          {selectedCoin && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 bg-gray-800 p-5 rounded-lg border border-gray-700 shadow-inner"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {selectedCoin} Wallet Address
                </label>
                <div className="flex items-center bg-gray-700 p-3 rounded-lg border border-gray-600">
                  <span className="flex-1 text-white text-sm break-all">
                    {currentWalletAddress}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="ml-3 p-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors duration-200"
                    title="Copy Address"
                  >
                    <Copy size={18} className="text-gray-300" />
                  </button>
                </div>
                {copyStatusMessage && (
                  <p
                    className={`text-sm mt-2 ${
                      copyStatusMessage.includes("copied")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {copyStatusMessage}
                  </p>
                )}
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">
                {title.replace(/{selectedCoin}/g, selectedCoin)}
              </p>

              <div className="flex justify-center p-2 bg-white rounded-lg">
                {selectedCoin &&
                  currentWalletAddress !==
                    "Select a coin to see wallet address" && (
                    <Barcode
                      value={currentWalletAddress}
                      background="#ffffff"
                      lineColor="#000000"
                      height={80}
                      width={1.8}
                      fontSize={14}
                      margin={5}
                    />
                  )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Proof of Payment File Input */}
        <div>
          <label
            htmlFor="proof-file-input"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Upload Proof of Payment
          </label>
          <div className="relative border border-gray-700 rounded-lg p-3 flex items-center justify-center bg-gray-800 cursor-pointer hover:border-blue-500 transition-colors duration-200">
            <input
              id="proof-file-input"
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
            />
            <div className="flex flex-col items-center text-gray-400">
              <UploadCloud size={32} className="mb-2" />
              <span className="text-sm">
                {file ? file.name : "Click to upload image (Max 5MB)"}
              </span>
            </div>
          </div>
          {fileError && (
            <p className="text-red-400 text-sm mt-2">{fileError}</p>
          )}
        </div>

        {/* Submission Info */}
        <p className="text-xs text-gray-400 text-center pt-2">{desc}</p>

        {/* Submission Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 px-4 rounded-lg font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-purple-800 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={depositStatus === "loading"}
        >
          {depositStatus === "loading" ? (
            <>
              <Loader2 className="animate-spin w-5 h-5 mr-3" /> Submitting...
            </>
          ) : (
            btn
          )}
        </button>
      </form>
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

export default ReuseableForm;
