import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Copy } from "lucide-react";
import Barcode from "react-barcode";
import { toast } from "react-toastify";
import { createTransaction } from "../features/transaction/transaction";
import ForexRates from "./FRate";
import AdvancedChart from "./AdChart";

const Deposits = () => {
  const dispatch = useDispatch();

  const [selectedCoin, setSelectedCoin] = useState("");
  const [amount, setAmount] = useState("");

  const walletAddress = "bc1q5n7kkd6hmzsdrpvgl4223e";

  const { creating, createError } = useSelector((state) => state.transaction);

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Wallet address copied!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !selectedCoin) {
      return toast.error("Please fill in all fields.");
    }

    const data = {
      type: "deposit",
      amount,
      coin: selectedCoin,
    };

    const action = await dispatch(createTransaction(data));
    if (createTransaction.fulfilled.match(action)) {
      toast.success("Deposit submitted successfully!");
      setAmount("");
      setSelectedCoin("");
    }
  };

  return (
    <div className="p-6">
      <div className="rounded-xl shadow-md p-6 space-y-4 border border-divider">
        <h2 className="text-lg font-semibold text-center">Make a Deposit</h2>

        <div>
          <label className="block text-sm mb-1">Select a coin</label>
          <select
            className="w-full border bg-black border-divider rounded p-2 text-white"
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
          >
            <option value="">--Select Coin--</option>
            {["BTC", "ETH", "LTC", "USDT"].map((coin) => (
              <option key={coin} value={coin}>
                {coin}
              </option>
            ))}
          </select>
        </div>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-divider rounded p-2 bg-black text-white placeholder:text-white"
        />

        {selectedCoin && (
          <div className="space-y-3">
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
          </div>
        )}

        {createError && <p className="text-red-500 text-sm">{createError}</p>}

        <button
          onClick={handleSubmit}
          disabled={creating}
          className="w-full bg-gradient-to-r from-[#00befe] to-[#a700ff] text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {creating ? "Submitting..." : "Submit Deposit"}
        </button>
      </div>

      <div className="mt-10">
        <ForexRates />
        <div className="my-8">
          <AdvancedChart />
        </div>
      </div>
    </div>
  );
};

export default Deposits;
