import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  updateTransactionStatus,
} from "../../features/transaction/transaction";

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
  console.log(items);
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
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">All Transactions</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <svg
            className="w-12 h-12 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-divider text-center">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Details</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((txn) => (
                  <tr key={txn._id} className="border-t border-divider">
                    <td className="p-3">
                      {txn.user?.fullName || txn.details?.name || "N/A"}
                    </td>
                    <td className="p-3 capitalize">{txn.type}</td>
                    <td className="p-3">
                      {formatMoney(txn?.amount, txn?.user?.currency)}
                    </td>

                    <td className="p-3">{txn.method || "—"}</td>
                    <td className="p-3 text-left max-w-xs whitespace-pre-wrap break-words">
                      {txn.details
                        ? Object.entries(txn.details)
                            .map(([key, value]) => `${key}: ${value}`)
                            .join("\n")
                        : "—"}
                    </td>
                    <td className="p-3 capitalize">{txn.status}</td>
                    <td className="p-3 space-x-2 space-y-2">
                      {txn.status === "pending" ? (
                        <>
                          <button
                            onClick={() => openModal(txn, "approve")}
                            className="px-3 py-1 bg-green-600 rounded hover:opacity-80"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => openModal(txn, "decline")}
                            className="px-3 py-1 bg-red-600 rounded hover:opacity-80"
                          >
                            Decline
                          </button>
                        </>
                      ) : (
                        <span>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modal (in the same component) */}
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
                {formatCurrency(
                  selectedTx.amount,
                  selectedTx.currency || "USD"
                )}
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
