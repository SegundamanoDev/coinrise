// components/ReuseableForm.jsx
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  UploadCloud,
  CheckCircle,
  XCircle,
  Loader2,
  Star,
  Lightbulb, // For important notes
  FileText as FileTextIcon, // For PDF icon if you expand file types
} from "lucide-react";
import Barcode from "react-barcode";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  initiateUpgradeDeposit,
  createTransaction, // Import createTransaction for general deposit forms
  resetDepositStatus,
} from "../features/transaction/transaction";

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

// Placeholder for dynamic wallet addresses (from an API in real app)
// These are the addresses of your platform where users should send funds
const WALLET_ADDRESSES = {
  BTC: "1QGgLGPNRvnRW7kX67SQw3TjNmj1ycwKcB",
  USDT: "0xf8e859551b74b2a230c6fbe5300a32a2bc585e23", // USDT on TRC20 network (example)
};

// Coin options
const coinOptions = ["BTC", "USDT"];

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
    amount: 3000,
    description:
      "Access advanced tools, priority support, and enhanced returns.",
    incentiveText: "🚀 Our Most Popular Choice!", // The "trick" text
    highlight: true, // Visually highlight this one
  },
  {
    id: "premium",
    name: "Premium Elite",
    amount: 7500,
    description:
      "Exclusive features, dedicated account manager, and top-tier returns.",
    incentiveText: "💎 Maximize Your Earnings! The ultimate experience.", // The "trick" text
    highlight: false,
  },
];

const ReuseableForm = ({
  heading,
  title, // This title is expected to contain "{selectedCoin}" for dynamic display
  desc,
  note, // This note is expected to contain "{selectedCoin}" for dynamic display
  btn,
  formType, // 'deposit' or 'upgrade'
}) => {
  const dispatch = useDispatch();
  const { depositStatus, depositError, depositMessage } = useSelector(
    (state) => state.transaction
  );

  const [selectedCoin, setSelectedCoin] = useState(""); // Stores "BTC" or "USDT"
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState(null); // State for selected plan (only for 'upgrade' formType)
  const [amount, setAmount] = useState(""); // General amount for 'deposit' type (not used for 'upgrade' type)

  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // For image preview
  const [amountError, setAmountError] = useState("");
  const [fileError, setFileError] = useState("");
  const [copyStatusMessage, setCopyStatusMessage] = useState("");

  // Memoize the wallet address to prevent unnecessary recalculations
  const currentWalletAddress = useMemo(() => {
    return selectedCoin
      ? WALLET_ADDRESSES[selectedCoin]
      : "Select a coin to see wallet address";
  }, [selectedCoin]);

  useEffect(() => {
    if (depositStatus === "succeeded") {
      // Determine the specific success message based on formType
      const successToastMessage =
        formType === "upgrade"
          ? "Account upgrade request submitted! Awaiting admin approval."
          : depositMessage ||
            "Deposit request submitted successfully! Awaiting confirmation.";

      toast.success(successToastMessage);

      // Clear all form fields and error messages
      setSelectedCoin("");
      setAmount("");
      setSelectedUpgradePlan(null); // Crucial for upgrade forms
      setFile(null);
      setFilePreview(null); // Clear file preview
      if (document.getElementById("proof-file-input")) {
        document.getElementById("proof-file-input").value = ""; // Clear file input visual
      }
      setAmountError("");
      setFileError("");
      setCopyStatusMessage("");

      // Reset Redux deposit status
      dispatch(resetDepositStatus());
    } else if (depositStatus === "failed") {
      toast.error(
        depositError || "Failed to submit request. Please try again."
      );
      // Reset Redux deposit status
      dispatch(resetDepositStatus());
    }
  }, [depositStatus, depositMessage, depositError, dispatch, formType]); // formType is a dependency as it influences logic

  const handleCopy = async () => {
    if (currentWalletAddress === "Select a coin to see wallet address") {
      setCopyStatusMessage("Please select a coin first.");
      setTimeout(() => setCopyStatusMessage(""), 3000);
      return;
    }
    try {
      // Using document.execCommand('copy') for broader iframe compatibility
      const textarea = document.createElement("textarea");
      textarea.value = currentWalletAddress;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      setCopyStatusMessage("Wallet address copied!");
      setTimeout(() => setCopyStatusMessage(""), 3000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setCopyStatusMessage("Failed to copy address.");
      setTimeout(() => setCopyStatusMessage(""), 3000);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const MAX_FILE_SIZE_MB = 5; // 5MB
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "application/pdf",
      ]; // Added PDF

      if (!allowedTypes.includes(selectedFile.type)) {
        setFileError(
          "Invalid file type. Only images (JPG, PNG, GIF, WebP) and PDFs are allowed."
        );
        setFile(null);
        setFilePreview(null);
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setFileError(`File size should not exceed ${MAX_FILE_SIZE_MB}MB.`);
        setFile(null);
        setFilePreview(null);
        return;
      }

      setFileError("");
      setFile(selectedFile);

      // Generate preview for images
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null); // No preview for PDFs or other types
      }
    } else {
      setFile(null);
      setFilePreview(null); // Clear preview
      setFileError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAmountError(""); // Clear errors on new submission attempt
    setFileError(""); // Clear errors on new submission attempt

    if (!selectedCoin) {
      toast.error("Please select a cryptocurrency.");
      return;
    }

    let submissionAmount;
    let dispatchAction; // To hold the correct thunk to dispatch

    if (formType === "upgrade") {
      if (!selectedUpgradePlan) {
        toast.error("Please select an upgrade plan.");
        return;
      }
      submissionAmount = selectedUpgradePlan.amount;
      dispatchAction = initiateUpgradeDeposit; // For upgrade form
    } else {
      // 'deposit' formType
      submissionAmount = parseFloat(amount);
      if (isNaN(submissionAmount) || submissionAmount <= 0) {
        setAmountError("Please enter a valid positive amount.");
        toast.error("Please enter a valid amount.");
        return;
      }
      dispatchAction = createTransaction; // For general deposit form
    }

    if (!file) {
      setFileError("Proof of payment is required.");
      toast.error("Please upload proof of payment.");
      return;
    }

    // If all client-side validations pass, dispatch the action
    const formData = new FormData();
    formData.append("amount", submissionAmount);
    formData.append("coin", selectedCoin);
    formData.append("proof", file); // For upgrade, this is 'proof'. For deposit, this is 'paymentProof' (backend handles names)

    // --- NEW: Send Method and Wallet Address in details ---
    formData.append("method", selectedCoin); // The chosen coin (e.g., BTC, USDT) as the method
    formData.append("depositWalletAddress", currentWalletAddress); // The platform's address
    // --- END NEW ---

    formData.append(
      "type",
      formType === "upgrade" ? "upgrade_deposit" : "deposit"
    );

    if (formType === "upgrade" && selectedUpgradePlan) {
      formData.append("planId", selectedUpgradePlan.id);
      formData.append("planName", selectedUpgradePlan.name);
    }

    // Dispatch the appropriate action based on formType
    dispatch(dispatchAction(formData));
  };

  // Determine if the submit button should be disabled
  // This combines the Redux loading status with client-side form validation
  const isFormInvalid = useMemo(() => {
    if (!selectedCoin) return true; // Must select a coin

    if (formType === "upgrade") {
      if (!selectedUpgradePlan) return true; // For upgrade, must select a plan
    } else {
      // For deposit, must have a valid amount
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) return true;
    }

    if (!file) return true; // Must upload a file

    return false; // Form is valid
  }, [selectedCoin, selectedUpgradePlan, amount, file, formType]);

  const isSubmitDisabled = depositStatus === "loading" || isFormInvalid;

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
              <Lightbulb size={16} className="inline mr-1 align-text-bottom" />
              {note?.replace("{selectedCoin}", selectedCoin)}
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
              accept="image/*,application/pdf" // Allow PDF files
            />
            <div className="flex flex-col items-center text-gray-400">
              <UploadCloud size={32} className="mb-2" />
              <span className="text-sm">
                {file ? file.name : "Click to upload image or PDF (Max 5MB)"}
              </span>
            </div>
          </div>
          {file && (
            <div className="mt-3 p-3 rounded-lg flex items-center bg-gray-700 text-gray-200">
              {file.type.startsWith("image/") ? (
                <img
                  src={filePreview}
                  alt="Proof Preview"
                  className="w-16 h-16 object-cover rounded-md mr-3 border border-gray-600"
                />
              ) : (
                <FileTextIcon size={48} className="text-blue-500 mr-3" />
              )}
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-xs">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setFilePreview(null);
                }}
                className="ml-auto text-red-500 hover:text-red-700"
                title="Remove file"
              >
                <XCircle size={20} /> {/* Changed to XCircle for consistency */}
              </button>
            </div>
          )}
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
          disabled={isSubmitDisabled} // Use the new combined state
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

export default ReuseableForm;
