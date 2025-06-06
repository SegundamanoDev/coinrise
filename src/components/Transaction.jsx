// components/Transactions.js

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  ArrowDownCircle, // Used for positive transactions (funds coming in)
  ArrowUpCircle, // Used for negative transactions (funds going out)
  Info,
  Loader2,
  X,
  Calendar,
  DollarSign,
  Tag,
  CreditCard,
  CheckCircle,
  Download, // New icon for download
  ExternalLink, // For payment proof link
} from "lucide-react";
import {
  fetchUserTransactions,
  fetchTransactionById,
} from "../features/transaction/transaction";

// --- Helper Objects (UPDATED to include 'investment_payout') ---
const typeColors = {
  deposit: "text-green-500",
  withdrawal: "text-red-500",
  invest: "text-blue-500",
  "referral bonus": "text-purple-500",
  investment_payout: "text-emerald-500",
  upgrade_deposit: "text-orange-500",
  profit: "text-sky-500",
};

const statusColors = {
  completed: "bg-green-600/20 text-green-400", // Darker background for dark theme
  approved: "bg-green-600/20 text-green-400", // Treat approved the same as completed for display
  pending: "bg-yellow-600/20 text-yellow-400",
  failed: "bg-red-600/20 text-red-400",
  declined: "bg-red-600/20 text-red-400", // Treat declined the same as failed for display
};

const negativeTypes = ["withdrawal", "invest"];
const positiveTypes = [
  "deposit",
  "referral bonus",
  "investment_payout",
  "upgrade_deposit",
  "profit",
];

const formatMoney = (amount, currency = "USD") => {
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2, // Ensure always 2 decimal places
    }).format(amount || 0);
  } catch (error) {
    // Fallback for environments where Intl.NumberFormat might fail
    console.error("Error formatting currency:", error);
    return `${currency} ${parseFloat(amount || 0).toFixed(2)}`;
  }
};
// --- End Helper Objects ---

const Transactions = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui?.theme || "dark");

  const { userTransactions, loading, error, selectedTransaction } = useSelector(
    (state) => state.transaction
  );
  // Ensure user is loaded from auth slice for default currency
  const { user } = useSelector((state) => state.auth);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTxId, setSelectedTxId] = useState(null);

  // Fetch all user transactions on component mount
  useEffect(() => {
    dispatch(fetchUserTransactions());
  }, [dispatch]);

  // Fetch details for a specific transaction when selectedTxId changes
  useEffect(() => {
    if (selectedTxId) {
      dispatch(fetchTransactionById(selectedTxId));
    }
  }, [dispatch, selectedTxId]);

  const handleOpenModal = (id) => {
    setSelectedTxId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTxId(null);
    setModalOpen(false);
  };

  // --- NEW: Handle Download Receipt ---
  const handleDownloadReceipt = () => {
    if (!selectedTransaction) {
      return;
    }

    const {
      type,
      amount,
      status,
      createdAt,
      method, // Now holds coin symbol for crypto transactions
      coin, // This field will still hold the coin symbol for deposits/upgrades
      transactionId,
      description,
      paymentProof,
      details,
    } = selectedTransaction;

    const displayAmount = formatMoney(
      amount,
      selectedTransaction?.user?.currency || user?.currency
    );
    const displayDate = format(new Date(createdAt), "PPpp");
    const displayType = type
      .replace(/_/g, " ")
      .replace("deposit", "Deposit")
      .replace("withdrawal", "Withdrawal")
      .replace("invest", "Investment")
      .replace("bonus", "Bonus")
      .replace("payout", "Payout");
    const displayMethod = method || coin || "N/A"; // Use `method` (coin symbol) or `coin` as fallback

    let receiptContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 20px auto; padding: 30px; border: 1px solid #eee; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); background-color: #fff; color: #333;">
        <h2 style="text-align: center; color: #2a64c0; margin-bottom: 25px; border-bottom: 2px solid #e0e0e0; padding-bottom: 15px;">Transaction Receipt</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; font-weight: 600; color: #555;">Transaction Type:</td>
            <td style="padding: 10px 0; text-align: right; text-transform: capitalize; color: ${
              typeColors[type.toLowerCase()] || "#333"
            };"><strong>${displayType}</strong></td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; font-weight: 600; color: #555;">Amount:</td>
            <td style="padding: 10px 0; text-align: right; font-weight: bold; color: ${
              negativeTypes.includes(type.toLowerCase()) ? "#e53e3e" : "#38a169"
            };">${
      negativeTypes.includes(type.toLowerCase()) ? "−" : "+"
    }${displayAmount}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; font-weight: 600; color: #555;">Status:</td>
            <td style="padding: 10px 0; text-align: right; text-transform: capitalize; color: ${
              statusColors[status.toLowerCase()]?.split(" ")[1] || "#333"
            };"><strong>${status}</strong></td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; font-weight: 600; color: #555;">Date & Time:</td>
            <td style="padding: 10px 0; text-align: right;">${displayDate}</td>
          </tr>
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; font-weight: 600; color: #555;">Method/Coin:</td>
            <td style="padding: 10px 0; text-align: right;">${displayMethod}</td>
          </tr>
          ${
            transactionId
              ? `
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; font-weight: 600; color: #555;">Transaction ID:</td>
            <td style="padding: 10px 0; text-align: right; word-break: break-all;">${transactionId}</td>
          </tr>
          `
              : ""
          }
          ${
            description
              ? `
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; font-weight: 600; color: #555;">Description:</td>
            <td style="padding: 10px 0; text-align: right;">${description}</td>
          </tr>
          `
              : ""
          }
          ${
            paymentProof && paymentProof.secure_url
              ? `
          <tr style="border-bottom: 1px solid #eee;">
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
              <td colspan="2" style="padding-top: 15px; font-weight: 600; color: #555; text-align: center;">Additional Details:</td>
            </tr>
            ${Object.entries(details)
              .map(([key, value]) => {
                // Ensure wallet address and paymentProof aren't duplicated if they are in `details`
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
        
        <p style="text-align: center; color: #888; font-size: 12px; margin-top: 20px;">Generated on ${format(
          new Date(),
          "PPpp"
        )}</p>
        <p style="text-align: center; color: #888; font-size: 12px;">Thank you for your transaction!</p>
      </div>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(receiptContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print(); // Opens the print dialog
    } else {
      alert("Please allow pop-ups to download the receipt."); // Using alert here for direct user instruction on pop-up blocker
    }
  };
  // --- END NEW: Handle Download Receipt ---

  return (
    <div
      className={`p-4 md:p-8 min-h-screen font-poppins
      ${
        theme === "dark"
          ? "bg-darkBackground text-textPrimary"
          : "bg-gray-100 text-gray-900"
      }
    `}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-textPrimary">
        Transaction History
      </h1>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-20 min-h-[300px]">
          <Loader2 className="animate-spin w-10 h-10 text-blue-500 mb-4" />
          <p className="text-lg text-textSecondary">Loading transactions...</p>
        </div>
      ) : error ? (
        <div
          className={`p-6 rounded-2xl shadow-lg border text-center
          ${
            theme === "dark"
              ? "bg-cardBackground border-red-800 text-red-400"
              : "bg-red-100 border-red-300 text-red-700"
          }
        `}
        >
          <p className="text-lg font-semibold mb-2">
            Error Loading Transactions
          </p>
          <p className="text-sm">{error}</p>
        </div>
      ) : userTransactions.length === 0 ? (
        <div
          className={`p-6 rounded-2xl shadow-lg border text-center flex flex-col items-center justify-center min-h-[300px]
          ${
            theme === "dark"
              ? "bg-cardBackground border-borderColor text-textSecondary"
              : "bg-white border-gray-200 text-gray-600"
          }
        `}
        >
          <Info className="w-12 h-12 mb-4 text-blue-500" />
          <p className="text-xl font-semibold">No transactions found</p>
          <p className="text-sm mt-2">
            Your transaction history will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Table Header for larger screens */}
          <div
            className={`hidden md:grid grid-cols-[1.5fr_1fr_1.5fr_1fr_0.8fr] gap-4 p-4 rounded-xl font-semibold text-sm
            ${
              theme === "dark"
                ? "bg-cardBackground text-textSecondary"
                : "bg-gray-200 text-gray-700"
            }
          `}
          >
            <div>Type & Method</div>
            <div>Date</div>
            <div className="text-right">Amount</div>
            <div className="text-center">Status</div>
            <div></div> {/* For click indicator/spacing */}
          </div>

          {/* Transaction List */}
          {userTransactions.map((tx) => {
            const type = tx.type.toLowerCase();
            // Using `method` as title if description is not available
            const title = tx.description || tx.method || tx.type;
            const typeClass = typeColors[type] || "text-gray-400";
            const statusClass =
              statusColors[tx.status.toLowerCase()] ||
              "bg-gray-100 text-gray-700";
            const isNegative = negativeTypes.includes(type);
            const prefix = isNegative ? "−" : "+"; // Always show prefix for positive types

            return (
              <div
                key={tx._id}
                className={`rounded-2xl shadow-lg border p-4 cursor-pointer transition-transform duration-200 hover:scale-[1.005]
                ${
                  theme === "dark"
                    ? "bg-cardBackground border-borderColor hover:bg-[#1f2937]"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }
              `}
                onClick={() => handleOpenModal(tx._id)}
              >
                {/* Mobile View */}
                <div className="flex flex-col gap-2 md:hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Use positiveTypes for green arrow, others get red */}
                      {positiveTypes.includes(type) ? (
                        <ArrowDownCircle className="text-green-400" size={24} />
                      ) : (
                        <ArrowUpCircle className="text-red-400" size={24} />
                      )}
                      <div>
                        <div className="text-white font-semibold capitalize">
                          {tx.type.replace(/_/g, " ")}{" "}
                          {/* Replace underscores for display */}
                          {tx.method ? `(${tx.method})` : ""}
                        </div>
                        <div className="text-xs text-gray-400">
                          {format(new Date(tx.createdAt), "PP")}{" "}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${
                          isNegative ? "text-red-400" : "text-green-400"
                        }`}
                      >
                        {prefix}
                        {formatMoney(
                          tx?.amount,
                          tx?.user?.currency || user?.currency
                        )}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium mt-1 inline-block ${statusClass}`}
                      >
                        {tx.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:grid grid-cols-[1.5fr_1fr_1.5fr_1fr_0.8fr] items-center gap-4">
                  {/* Type & Method */}
                  <div className="flex items-center gap-3">
                    {/* Use positiveTypes for green arrow, others get red */}
                    {positiveTypes.includes(type) ? (
                      <ArrowDownCircle className="text-green-400" size={24} />
                    ) : (
                      <ArrowUpCircle className="text-red-400" size={24} />
                    )}
                    <div>
                      <div className={`font-medium capitalize ${typeClass}`}>
                        {tx.type.replace(/_/g, " ")}{" "}
                        {/* Replace underscores for display */}
                      </div>
                      <div className="text-xs text-textSecondary opacity-75">
                        {tx.method || "N/A"}
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="text-sm text-textSecondary flex items-center gap-2">
                    <Calendar
                      size={16}
                      className="text-textSecondary opacity-60"
                    />
                    {format(new Date(tx.createdAt), "PPpp")}{" "}
                  </div>

                  {/* Amount */}
                  <div
                    className={`text-lg font-bold text-right ${
                      isNegative ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {prefix}
                    {formatMoney(
                      tx?.amount,
                      tx?.user?.currency || user?.currency
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex justify-center">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${statusClass}`}
                    >
                      {tx.status}
                    </span>
                  </div>

                  {/* Action/Info */}
                  <div className="flex justify-end pr-2">
                    <Info
                      size={18}
                      className="text-blue-400 hover:text-blue-300"
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Transaction Details Modal */}
          {modalOpen && selectedTransaction && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center p-4">
              <div
                className={`rounded-2xl shadow-lg border max-w-md w-full p-6 relative
                ${
                  theme === "dark"
                    ? "bg-cardBackground border-borderColor text-textPrimary"
                    : "bg-white border-gray-200 text-gray-900"
                }
              `}
              >
                <button
                  className={`absolute top-4 right-4 p-1 rounded-full transition-colors duration-200
                    ${
                      theme === "dark"
                        ? "text-textSecondary hover:bg-[#28374d]"
                        : "text-gray-600 hover:bg-gray-200"
                    }
                  `}
                  onClick={handleCloseModal}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
                <h3 className="text-xl font-bold mb-6 text-textPrimary">
                  Transaction Details
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-dashed border-divider">
                    <p className="text-sm font-semibold text-textSecondary flex items-center gap-2">
                      <Tag size={16} /> Type
                    </p>
                    <p
                      className={`text-base font-medium capitalize ${
                        typeColors[selectedTransaction.type.toLowerCase()]
                      }`}
                    >
                      {selectedTransaction.type.replace(/_/g, " ")}{" "}
                      {/* Replace underscores */}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-dashed border-divider">
                    <p className="text-sm font-semibold text-textSecondary flex items-center gap-2">
                      <CreditCard size={16} /> Method
                    </p>
                    <p className="text-base font-medium">
                      {selectedTransaction.method || "N/A"}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-dashed border-divider">
                    <p className="text-sm font-semibold text-textSecondary flex items-center gap-2">
                      <CheckCircle size={16} /> Status
                    </p>
                    <span
                      className={`text-sm px-3 py-1 rounded-full font-medium ${
                        statusColors[selectedTransaction.status.toLowerCase()]
                      }`}
                    >
                      {selectedTransaction.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-dashed border-divider">
                    <p className="text-sm font-semibold text-textSecondary flex items-center gap-2">
                      <DollarSign size={16} /> Amount
                    </p>
                    <p
                      className={`text-base font-bold ${
                        negativeTypes.includes(
                          selectedTransaction.type.toLowerCase()
                        )
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {negativeTypes.includes(
                        selectedTransaction.type.toLowerCase()
                      )
                        ? "−"
                        : "+"}
                      {formatMoney(
                        selectedTransaction.amount,
                        selectedTransaction?.user?.currency || user?.currency
                      )}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-dashed border-divider">
                    <p className="text-sm font-semibold text-textSecondary flex items-center gap-2">
                      <Calendar size={16} /> Date
                    </p>
                    <p className="text-base font-medium">
                      {format(new Date(selectedTransaction.createdAt), "PPpp")}
                    </p>
                  </div>

                  {selectedTransaction.description && (
                    <div className="pb-2 border-b border-dashed border-divider">
                      <p className="text-sm font-semibold text-textSecondary flex items-center gap-2 mb-1">
                        <Info size={16} /> Description
                      </p>
                      <p className="text-base text-textPrimary pl-6">
                        {selectedTransaction.description}
                      </p>
                    </div>
                  )}

                  {selectedTransaction.transactionId && (
                    <div className="pb-2 border-b border-dashed border-divider">
                      <p className="text-sm font-semibold text-textSecondary flex items-center gap-2 mb-1">
                        <Tag size={16} /> Transaction ID
                      </p>
                      <p className="text-base text-textPrimary pl-6 break-all">
                        {selectedTransaction.transactionId}
                      </p>
                    </div>
                  )}

                  {/* Payment Proof Link for Deposits/Upgrades */}
                  {selectedTransaction.paymentProof?.secure_url && (
                    <div className="pb-2 border-b border-dashed border-divider">
                      <p className="text-sm font-semibold text-textSecondary flex items-center gap-2 mb-1">
                        <Info size={16} /> Payment Proof
                      </p>
                      <a
                        href={selectedTransaction.paymentProof.secure_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-blue-400 hover:underline pl-6 text-sm flex items-center gap-1`}
                      >
                        View Proof <ExternalLink size={14} />
                      </a>
                    </div>
                  )}

                  {/* Display deposit/withdrawal wallet addresses from details */}
                  {selectedTransaction.details?.depositWalletAddress && (
                    <div className="pb-2 border-b border-dashed border-divider">
                      <p className="text-sm font-semibold text-textSecondary flex items-center gap-2 mb-1">
                        <Tag size={16} /> Deposit Address
                      </p>
                      <p className="text-base text-textPrimary pl-6 break-all">
                        {selectedTransaction.details.depositWalletAddress}
                      </p>
                    </div>
                  )}
                  {selectedTransaction.details?.withdrawalWalletAddress && (
                    <div className="pb-2 border-b border-dashed border-divider">
                      <p className="text-sm font-semibold text-textSecondary flex items-center gap-2 mb-1">
                        <Tag size={16} /> Withdrawal Address
                      </p>
                      <p className="text-base text-textPrimary pl-6 break-all">
                        {selectedTransaction.details.withdrawalWalletAddress}
                      </p>
                    </div>
                  )}

                  {/* Display details for investment_payout */}
                  {selectedTransaction.type === "investment_payout" &&
                    selectedTransaction.details && (
                      <>
                        <div className="pb-2 border-b border-dashed border-divider">
                          <p className="text-sm font-semibold text-textSecondary flex items-center gap-2 mb-1">
                            <Tag size={16} /> Investment Plan
                          </p>
                          <p className="text-base text-textPrimary pl-6">
                            {selectedTransaction.details.planName || "N/A"}
                          </p>
                        </div>
                        <div className="pb-2 border-b border-dashed border-divider">
                          <p className="text-sm font-semibold text-textSecondary flex items-center gap-2 mb-1">
                            <DollarSign size={16} /> Principal Amount
                          </p>
                          <p className="text-base text-textPrimary pl-6">
                            {formatMoney(
                              selectedTransaction.details.principalAmount,
                              selectedTransaction?.user?.currency ||
                                user?.currency
                            )}
                          </p>
                        </div>
                        <div className="pb-2">
                          <p className="text-sm font-semibold text-textSecondary flex items-center gap-2 mb-1">
                            <DollarSign size={16} /> ROI Amount
                          </p>
                          <p className="text-base text-textPrimary pl-6">
                            {formatMoney(
                              selectedTransaction.details.roiAmount,
                              selectedTransaction?.user?.currency ||
                                user?.currency
                            )}
                          </p>
                        </div>
                      </>
                    )}
                </div>
                {/* Download Button */}
                <button
                  onClick={handleDownloadReceipt}
                  className={`w-full mt-6 py-3 px-4 rounded-xl font-semibold flex items-center justify-center transition duration-200
                  ${
                    theme === "dark"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }
                  `}
                >
                  <Download size={20} className="mr-2" /> Download Receipt
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Transactions;
