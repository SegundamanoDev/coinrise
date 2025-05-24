import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  updateTransactionStatus,
} from "../../features/transaction/transaction";

const AdminTransactions = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleAction = (id, action) => {
    if (
      window.confirm(`Are you sure you want to ${action} this transaction?`)
    ) {
      dispatch(updateTransactionStatus({ id, action }));
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">All Transactions</h2>
      {loading && <p>Loading...</p>}
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
                <td className="p-3">${txn.amount.toFixed(2)}</td>
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
                        onClick={() => handleAction(txn._id, "approve")}
                        className="px-3 py-1 bg-green-600 rounded hover:opacity-80"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(txn._id, "decline")}
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
    </div>
  );
};

export default AdminTransactions;
