import React from "react";
import AdminLayout from "./AdminLayout";

const stats = [
  {
    title: "Total Users",
    value: "1,250",
    sub: "All registered users",
  },
  {
    title: "Total Deposited",
    value: "$125,000",
    sub: "Sum of user deposits",
  },
  {
    title: "Total Active Investments",
    value: "$80,000",
    sub: "Across all users",
  },
  {
    title: "Total Withdrawals",
    value: "$60,000",
    sub: "All-time withdrawals",
  },
  {
    title: "Referral Bonuses Paid",
    value: "$5,000",
    sub: "Across all accounts",
  },
  {
    title: "System Wallet Balance",
    value: "$40,000",
    sub: "Operational balance",
  },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">
        Admin Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151]"
          >
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-3xl font-bold text-yellow-400">{item.value}</p>
            <span className="text-sm text-gray-400">{item.sub}</span>
          </div>
        ))}
      </div>

      {/* Optional: System Notes or Logs Preview */}
      <div className="bg-[#1f2937] p-5 rounded-xl border border-[#374151]">
        <h3 className="text-lg font-semibold mb-4">System Snapshot</h3>
        <ul className="text-sm space-y-2 text-gray-300">
          <li>
            Last user registered:{" "}
            <span className="text-yellow-400">5 mins ago</span>
          </li>
          <li>
            Last deposit: <span className="text-green-400">$500.00</span> from
            user#789
          </li>
          <li>
            Last withdrawal: <span className="text-red-400">$300.00</span>{" "}
            pending
          </li>
        </ul>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
