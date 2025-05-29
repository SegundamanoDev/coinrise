import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  fetchTransactions,
  updateTransactionStatus,
} from "../../features/transaction/transaction";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Info,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink, // For proof of payment link
} from "lucide-react";

// Helper function for formatting money
const formatMoney = (amount, currency = "USD") => {
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount || 0);
  } catch (error) {
    // Fallback for invalid currency or amount
    return `${currency || ""} ${parseFloat(amount || 0).toFixed(2)}`;
  }
};

const AdminTransactions = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.transaction);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [actionType, setActionType] = useState("");

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const openModal = (txn, action) => {
    setSelectedTx(txn);
    setActionType(action);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTx(null);
    setActionType("");
  };

  const confirmAction = () => {
    if (selectedTx && actionType) {
      dispatch(
        updateTransactionStatus({ id: selectedTx._id, action: actionType })
      );
      closeModal();
    }
  };

  // Helper for status badge styling
  const getStatusBadge = (status) => {
    let classes =
      "px-3 py-1 rounded-full text-xs font-semibold capitalize flex items-center gap-1";
    let icon = null;

    switch (status.toLowerCase()) {
      case "approved":
      case "completed":
        classes += " bg-green-500/20 text-green-400"; // Softer green background
        icon = <CheckCircle size={14} />;
        break;
      case "pending":
        classes += " bg-yellow-500/20 text-yellow-400"; // Softer yellow background
        icon = <Clock size={14} />;
        break;
      case "declined":
      case "failed":
        classes += " bg-red-500/20 text-red-400"; // Softer red background
        icon = <XCircle size={14} />;
        break;
      default:
        classes += " bg-gray-500/20 text-gray-400";
        icon = <Info size={14} />;
        break;
    }
    return (
      <span className={classes}>
        {icon} {status}
      </span>
    );
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto text-white font-[Montserrat] bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">
        Manage All Transactions
      </h2>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-20 bg-gray-800 rounded-lg">
          <Loader2 className="animate-spin w-10 h-10 text-blue-400 mb-3" />
          <p className="text-lg text-gray-400">Loading transactions...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col justify-center items-center py-20 bg-red-900/20 border border-red-700 rounded-lg">
          <XCircle className="w-10 h-10 text-red-500 mb-3" />
          <p className="text-lg text-red-400 text-center">
            Failed to load transactions: {error}
          </p>
          <p className="text-sm text-red-300 mt-2">
            Please try again later or check your network.
          </p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-gray-800 rounded-lg border border-dashed border-gray-700">
          <Info className="mx-auto w-12 h-12 mb-4 text-gray-500" />
          <p className="text-xl text-gray-400 font-semibold">
            No transactions found yet.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            All user deposits, withdrawals, and investments will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((tx) => {
            const type = tx.type ? tx.type.toLowerCase() : "unknown"; // Handle undefined type
            const isNegative = ["withdrawal", "invest"].includes(type);
            const isPositive = ["deposit", "bonus", "return"].includes(type); // Added 'bonus', 'return' for clarity
            const amountColorClass = isNegative
              ? "text-red-400"
              : isPositive
              ? "text-green-400"
              : "text-gray-400";
            const amountPrefix = isNegative ? "−" : isPositive ? "+" : ""; // Changed from "" to "+" for positive

            return (
              <div
                key={tx._id}
                className="bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-700 flex flex-col justify-between"
              >
                {/* Header Section */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    {type === "deposit" ? (
                      <ArrowDownCircle className="text-green-500" size={28} />
                    ) : (
                      <ArrowUpCircle className="text-red-500" size={28} />
                    )}
                    <div>
                      <div className="font-bold text-lg text-white capitalize">
                        {tx.type}
                      </div>
                      <div className="text-xs text-gray-400">
                        {tx.user ? `User: ${tx.user.username}` : "User: N/A"}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(tx.status)}
                </div>

                {/* Amount and Method */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xl font-bold">
                    <span className={amountColorClass}>
                      {amountPrefix}
                      {formatMoney(tx?.amount, tx?.user?.currency)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Method:{" "}
                    <span className="font-semibold text-white">
                      {tx.method || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="text-sm text-gray-300 space-y-2 mb-4 pt-3 border-t border-gray-700">
                  {tx.details ? (
                    Object.entries(tx.details).map(([key, value]) => {
                      if (!value || value === "N/A") return null; // Skip empty details

                      let displayKey = key
                        .replace(/([A-Z])/g, " $1")
                        .toLowerCase();
                      displayKey =
                        displayKey.charAt(0).toUpperCase() +
                        displayKey.slice(1);

                      let displayValue = value;
                      if (displayKey.includes("Date") && !isNaN(new Date(value))) {
                        try {
                          displayValue = format(new Date(value), "MMM dd, yyyy HH:mm");
                        } catch (e) {
                          // Fallback to original value if date formatting fails
                        }
                      }

                      // Special handling for proof of payment if it's a URL
                      if (displayKey.toLowerCase().includes("proof") && typeof value === 'string' && value.startsWith('http')) {
                        return (
                            <div key={key} className="flex items-center justify-between">
                                <span className="text-gray-400 font-medium">{displayKey}:</span>
                                <a
                                    href={value}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline flex items-center gap-1"
                                >
                                    View Proof <ExternalLink size={16} />
                                </a>
                            </div>
                        );
                      }

                      return (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-gray-400 font-medium">
                            {displayKey}:
                          </span>{" "}
                          <span className="text-white break-words text-right">
                            {displayValue}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <span className="text-gray-500 italic">No additional details.</span>
                  )}
                </div>

                {/* Footer with Date and Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-700 mt-auto">
                  <div className="text-xs text-gray-500">
                    <Clock size={14} className="inline mr-1" />
                    {format(new Date(tx.createdAt), "dd MMM yyyy, HH:mm")}
                  </div>

                  <div className="flex space-x-2">
                    {tx.status.toLowerCase() === "pending" ? (
                      <>
                        <button
                          onClick={() => openModal(tx, "approve")}
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-md shadow-md hover:from-green-600 hover:to-emerald-700 transition duration-200 text-sm font-semibold"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => openModal(tx, "decline")}
                          className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 rounded-md shadow-md hover:from-red-600 hover:to-rose-700 transition duration-200 text-sm font-semibold"
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500 text-xs italic">
                        Action not available
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Modal */}
      {modalOpen && selectedTx && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gray-800 text-white rounded-xl p-8 w-full max-w-md shadow-2xl border border-gray-700 relative scale-in-center">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Confirm Action
            </h3>
            <p className="mb-6 text-center text-lg text-gray-300">
              Are you sure you want to{" "}
              <strong
                className={
                  actionType === "approve" ? "text-green-400" : "text-red-400"
                }
              >
                {actionType}
              </strong>{" "}
              this{" "}
              <span className="capitalize font-semibold">
                {selectedTx.type}
              </span>{" "}
              transaction for{" "}
              <strong className="text-blue-400">
                {formatMoney(selectedTx?.amount, selectedTx?.user?.currency)}
              </strong>{" "}
              from user{" "}
              <span className="font-semibold text-amber-400">
                {selectedTx.user?.username || "N/A"}
              </span>
              ?
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-6 py-3 rounded-lg text-white transition duration-200 font-semibold ${
                  actionType === "approve"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
                }`}
              >
                Confirm {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTransactions;