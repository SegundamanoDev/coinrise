import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoTicker from "./CryptoTicker";

const Deposit = () => {
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const walletAddress = "bc1qexamplewalletaddress123xyz";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!file) {
      alert("Please upload your payment confirmation before submitting.");
      return;
    }
    // Handle file submission here, e.g., upload to server
    alert("Proof of payment submitted. Your manager will verify shortly.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[#0d1117] text-[#f5f5f5] font-sans">
      <CryptoTicker />

      <div className="relative max-w-xl w-full bg-[#1f2937] p-6 my-4 rounded-2xl shadow-lg border border-[#374151]">
        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-sm text-yellow-400 hover:underline"
        >
          ← Go Back
        </button>

        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
          Deposit Bitcoin
        </h2>

        <p className="text-sm text-gray-300 mb-4">
          To fund your trading account, please send Bitcoin to the wallet
          address below. Once your transaction is complete, upload your payment
          confirmation slip. As soon as your account manager verifies the
          deposit, your account will be credited and trading will begin.
        </p>

        {/* BTC Wallet Section */}
        <div className="bg-[#111827] p-4 rounded-xl flex items-center justify-between mb-4">
          <span className="truncate">{walletAddress}</span>
          <button
            onClick={handleCopy}
            className="ml-4 px-3 py-1 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-300 transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload Proof of Payment:
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-100 bg-[#111827] border border-gray-600 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-300"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition mb-6"
        >
          Submit Confirmation
        </button>

        {/* Trusted BTC Purchase Links */}
        <div className="mb-4">
          <h3 className="text-yellow-400 font-semibold mb-2 text-lg">
            Trusted Websites to Buy Bitcoin:
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
            <li>
              <a
                href="https://www.binance.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:underline"
              >
                Binance
              </a>
            </li>
            <li>
              <a
                href="https://www.coinbase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:underline"
              >
                Coinbase
              </a>
            </li>
            <li>
              <a
                href="https://www.kraken.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:underline"
              >
                Kraken
              </a>
            </li>
            <li>
              <a
                href="https://www.paxful.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:underline"
              >
                Paxful
              </a>
            </li>
            <li>
              <a
                href="https://www.bitpay.com/buy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:underline"
              >
                BitPay
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
