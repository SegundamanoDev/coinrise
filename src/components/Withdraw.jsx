import React, { useState } from "react";
import CryptoTicker from "./CryptoTicker";

const WithdrawFunds = () => {
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [withdrawalStatus, setWithdrawalStatus] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleWithdraw = () => {
    if (!amount || !walletAddress) {
      alert("Please enter both the withdrawal amount and wallet address");
      return;
    }

    // Simulate withdrawal request (in a real app, this would involve API calls)
    setWithdrawalStatus("Pending Approval");

    // Show confirmation modal
    setShowConfirmationModal(true);
  };

  const handleModalClose = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="p-6 bg-[#1f2937] text-white min-h-screen">
      <CryptoTicker />
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">
        Withdraw Funds
      </h2>

      {/* Withdraw Form */}
      <div className="bg-[#374151] p-6 rounded-xl shadow-lg border border-[#2d3a47] mb-6">
        <h3 className="text-xl font-semibold text-yellow-400 mb-4">
          Enter Withdrawal Details
        </h3>

        {/* Amount Field */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">
            Amount to Withdraw (₿)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 bg-[#2d3a47] text-white rounded-md border border-[#2d3a47] focus:outline-none"
            placeholder="Enter Amount"
          />
        </div>

        {/* Wallet Address Field */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">
            Bitcoin Wallet Address
          </label>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="w-full p-3 bg-[#2d3a47] text-white rounded-md border border-[#2d3a47] focus:outline-none"
            placeholder="Enter Wallet Address"
          />
        </div>

        {/* Withdrawal Button */}
        <button
          onClick={handleWithdraw}
          className="w-full bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
        >
          Request Withdrawal
        </button>
      </div>

      {/* Withdrawal Status */}
      {withdrawalStatus && (
        <div className="bg-[#374151] p-4 rounded-xl shadow-lg border border-[#2d3a47] mb-6">
          <h4 className="text-lg font-semibold text-yellow-400">Status:</h4>
          <p className="text-sm text-gray-400">{withdrawalStatus}</p>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#2d3a47] p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">
              Withdrawal Request Submitted
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Your withdrawal request for <strong>₿{amount}</strong> to the
              wallet address <strong>{walletAddress}</strong> has been
              submitted. It is currently pending approval by the admin.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleModalClose}
                className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawFunds;
