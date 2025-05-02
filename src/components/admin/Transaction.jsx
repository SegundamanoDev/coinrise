import React, { useState } from "react";
import AdminLayout from "../admin/AdminLayout";

const mockTransactions = [
  {
    id: "TX001",
    user: "John Doe",
    type: "Deposit",
    amount: "$300",
    status: "Pending",
    date: "2025-04-25",
  },
  {
    id: "TX002",
    user: "Jane Smith",
    type: "Withdrawal",
    amount: "$200",
    status: "Pending",
    date: "2025-04-26",
  },
  {
    id: "TX003",
    user: "John Doe",
    type: "Deposit",
    amount: "$400",
    status: "Approved",
    date: "2025-04-20",
  },
  {
    id: "TX004",
    user: "Jane Smith",
    type: "Withdrawal",
    amount: "$100",
    status: "Rejected",
    date: "2025-04-18",
  },
];

const AdminTransactions = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredTransactions = mockTransactions.filter((tx) => {
    const statusMatch = statusFilter === "All" || tx.status === statusFilter;
    const typeMatch = typeFilter === "All" || tx.type === typeFilter;
    return statusMatch && typeMatch;
  });

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">
        Deposit & Withdrawal Control
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#1f2937] border border-[#374151] text-sm text-white px-4 py-2 rounded-md"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-[#1f2937] border border-[#374151] text-sm text-white px-4 py-2 rounded-md"
        >
          <option value="All">All Types</option>
          <option value="Deposit">Deposit</option>
          <option value="Withdrawal">Withdrawal</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#374151] bg-[#1f2937]">
        <table className="min-w-full text-sm text-left text-gray-300">
          <thead className="bg-[#111827] text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-t border-[#374151] hover:bg-[#2c3441]"
              >
                <td className="px-6 py-4 font-medium">{tx.user}</td>
                <td className="px-6 py-4">{tx.type}</td>
                <td className="px-6 py-4">{tx.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      tx.status === "Approved"
                        ? "text-green-400"
                        : tx.status === "Rejected"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="px-6 py-4">{tx.date}</td>
                <td className="px-6 py-4 space-x-2">
                  {tx.status === "Pending" ? (
                    <>
                      <button className="text-green-400 hover:underline">
                        Approve
                      </button>
                      <button className="text-red-400 hover:underline">
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400 italic">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminTransactions;
