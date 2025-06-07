import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { Link } from "react-router-dom"; // Import Link for navigation
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
  FileText as FileTextIcon, // Used for PDF proof icon
  Image as ImageIcon, // Used for image proof icon
  // Download, // Removed as it's no longer here
  User as UserIcon, // For user name in modal
  Mail as MailIcon, // For user email in modal
} from "lucide-react";
import { toast } from "react-toastify"; // Assuming you use react-toastify for notifications

// Helper function for formatting money
const formatMoney = (amount, currency = "USD") => {
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2, // Ensure always 2 decimal places
    }).format(amount || 0);
  } catch (error) {
    // Fallback for invalid currency or amount
    return `${currency || ""} ${parseFloat(amount || 0).toFixed(2)}`;
  }
};

// Define constants for receipt styling and logic (kept for potential use if needed)
const receiptTypeColors = {
  deposit: "#38a169", // green-600
  withdrawal: "#e53e3e", // red-600
  investment: "#4299e1", // blue-500
  referral_bonus: "#9f7aea", // purple-500
  investment_payout: "#319795", // teal-500
  upgrade_deposit: "#ed8936", // orange-500
  profit: "#0ea5e9", // sky-500
};

const statusMapToColor = {
  // For inline HTML styling in receipt
  pending: "#fbbf24", // yellow-400
  approved: "#34d399", // green-400
  rejected: "#ef4444", // red-500
  processed: "#60a5fa", // blue-400
  completed: "#22c55e", // green-500
  declined: "#ef4444", // red-500
};

const negativeTypes = ["withdrawal", "investment"];

const AdminTransactions = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.ui?.theme || "dark");

  const { items, loading, error } = useSelector((state) => state.transaction);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [actionType, setActionType] = useState(""); // 'approve' or 'decline'

  useEffect(() => {
    // When the component mounts, fetch all transactions for the admin view.
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
      // Dispatch the action to update transaction status
      dispatch(
        updateTransactionStatus({ id: selectedTx._id, action: actionType })
      )
        .unwrap() // Use unwrap to handle fulfilled/rejected promises here
        .then(() => {
          toast.success(`Transaction ${actionType}d successfully!`);
          closeModal();
        })
        .catch((err) => {
          toast.error(err || `Failed to ${actionType} transaction.`);
          closeModal(); // Still close modal on error
        });
    }
  };

  // The handleDownloadReceipt logic is now removed from here and will be in AdminTransactionDetail

  // Helper for status badge styling
  const getStatusBadge = (status) => {
    let classes =
      "px-3 py-1 rounded-full text-xs font-semibold capitalize flex items-center gap-1";
    let icon = null;

    switch (
      status?.toLowerCase() // Added optional chaining for status
    ) {
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
            const type = tx.type ? tx.type.toLowerCase() : "unknown";
            const isNegative = ["withdrawal", "investment"].includes(type);
            const isPositive = [
              "deposit",
              "referral_bonus",
              "investment_payout",
              "upgrade_deposit",
              "profit",
            ].includes(type);

            const amountColorClass = isNegative
              ? "text-red-400"
              : isPositive
              ? "text-green-400"
              : "text-gray-400";
            const amountPrefix = isNegative ? "−" : isPositive ? "+" : "";

            const userFullName = tx.user ? tx.user.fullName : "N/A";
            const userCurrency = tx.user ? tx.user.currency : "USD";

            return (
              // Wrap the entire card in a Link component
              <Link
                key={tx._id}
                to={`/admin/transactions/${tx._id}`} // Link to the new detail page
                className="block" // Make the Link take up the whole card area
              >
                <div
                  className="bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-700 flex flex-col justify-between h-full
                             hover:scale-[1.02] hover:border-blue-500 transition-all duration-200 cursor-pointer"
                >
                  {/* Header Section */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                      {isPositive ? (
                        <ArrowDownCircle className="text-green-500" size={28} />
                      ) : (
                        <ArrowUpCircle className="text-red-500" size={28} />
                      )}
                      <div>
                        <div className="font-bold text-lg text-white capitalize">
                          {tx.type}
                        </div>
                        <div className="text-xs text-gray-400">
                          User: {userFullName}
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
                        {formatMoney(tx?.amount, userCurrency)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Method:{" "}
                      <span className="font-semibold text-white">
                        {tx.method || tx.coin || "N/A"}{" "}
                      </span>
                    </div>
                  </div>

                  {/* Details Section (condensed for card view) */}
                  <div className="text-sm text-gray-300 space-y-2 mb-4 pt-3 border-t border-gray-700">
                    {tx.details?.depositWalletAddress && (
                      <div className="flex items-center justify-between py-1">
                        <span className="text-gray-400 font-medium">
                          Deposit Addr:
                        </span>
                        <span className="text-white break-words text-right text-xs max-w-[60%] overflow-hidden text-ellipsis whitespace-nowrap">
                          {tx.details.depositWalletAddress}
                        </span>
                      </div>
                    )}
                    {tx.details?.withdrawalWalletAddress && (
                      <div className="flex items-center justify-between py-1">
                        <span className="text-gray-400 font-medium">
                          Withdrawal Addr:
                        </span>
                        <span className="text-white break-words text-right text-xs max-w-[60%] overflow-hidden text-ellipsis whitespace-nowrap">
                          {tx.details.withdrawalWalletAddress}
                        </span>
                      </div>
                    )}
                    {tx.type === "upgrade_deposit" && tx.planName && (
                      <div className="flex items-center justify-between py-1">
                        <span className="text-gray-400 font-medium">Plan:</span>
                        <span className="text-white font-semibold">
                          {tx.planName}
                        </span>
                      </div>
                    )}
                    {tx.paymentProof && tx.paymentProof.secure_url && (
                      <div className="flex items-center justify-between py-1">
                        <span className="text-gray-400 font-medium">
                          Proof:
                        </span>
                        <span className="text-blue-400 text-xs flex items-center">
                          {tx.paymentProof.secure_url.endsWith(".pdf") ? (
                            <FileTextIcon size={12} className="mr-1" />
                          ) : (
                            <ImageIcon size={12} className="mr-1" />
                          )}
                          View <ExternalLink size={12} className="ml-0.5" />
                        </span>
                      </div>
                    )}
                    {!tx.details?.depositWalletAddress &&
                      !tx.details?.withdrawalWalletAddress &&
                      !tx.planName &&
                      !tx.paymentProof?.secure_url && (
                        <p className="text-gray-500 italic py-1">
                          No specific details shown here.
                        </p>
                      )}
                  </div>

                  {/* Footer with Date and Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-700 mt-auto">
                    <div className="text-xs text-gray-500">
                      <Clock size={14} className="inline mr-1" />
                      {format(new Date(tx.createdAt), "dd MMMLLL, HH:mm")}
                    </div>

                    {/* Action buttons (only if status is pending) */}
                    {tx.status?.toLowerCase() === "pending" ? (
                      <div className="flex space-x-2">
                        <button
                          // Use e.preventDefault() to stop the Link from navigating when buttons are clicked
                          onClick={(e) => {
                            e.preventDefault();
                            openModal(tx, "approve");
                          }}
                          className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-md shadow-md hover:from-green-600 hover:to-emerald-700 transition duration-200 text-xs font-semibold"
                        >
                          Approve
                        </button>
                        <button
                          // Use e.preventDefault() to stop the Link from navigating when buttons are clicked
                          onClick={(e) => {
                            e.preventDefault();
                            openModal(tx, "decline");
                          }}
                          className="px-3 py-1 bg-gradient-to-r from-red-500 to-rose-600 rounded-md shadow-md hover:from-red-600 hover:to-rose-700 transition duration-200 text-xs font-semibold"
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-xs italic">
                        Action not available
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Confirmation Modal (simplified - no download button here) */}
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
                {selectedTx.user?.fullName || selectedTx.user?.email || "N/A"}
              </span>
              ?
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              {/* Removed Download Receipt button from this modal */}
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
                Confirm{" "}
                {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTransactions;
