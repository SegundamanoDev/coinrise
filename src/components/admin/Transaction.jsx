import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import {
  fetchTransactions,
  updateTransactionStatus,
} from "../../features/transaction/transaction";
import { ArrowDownCircle, ArrowUpCircle, Info, Loader2 } from "lucide-react";

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

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto text-white">
      {" "}
      <h2 className="text-2xl font-semibold mb-6">All Transactions</h2>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin w-8 h-8 text-white" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : items.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          <Info className="mx-auto w-8 h-8 mb-2" />
          No transactions found.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((tx) => {
            const type = tx.type.toLowerCase();
            const isNegative = ["withdrawal", "invest"].includes(type);
            const isPositive = [
              "deposit",
              "referral bonus",
              "investment return",
            ].includes(type);
            const prefix = isNegative ? "−" : isPositive ? "" : "";
            const statusStyles = {
              completed: "bg-green-100 text-green-700",
              pending: "bg-yellow-100 text-yellow-700",
              failed: "bg-red-100 text-red-700",
            };
            const statusStyle =
              statusStyles[tx.status.toLowerCase()] ||
              "bg-gray-100 text-gray-700";

            return (
              <div
                key={tx._id}
                className="bg-gray-900 rounded-xl p-4 shadow-sm flex items-start justify-between flex-wrap md:flex-nowrap gap-4"
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  {type === "deposit" ? (
                    <ArrowDownCircle className="text-green-400" size={24} />
                  ) : (
                    <ArrowUpCircle className="text-red-400" size={24} />
                  )}
                  <div>
                    <div className="font-semibold text-white capitalize">
                      {tx.type}
                    </div>
                    <div className="text-sm text-gray-400">
                      {format(new Date(tx.createdAt), "PPpp")}
                    </div>
                  </div>
                </div>

                <div className="text-lg font-semibold w-full md:w-48 text-right md:text-left">
                  <span
                    className={isNegative ? "text-red-400" : "text-green-400"}
                  >
                    {prefix}
                    {formatMoney(tx?.amount, tx?.user?.currency)}
                  </span>
                  <div className="text-sm text-gray-400">
                    {tx.method || "—"}
                  </div>
                </div>

                <div className="text-sm text-gray-300 w-full md:flex-1">
                  {tx.details
                    ? Object.entries(tx.details).map(([key, value]) => {
                        let formattedKey = key
                          .replace(/([A-Z])/g, " $1")
                          .toLowerCase();
                        if (formattedKey.includes("date")) {
                          try {
                            value = format(new Date(value), "PPpp");
                          } catch (e) {}
                        }
                        return (
                          <div key={key} className="mb-1">
                            <span className="text-gray-400 font-medium">
                              {formattedKey}:
                            </span>{" "}
                            <span className="break-words">{value}</span>
                          </div>
                        );
                      })
                    : "—"}
                </div>

                <div
                  className={`text-xs px-3 py-1 rounded-full w-max ${statusStyle}`}
                >
                  {tx.status}
                </div>

                <div className="space-x-2 mt-2 md:mt-0">
                  {tx.status === "pending" ? (
                    <>
                      <button
                        onClick={() => openModal(tx, "approve")}
                        className="px-3 py-1 bg-green-600 rounded hover:opacity-80"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => openModal(tx, "decline")}
                        className="px-3 py-1 bg-red-600 rounded hover:opacity-80"
                      >
                        Decline
                      </button>
                    </>
                  ) : (
                    <span>—</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {modalOpen && selectedTx && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Confirm {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
            </h3>
            <p className="mb-6">
              Are you sure you want to <strong>{actionType}</strong> this
              transaction for{" "}
              <strong>
                {formatMoney(selectedTx?.amount, selectedTx?.user?.currency)}
              </strong>
              ?
            </p>

            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`px-4 py-2 rounded ${
                  actionType === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                } text-white`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTransactions;
