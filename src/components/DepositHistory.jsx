// components/DepositHistory.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDeposits } from "../features/transaction/transaction";
import { format } from "date-fns";

const DepositHistory = () => {
  const dispatch = useDispatch();
  const { userTransactions, loading, error } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchUserDeposits());
  }, [dispatch]);

  return (
    <div className="bg-black text-white p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Deposit History</h2>

      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && userTransactions.length === 0 && (
        <p className="text-gray-400">No deposit history found.</p>
      )}

      {!loading && userTransactions.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Coin</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {userTransactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="border-b border-gray-800 hover:bg-gray-900 transition"
                >
                  <td className="py-2 px-4">${tx.amount.toFixed(2)}</td>
                  <td className="py-2 px-4">{tx.coin}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        tx.status === "approved"
                          ? "bg-green-600 text-white"
                          : tx.status === "pending"
                          ? "bg-yellow-500 text-black"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    {format(new Date(tx.createdAt), "dd MMM yyyy, HH:mm")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DepositHistory;
