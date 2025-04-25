import React, { useState } from "react";

const ViewActivity = () => {
  const [activities] = useState([
    {
      id: 1,
      action: "Invested in Basic Plan",
      amount: 100,
      date: "2025-04-10",
      status: "Completed",
    },
    {
      id: 2,
      action: "Deposit",
      amount: 500,
      date: "2025-04-12",
      status: "Completed",
    },
    {
      id: 3,
      action: "Withdrew Funds",
      amount: 150,
      date: "2025-04-15",
      status: "Pending",
    },
    {
      id: 4,
      action: "Invested in Premium Plan",
      amount: 500,
      date: "2025-04-17",
      status: "Completed",
    },
  ]);

  return (
    <div className="p-6 bg-[#1f2937] text-white min-h-screen">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-yellow-400 mb-6">
        Activity History
      </h2>

      {/* Filters (optional) */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-4">
          <select className="bg-[#2d3a47] text-white p-2 rounded-md">
            <option value="all">All Activities</option>
            <option value="investment">Investments</option>
            <option value="deposit">Deposits</option>
            <option value="withdrawal">Withdrawals</option>
          </select>
          <select className="bg-[#2d3a47] text-white p-2 rounded-md">
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg">
            Filter
          </button>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-[#374151] p-6 rounded-xl shadow-lg border border-[#2d3a47] mb-6">
        <h3 className="text-xl font-semibold text-yellow-400 mb-4">
          Recent Activities
        </h3>
        <ul>
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="flex justify-between items-center py-3 border-b border-[#2d3a47]"
            >
              <div className="flex gap-4">
                <div className="text-yellow-400">{activity.action}</div>
                <span className="text-gray-400 text-sm">{activity.date}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-yellow-400">
                  ₿{activity.amount}
                </span>
                <span
                  className={`px-3 py-1 rounded-lg ${
                    activity.status === "Completed"
                      ? "bg-green-400"
                      : "bg-orange-400"
                  }`}
                >
                  {activity.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Detailed Activity List */}
      <div className="bg-[#374151] p-6 rounded-xl shadow-lg border border-[#2d3a47]">
        <h3 className="text-xl font-semibold text-yellow-400 mb-4">
          Full Activity History
        </h3>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left text-sm text-gray-400">Action</th>
              <th className="text-left text-sm text-gray-400">Amount</th>
              <th className="text-left text-sm text-gray-400">Date</th>
              <th className="text-left text-sm text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id} className="border-t border-[#2d3a47]">
                <td className="py-2 text-sm text-white">{activity.action}</td>
                <td className="py-2 text-sm text-white">₿{activity.amount}</td>
                <td className="py-2 text-sm text-white">{activity.date}</td>
                <td className="py-2 text-sm">
                  <span
                    className={`px-3 py-1 rounded-lg font-semibold ${
                      activity.status === "Completed"
                        ? "bg-green-400"
                        : "bg-orange-400"
                    }`}
                  >
                    {activity.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to Load More or Add New Activity */}
      <div className="flex justify-center mt-8">
        <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300">
          Load More Activities
        </button>
      </div>
    </div>
  );
};

export default ViewActivity;
