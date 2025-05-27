import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserTransactions,
  fetchTransactionById,
} from "../features/transaction/transaction";
import { format } from "date-fns";
import { ArrowDownCircle, ArrowUpCircle, Info, Loader2, X } from "lucide-react";

const typeColors = {
  deposit: "text-green-500",
  withdrawal: "text-red-500",
  invest: "text-blue-500",
  "referral bonus": "text-purple-500",
};

const statusColors = {
  completed: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-700",
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
    return `${currency} ${parseFloat(amount || 0).toFixed(2)}`;
  }
};

const Transactions = () => {
  const dispatch = useDispatch();
  const { userTransactions, loading, error, selectedTransaction } = useSelector(
    (state) => state.transaction
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTxId, setSelectedTxId] = useState(null);

  useEffect(() => {
    dispatch(fetchUserTransactions());
  }, [dispatch]);

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
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-white">
        Recent Transactions
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin w-8 h-8 text-white" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : userTransactions.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          <Info className="mx-auto w-8 h-8 mb-2" />
          No transactions found.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="hidden md:grid grid-cols-5 text-sm font-semibold text-gray-400 px-4 mb-2">
            <div>Title</div>
            <div>Type</div>
            <div>Date</div>
            <div>Amount</div>
            <div>Status</div>
          </div>

          {userTransactions.map((tx) => {
            const type = tx.type.toLowerCase();
            const typeColor = typeColors[type] || "text-gray-400";
            const statusStyle =
              statusColors[tx.status.toLowerCase()] ||
              "bg-gray-100 text-gray-700";
            const isNegative = negativeTypes.includes(type);
            const isPositive = positiveTypes.includes(type);
            const prefix = isNegative ? "−" : isPositive ? "+" : "";

            return (
              <div
                key={tx._id}
                className="bg-gray-900 rounded-xl p-4 shadow-sm cursor-pointer hover:bg-gray-800"
                onClick={() => handleOpenModal(tx._id)}
              >
                <div className="flex flex-col gap-2 md:hidden">
                  <div className="flex items-center gap-3">
                    {type === "deposit" ? (
                      <ArrowDownCircle className="text-green-400" size={24} />
                    ) : (
                      <ArrowUpCircle className="text-red-400" size={24} />
                    )}
                    <div className="flex-1">
                      <div className="text-white font-semibold capitalize">
                        {tx.type}
                      </div>
                      <div className="text-xs text-gray-400">
                        {format(new Date(tx.createdAt), "PP")}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-right">
                      <div
                        className={`${
                          isNegative ? "text-red-400" : "text-green-400"
                        }`}
                      >
                        {prefix}
                        {formatMoney(tx?.amount, tx?.user?.currency)}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>{tx.method || "—"}</span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${statusStyle}`}
                    >
                      {tx.status}
                    </span>
                  </div>
                </div>

                <div className="hidden md:grid grid-cols-5 items-center gap-4">
                  <div className="flex items-center gap-3">
                    {type === "deposit" ? (
                      <ArrowDownCircle className="text-green-400" size={24} />
                    ) : (
                      <ArrowUpCircle className="text-red-400" size={24} />
                    )}
                    <div>
                      <div className="text-white font-medium capitalize">
                        {tx.type}
                      </div>
                      <div className="text-xs text-gray-400">
                        {format(new Date(tx.createdAt), "pp")}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-300 capitalize">
                    {tx.method || "—"}
                  </div>
                  <div className="text-sm text-gray-300">
                    {format(new Date(tx.createdAt), "PP")}
                  </div>
                  <div
                    className={`text-sm font-semibold ${
                      isNegative ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {prefix}
                    {formatMoney(tx?.amount, tx?.user?.currency)}
                  </div>
                  <div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${statusStyle}`}
                    >
                      {tx.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Modal for transaction details */}
          {modalOpen && selectedTransaction && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-black"
                  onClick={handleCloseModal}
                >
                  <X size={20} />
                </button>
                <h3 className="text-lg font-semibold mb-4">
                  Transaction Details
                </h3>
                <p>
                  <strong>Type:</strong> {selectedTransaction.type}
                </p>
                <p>
                  <strong>Method:</strong> {selectedTransaction.method || "—"}
                </p>
                <p>
                  <strong>Status:</strong> {selectedTransaction.status}
                </p>
                <p>
                  <strong>Amount:</strong>{" "}
                  {formatMoney(
                    selectedTransaction.amount,
                    selectedTransaction?.user?.currency
                  )}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {format(new Date(selectedTransaction.createdAt), "PPpp")}
                </p>
                {selectedTransaction.note && (
                  <p>
                    <strong>Note:</strong> {selectedTransaction.note}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Transactions;
