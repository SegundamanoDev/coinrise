import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransactionW } from "../features/transaction/transaction";
import CryptoTicker from "./CryptoTicker";
import { toast } from "react-toastify";

const WithdrawFunds = () => {
  const dispatch = useDispatch();
  const { creating, createError } = useSelector((state) => state.transaction);

  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [details, setDetails] = useState({});

  // Show toast if there's an error
  useEffect(() => {
    if (createError) {
      toast.error(createError);
    }
  }, [createError]);

  const handleWithdraw = () => {
    if (!amount || !paymentMethod) {
      toast.warning("Please fill out all required fields.");
      return;
    }

    const requiredFields = {
      bitcoin: ["walletAddress"],
      bank: ["accountName", "accountNumber", "bankName", "swiftCode"],
      cashapp: ["cashTag"],
      paypal: ["paypalEmail"],
    };

    const missingField = requiredFields[paymentMethod].some(
      (field) => !details[field]
    );
    if (missingField) {
      toast.warning("Please complete all payment details.");
      return;
    }

    const methodMap = {
      bitcoin: "BTC",
      bank: "Bank Transfer",
      cashapp: "CashApp",
      paypal: "PayPal",
    };

    dispatch(
      createTransactionW({
        type: "withdrawal",
        amount: parseFloat(amount),
        method: methodMap[paymentMethod],
        details,
      })
    );

    setAmount("");
    setPaymentMethod("");
    setDetails({});
  };

  const renderPaymentFields = () => {
    switch (paymentMethod) {
      case "bitcoin":
        return (
          <input
            type="text"
            value={details.walletAddress || ""}
            onChange={(e) =>
              setDetails({ ...details, walletAddress: e.target.value })
            }
            placeholder="Enter BTC Wallet Address"
            className="w-full p-3 bg-transparent text-white rounded-md border border-divider"
          />
        );
      case "bank":
        return (
          <>
            <input
              type="text"
              value={details.accountName || ""}
              onChange={(e) =>
                setDetails({ ...details, accountName: e.target.value })
              }
              placeholder="Account Name"
              className="w-full p-3 mb-2 bg-transparent text-white rounded-md border border-divider"
            />
            <input
              type="text"
              value={details.accountNumber || ""}
              onChange={(e) =>
                setDetails({ ...details, accountNumber: e.target.value })
              }
              placeholder="Account Number"
              className="w-full p-3 mb-2 bg-transparent text-white rounded-md border border-divider"
            />
            <input
              type="text"
              value={details.bankName || ""}
              onChange={(e) =>
                setDetails({ ...details, bankName: e.target.value })
              }
              placeholder="Bank Name"
              className="w-full p-3 mb-2 bg-transparent text-white rounded-md border border-divider"
            />
            <input
              type="text"
              value={details.swiftCode || ""}
              onChange={(e) =>
                setDetails({ ...details, swiftCode: e.target.value })
              }
              placeholder="SWIFT/IBC Code"
              className="w-full p-3 bg-transparent text-white rounded-md border border-divider"
            />
          </>
        );
      case "cashapp":
        return (
          <input
            type="text"
            value={details.cashTag || ""}
            onChange={(e) =>
              setDetails({ ...details, cashTag: e.target.value })
            }
            placeholder="CashApp Tag ($CashTag)"
            className="w-full p-3 bg-transparent text-white rounded-md border border-divider"
          />
        );
      case "paypal":
        return (
          <input
            type="email"
            value={details.paypalEmail || ""}
            onChange={(e) =>
              setDetails({ ...details, paypalEmail: e.target.value })
            }
            placeholder="PayPal Email"
            className="w-full p-3 bg-transparent text-white rounded-md border border-divider"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 min-h-screen bg-[#000000]">
      <CryptoTicker />
      <h2 className="text-3xl font-bold text-center text-[#ffffff] my-6">
        Withdraw Funds
      </h2>

      <div className="p-6 rounded-xl shadow-lg border border-divider">
        <div className="mb-4">
          <label className="block text-sm mb-2">Amount to Withdraw</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
            className="w-full p-3 bg-transparent text-white rounded-md border border-divider"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">Select Payment Method</label>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Bitcoin", value: "bitcoin" },
              { label: "Bank Transfer", value: "bank" },
              { label: "CashApp", value: "cashapp" },
              { label: "PayPal", value: "paypal" },
            ].map((method) => (
              <button
                key={method.value}
                type="button"
                onClick={() => setPaymentMethod(method.value)}
                className={`px-4 py-2 rounded ${
                  paymentMethod === method.value
                    ? "bg-purple-600"
                    : "bg-gray-700"
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">{renderPaymentFields()}</div>

        <button
          onClick={handleWithdraw}
          disabled={creating}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {creating ? "Processing..." : "Submit Withdrawal"}
        </button>
      </div>
    </div>
  );
};

export default WithdrawFunds;
