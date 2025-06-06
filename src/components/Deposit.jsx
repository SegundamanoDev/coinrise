// components/Deposits.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Copy,
  Lightbulb,
  X,
  Image,
  FileText as FileTextIcon,
} from "lucide-react";
import { toast } from "react-toastify";
import { createTransaction } from "../features/transaction/transaction";
import ForexRates from "./FRate";
import AdvancedChart from "./AdChart";
import { useNavigate } from "react-router-dom";

const Deposits = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.ui?.theme || "dark");

  const depositOptions = [
    {
      name: "Bitcoin",
      currency: "BTC", // Symbol
      address: "1QGgLGPNRvnRW7kX67SQw3TjNmj1ycwKcB", // Wallet address
      qrCode: "https://i.imgur.com/gK4QRgJ.png", // Replace with your actual QR code
    },
    {
      name: "USDT (TRC20)",
      currency: "USDT", // Symbol
      address: "0xf8e859551b74b2a230c6fbe5300a32a2bc585e23", // Wallet address
      qrCode: "https://i.imgur.com/kS9Qj6q.png", // Replace with your actual QR code
    },
  ];

  const [selectedDepositCoin, setSelectedDepositCoin] = useState(
    depositOptions[0]
  );
  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // State for image preview

  const { creating, createError } = useSelector((state) => state.transaction);
  const { user } = useSelector((state) => state.auth); // Assuming user info is available here for currency

  useEffect(() => {
    if (depositOptions.length > 0 && !selectedDepositCoin) {
      setSelectedDepositCoin(depositOptions[0]);
    }
  }, [depositOptions, selectedDepositCoin]);

  // Handle file selection and preview generation
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
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error(
          "Invalid file type. Only images (JPG, PNG, GIF, WebP) and PDFs are allowed."
        );
        setFile(null);
        setFilePreview(null);
        return;
      }

      if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`File size should not exceed ${MAX_FILE_SIZE_MB}MB.`);
        setFile(null);
        setFilePreview(null);
        return;
      }

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
      setFilePreview(null);
    }
  };

  const handleCopy = () => {
    if (selectedDepositCoin) {
      navigator.clipboard.writeText(selectedDepositCoin.address);
      toast.success(`${selectedDepositCoin.name} wallet address copied!`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !selectedDepositCoin || !file) {
      // Improved error message to be more specific
      let missingFields = [];
      if (!amount) missingFields.push("Amount");
      if (!selectedDepositCoin) missingFields.push("Cryptocurrency");
      if (!file) missingFields.push("Payment Proof");
      return toast.error(`Please provide: ${missingFields.join(", ")}.`);
    }

    const formData = new FormData();
    formData.append("type", "deposit");
    formData.append("amount", amount);
    formData.append("coin", selectedDepositCoin.currency); // e.g., "BTC" or "USDT" - this is the symbol
    formData.append("method", selectedDepositCoin.currency); // METHOD IS NOW THE COIN SYMBOL (e.g., "BTC", "USDT")
    formData.append("depositWalletAddress", selectedDepositCoin.address); // The platform's deposit address
    formData.append("paymentProof", file); // Append the file

    const action = await dispatch(createTransaction(formData));
    if (createTransaction.fulfilled.match(action)) {
      toast.success("Deposit submitted successfully! Awaiting confirmation.");
      navigate("/transaction-history"); // Navigate to history on success
      // Reset form fields
      setAmount("");
      setSelectedDepositCoin(depositOptions[0]);
      setFile(null);
      setFilePreview(null);
    } else if (createTransaction.rejected.match(action)) {
      const errorMessage = action.payload || "Failed to submit deposit.";
      toast.error(errorMessage);
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
        Make a Deposit
      </h1>

      {/* Deposit Form Card */}
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
          Crypto Deposit Request
        </h2>

        {/* Select Coin */}
        <div className="mb-4">
          <label
            htmlFor="crypto-select"
            className={`block text-sm font-semibold mb-2 ${
              theme === "dark" ? "text-textSecondary" : "text-gray-700"
            }`}
          >
            Select Cryptocurrency:
          </label>
          <select
            id="crypto-select"
            className={`w-full p-3 rounded-lg border focus:ring-blue-500 focus:border-blue-500
            ${
              theme === "dark"
                ? "bg-[#1f2937] border-borderColor text-textPrimary"
                : "bg-gray-50 border-gray-300 text-gray-900"
            }
            `}
            value={selectedDepositCoin.currency}
            onChange={(e) =>
              setSelectedDepositCoin(
                depositOptions.find((coin) => coin.currency === e.target.value)
              )
            }
          >
            {depositOptions.map((coin) => (
              <option key={coin.currency} value={coin.currency}>
                {coin.name} ({coin.currency})
              </option>
            ))}
          </select>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label
            htmlFor="amount-input"
            className={`block text-sm font-semibold mb-2 ${
              theme === "dark" ? "text-textSecondary" : "text-gray-700"
            }`}
          >
            Amount (USD):
          </label>
          <input
            id="amount-input"
            type="number"
            placeholder="e.g., 500.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-full p-3 rounded-lg border focus:ring-blue-500 focus:border-blue-500
            ${
              theme === "dark"
                ? "bg-[#1f2937] border-borderColor text-textPrimary placeholder:text-textSecondary"
                : "bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500"
            }
            `}
          />
        </div>

        {selectedDepositCoin && (
          <div className="space-y-6">
            {/* Wallet Address Display */}
            <div>
              <label
                className={`block text-sm font-semibold mb-2 ${
                  theme === "dark" ? "text-textSecondary" : "text-gray-700"
                }`}
              >
                Send {selectedDepositCoin.name} ({selectedDepositCoin.currency})
                to this address:
              </label>
              <div
                className={`flex items-center justify-between p-3 rounded-lg border
                ${
                  theme === "dark"
                    ? "bg-[#1f2937] border-borderColor"
                    : "bg-gray-100 border-gray-200"
                }
              `}
              >
                <span
                  className={`flex-1 break-all font-mono text-sm ${
                    theme === "dark" ? "text-textPrimary" : "text-gray-800"
                  }`}
                >
                  {selectedDepositCoin.address}
                </span>
                <button
                  onClick={handleCopy}
                  className={`ml-3 p-2 rounded-md transition ${
                    theme === "dark"
                      ? "hover:bg-[#374151] text-textPrimary"
                      : "hover:bg-gray-200 text-gray-700"
                  }`}
                  title="Copy wallet address"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            {/* QR Code Display */}
            <div className="text-center">
              <p
                className={`text-sm mb-3 ${
                  theme === "dark" ? "text-textSecondary" : "text-gray-700"
                }`}
              >
                Scan QR code to pay:
              </p>
              <div
                className={`inline-block p-4 rounded-lg
                ${theme === "dark" ? "bg-[#1f2937]" : "bg-gray-100"}
              `}
              >
                <img
                  src={selectedDepositCoin.qrCode}
                  alt={`${selectedDepositCoin.name} QR Code`}
                  className="w-48 h-48 md:w-56 md:h-56 object-contain"
                />
              </div>
            </div>

            {/* Payment Proof Upload */}
            <div>
              <label
                htmlFor="payment-proof"
                className={`block text-sm font-semibold mb-2 ${
                  theme === "dark" ? "text-textSecondary" : "text-gray-700"
                }`}
              >
                Upload Payment Proof (Screenshot/Receipt):
              </label>
              <input
                id="payment-proof"
                type="file"
                accept="image/*,application/pdf" // Accept images and PDFs
                onChange={handleFileChange} // Use the new handler
                className={`w-full p-3 rounded-lg border
                ${
                  theme === "dark"
                    ? "bg-[#1f2937] border-borderColor text-textPrimary file:bg-gray-700 file:text-white file:rounded-md file:border-none file:py-1.5 file:px-3 file:mr-3"
                    : "bg-gray-50 border-gray-300 text-gray-900 file:bg-gray-200 file:text-gray-700 file:rounded-md file:border-none file:py-1.5 file:px-3 file:mr-3"
                }
                `}
              />
              {file && (
                <div
                  className={`mt-3 p-3 rounded-lg flex items-center ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {file.type.startsWith("image/") && filePreview ? (
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
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Important Notes */}
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
                  Send only **{selectedDepositCoin.name} (
                  {selectedDepositCoin.currency})** to the address above.
                  Sending other coins may result in permanent loss.
                </li>
                <li>
                  Your deposit will be processed after **1-3 network
                  confirmations**. This usually takes 5-30 minutes depending on
                  network congestion.
                </li>
                <li>
                  Ensure the **amount you send matches the amount you entered**
                  above to avoid delays.
                </li>
                <li>
                  For any issues, please contact support with your transaction
                  hash.
                </li>
              </ul>
            </div>
          </div>
        )}

        {createError && (
          <p className="text-red-500 text-sm text-center mt-4">
            Error: {createError}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={creating || !amount || !selectedDepositCoin || !file}
          className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 mt-6
            ${
              creating || !amount || !selectedDepositCoin || !file
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.01]"
            }
          `}
        >
          {creating ? "Submitting Deposit..." : "Submit Deposit Request"}
        </button>
      </div>

      {/* Additional Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div
          className={`rounded-2xl shadow-lg border p-6
          ${
            theme === "dark"
              ? "bg-cardBackground border-borderColor"
              : "bg-white border-gray-200"
          }
        `}
        >
          <h2
            className={`text-xl font-bold mb-4 ${
              theme === "dark" ? "text-textPrimary" : "text-gray-900"
            }`}
          >
            Forex Rates
          </h2>
          <ForexRates />
        </div>
        <div
          className={`rounded-2xl shadow-lg border p-6
          ${
            theme === "dark"
              ? "bg-cardBackground border-borderColor"
              : "bg-white border-gray-200"
          }
        `}
        >
          <h2
            className={`text-xl font-bold mb-4 ${
              theme === "dark" ? "text-textPrimary" : "text-gray-900"
            }`}
          >
            Advanced Chart
          </h2>
          <AdvancedChart />
        </div>
      </div>
    </div>
  );
};

export default Deposits;
