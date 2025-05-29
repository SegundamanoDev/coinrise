import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminInvestments,
  markInvestmentComplete,
  deleteInvestment,
} from "../../features/investment/investmentsSlice";
import moment from "moment";
import AdminLayout from "./AdminLayout"; // Ensure AdminLayout is imported
import { DollarSign, Users, CheckCircle, Wallet } from "lucide-react"; // Icons for summary cards

const AdminInvestmentsDashboard = () => {
  const dispatch = useDispatch();
  const { investments, summary, loading, error } = useSelector(
    // Include error from Redux
    (state) => state.investment
  );

  const [filters, setFilters] = useState({ status: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAdminInvestments(filters));
  }, [dispatch, filters]);

  const handleComplete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to mark this investment as complete? This action cannot be undone."
      )
    ) {
      dispatch(markInvestmentComplete(id));
    }
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to permanently delete this investment?"
      )
    ) {
      dispatch(deleteInvestment(id));
    }
  };

  const filteredInvestments = investments.filter((inv) => {
    const term = searchTerm.toLowerCase();
    // Use optional chaining for safety if user or email might be null
    return (
      inv.userId?.fullName?.toLowerCase().includes(term) ||
      inv.userId?.email?.toLowerCase().includes(term) ||
      inv._id.toLowerCase().includes(term)
    );
  });

  // Helper for formatting currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 bg-[#0d1117] min-h-screen text-[#f5f5f5]">
        <h1 className="text-3xl font-bold text-yellow-400 mb-8">
          All User Investments
        </h1>

        {loading ? (
          <p className="text-gray-300 text-lg flex items-center gap-2">
            <span className="animate-spin text-yellow-400">⚙️</span> Loading
            investments...
          </p>
        ) : error ? (
          <p className="text-red-400 text-lg">Error: {error}</p>
        ) : (
          <>
            {/* Summary Cards */}
            {summary && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151] flex items-center gap-4">
                  <DollarSign size={28} className="text-green-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-300">
                      Total Invested
                    </h2>
                    <p className="text-2xl font-bold text-yellow-400">
                      {formatCurrency(summary.totalInvested)}
                    </p>
                  </div>
                </div>
                <div className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151] flex items-center gap-4">
                  <Users size={28} className="text-blue-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-300">
                      Active Investments
                    </h2>
                    <p className="text-2xl font-bold text-yellow-400">
                      {summary.activeUsers}
                    </p>{" "}
                    {/* Assuming this is active *investments* count */}
                  </div>
                </div>
                <div className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151] flex items-center gap-4">
                  <Wallet size={28} className="text-purple-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-300">
                      Total ROI Expected
                    </h2>
                    <p className="text-2xl font-bold text-yellow-400">
                      {formatCurrency(summary.totalROI)}
                    </p>
                  </div>
                </div>
                <div className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151] flex items-center gap-4">
                  <CheckCircle size={28} className="text-teal-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-300">
                      Completed Investments
                    </h2>
                    <p className="text-2xl font-bold text-yellow-400">
                      {summary.completedCount}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Search & Filters */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center bg-[#1f2937] p-5 rounded-xl border border-[#374151] shadow-md">
              <input
                type="text"
                placeholder="Search by username, email, or ID"
                className="border border-[#374151] p-3 rounded-lg w-full md:w-1/3 bg-[#0d1117] text-gray-300 placeholder-gray-500 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                className="border border-[#374151] p-3 rounded-lg bg-[#0d1117] text-gray-300 focus:ring-yellow-400 focus:border-yellow-400 transition-colors"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Investments Table */}
            <div className="overflow-x-auto custom-scrollbar bg-[#1f2937] rounded-xl border border-[#374151] shadow-lg">
              <table className="min-w-full text-md text-left text-gray-300">
                <thead className="bg-[#28374d] text-xs uppercase text-gray-200">
                  <tr>
                    <th className="py-3 px-4 rounded-tl-lg">#</th>
                    <th className="py-3 px-4">Username</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">ROI %</th>
                    <th className="py-3 px-4">ROI Amount</th>
                    <th className="py-3 px-4">Plan</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Start Date</th>
                    <th className="py-3 px-4">End Date</th>
                    <th className="py-3 px-4 rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvestments.length > 0 ? (
                    filteredInvestments.map((inv, index) => (
                      <tr
                        key={inv._id}
                        className="border-b border-[#374151] hover:bg-[#28374d]"
                      >
                        <td className="py-3 px-4 font-medium text-white">
                          {index + 1}
                        </td>
                        <td className="py-3 px-4">
                          {inv.userId?.fullName || inv.userId?.email || "N/A"}
                        </td>
                        <td className="py-3 px-4 font-semibold">
                          {formatCurrency(inv.amount)}
                        </td>
                        <td className="py-3 px-4">{inv.roi}%</td>
                        <td className="py-3 px-4 font-semibold">
                          {formatCurrency((inv.amount * inv.roi) / 100)}
                        </td>
                        <td className="py-3 px-4 capitalize">{inv.plan}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold
                            ${
                              inv.status === "active"
                                ? "bg-blue-600 text-white"
                                : inv.status === "completed"
                                ? "bg-green-600 text-white"
                                : "bg-gray-500 text-white"
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {moment(inv.startDate).format("YYYY-MM-DD HH:mm")}
                        </td>
                        <td className="py-3 px-4">
                          {moment(inv.endDate).format("YYYY-MM-DD HH:mm")}
                        </td>
                        <td className="py-3 px-4 space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => alert("Show modal or details here")}
                            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors"
                          >
                            View
                          </button>
                          {inv.status === "active" && (
                            <button
                              onClick={() => handleComplete(inv._id)}
                              className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition-colors"
                            >
                              Complete
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(inv._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="10"
                        className="py-10 text-center text-gray-400"
                      >
                        No investments found for the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminInvestmentsDashboard;
