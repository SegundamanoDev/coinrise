import React, { useEffect, useState } from "react";
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
import { Users, DollarSign, TrendingUp, BarChart2, Zap } from "lucide-react"; // Icons for stats

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, snapshot, charts, recentLogs, loading, error } = useSelector(
    (state) => state.admin
  );

  const [investmentFilter, setInvestmentFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  // Helper function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0, // No decimals for large sums
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const filteredInvestmentStats = () => {
    if (!stats.investments) return [];

    const all = stats.investments;
    const filtered =
      investmentFilter === "active"
        ? all.filter((inv) => inv.status === "active")
        : investmentFilter === "completed"
        ? all.filter((inv) => inv.status === "completed")
        : all;

    const totalVolume = filtered.reduce((sum, inv) => sum + inv.amount, 0);
    const avgROI =
      filtered.length > 0
        ? (
            filtered.reduce((sum, inv) => sum + inv.roi, 0) / filtered.length
          ).toFixed(2)
        : 0;

    return [
      {
        title: "Investment Volume",
        value: formatCurrency(totalVolume),
        sub: `Total invested (${investmentFilter})`,
        icon: <BarChart2 size={20} className="text-yellow-400" />,
      },
      {
        title: "Average ROI",
        value: `${avgROI}%`,
        sub: `Across ${filtered.length} plans`,
        icon: <TrendingUp size={20} className="text-green-400" />,
      },
    ];
  };

  const baseStatCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      sub: "All registered users",
      icon: <Users size={20} className="text-blue-400" />,
    },
    {
      title: "Total Deposited",
      value: formatCurrency(stats.totalDeposited),
      sub: "Sum of user deposits",
      icon: <DollarSign size={20} className="text-green-400" />,
    },
    {
      title: "Total Active Investments",
      value: formatCurrency(stats.totalActiveInvestments),
      sub: "Across all users",
      icon: <TrendingUp size={20} className="text-purple-400" />,
    },
    {
      title: "Total Withdrawals",
      value: formatCurrency(stats.totalWithdrawn),
      sub: "All-time withdrawals",
      icon: <DollarSign size={20} className="text-red-400" />,
    },
    {
      title: "Referral Bonuses Paid",
      value: formatCurrency(stats.referralBonuses),
      sub: "Across all accounts",
      icon: <Zap size={20} className="text-orange-400" />,
    },
  ];

  return (
    <AdminLayout>
      <div className="md:pt-0">
        {" "}
        {/* Removed unnecessary pt-14 */}
        <h2 className="text-3xl font-bold text-yellow-400 mb-8">
          Admin Dashboard Overview
        </h2>
        {loading ? (
          <p className="text-gray-300 text-lg flex items-center gap-2">
            <span className="animate-spin text-yellow-400">⚙️</span> Loading
            dashboard...
          </p>
        ) : error ? (
          <p className="text-red-400 text-lg">Error: {error}</p>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {[...baseStatCards, ...filteredInvestmentStats()].map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151] flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      {item.icon}
                    </div>
                    <p className="text-4xl font-extrabold text-yellow-400 mb-2">
                      {item.value}
                    </p>
                    <span className="text-sm text-gray-400">{item.sub}</span>
                  </div>
                )
              )}
            </div>

            {/* Investment Filter */}
            <div className="mb-8 flex flex-wrap gap-3 items-center">
              <span className="text-white font-semibold text-lg">
                Filter investments:
              </span>
              {["all", "active", "completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setInvestmentFilter(status)}
                  className={`px-5 py-2 rounded-full text-md font-semibold transition-all duration-200
                    ${
                      investmentFilter === status
                        ? "bg-yellow-400 text-black shadow-md"
                        : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-[#1f2937] p-6 rounded-xl border border-[#374151] shadow-lg mb-8">
              <h3 className="text-xl font-semibold mb-6 text-white border-b border-[#374151] pb-3">
                Weekly Overview
              </h3>
              {charts?.data?.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={charts.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="label" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        borderColor: "#374151",
                        borderRadius: "8px",
                      }}
                      itemStyle={{ color: "#f5f5f5" }}
                      labelStyle={{ color: "#yellow-400" }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="deposits"
                      stroke="#10B981"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="withdrawals"
                      stroke="#EF4444"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-400 text-center py-10">
                  No chart data available for the selected period.
                </p>
              )}
            </div>

            {/* Snapshot */}
            <div className="bg-[#1f2937] p-6 rounded-xl border border-[#374151] shadow-lg mb-8">
              <h3 className="text-xl font-semibold mb-6 text-white border-b border-[#374151] pb-3">
                System Snapshot
              </h3>
              <ul className="text-md space-y-3 text-gray-300">
                <li className="flex justify-between items-center">
                  <span className="font-medium">Last user registered:</span>{" "}
                  <span>
                    <span className="text-yellow-400">
                      {snapshot.lastUser?.createdAt
                        ? new Date(snapshot.lastUser.createdAt).toLocaleString()
                        : "N/A"}
                    </span>{" "}
                    (
                    <span className="font-semibold">
                      {snapshot.lastUser?.email || "N/A"}
                    </span>
                    )
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium">Last deposit:</span>{" "}
                  <span>
                    <span className="text-green-400 font-bold">
                      {formatCurrency(snapshot.lastDeposit?.amount)}
                    </span>{" "}
                    from{" "}
                    <span className="font-semibold">
                      {snapshot.lastDeposit?.fullName || "N/A"}
                    </span>
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium">Last withdrawal:</span>{" "}
                  <span>
                    <span className="text-red-400 font-bold">
                      {formatCurrency(snapshot.lastWithdrawal?.amount)}
                    </span>{" "}
                    (Status:{" "}
                    <span className="font-semibold capitalize">
                      {snapshot.lastWithdrawal?.status || "N/A"}
                    </span>
                    )
                  </span>
                </li>
              </ul>
            </div>

            {/* Recent Logs */}
            <div className="bg-[#1f2937] p-6 rounded-xl border border-[#374151] shadow-lg">
              <h3 className="text-xl font-semibold mb-6 text-white border-b border-[#374151] pb-3">
                Recent Activity Logs
              </h3>
              {recentLogs.length > 0 ? (
                <div className="overflow-x-auto custom-scrollbar">
                  {" "}
                  {/* Added custom-scrollbar */}
                  <table className="min-w-full text-md text-left text-gray-300">
                    <thead className="text-xs uppercase bg-[#28374d] text-gray-200">
                      <tr>
                        <th className="py-3 px-4 rounded-tl-lg">ID</th>
                        <th className="py-3 px-4">Action</th>
                        <th className="py-3 px-4 rounded-tr-lg">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentLogs.map((log, idx) => (
                        <tr
                          key={log.id || idx}
                          className="border-b border-[#374151] hover:bg-[#28374d]"
                        >
                          <td className="py-3 px-4 font-medium text-white">
                            {log.id}
                          </td>
                          <td className="py-3 px-4">{log.action}</td>
                          <td className="py-3 px-4">{log.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-10">
                  No recent activity logs available.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
