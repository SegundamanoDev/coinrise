

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
  FileText as FileTextIcon, // Used for PDF proof icon
  Image as ImageIcon, // Used for image proof icon
  Download, // New icon for download button
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

// Define constants for receipt styling and logic
const receiptTypeColors = {
  deposit: "#38a169", // green-600
  withdrawal: "#e53e3e", // red-600
  investment: "#4299e1", // blue-500 (corrected from 'invest')
  referral_bonus: "#9f7aea", // purple-500 (corrected from 'referral bonus')
  investment_payout: "#319795", // teal-500
  upgrade_deposit: "#ed8936", // orange-500
  profit: "#0ea5e9", // sky-500
};

const statusMapToColor = { // For inline HTML styling in receipt
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
  // const navigate = useNavigate(); // Not used in this component currently

  const theme = useSelector((state) => state.ui?.theme || "dark"); // Assuming theme is managed in a 'ui' slice

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

  // --- NEW: Handle Download Receipt for Admin ---
  const handleDownloadReceipt = () => {
    if (!selectedTx) {
      toast.error("No transaction selected for receipt download.");
      return;
    }

    const {
      type,
      amount,
      status,
      createdAt,
      method, // Now holds coin symbol for crypto transactions
      coin, // This field will still hold the coin symbol for deposits/upgrades
      paymentProof,
      details,
      user: transactionUser, // Rename to avoid conflict with `user` from auth slice
    } = selectedTx;

    const displayAmount = formatMoney(
      amount,
      transactionUser?.currency || "USD" // Use transaction's user currency
    );
    const displayDate = format(new Date(createdAt), "PPpp");
    // Standardize display type, replacing underscores and making human-readable
    const displayType = type
      .replace(/_/g, " ")
      .replace("deposit", "Deposit")
      .replace("withdrawal", "Withdrawal")
      .replace("investment", "Investment") // Changed from 'invest'
      .replace("bonus", "Bonus")
      .replace("payout", "Payout");
    const displayMethod = method || coin || "N/A"; // Use `method` (coin symbol) or `coin` as fallback
    const userFullName = transactionUser?.fullName || "N/A";
    const userEmail = transactionUser?.email || "N/A";
    const transactionId = selectedTx._id; // Use _id as the transaction ID for the receipt if no specific one
    const description = selectedTx.notes || selectedTx.description || ""; // Use notes field if available

    // Create a temporary div element to render the HTML content for html2pdf
    const printElement = document.createElement('div');
    printElement.innerHTML = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 20px auto; padding: 30px; border: 1px solid #eee; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); background-color: #fff; color: #333;">
        <h2 style="text-align: center; color: #2a64c0; margin-bottom: 25px; border-bottom: 2px solid #e0e0e0; padding-bottom: 15px;">Official Transaction Receipt</h2>
        
        <div style="margin-bottom: 25px;">
          <h3 style="color: #4a5568; margin-bottom: 10px;">User Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px dashed #e0e0e0;">
              <td style="padding: 8px 0; font-weight: 600; color: #555;">Name:</td>
              <td style="padding: 8px 0; text-align: right;">${userFullName}</td>
            </tr>
            <tr style="border-bottom: 1px dashed #e0e0e0;">
              <td style="padding: 8px 0; font-weight: 600; color: #555;">Email:</td>
              <td style="padding: 8px 0; text-align: right;">${userEmail}</td>
            </tr>
          </table>
        </div>

        <div style="margin-bottom: 25px;">
          <h3 style="color: #4a5568; margin-bottom: 10px;">Transaction Summary:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px dashed #e0e0e0;">
              <td style="padding: 10px 0; font-weight: 600; color: #555;">Transaction Type:</td>
              <td style="padding: 10px 0; text-align: right; text-transform: capitalize; color: ${
                receiptTypeColors[type.toLowerCase()] || "#333"
              };"><strong>${displayType}</strong></td>
            </tr>
            <tr style="border-bottom: 1px dashed #e0e0e0;">
              <td style="padding: 10px 0; font-weight: 600; color: #555;">Amount:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: ${
                negativeTypes.includes(type.toLowerCase()) ? "#e53e3e" : "#38a169"
              };">${negativeTypes.includes(type.toLowerCase()) ? "−" : "+"}${displayAmount}</td>
            </tr>
            <tr style="border-bottom: 1px dashed #e0e0e0;">
              <td style="padding: 10px 0; font-weight: 600; color: #555;">Status:</td>
              <td style="padding: 10px 0; text-align: right; text-transform: capitalize; color: ${
                statusMapToColor[status.toLowerCase()] || "#333"
              };"><strong>${status}</strong></td>
            </tr>
            <tr style="border-bottom: 1px dashed #e0e0e0;">
              <td style="padding: 10px 0; font-weight: 600; color: #555;">Date & Time:</td>
              <td style="padding: 10px 0; text-align: right;">${displayDate}</td>
            </tr>
            <tr style="border-bottom: 1px dashed #e0e0e0;">
              <td style="padding: 10px 0; font-weight: 600; color: #555;">Method/Coin:</td>
              <td style="padding: 10px 0; text-align: right;">${displayMethod}</td>
            </tr>
            ${
              transactionId
                ? `
            <tr style="border-bottom: 1px dashed #e0e0e0;">
              <td style="padding: 10px 0; font-weight: 600; color: #555;">Transaction ID:</td>
              <td style="padding: 10px 0; text-align: right; word-break: break-all;">${transactionId}</td>
            </tr>
            `
                : ""
            }
            ${
              description
                ? `
            <tr style="border-bottom: 1px dashed #e0e0e0;">
              <td style="padding: 10px 0; font-weight: 600; color: #555;">Description:</td>
              <td style="padding: 10px 0; text-align: right;">${description}</td>
            </tr>
            `
                : ""
            }
            ${
              paymentProof && paymentProof.secure_url
                ? `
            <tr style="border-bottom: 1px dashed #e0e0e0;">
              <td style="padding: 10px 0; font-weight: 600; color: #555;">Payment Proof:</td>
              <td style="padding: 10px 0; text-align: right;"><a href="${paymentProof.secure_url}" target="_blank" style="color: #2a64c0; text-decoration: none;">View Proof (External)</a></td>
            </tr>
            `
                : ""
            }
            ${
              details && Object.keys(details).length > 0
                ? `
              <tr>
                <td colspan="2" style="padding-top: 15px; font-weight: 600; color: #555; text-align: center; border-bottom: 1px dashed #e0e0e0; padding-bottom: 10px;">Additional Details:</td>
              </tr>
              ${Object.entries(details)
                .map(([key, value]) => {
                  // Skip keys already explicitly handled above (wallet addresses)
                  if (
                    key.toLowerCase() === "depositwalletaddress" ||
                    key.toLowerCase() === "withdrawalwalletaddress" ||
                    ((key.toLowerCase().includes("proof") ||
                      key.toLowerCase().includes("paymentproof")) &&
                      typeof value === "string" &&
                      (value.startsWith("http") ||
                        value.startsWith("/uploads/proofs/")))
                  ) {
                    return "";
                  }
                  if (
                    value === null ||
                    value === undefined ||
                    value === "N/A" ||
                    value === ""
                  )
                    return "";
                  let detailKey = key.replace(/([A-Z])/g, " $1").toLowerCase();
                  detailKey =
                    detailKey.charAt(0).toUpperCase() + detailKey.slice(1);
                  let detailValue = value;
                  if (detailKey.includes("Date") && !isNaN(new Date(value))) {
                    try {
                      detailValue = format(new Date(value), "PPpp");
                    } catch (e) {
                      /* fallback to original */
                    }
                  }
                  return `
                  <tr style="border-bottom: 1px dashed #eee;">
                    <td style="padding: 8px 0; color: #777;">${detailKey}:</td>
                    <td style="padding: 8px 0; text-align: right; word-break: break-all;">${detailValue}</td>
                  </tr>
                  `;
                })
                .join("")}
            `
                : ""
            }
            ${
              details?.depositWalletAddress
                ? `
            <tr style="border-bottom: 1px dashed #e0e0e0;">
              <td style="padding: 10px 0; font-weight: 600; color: #555;">Deposit To Address:</td>
              <td style="padding: 10px 0; text-align: right; word-break: break-all;">${details.depositWalletAddress}</td>
            </tr>
            `
                : ""
            }
            ${
              details?.withdrawalWalletAddress
                ? `
            <tr style="border-bottom: 1px dashed #e0e0e0;">
              <td style="padding: 10px 0; font-weight: 600; color: #555;">Withdrawal To Address:</td>
              <td style="padding: 10px 0; text-align: right; word-break: break-all;">${details.withdrawalWalletAddress}</td>
            </tr>
            `
                : ""
            }
          </table>
        </div>
        
        <p style="text-align: center; color: #888; font-size: 12px; margin-top: 20px;">This is an automatically generated receipt.</p>
        <p style="text-align: center; color: #888; font-size: 12px;">Generated by TrustVest on ${format(
          new Date(),
          "PPpp"
        )}</p>
        <p style="text-align: center; color: #888; font-size: 12px; margin-top: 5px;">Thank you.</p>
      </div>
    `;

    // Use html2pdf to generate and download the PDF
    try {
        // Check if html2pdf is available
        if (typeof window.html2pdf === 'undefined') {
            toast.error("PDF generation library not loaded. Please try again.");
            console.error("html2pdf library is not defined. Ensure CDN is loaded.");
            return;
        }

        window.html2pdf()
            .set({ 
                margin: 0.5, 
                filename: `transaction_receipt_${selectedTx._id}.pdf`, 
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            })
            .from(printElement)
            .save();
        toast.success("Receipt downloaded successfully!");
    } catch (error) {
        console.error("Error generating PDF receipt:", error);
        toast.error("Failed to generate receipt. Please try again.");
    }
  };
  // --- END NEW: Handle Download Receipt for Admin ---

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
            const type = tx.type ? tx.type.toLowerCase() : "unknown"; // Handle undefined type
            const isNegative = ["withdrawal", "investment"].includes(type); // Corrected from 'invest'
            const isPositive = [
              "deposit",
              "referral_bonus",
              "investment_payout",
              "upgrade_deposit",
              "profit" // Added "profit" for positive transactions
            ].includes(type);

            const amountColorClass = isNegative
              ? "text-red-400"
              : isPositive
              ? "text-green-400"
              : "text-gray-400";
            const amountPrefix = isNegative ? "−" : isPositive ? "+" : ""; // Changed from "" to "+" for positive

            const userFullName = tx.user ? tx.user.fullName : "N/A";
            const userCurrency = tx.user ? tx.user.currency : "USD"; // Default to USD if user currency is missing

            return (
              <div
                key={tx._id}
                className="bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-700 flex flex-col justify-between"
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
                      {/* Show coin if method is missing (e.g., for direct crypto deposits) */}
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="text-sm text-gray-300 space-y-2 mb-4 pt-3 border-t border-gray-700">
                  {/* Display payment proof if available */}
                  {tx.paymentProof && tx.paymentProof.secure_url && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                      <span className="text-gray-400 font-medium">
                        Payment Proof:
                      </span>
                      <a
                        href={tx.paymentProof.secure_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline flex items-center gap-1"
                        title="View Payment Proof"
                      >
                        {tx.paymentProof.secure_url.endsWith(".pdf") ? (
                          <FileTextIcon size={16} />
                        ) : (
                          <ImageIcon size={16} />
                        )}
                        View Proof <ExternalLink size={14} />
                      </a>
                    </div>
                  )}

                  {/* Display deposit/withdrawal wallet addresses from details */}
                  {tx.details?.depositWalletAddress && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                      <span className="text-gray-400 font-medium">
                        Deposit Address:
                      </span>
                      <span className="text-white break-words text-right text-xs">
                        {tx.details.depositWalletAddress}
                      </span>
                    </div>
                  )}
                  {tx.details?.withdrawalWalletAddress && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                      <span className="text-gray-400 font-medium">
                        Withdrawal Address:
                      </span>
                      <span className="text-white break-words text-right text-xs">
                        {tx.details.withdrawalWalletAddress}
                      </span>
                    </div>
                  )}

                  {/* Display other details if available from the 'details' object itself */}
                  {tx.details && Object.keys(tx.details).length > 0
                    ? Object.entries(tx.details).map(([key, value]) => {
                        // Skip keys already explicitly handled above (wallet addresses)
                        if (
                          key === "depositWalletAddress" ||
                          key === "withdrawalWalletAddress" ||
                          // Skip paymentProof details if stored directly in `details` but handled by top-level paymentProof field
                          ((key.toLowerCase().includes("proof") ||
                            key.toLowerCase().includes("paymentproof")) &&
                            typeof value === "string" &&
                            (value.startsWith("http") ||
                              value.startsWith("/uploads/proofs/")))
                        ) {
                          return null;
                        }
                        if (!value || value === "N/A" || value === "")
                          return null; // Skip empty details

                        let displayKey = key
                          .replace(/([A-Z])/g, " $1")
                          .toLowerCase();
                        displayKey =
                          displayKey.charAt(0).toUpperCase() +
                          displayKey.slice(1);

                        let displayValue = value;
                        if (
                          displayKey.includes("Date") &&
                          !isNaN(new Date(value))
                        ) {
                          try {
                            displayValue = format(
                              new Date(value),
                              "MMM dd,LLL HH:mm"
                            );
                          } catch (e) {
                            // Fallback to original value if date formatting fails
                          }
                        }
                        return (
                          <div
                            key={key}
                            className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0"
                          >
                            <span className="text-gray-400 font-medium">
                              {displayKey}:
                            </span>{" "}
                            <span className="text-white break-words text-right">
                              {displayValue}
                            </span>
                          </div>
                        );
                      })
                    : // Only show "No additional details" if there's no payment proof AND no other details
                      !tx.paymentProof?.secure_url &&
                      !tx.details?.depositWalletAddress &&
                      !tx.details?.withdrawalWalletAddress && (
                        <span className="text-gray-500 italic block py-2">
                          No additional details.
                        </span>
                      )}

                  {/* Display Plan Name if it's an upgrade transaction */}
                  {tx.type === "upgrade_deposit" && tx.planName && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                      <span className="text-gray-400 font-medium">Plan:</span>
                      <span className="text-white font-semibold">
                        {tx.planName}
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer with Date and Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-700 mt-auto">
                  <div className="text-xs text-gray-500">
                    <Clock size={14} className="inline mr-1" />
                    {format(new Date(tx.createdAt), "dd MMMLLL, HH:mm")}
                  </div>

                  <div className="flex space-x-2">
                    {tx.status?.toLowerCase() === "pending" ? (
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
                {selectedTx.user?.fullName || selectedTx.user?.email || "N/A"}
              </span>
              ?
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              {/* NEW: Download Receipt Button */}
              <button
                onClick={handleDownloadReceipt}
                className={`flex-1 px-6 py-3 rounded-lg text-white transition duration-200 font-semibold bg-blue-600 hover:bg-blue-700 flex items-center justify-center`}
              >
                <Download size={20} className="mr-2" /> Download Receipt
              </button>
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
