import React, { useEffect, useState } from "react"; // Import useState for modal
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  fetchTransactionById,
  updateTransactionStatus,
  deleteTransaction, // Import the deleteTransaction thunk
} from "../../features/transaction/transaction";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Loader2,
  XCircle,
  CheckCircle,
  Info,
  Clock,
  ExternalLink,
  FileText as FileTextIcon,
  Image as ImageIcon,
  Download,
  User as UserIcon,
  Mail as MailIcon,
  Trash2, // Import Trash2 icon for delete
} from "lucide-react";

// Helper function for formatting money (copy for consistency)
const formatMoney = (amount, currency = "USD") => {
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount || 0);
  } catch (error) {
    return `${currency || ""} ${parseFloat(amount || 0).toFixed(2)}`;
  }
};

// Helper for type colors in display
const typeColors = {
  deposit: "text-green-400",
  withdrawal: "text-red-400",
  investment: "text-blue-400",
  referral_bonus: "text-purple-400",
  investment_payout: "text-teal-400",
  upgrade_deposit: "text-orange-400",
  profit: "text-sky-400",
};

// Helper for status badge styling
const getStatusBadge = (status) => {
  let classes =
    "px-3 py-1 rounded-full text-xs font-semibold capitalize flex items-center gap-1";
  let icon = null;

  switch (status?.toLowerCase()) {
    case "approved":
    case "completed":
      classes += " bg-green-500/20 text-green-400";
      icon = <CheckCircle size={14} />;
      break;
    case "pending":
      classes += " bg-yellow-500/20 text-yellow-400";
      icon = <Clock size={14} />;
      break;
    case "declined":
    case "failed":
      classes += " bg-red-500/20 text-red-400";
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

// Define constants for receipt styling and logic (for html2pdf rendering)
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

const AdminTransactionDetail = () => {
  const { id } = useParams(); // Get transaction ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedTransaction, loading, error, deleting } = useSelector(
    // Added 'deleting' state
    (state) => state.transaction
  );

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false); // State for delete modal

  useEffect(() => {
    if (id) {
      dispatch(fetchTransactionById(id));
    }
  }, [dispatch, id]);

  const handleAction = async (action) => {
    if (!selectedTransaction) return;

    try {
      await dispatch(
        updateTransactionStatus({ id: selectedTransaction._id, action })
      ).unwrap();
      toast.success(`Transaction ${action}d successfully!`);
      // Re-fetch to ensure the status is updated on the page
      dispatch(fetchTransactionById(id));
    } catch (err) {
      toast.error(err || `Failed to ${action} transaction.`);
    }
  };

  // Function to open the delete confirmation modal
  const openDeleteConfirmModal = () => {
    setShowDeleteConfirmModal(true);
  };

  // Function to close the delete confirmation modal
  const closeDeleteConfirmModal = () => {
    setShowDeleteConfirmModal(false);
  };

  // Function to confirm and dispatch delete transaction
  const handleDeleteConfirm = async () => {
    if (!selectedTransaction) return;

    try {
      await dispatch(deleteTransaction(selectedTransaction._id)).unwrap();
      toast.success("Transaction deleted successfully!");
      closeDeleteConfirmModal();
      navigate("/admin/transactions"); // Navigate back to the transactions list after deletion
    } catch (err) {
      toast.error(err || "Failed to delete transaction.");
      closeDeleteConfirmModal(); // Close modal even on error
    }
  };

  // --- Handle Download Receipt for Detail Page ---
  const handleDownloadReceipt = () => {
    if (!selectedTransaction) {
      toast.error("No transaction data available for receipt download.");
      return;
    }

    const {
      type,
      amount,
      status,
      createdAt,
      method,
      coin,
      paymentProof,
      details,
      user: transactionUser,
    } = selectedTransaction;

    const displayAmount = formatMoney(
      amount,
      transactionUser?.currency || "USD"
    );
    const displayDate = format(new Date(createdAt), "PPpp");
    const displayType = type
      .replace(/_/g, " ")
      .replace("deposit", "Deposit")
      .replace("withdrawal", "Withdrawal")
      .replace("investment", "Investment")
      .replace("bonus", "Bonus")
      .replace("payout", "Payout");
    const displayMethod = method || coin || "N/A";
    const userFullName = transactionUser?.fullName || "N/A";
    const userEmail = transactionUser?.email || "N/A";
    const transactionId = selectedTransaction._id;
    const description =
      selectedTransaction.notes || selectedTransaction.description || "";

    const printElement = document.createElement("div");
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
                negativeTypes.includes(type.toLowerCase())
                  ? "#e53e3e"
                  : "#38a169"
              };">${
      negativeTypes.includes(type.toLowerCase()) ? "−" : "+"
    }${displayAmount}</td>
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
                  if (
                    value === null ||
                    value === undefined ||
                    value === "" ||
                    value === "N/A" ||
                    key === "paymentProof" ||
                    key === "planName" ||
                    key === "depositWalletAddress" ||
                    key === "withdrawalWalletAddress"
                  ) {
                    return "";
                  }

                  let detailKey = key.replace(/([A-Z])/g, " $1").toLowerCase();
                  detailKey =
                    detailKey.charAt(0).toUpperCase() + detailKey.slice(1);
                  let detailValue = value;
                  if (
                    typeof value === "string" &&
                    (key.toLowerCase().includes("date") ||
                      key.toLowerCase().includes("at")) &&
                    !isNaN(new Date(value))
                  ) {
                    try {
                      detailValue = format(new Date(value), "PPpp");
                    } catch (e) {
                      /* Fallback */
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

    try {
      if (typeof window.html2pdf === "undefined") {
        toast.error("PDF generation library not loaded. Please allow pop-ups.");
        console.error("html2pdf library is not defined. Ensure CDN is loaded.");
        return;
      }

      window
        .html2pdf()
        .set({
          margin: 0.5,
          filename: `transaction_receipt_${selectedTransaction._id}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .from(printElement)
        .save();
      toast.success("Receipt downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF receipt:", error);
      toast.error("Failed to generate receipt. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-950 to-black text-white">
        <Loader2 className="animate-spin w-10 h-10 text-blue-400" />
        <p className="ml-3 text-lg">Loading transaction details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-950 to-black text-red-500">
        <XCircle className="w-10 h-10 mb-3" />
        <p className="text-lg mb-2">Error: {error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!selectedTransaction) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-950 to-black text-gray-400">
        <Info className="w-10 h-10 mb-3" />
        <p className="text-lg mb-2">Transaction not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    user: transactionUser,
    amount,
    type,
    coin,
    method,
    status,
    paymentProof,
    details,
    createdAt,
    planId,
    planName,
    notes,
    _id: transactionId,
  } = selectedTransaction;

  const isPositive = [
    "deposit",
    "referral_bonus",
    "investment_payout",
    "upgrade_deposit",
    "profit",
  ].includes(type?.toLowerCase());
  const amountPrefix = isPositive ? "+" : "−";
  const amountColorClass = isPositive ? "text-green-400" : "text-red-400";
  const displayType = type ? type.replace(/_/g, " ") : "N/A";
  const displayMethod = method || coin || "N/A";

  // Condition to enable "Download Receipt" button
  const canDownloadReceipt = ["approved", "completed"].includes(
    status?.toLowerCase()
  );

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-gray-950 to-black text-white font-[Montserrat]">
      <div className="max-w-4xl mx-auto bg-[#121212] shadow-xl rounded-xl p-6 md:p-8 border border-gray-800">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-700">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors text-lg"
          >
            <ArrowLeft size={20} className="mr-2" /> Back to All Transactions
          </button>
          <h1 className="text-3xl font-bold text-blue-500">
            Transaction Details
          </h1>
        </div>

        {/* Transaction Summary */}
        <div className="mb-8 p-6 rounded-lg bg-gray-800 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white">Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
            <p>
              <strong>Transaction ID:</strong>{" "}
              <span className="break-all text-sm">{transactionId}</span>
            </p>
            <p>
              <strong>Type:</strong>{" "}
              <span
                className={`capitalize font-semibold ${
                  typeColors[type?.toLowerCase()]
                }`}
              >
                {displayType}
              </span>
            </p>
            <p>
              <strong>Amount:</strong>{" "}
              <span className={`font-bold text-lg ${amountColorClass}`}>
                {amountPrefix}
                {formatMoney(amount, transactionUser?.currency || "USD")}
              </span>
            </p>
            <p>
              <strong>Status:</strong> {getStatusBadge(status)}
            </p>
            <p>
              <strong>Date:</strong> {format(new Date(createdAt), "PPpp")}
            </p>
            <p>
              <strong>Method/Coin:</strong>{" "}
              <span className="font-semibold">{displayMethod}</span>
            </p>
          </div>
        </div>

        {/* User Information */}
        {transactionUser && (
          <div className="mb-8 p-6 rounded-lg bg-gray-800 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              User Info
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300">
              <p>
                <UserIcon size={16} className="inline mr-2 text-blue-400" />
                <strong>Name:</strong> {transactionUser.fullName || "N/A"}
              </p>
              <p>
                <MailIcon size={16} className="inline mr-2 text-blue-400" />
                <strong>Email:</strong> {transactionUser.email || "N/A"}
              </p>
              <p>
                <strong>Account Level:</strong>{" "}
                <span className="capitalize">
                  {transactionUser.accountLevel || "N/A"}
                </span>
              </p>
              <p>
                <strong>Current Balance:</strong>{" "}
                {formatMoney(
                  transactionUser.balance,
                  transactionUser.currency || "USD"
                )}
              </p>
            </div>
          </div>
        )}

        {/* Specific Details Section */}
        {(paymentProof?.secure_url || details || planName || notes) && (
          <div className="mb-8 p-6 rounded-lg bg-gray-800 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Additional Details
            </h2>
            <div className="space-y-4 text-gray-300">
              {paymentProof?.secure_url && (
                <div className="flex items-center justify-between border-b border-gray-700 pb-2">
                  <span className="font-semibold">Payment Proof:</span>
                  <a
                    href={paymentProof.secure_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-1"
                  >
                    {paymentProof.secure_url.endsWith(".pdf") ? (
                      <FileTextIcon size={16} />
                    ) : (
                      <ImageIcon size={16} />
                    )}
                    View Proof <ExternalLink size={14} />
                  </a>
                </div>
              )}

              {details && Object.keys(details).length > 0 && (
                <>
                  {Object.entries(details).map(([key, value]) => {
                    if (
                      value === null ||
                      value === undefined ||
                      value === "" ||
                      value === "N/A" ||
                      key === "paymentProof" ||
                      key === "planName" ||
                      key === "depositWalletAddress" ||
                      key === "withdrawalWalletAddress"
                    ) {
                      return null;
                    }

                    let displayKey = key
                      .replace(/([A-Z])/g, " $1")
                      .toLowerCase();
                    displayKey =
                      displayKey.charAt(0).toUpperCase() + displayKey.slice(1);
                    let displayValue = value;
                    if (
                      typeof value === "string" &&
                      (key.toLowerCase().includes("date") ||
                        key.toLowerCase().includes("at")) &&
                      !isNaN(new Date(value))
                    ) {
                      try {
                        displayValue = format(new Date(value), "PPpp");
                      } catch (e) {
                        /* Fallback */
                      }
                    }
                    return (
                      <div
                        key={key}
                        className="flex justify-between items-center border-b border-gray-700 pb-2"
                      >
                        <span className="font-semibold">{displayKey}:</span>
                        <span className="text-right break-words text-sm">
                          {displayValue}
                        </span>
                      </div>
                    );
                  })}
                  {details.depositWalletAddress && (
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                      <span className="font-semibold">Deposit Address:</span>
                      <span className="text-right break-all text-sm">
                        {details.depositWalletAddress}
                      </span>
                    </div>
                  )}
                  {details.withdrawalWalletAddress && (
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                      <span className="font-semibold">Withdrawal Address:</span>
                      <span className="text-right break-all text-sm">
                        {details.withdrawalWalletAddress}
                      </span>
                    </div>
                  )}
                </>
              )}

              {type === "upgrade_deposit" && planName && (
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="font-semibold">Upgrade Plan:</span>
                  <span className="font-bold text-blue-300">{planName}</span>
                </div>
              )}
              {type === "upgrade_deposit" && planId && (
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="font-semibold">Plan ID:</span>
                  <span className="text-sm break-all">{planId}</span>
                </div>
              )}
              {notes && (
                <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                  <span className="font-semibold">Notes:</span>
                  <span className="text-sm italic text-right">{notes}</span>
                </div>
              )}
            </div>
            {!paymentProof?.secure_url &&
              (!details ||
                Object.keys(details).every(
                  (key) =>
                    key === "depositWalletAddress" ||
                    key === "withdrawalWalletAddress" ||
                    key === "planName" ||
                    key === "paymentProof"
                )) &&
              !planName &&
              !notes && (
                <p className="text-gray-500 italic text-center mt-4">
                  No additional details available.
                </p>
              )}
          </div>
        )}

        {/* Admin Actions */}
        <div className="mt-8 p-6 rounded-lg bg-gray-800 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white">Actions</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Download Receipt Button */}
            <button
              onClick={handleDownloadReceipt}
              className={`flex-1 px-6 py-3 rounded-lg text-white transition duration-200 font-semibold bg-blue-600 flex items-center justify-center
                          ${
                            canDownloadReceipt
                              ? "hover:bg-blue-700"
                              : "opacity-50 cursor-not-allowed"
                          }
                         `}
              disabled={!canDownloadReceipt || loading || deleting}
            >
              <Download size={20} className="mr-2" /> Download Receipt
            </button>

            {status?.toLowerCase() === "pending" ? (
              <>
                <button
                  onClick={() => handleAction("approve")}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || deleting}
                >
                  {loading &&
                  dispatch(
                    updateTransactionStatus.pending({
                      id: transactionId,
                      action: "approve",
                    })
                  ).type === updateTransactionStatus.pending.type ? (
                    <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  ) : (
                    <CheckCircle size={20} className="mr-2" />
                  )}
                  Approve Transaction
                </button>
                <button
                  onClick={() => handleAction("decline")}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || deleting}
                >
                  {loading &&
                  dispatch(
                    updateTransactionStatus.pending({
                      id: transactionId,
                      action: "decline",
                    })
                  ).type === updateTransactionStatus.pending.type ? (
                    <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  ) : (
                    <XCircle size={20} className="mr-2" />
                  )}
                  Decline Transaction
                </button>
              </>
            ) : (
              <div className="flex-1 text-center text-gray-400 italic flex items-center justify-center py-3">
                This transaction is already {status}.
              </div>
            )}
            {/* Delete Transaction Button - Always available, but with confirmation */}
            <button
              onClick={openDeleteConfirmModal}
              className="mt-4 sm:mt-0 flex-1 px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || deleting} // Disable if loading or currently deleting
            >
              {deleting ? (
                <Loader2 className="animate-spin w-5 h-5 mr-2" />
              ) : (
                <Trash2 size={20} className="mr-2" />
              )}
              Delete Transaction
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-gray-800 text-white rounded-xl p-8 w-full max-w-md shadow-2xl border border-gray-700 relative scale-in-center">
            <h3 className="text-2xl font-bold mb-4 text-center text-red-400">
              Confirm Deletion
            </h3>
            <p className="mb-6 text-center text-lg text-gray-300">
              Are you absolutely sure you want to delete this{" "}
              <span className="capitalize font-semibold">
                {selectedTransaction.type}
              </span>{" "}
              transaction for{" "}
              <strong className="text-blue-400">
                {formatMoney(
                  selectedTransaction?.amount,
                  selectedTransaction?.user?.currency
                )}
              </strong>{" "}
              from user{" "}
              <span className="font-semibold text-amber-400">
                {selectedTransaction.user?.fullName ||
                  selectedTransaction.user?.email ||
                  "N/A"}
              </span>
              ?
            </p>
            <p className="text-center text-sm text-red-300 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <button
                onClick={closeDeleteConfirmModal}
                className="flex-1 px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition duration-200 font-semibold"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-6 py-3 rounded-lg text-white transition duration-200 font-semibold bg-red-600 hover:bg-red-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={deleting}
              >
                {deleting ? (
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                ) : (
                  <Trash2 size={20} className="mr-2" />
                )}
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTransactionDetail;
