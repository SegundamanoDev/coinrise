import React, { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

const transactionsData = [
  {
    id: 1,
    type: "Deposit",
    amount: 0.25,
    status: "Completed",
    date: "2025-04-24",
  },
  {
    id: 2,
    type: "Withdrawal",
    amount: 0.1,
    status: "Pending",
    date: "2025-04-23",
  },
  {
    id: 3,
    type: "Investment",
    amount: 0.15,
    status: "Completed",
    date: "2025-04-22",
  },
];

const statusColors = {
  Completed: "text-green-400",
  Pending: "text-yellow-400",
  Failed: "text-red-400",
};

const Transactions = () => {
  const [search, setSearch] = useState("");

  const filtered = transactionsData.filter((tx) =>
    tx.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#0d1117] min-h-screen text-white p-6 font-sans">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>

      <input
        type="text"
        placeholder="Search transaction type..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-6 rounded bg-[#1f2937] text-white border border-[#374151]"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#1f2937] rounded-xl overflow-hidden">
          <thead>
            <tr className="text-left text-gray-400 border-b border-[#374151]">
              <th className="p-4">Type</th>
              <th className="p-4">Amount (₿)</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-[#374151] hover:bg-[#2a3342]"
                >
                  <td className="p-4 flex items-center gap-2">
                    {tx.type === "Deposit" ? (
                      <ArrowDown className="text-green-400" />
                    ) : (
                      <ArrowUp className="text-red-400" />
                    )}
                    {tx.type}
                  </td>
                  <td className="p-4 text-yellow-400 font-medium">
                    {tx.amount}
                  </td>
                  <td className={`p-4 ${statusColors[tx.status]}`}>
                    {tx.status}
                  </td>
                  <td className="p-4 text-gray-300">{tx.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center text-gray-400" colSpan="4">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
