import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminInvestments,
  markInvestmentComplete,
  deleteInvestment,
} from "../../features/investment/investmentsSlice";
import moment from "moment";

const AdminInvestmentsDashboard = () => {
  const dispatch = useDispatch();
  const { investments, summary, loading } = useSelector(
    (state) => state.investment
  );

  const [filters, setFilters] = useState({ status: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAdminInvestments(filters));
  }, [dispatch, filters]);

  const handleComplete = (id) => {
    if (window.confirm("Mark this investment as complete?")) {
      dispatch(markInvestmentComplete(id));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this investment?")) {
      dispatch(deleteInvestment(id));
    }
  };

  const filteredInvestments = investments.filter((inv) => {
    const term = searchTerm.toLowerCase();
    return (
      inv.user?.fullName?.toLowerCase().includes(term) ||
      inv.user?.email?.toLowerCase().includes(term) ||
      inv._id.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All User Investments</h1>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#121212] p-4 shadow rounded">
            <h2 className="text-lg">💰 Total Invested</h2>
            <p className="text-xl font-bold">${summary.totalInvested}</p>
          </div>
          <div className="bg-[#121212] p-4 shadow rounded">
            <h2 className="text-lg">👥 Active Users</h2>
            <p className="text-xl font-bold">{summary.activeUsers}</p>
          </div>
          <div className="bg-[#121212] p-4 shadow rounded">
            <h2 className="text-lg">📈 Total ROI Expected</h2>
            <p className="text-xl font-bold">${summary.totalROI}</p>
          </div>
          <div className="bg-[#121212] p-4 shadow rounded">
            <h2 className="text-lg">✅ Completed Investments</h2>
            <p className="text-xl font-bold">{summary.completedCount}</p>
          </div>
        </div>
      )}

      {/* Search & Filters */}
      <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search by name, email, ID"
          className="border p-2 rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Investments Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#000000] border">
          <thead>
            <tr className="bg-[#121212] text-left">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Username</th>

              <th className="p-2 border">Amount</th>
              <th className="p-2 border">ROI %</th>
              <th className="p-2 border">ROI Amount</th>
              <th className="p-2 border">Plan</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Start Date</th>
              <th className="p-2 border">End Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvestments.map((inv, index) => (
              <tr key={inv._id} className="border-t">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{inv.userId?.fullName}</td>

                <td className="p-2 border">${inv.amount}</td>
                <td className="p-2 border">{inv.roi}%</td>
                <td className="p-2 border">
                  ${((inv.amount * inv.roi) / 100).toFixed(2)}
                </td>
                <td className="p-2 border">{inv.plan}</td>
                <td className="p-2 border">{inv.status}</td>
                <td className="p-2 border">
                  {moment(inv.startDate).format("YYYY-MM-DD hh:mm A")}
                </td>
                <td className="p-2 border">
                  {moment(inv.endDate).format("YYYY-MM-DD hh:mm A")}
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => alert("Show modal or details here")}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                  >
                    View
                  </button>
                  {inv.status === "active" && (
                    <button
                      onClick={() => handleComplete(inv._id)}
                      className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(inv._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && <p className="mt-4 text-gray-500">Loading...</p>}
    </div>
  );
};

export default AdminInvestmentsDashboard;
