import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy } from "lucide-react";
import Barcode from "react-barcode";
import TvWidget from "./TradingViewWidget.";
import AdvancedChart from "./AdChart";
import ForexRates from "./FRate";

const coinOptions = ["BTC", "ETH", "LTC", "USDT"];

const ReuseableForm = ({ heading, title, desc, note }) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [file, setFile] = useState(null);
  const walletAddress = "bc1q5n7kkd6hmzsdrpvgl4223e";

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    alert("Wallet address copied!");
  };

  return (
    <div className="p-6 ">
      <div>
        {" "}
        {/* Deposit Form */}
        <div className="rounded-xl shadow-md p-6 space-y-4 border border-divider">
          <h2 className="text-lg font-semibold text-center">{heading}</h2>

          <div>
            <h2 className="block text-sm mb-1">Select a coin</h2>
            <select
              className="w-full border bg-[#000000] border-divider rounded p-2 text-[#ffffff]"
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
            <h2 className="pt-2">{note}</h2>
          </div>

          <input
            type="text"
            placeholder="Amount"
            className="w-full border border-divider rounded p-2 bg-black text-[#ffffff] placeholder:text-[#ffffff]"
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
                  <h2 className="block text-sm mb-1">
                    {selectedCoin} Wallet Address
                  </h2>
                  <div className="flex items-center bg-gray-800 p-2 rounded">
                    <h2 className="flex-1 truncate">{walletAddress}</h2>
                    <button onClick={handleCopy} className="ml-2">
                      <Copy size={16} className="text-white" />
                    </button>
                  </div>
                </div>

                <h2 className="text-xs text-gray-300">{title}</h2>

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
            <h2 className="block text-sm mb-1">
              Made payment? Send proof of payment here
            </h2>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-700 p-2 bg-black text-white file:px-4 py-2 file:bg-gradient-to-r file:from-[#00befe] file:to-[#a700ff]"
            />
          </div>

          <h2 className="text-xs text-gray-300">{desc}</h2>

          <button className="w-full bg-gradient-to-r from-[#00befe] to-[#a700ff] text-white py-2 px-4 rounded">
            Deposit
          </button>
        </div>
      </div>
      <div className="mt-10 mb-5 ">
        <div className="mb-10">
          <AdvancedChart />
        </div>
        <div className="">
          <ForexRates />
        </div>
      </div>
    </div>
  );
};

export default ReuseableForm;
