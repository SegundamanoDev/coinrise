import React, { useState } from "react";
import CryptoTicker from "./CryptoTicker";

const WithdrawFunds = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({});
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

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
            <label className="block text-sm text-gray-400 mb-2">
              Bitcoin Wallet Address
            </label>
            <input
              type="text"
              value={formData.walletAddress || ""}
              onChange={(e) =>
                setFormData({ ...formData, walletAddress: e.target.value })
              }
              placeholder="Enter BTC Wallet Address"
              className="w-full p-3 bg-[#2d3a47] text-white rounded-md border border-[#2d3a47] focus:outline-none"
            />
          </div>
        );
      case "bank":
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">
                Account Name
              </label>
              <input
                type="text"
                value={formData.accountName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, accountName: e.target.value })
                }
                placeholder="Enter Account Name"
                className="w-full p-3 bg-[#2d3a47] text-white rounded-md border border-[#2d3a47] focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">
                Account Number
              </label>
              <input
                type="text"
                value={formData.accountNumber || ""}
                onChange={(e) =>
                  setFormData({ ...formData, accountNumber: e.target.value })
                }
                placeholder="Enter Account Number"
                className="w-full p-3 bg-[#2d3a47] text-white rounded-md border border-[#2d3a47] focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">
                Bank Name
              </label>
              <input
                type="text"
                value={formData.bankName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, bankName: e.target.value })
                }
                placeholder="Enter Bank Name"
                className="w-full p-3 bg-[#2d3a47] text-white rounded-md border border-[#2d3a47] focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">
                SWIFT/IBC Code
              </label>
              <input
                type="text"
                value={formData.swiftCode || ""}
                onChange={(e) =>
                  setFormData({ ...formData, swiftCode: e.target.value })
                }
                placeholder="Enter SWIFT or IBC Code"
                className="w-full p-3 bg-[#2d3a47] text-white rounded-md border border-[#2d3a47] focus:outline-none"
              />
            </div>
          </>
        );
      case "cashapp":
        return (
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">
              CashApp Tag
            </label>
            <input
              type="text"
              value={formData.cashTag || ""}
              onChange={(e) =>
                setFormData({ ...formData, cashTag: e.target.value })
              }
              placeholder="Enter your $CashTag"
              className="w-full p-3 bg-[#2d3a47] text-white rounded-md border border-[#2d3a47] focus:outline-none"
            />
          </div>
        );
      case "paypal":
        return (
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">
              PayPal Email
            </label>
            <input
              type="email"
              value={formData.paypalEmail || ""}
              onChange={(e) =>
                setFormData({ ...formData, paypalEmail: e.target.value })
              }
              placeholder="Enter PayPal Email"
              className="w-full p-3 bg-[#2d3a47] text-white rounded-md border border-[#2d3a47] focus:outline-none"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-[#1f2937] text-white min-h-screen">
      <CryptoTicker />
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">
        Withdraw Funds
      </h2>

      <div className="bg-[#374151] p-6 rounded-xl shadow-lg border border-[#2d3a47] mb-6">
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

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">
            How do you want to receive payment?
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              {
                label: "BITCOIN (BTC)",
                value: "bitcoin",
                color: "bg-yellow-500",
              },
              {
                label: "DIRECT BANK PAYMENT",
                value: "bank",
                color: "bg-green-500",
              },
              { label: "CASH APP", value: "cashapp", color: "bg-green-600" },
              { label: "PAYPAL", value: "paypal", color: "bg-blue-500" },
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
          className="w-full bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
        >
          Request Withdrawal
        </button>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition duration-300">
          <div className="bg-[#1f2937] text-white p-6 rounded-lg shadow-xl max-w-lg w-full border border-yellow-500 animate-fadeIn">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Important Notice
            </h2>
            <p className="text-sm text-gray-300 mb-4">
              <strong>Account Upgrade Required</strong>
              <br />
              Due to the high activity and ROI on your account, your current
              plan has reached its operational limit. To process this withdrawal
              and stay compliant with our investment policies, please upgrade
              your account.
              <br />
              Your account triggered security protocols aligned with{" "}
              <strong>SEC</strong> and <strong>MIFID</strong> standards to
              prevent limitations and protect your assets.
            </p>

            <h3 className="text-yellow-400 font-semibold mb-2">
              Upgrade Options:
            </h3>
            <ul className="text-sm text-gray-200 mb-4 space-y-1">
              <li>
                1) Starter Plan – <strong>$1,250.00</strong>
              </li>
              <li>
                2) Advanced Plan – <strong>$1,800.00</strong>
              </li>
              <li>
                3) Premium Plan – <strong>$2,400.00</strong>
              </li>
              <li>
                4) Elite Plan – <strong>$4,000.00</strong>
              </li>
            </ul>
            <p className="text-sm text-gray-300 mb-4">
              You may choose any of the above upgrade options based on your
              preference or account needs. Your dedicated account manager is
              available to guide you through the process. If you need
              assistance, please don't hesitate to{" "}
              <strong>contact customer support</strong> for immediate help.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => alert("Contact support or proceed to upgrade")}
                className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 font-semibold"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawFunds;
