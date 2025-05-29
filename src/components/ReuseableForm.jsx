// components/ReuseableForm.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, UploadCloud, CheckCircle, XCircle, Loader2 } from "lucide-react";
import Barcode from "react-barcode";
import { useDispatch } from "react-redux"; // Assuming Redux for dispatching actions
// Import your Redux transaction slice action (e.g., for deposit or upgrade)
import { initiateUpgradeDeposit } from "../features/transaction/transaction"; // You'll need to create this action

// Placeholder for dynamic wallet addresses. In a real app, this would come from an API.
const WALLET_ADDRESSES = {
  BTC: "bc1q5n7kkd6hmzsdrpvgl4223e7s8g2g8s",
  ETH: "0x742d35Cc6634C0532925a3b844Bc454e4438f444",
  LTC: "ltc1qnx5y252c8w38x4d37s39a7a9g2c8x7w6d",
  USDT: "0x742d35Cc6634C0532925a3b844Bc454e4438f444", // USDT on Ethereum network
};

// Coin options
const coinOptions = ["BTC", "ETH", "LTC", "USDT"];

const ReuseableForm = ({
  heading,
  title,
  desc,
  note,
  btn,
  formType, // New prop: 'deposit' or 'upgrade'
  fixedAmount, // New prop: for upgrade fee if applicable
}) => {
  const dispatch = useDispatch();
  const [selectedCoin, setSelectedCoin] = useState("");
  const [amount, setAmount] = useState(fixedAmount || ""); // Pre-fill if fixedAmount is provided
  const [file, setFile] = useState(null);
  const [amountError, setAmountError] = useState("");
  const [fileError, setFileError] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState({
    loading: false,
    success: null,
    message: "",
  });

  const currentWalletAddress = selectedCoin
    ? WALLET_ADDRESSES[selectedCoin]
    : "Select a coin to see wallet address";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentWalletAddress);
      setSubmissionStatus({
        loading: false,
        success: true,
        message: "Wallet address copied!",
      });
      setTimeout(
        () => setSubmissionStatus({ ...submissionStatus, message: "" }),
        3000
      );
    } catch (err) {
      setSubmissionStatus({
        loading: false,
        success: false,
        message: "Failed to copy address.",
      });
      setTimeout(
        () => setSubmissionStatus({ ...submissionStatus, message: "" }),
        3000
      );
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        // 5MB limit
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
    setSubmissionStatus({ loading: true, success: null, message: "" });

    // Validate inputs
    if (!selectedCoin) {
      setSubmissionStatus({
        loading: false,
        success: false,
        message: "Please select a cryptocurrency.",
      });
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setAmountError("Please enter a valid positive amount.");
      setSubmissionStatus({
        loading: false,
        success: false,
        message: "Please enter a valid amount.",
      });
      return;
    }
    if (!file) {
      setFileError("Proof of payment is required.");
      setSubmissionStatus({
        loading: false,
        success: false,
        message: "Please upload proof of payment.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("amount", parsedAmount);
    formData.append("coin", selectedCoin);
    formData.append("proof", file);
    formData.append(
      "type",
      formType === "upgrade" ? "upgrade_deposit" : "deposit"
    ); // Differentiate transaction type

    try {
      // Dispatch the appropriate Redux action
      // You need to create this action in your transaction slice
      // For example, it could be `initiateUpgradeDeposit` for upgrade,
      // or `initiateDeposit` for general deposits.
      const resultAction = await dispatch(initiateUpgradeDeposit(formData)); // Assuming 'initiateUpgradeDeposit' handles file uploads

      if (initiateUpgradeDeposit.fulfilled.match(resultAction)) {
        setSubmissionStatus({
          loading: false,
          success: true,
          message:
            formType === "upgrade"
              ? "Account upgrade request submitted successfully! Awaiting admin approval."
              : "Deposit request submitted successfully! Awaiting admin approval.",
        });
        // Clear form fields on success
        setSelectedCoin("");
        setAmount(fixedAmount || ""); // Reset to fixed amount or empty
        setFile(null);
        if (document.getElementById("proof-file-input")) {
          document.getElementById("proof-file-input").value = "";
        }
      } else {
        const errorMessage =
          resultAction.payload || "Failed to submit request. Please try again.";
        setSubmissionStatus({
          loading: false,
          success: false,
          message: errorMessage,
        });
      }
    } catch (err) {
      setSubmissionStatus({
        loading: false,
        success: false,
        message: "An unexpected error occurred. Please try again.",
      });
      console.error("Submission error:", err);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto rounded-xl shadow-2xl bg-gray-900 border border-gray-700 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        {heading}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upgrade Fee Display (if formType is upgrade) */}
        {formType === "upgrade" && fixedAmount && (
          <div className="bg-blue-900/30 border border-blue-700 p-4 rounded-lg flex items-center justify-between shadow-inner">
            <span className="text-lg font-semibold text-blue-300">
              Upgrade Fee:
            </span>
            <span className="text-2xl font-bold text-blue-200">
              {formatMoney(fixedAmount)}
            </span>
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

        {/* Amount Input (editable if not fixed amount, e.g., for general deposits) */}
        {formType !== "upgrade" && ( // Only show amount input if not an upgrade form (which has a fixed amount)
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
                      background="#ffffff" // White background for barcode
                      lineColor="#000000" // Black lines
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
              accept="image/*" // Restrict to image files
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
          disabled={submissionStatus.loading}
        >
          {submissionStatus.loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5 mr-3" /> Submitting...
            </>
          ) : (
            btn
          )}
        </button>

        {/* Submission Status Message */}
        <AnimatePresence>
          {submissionStatus.message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`mt-4 p-3 rounded-lg text-center flex items-center justify-center gap-2 ${
                submissionStatus.success
                  ? "bg-green-600/20 text-green-400"
                  : "bg-red-600/20 text-red-400"
              }`}
            >
              {submissionStatus.success ? (
                <CheckCircle size={20} />
              ) : (
                <XCircle size={20} />
              )}
              <span>{submissionStatus.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Other Widgets (if still desired here) */}
      <div className="mt-10 mb-5 space-y-8">
        <div>
          {/* <ForexRates /> */} {/* Commented out as per original */}
        </div>
        <div>
          {/* <AdvancedChart /> */} {/* Commented out as per original */}
        </div>
      </div>
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
