// components/Transactions.js

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Info,
  Loader2,
  X,
  Calendar, // Added for date icon
  DollarSign, // Added for amount icon
  Tag, // Added for type icon
  CreditCard, // Added for method icon
  CheckCircle, // Added for status icon
} from "lucide-react";
import {
  fetchUserTransactions,
  fetchTransactionById,
} from "../features/transaction/transaction";

// --- Helper Objects (No Change Needed, keep them as is) ---
const typeColors = {
  deposit: "text-green-500",
  withdrawal: "text-red-500",
  invest: "text-blue-500",
  "referral bonus": "text-purple-500",
  // Add other types if you have them, e.g., 'investment return'
  "investment return": "text-emerald-500",
};

const statusColors = {
  completed: "bg-green-600/20 text-green-400", // Darker background for dark theme
  pending: "bg-yellow-600/20 text-yellow-400",
  failed: "bg-red-600/20 text-red-400",
};

const negativeTypes = ["withdrawal", "invest"];
const positiveTypes = ["deposit", "referral bonus", "investment return"];

const formatMoney = (amount, currency = "USD") => {
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount || 0);
  } catch (error) {
    // Fallback for environments where Intl.NumberFormat might fail
    return `${currency} ${parseFloat(amount || 0).toFixed(2)}`;
  }
};
// --- End Helper Objects ---

const Transactions = () => {
  const dispatch = useDispatch();
  // Get theme from Redux, assuming it's in state.ui.theme
  const theme = useSelector((state) => state.ui?.theme || "dark");

  const { userTransactions, loading, error, selectedTransaction } = useSelector(
    (state) => state.transaction
  );
  const { user } = useSelector((state) => state.auth);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTxId, setSelectedTxId] = useState(null);

  // Fetch all tx .user?transactions on component mount
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
            // const isPositive = positiveTypes.includes(type); // Not strictly needed here, `isNegative` is enough
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
                      {type === "deposit" ||
                      type === "referral bonus" ||
                      type === "investment return" ? (
                        <ArrowDownCircle className="text-green-400" size={24} />
                      ) : (
                        <ArrowUpCircle className="text-red-400" size={24} />
                      )}
                      <div>
                        <div className="text-white font-semibold capitalize">
                          {tx.type} {tx.method ? `(${tx.method})` : ""}
                        </div>
                        <div className="text-xs text-gray-400">
                          {format(new Date(tx.createdAt), "PP")}{" "}
                          {/* Date format: May 28, 2025 */}
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
                        {formatMoney(tx?.amount, user?.currency)}
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
                    {type === "deposit" ||
                    type === "referral bonus" ||
                    type === "investment return" ? (
                      <ArrowDownCircle className="text-green-400" size={24} />
                    ) : (
                      <ArrowUpCircle className="text-red-400" size={24} />
                    )}
                    <div>
                      <div className={`font-medium capitalize ${typeClass}`}>
                        {tx.type}
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
                    {format(new Date(tx.createdAt), "PPp")}{" "}
                    {/* Date and time format: May 28, 2025 at 10:49 PM */}
                  </div>

                  {/* Amount */}
                  <div
                    className={`text-lg font-bold text-right ${
                      isNegative ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {prefix}
                    {formatMoney(tx?.amount, user?.currency)}
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
                      {selectedTransaction.type}
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
                        selectedTransaction?.user?.currency
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

                  {selectedTransaction.description && ( // Display description if available
                    <div className="pb-2 border-b border-dashed border-divider">
                      <p className="text-sm font-semibold text-textSecondary flex items-center gap-2 mb-1">
                        <Info size={16} /> Description
                      </p>
                      <p className="text-base text-textPrimary pl-6">
                        {selectedTransaction.description}
                      </p>
                    </div>
                  )}

                  {selectedTransaction.transactionId && ( // Display transaction ID if available
                    <div className="pb-2 border-b border-dashed border-divider">
                      <p className="text-sm font-semibold text-textSecondary flex items-center gap-2 mb-1">
                        <Tag size={16} /> Transaction ID
                      </p>
                      <p className="text-base text-textPrimary pl-6 break-all">
                        {selectedTransaction.transactionId}
                      </p>
                    </div>
                  )}

                  {selectedTransaction.paymentProof && ( // Display payment proof link if available
                    <div className="pb-2">
                      <p className="text-sm font-semibold text-textSecondary flex items-center gap-2 mb-1">
                        <Info size={16} /> Payment Proof
                      </p>
                      <a
                        href={selectedTransaction.paymentProof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-blue-400 hover:underline pl-6 text-sm`}
                      >
                        View Proof
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Transactions;
