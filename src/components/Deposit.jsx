import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // or 'next/router' if you're using Next.js
import CryptoTicker from "./CryptoTicker";

const Deposit = () => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const walletAddress = "bc1qexamplewalletaddress123xyz";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[#0d1117] text-[#f5f5f5] font-sans">
      <CryptoTicker />
      <div className="relative max-w-lg w-full bg-[#1f2937] p-6 rounded-2xl shadow-lg border border-[#374151]">
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

        <p className="text-center mb-6 text-gray-300">
          Send BTC to the wallet address below to fund your account.
        </p>

        <div className="bg-[#111827] p-4 rounded-xl flex items-center justify-between">
          <span className="truncate">{walletAddress}</span>
          <button
            onClick={handleCopy}
            className="ml-4 px-3 py-1 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-300 transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="text-center mt-8">
          <a
            href="https://bitpay.com/buy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition"
          >
            Buy Coin Now with BitPay
          </a>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
