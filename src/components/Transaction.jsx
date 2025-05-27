import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTransactions } from "../features/transaction/transaction";
import { format } from "date-fns";

const typeColors = {
  deposit: "bg-green-600",
  withdrawal: "bg-red-600",
  invest: "bg-blue-600",
  "referral bonus": "bg-purple-600",
};

const statusColors = {
  completed: "text-green-400",
  pending: "text-yellow-400",
  failed: "text-red-500",
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
  const { userTransactions, loading, error } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(fetchUserTransactions());
  }, [dispatch]);

  return (
    <div className="bg-black text-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">My Transactions</h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <svg
            className="animate-spin h-8 w-8 text-white"
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
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-700 text-center">
            <thead>
              <tr className="bg-gray-900">
                <th className="px-4 py-2 border border-gray-700">Date</th>
                <th className="px-4 py-2 border border-gray-700">Type</th>
                <th className="px-4 py-2 border border-gray-700">Amount</th>
                <th className="px-4 py-2 border border-gray-700">Method</th>
                <th className="px-4 py-2 border border-gray-700">Details</th>
                <th className="px-4 py-2 border border-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {userTransactions.map((tx) => {
                const type = tx.type.toLowerCase();
                const typeColor = typeColors[type] || "bg-gray-600";
                const statusColor =
                  statusColors[tx.status.toLowerCase()] || "text-white";

                const isNegative = negativeTypes.includes(type);
                const isPositive = positiveTypes.includes(type);
                const prefix = isNegative ? "−" : isPositive ? "+" : "";

                return (
                  <tr key={tx._id} className="text-white">
                    <td className="px-4 py-2 border border-gray-700">
                      {format(new Date(tx.createdAt), "PPpp")}
                    </td>
                    <td className="px-4 py-2 border border-gray-700 capitalize">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded ${typeColor}`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-4 py-2 border border-gray-700">
                      <span
                        className={
                          isNegative ? "text-red-400" : "text-green-400"
                        }
                      >
                        {prefix}
                        {formatMoney(tx?.amount, tx?.user?.currency)}
                      </span>
                    </td>
                    <td className="px-4 py-2 border border-gray-700">
                      {tx.method || "—"}
                    </td>
                    <td className="px-4 py-2 border border-gray-700 text-left max-w-xs whitespace-pre-wrap break-words">
                      {tx.details
                        ? Object.entries(tx.details)
                            .map(([key, value]) => {
                              if (key.toLowerCase().includes("date")) {
                                try {
                                  return `${key}: ${format(
                                    new Date(value),
                                    "PPpp"
                                  )}`;
                                } catch (e) {
                                  return `${key}: ${value}`;
                                }
                              }
                              return `${key}: ${value}`;
                            })
                            .join("\n")
                        : "—"}
                    </td>

                    <td
                      className={`px-4 py-2 border border-gray-700 ${statusColor}`}
                    >
                      {tx.status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
