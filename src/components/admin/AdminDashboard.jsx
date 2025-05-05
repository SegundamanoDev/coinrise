import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminDashboard } from "../../features/admin/adminSlice";
import AdminLayout from "./AdminLayout";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, snapshot, charts, recentLogs, loading, error } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      sub: "All registered users",
    },
    {
      title: "Total Deposited",
      value: `$${stats.totalDeposited?.toLocaleString()}`,
      sub: "Sum of user deposits",
    },
    {
      title: "Total Active Investments",
      value: `$${stats.totalActiveInvestments?.toLocaleString()}`,
      sub: "Across all users",
    },
    {
      title: "Total Withdrawals",
      value: `$${stats.totalWithdrawn?.toLocaleString()}`,
      sub: "All-time withdrawals",
    },
    {
      title: "Referral Bonuses Paid",
      value: `$${stats.referralBonuses?.toLocaleString()}`,
      sub: "Across all accounts",
    },
    {
      title: "System Wallet Balance",
      value: `$${stats.systemWallet?.toLocaleString()}`,
      sub: "Operational balance",
    },
  ];

  return (
    <AdminLayout>
      <div className="pt-12 md:pt-0">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">
          Admin Dashboard Overview
        </h2>

        {loading ? (
          <p className="text-gray-300">Loading dashboard...</p>
        ) : error ? (
          <p className="text-red-400">Error: {error}</p>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {statCards.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151]"
                >
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-3xl font-bold text-yellow-400">
                    {item.value}
                  </p>
                  <span className="text-sm text-gray-400">{item.sub}</span>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-[#1f2937] p-5 rounded-xl border border-[#374151] mb-6">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Weekly Overview
              </h3>
              {charts && charts.data && charts.data.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={charts.data}>
                    <CartesianGrid stroke="#374151" />
                    <XAxis dataKey="label" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="deposits" stroke="#10B981" />
                    <Line
                      type="monotone"
                      dataKey="withdrawals"
                      stroke="#EF4444"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400">No chart data available.</p>
              )}
            </div>

            {/* Snapshot */}
            <div className="bg-[#1f2937] p-5 rounded-xl border border-[#374151] mb-6">
              <h3 className="text-lg font-semibold mb-4 text-white">
                System Snapshot
              </h3>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>
                  Last user registered:{" "}
                  <span className="text-yellow-400">
                    {snapshot.lastUser?.createdAt
                      ? new Date(snapshot.lastUser.createdAt).toLocaleString()
                      : "N/A"}
                  </span>{" "}
                  ({snapshot.lastUser?.email || "N/A"})
                </li>
                <li>
                  Last deposit:{" "}
                  <span className="text-green-400">
                    ${snapshot.lastDeposit?.amount || "N/A"}
                  </span>{" "}
                  from user {snapshot.lastDeposit?.userId || "N/A"}
                </li>
                <li>
                  Last withdrawal:{" "}
                  <span className="text-red-400">
                    ${snapshot.lastWithdrawal?.amount || "N/A"}
                  </span>{" "}
                  ({snapshot.lastWithdrawal?.status || "N/A"})
                </li>
              </ul>
            </div>

            {/* Recent Logs Table */}
            <div className="bg-[#1f2937] p-5 rounded-xl border border-[#374151]">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Recent Activity Logs
              </h3>
              {recentLogs.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left text-gray-300">
                    <thead className="text-xs uppercase border-b border-[#374151]">
                      <tr>
                        <th className="py-2 px-4">ID</th>
                        <th className="py-2 px-4">Action</th>
                        <th className="py-2 px-4">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentLogs.map((log) => (
                        <tr key={log.id} className="border-b border-[#374151]">
                          <td className="py-2 px-4">{log.id}</td>
                          <td className="py-2 px-4">{log.action}</td>
                          <td className="py-2 px-4">{log.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-400">No logs available.</p>
              )}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
