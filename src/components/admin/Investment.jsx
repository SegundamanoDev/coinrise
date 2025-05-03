import React from "react";
import AdminLayout from "../admin/AdminLayout";

const mockInvestments = [
  {
    id: "INV001",
    user: "John Doe",
    plan: "Daily 5%",
    amount: "$500",
    roi: "5%",
    status: "Active",
    startDate: "2025-04-01",
    endDate: "2025-05-01",
    profit: "$125",
  },
  {
    id: "INV002",
    user: "Jane Smith",
    plan: "Weekly 20%",
    amount: "$300",
    roi: "20%",
    status: "Pending",
    startDate: "-",
    endDate: "-",
    profit: "$0",
  },
];

const Investments = () => {
  return (
    <AdminLayout>
      <div className="pt-12 md:pt-0">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">
          Investment Monitoring
        </h2>

        <div className="overflow-x-auto rounded-xl border border-[#374151] bg-[#1f2937]">
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="bg-[#111827] text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Plan</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">ROI</th>
                <th className="px-6 py-3">Profit</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Start</th>
                <th className="px-6 py-3">End</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockInvestments.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-t border-[#374151] hover:bg-[#2c3441]"
                >
                  <td className="px-6 py-4 font-medium">{inv.user}</td>
                  <td className="px-6 py-4">{inv.plan}</td>
                  <td className="px-6 py-4">{inv.amount}</td>
                  <td className="px-6 py-4">{inv.roi}</td>
                  <td className="px-6 py-4 text-green-400">{inv.profit}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        inv.status === "Active"
                          ? "text-green-400"
                          : inv.status === "Pending"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{inv.startDate}</td>
                  <td className="px-6 py-4">{inv.endDate}</td>
                  <td className="px-6 py-4 space-x-2">
                    {inv.status === "Pending" ? (
                      <>
                        <button className="text-green-400 hover:underline">
                          Approve
                        </button>
                        <button className="text-red-400 hover:underline">
                          Cancel
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
      </div>
    </AdminLayout>
  );
};

export default Investments;
