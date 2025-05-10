import React, { useState } from "react";
import CryptoTicker from "./CryptoTicker";

const WithdrawFunds = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({});

  const handleWithdraw = () => {
    if (!amount || !paymentMethod) {
      alert("Please fill out all required fields.");
      return;
    }

    // Validate based on payment method
    const requiredFields = {
      bitcoin: ["walletAddress"],
      bank: ["accountName", "accountNumber", "bankName", "swiftCode"],
      cashapp: ["cashTag"],
      paypal: ["paypalEmail"],
    };

    const missing = requiredFields[paymentMethod].some(
      (field) => !formData[field]
    );
    if (missing) {
      alert("Please complete all payment details.");
      return;
    }

    // Trigger upgrade modal
    setShowUpgradeModal(true);
  };

  const renderPaymentFields = () => {
    switch (paymentMethod) {
      case "bitcoin":
        return (
          <div className="mb-4">
            <h2 className="block text-sm text-gray-400 my-2">
              Bitcoin Wallet Address
            </h2>
            <input
              type="text"
              value={formData.walletAddress || ""}
              onChange={(e) =>
                setFormData({ ...formData, walletAddress: e.target.value })
              }
              placeholder="Enter BTC Wallet Address"
              className="w-full p-3 bg-transparent text-[#ffffff] rounded-md border border-divider focus:outline-none"
            />
          </div>
        );
      case "bank":
        return (
          <>
            <div className="mb-4">
              <h2 className="block text-sm mb-2">Account Name</h2>
              <input
                type="text"
                value={formData.accountName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, accountName: e.target.value })
                }
                placeholder="Enter Account Name"
                className="w-full p-3 bg-transparent text-[#ffffff] rounded-md border border-divider focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <h2 className="block text-sm text-gray-400 mb-2">
                Account Number
              </h2>
              <input
                type="text"
                value={formData.accountNumber || ""}
                onChange={(e) =>
                  setFormData({ ...formData, accountNumber: e.target.value })
                }
                placeholder="Enter Account Number"
                className="w-full p-3 bg-transparent text-[#ffffff] rounded-md border border-divider focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <h2 className="block text-sm  mb-2">Bank Name</h2>
              <input
                type="text"
                value={formData.bankName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, bankName: e.target.value })
                }
                placeholder="Enter Bank Name"
                className="w-full p-3 bg-transparent text-[#ffffff] rounded-md border border-divider focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <h2 className="block text-sm text-gray-400 mb-2">
                SWIFT/IBC Code
              </h2>
              <input
                type="text"
                value={formData.swiftCode || ""}
                onChange={(e) =>
                  setFormData({ ...formData, swiftCode: e.target.value })
                }
                placeholder="Enter SWIFT or IBC Code"
                className="w-full p-3 bg-transparent text-[#ffffff] rounded-md border border-divider focus:outline-none"
              />
            </div>
          </>
        );
      case "cashapp":
        return (
          <div className="mb-4">
            <h2 className="block text-sm mb-2">CashApp Tag</h2>
            <input
              type="text"
              value={formData.cashTag || ""}
              onChange={(e) =>
                setFormData({ ...formData, cashTag: e.target.value })
              }
              placeholder="Enter your $CashTag"
              className="w-full p-3 bg-transparent text-[#ffffff] rounded-md border border-divider focus:outline-none"
            />
          </div>
        );
      case "paypal":
        return (
          <div className="mb-4">
            <h2 className="block text-sm  mb-2">PayPal Email</h2>
            <input
              type="email"
              value={formData.paypalEmail || ""}
              onChange={(e) =>
                setFormData({ ...formData, paypalEmail: e.target.value })
              }
              placeholder="Enter PayPal Email"
              className="w-full p-3 bg-transparent text-[#ffffff] rounded-md border border-divider focus:outline-none"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <CryptoTicker />
      <h2 className="text-3xl font-bold text-center mb-6">Withdraw Funds</h2>

      <div className=" p-6 rounded-xl shadow-lg border border-divider mb-6">
        <div className="mb-4">
          <h2 className="block text-sm text-gray-400 mb-2">
            Amount to Withdraw (₿)
          </h2>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full placeholder:text-[#ffffff] p-3 bg-transparent text-[#ffffff] rounded-md border border-divider focus:outline-none"
            placeholder="Enter Amount"
          />
        </div>

        <div className="mb-4">
          <h2 className="block text-sm  mb-2">
            How do you want to receive payment?
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              {
                label: "BITCOIN (BTC)",
                value: "bitcoin",
                color: "bg-gradient-to-r from-[#00befe] to-[#a700ff]",
              },
              {
                label: "DIRECT BANK PAYMENT",
                value: "bank",
                color: "bg-gradient-to-r from-[#00befe] to-[#a700ff]",
              },
              {
                label: "CASH APP",
                value: "cashapp",
                color: "bg-gradient-to-r from-[#00befe] to-[#a700ff]",
              },
              {
                label: "PAYPAL",
                value: "paypal",
                color: "bg-gradient-to-r from-[#00befe] to-[#a700ff]",
              },
            ].map((method) => (
              <button
                key={method.value}
                onClick={() => setPaymentMethod(method.value)}
                className={`px-4 py-2 text-sm rounded font-semibold text-white ${
                  method.color
                } ${paymentMethod === method.value ? "ring-2 ring-white" : ""}`}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        {renderPaymentFields()}

        <button
          onClick={handleWithdraw}
          className="w-full bg-gradient-to-r from-[#00befe] to-[#a700ff] text-[#ffffff] px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
        >
          Request Withdrawal
        </button>
      </div>
    </div>
  );
};

export default WithdrawFunds;
