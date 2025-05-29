import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDeposits } from "../features/transaction/transaction";
import { format } from "date-fns";
import { DollarSign, Clock, CheckCircle, XCircle } from "lucide-react"; // Import new icons

const DepositHistory = () => {
  const dispatch = useDispatch();
  const { userTransactions, loading, error } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchUserDeposits());
  }, [dispatch]);

  // Helper function for status styling
  const getStatusClasses = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-600 text-white";
      case "pending":
        return "bg-yellow-500 text-black";
      case "rejected":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="bg-[#1a1a1a] text-white p-6 rounded-xl shadow-2xl border border-[#333]">
      <h2 className="text-2xl font-bold mb-6 text-center lg:text-left">
        Your Deposit History
      </h2>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <svg
            className="animate-spin h-8 w-8 text-blue-400"
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="ml-3 text-gray-400 text-lg">Loading deposits...</p>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-8 text-red-500">
          <XCircle className="w-6 h-6 mr-2" />
          <p className="text-lg">Error loading history: {error}</p>
        </div>
      )}

      {!loading && !error && userTransactions.length === 0 && (
        <div className="text-center py-12 bg-[#222] rounded-lg border border-dashed border-[#444]">
          <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-500" />
          <p className="text-lg text-gray-400 font-medium">
            No deposit history found yet.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Make your first deposit to see it here!
          </p>
        </div>
      )}

      {!loading && !error && userTransactions.length > 0 && (
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full text-sm sm:text-base border-collapse">
            <thead>
              <tr className="bg-[#2a2a2a] text-gray-300 uppercase text-left tracking-wider">
                <th className="py-3 px-4 rounded-tl-lg">Amount</th>
                <th className="py-3 px-4">Coin</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 rounded-tr-lg">Date</th>
              </tr>
            </thead>
            <tbody>
              {userTransactions.map((tx, index) => (
                <tr
                  key={tx._id}
                  className={`border-b border-[#333] ${
                    index % 2 === 0 ? "bg-[#1f1f1f]" : "bg-[#222]"
                  } hover:bg-[#2c2c2c] transition duration-200 ease-in-out`}
                >
                  <td className="py-3 px-4 font-semibold text-green-400">
                    + ${tx.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 uppercase">{tx.coin}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusClasses(
                        tx.status
                      )}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">
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
