import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy } from "lucide-react";
import Barcode from "react-barcode";
import TvWidget from "./TradingViewWidget.";
import TradingPlans from "./InvestmentPlanSection";
import CryptoTicker from "./CryptoTicker";

const coinOptions = ["BTC", "ETH", "LTC", "USDT"];

const UpgradeAccount = () => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [file, setFile] = useState(null);
  const walletAddress = "bc1q5n7kkd6hmzsdrpvgl4223e";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    alert("Wallet address copied!");
  };

  return (
    <div>
      <CryptoTicker />
      <TradingPlans />
      <div className="p-6 bg-[#1f2937] text-white min-h-screen">
        <div className="">
          {" "}
          {/* TradingView Infinite Crypto Ticker via iframe */}{" "}
          <div className="mb-4 rounded overflow-hidden shadow bg-[#1f2937]">
            {" "}
            <iframe
              src="https://s.tradingview.com/embed-widget/ticker-tape/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22displayMode%22%3A%22adaptive%22%2C%22locale%22%3A%22en%22%7D"
              className="w-full h-12"
              frameBorder="0"
              scrolling="no"
              allowTransparency="true"
              title="Crypto Ticker"
            ></iframe>{" "}
          </div>
          {/* Deposit Form */}
          <div className="bg-[#374151] text-gray-400 rounded-xl shadow-md p-6 space-y-4">
            <h2 className="text-lg font-semibold text-center">
              Deposit into your wallet
            </h2>

            <div>
              <label className="block text-sm mb-1">Select a coin</label>
              <select
                className="w-full border border-gray-700 rounded p-2 bg-black text-white"
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
              >
                <option value="">--Select Coin--</option>
                {coinOptions.map((coin) => (
                  <option key={coin} value={coin}>
                    {coin}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              placeholder="Amount"
              className="w-full border border-gray-700 rounded p-2 bg-black text-white"
            />

            <AnimatePresence>
              {selectedCoin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-sm mb-1">
                      {selectedCoin} Wallet Address
                    </label>
                    <div className="flex items-center bg-gray-800 p-2 rounded">
                      <span className="flex-1 truncate">{walletAddress}</span>
                      <button onClick={handleCopy} className="ml-2">
                        <Copy size={16} className="text-white" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400">
                    Make sure that you are sending funds to the correct wallet
                    address and blockchain network. Sending coins or tokens
                    other than {selectedCoin} to this address may result in loss
                    of your deposit.
                  </p>

                  <div className="flex justify-center">
                    <Barcode
                      value={walletAddress}
                      background="transparent"
                      lineColor="#ffffff"
                      height={60}
                      width={1.4}
                      fontSize={12}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm mb-1">
                Made payment? Send proof of payment here
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border border-gray-700 p-2 bg-black text-white"
              />
            </div>

            <p className="text-xs text-gray-400">
              Deposit reflects after 2 network confirmations.
            </p>

            <button className="w-full bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded">
              Deposit
            </button>
          </div>
        </div>
        <div className="mt-10 bg-[#1f2937]">
          <TvWidget />
        </div>
      </div>
    </div>
  );
};

export default UpgradeAccount;
