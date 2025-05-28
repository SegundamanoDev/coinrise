// components/Deposits.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Copy, Lightbulb, X } from "lucide-react"; // Added Lightbulb for info icon, X for closing modal if needed
import { toast } from "react-toastify";
import { createTransaction } from "../features/transaction/transaction"; // Ensure this handles file uploads if necessary
import ForexRates from "./FRate"; // Your existing component
import AdvancedChart from "./AdChart"; // Your existing component
import { useNavigate } from "react-router-dom";

const Deposits = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Assuming theme is managed in Redux, e.g., in a 'ui' or 'theme' slice
  // If not, you might need to pass it as a prop from a parent component (like DashboardLayout)
  const theme = useSelector((state) => state.ui?.theme || "dark"); // Adjust 'ui.theme' to your actual Redux path

  // Define deposit options with their wallet addresses and QR code image URLs
  // You should ideally fetch these from your backend for security and flexibility.
  const depositOptions = [
    {
      name: "Bitcoin",
      currency: "BTC",
      address: "bc1q5n7kkd6hmzsdrpvgl4223e",
      qrCode: "https://i.imgur.com/gK4QRgJ.png",
    },
    {
      name: "Ethereum",
      currency: "ETH",
      address: "0x742d35Cc6634C05329241bE2bEE656A102D65D4F",
      qrCode: "https://i.imgur.com/kS9Qj6q.png",
    },
    {
      name: "Litecoin",
      currency: "LTC",
      address: "MLmD5yNf1V1o8g3kE2Q3J3m8t2v2p2q2r2s2t2u2",
      qrCode: "https://i.imgur.com/gK4QRgJ.png",
    },
    {
      name: "USDT (TRC20)",
      currency: "USDT",
      address: "TR7NhqjeKQxGTCi8qfenf2Fm2V2e2R2z2x2",
      qrCode: "https://i.imgur.com/kS9Qj6q.png",
    },
  ];

  // State to hold the selected deposit coin object
  const [selectedDepositCoin, setSelectedDepositCoin] = useState(
    depositOptions[0]
  ); // Default to Bitcoin

  const [amount, setAmount] = useState("");
  const [file, setFile] = useState(null); // For payment proof file

  const { creating, createError } = useSelector((state) => state.transaction);

  // Effect to set the initial selected coin if needed, or if depositOptions change
  useEffect(() => {
    if (depositOptions.length > 0 && !selectedDepositCoin) {
      setSelectedDepositCoin(depositOptions[0]);
    }
  }, [depositOptions, selectedDepositCoin]);

  const handleCopy = () => {
    if (selectedDepositCoin) {
      navigator.clipboard.writeText(selectedDepositCoin.address);
      toast.success(`${selectedDepositCoin.name} wallet address copied!`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !selectedDepositCoin || !file) {
      return toast.error("Please fill in all fields.");
    }

    // IMPORTANT: Your `createTransaction` Redux action and backend API
    // need to be updated to handle file uploads (e.g., using FormData).
    // The current `data` object only includes amount and coin, not the file.
    // This example focuses on the UI transformation.
    const formData = new FormData();
    formData.append("type", "deposit");
    formData.append("amount", amount);
    formData.append("coin", selectedDepositCoin.currency);

    const action = await dispatch(createTransaction(formData)); // Pass FormData
    if (createTransaction.fulfilled.match(action)) {
      toast.success("Deposit submitted successfully! Awaiting confirmation.");
      navigate("/transaction-history");
      setAmount("");
      setSelectedDepositCoin(depositOptions[0]); // Reset to default after submission
      setFile(null);
    } else if (createTransaction.rejected.match(action)) {
      // Error handling for rejected promise from createTransaction
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
                accept="image/*,application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className={`w-full p-3 rounded-lg border
                  ${
                    theme === "dark"
                      ? "bg-[#1f2937] border-borderColor text-textPrimary file:bg-gray-700 file:text-white file:rounded-md file:border-none file:py-1.5 file:px-3 file:mr-3"
                      : "bg-gray-50 border-gray-300 text-gray-900 file:bg-gray-200 file:text-gray-700 file:rounded-md file:border-none file:py-1.5 file:px-3 file:mr-3"
                  }
                `}
              />
              {file && (
                <p
                  className={`text-sm mt-2 ${
                    theme === "dark" ? "text-textSecondary" : "text-gray-600"
                  }`}
                >
                  Selected file:{" "}
                  <span className="font-medium">{file.name}</span>
                </p>
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
