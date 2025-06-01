import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminInvestments,
  markInvestmentComplete,
  deleteInvestment,
} from "../../features/investment/investmentsSlice";
import moment from "moment";
import AdminLayout from "./AdminLayout";
import { DollarSign, Users, CheckCircle, Wallet } from "lucide-react";

const AdminInvestmentsDashboard = () => {
  const dispatch = useDispatch();
  const { investments, summary, loading, error } = useSelector(
    (state) => state.investment
  );

  const [filters, setFilters] = useState({ status: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [investmentToComplete, setInvestmentToComplete] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInvestmentDetails, setSelectedInvestmentDetails] =
    useState(null);

  useEffect(() => {
    dispatch(fetchAdminInvestments(filters));
  }, [dispatch, filters]);

  // Handle opening the complete confirmation modal
  const handleCompleteClick = (investment) => {
    setInvestmentToComplete(investment);
    setShowCompleteModal(true);
  };

  // Handle confirming completion
  const confirmComplete = () => {
    if (investmentToComplete) {
      dispatch(markInvestmentComplete(investmentToComplete._id));
      setShowCompleteModal(false);
      setInvestmentToComplete(null);
    }
  };

  // Handle cancelling completion
  const cancelComplete = () => {
    setShowCompleteModal(false);
    setInvestmentToComplete(null);
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

  // Handle opening the details modal
  const handleViewDetails = (investment) => {
    setSelectedInvestmentDetails(investment);
    setShowDetailsModal(true);
  };

  // Helper for formatting currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  const filteredInvestments = investments.filter((inv) => {
    const term = searchTerm.toLowerCase();
    return (
      inv.userId?.fullName?.toLowerCase().includes(term) ||
      inv.userId?.email?.toLowerCase().includes(term) ||
      inv._id.toLowerCase().includes(term)
    );
  });

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
                      Total Active Investments{" "}
                      {/* Changed label to be more precise */}
                    </h2>
                    <p className="text-2xl font-bold text-yellow-400">
                      {summary.activeCount}{" "}
                      {/* Displaying activeCount from backend */}
                    </p>
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
                            onClick={() => handleViewDetails(inv)} // Use new handler
                            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors"
                          >
                            View
                          </button>
                          {inv.status === "active" && (
                            <button
                              onClick={() => handleCompleteClick(inv)} // Use new handler
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

      {/* Complete Confirmation Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1f2937] p-8 rounded-lg shadow-xl border border-[#374151] max-w-md w-full text-white">
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">
              Confirm Completion
            </h3>
            <p className="mb-6 text-gray-300">
              Are you sure you want to mark this investment as complete? This
              will add the initial **investment amount** and the **calculated
              ROI** back to the user's balance. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelComplete}
                className="px-6 py-2 rounded-md bg-gray-600 hover:bg-gray-700 transition-colors text-white font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmComplete}
                className="px-6 py-2 rounded-md bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Investment Details Modal */}
      {showDetailsModal && selectedInvestmentDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1f2937] p-8 rounded-lg shadow-xl border border-[#374151] max-w-lg w-full text-white relative">
            <button
              onClick={() => setShowDetailsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-3xl font-semibold"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-[#374151] pb-3">
              Investment Details
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong>Investment ID:</strong> {selectedInvestmentDetails._id}
              </p>
              <p>
                <strong>User:</strong>{" "}
                {selectedInvestmentDetails.userId?.fullName ||
                  selectedInvestmentDetails.userId?.email ||
                  "N/A"}
              </p>
              <p>
                <strong>Amount:</strong>{" "}
                {formatCurrency(selectedInvestmentDetails.amount)}
              </p>
              <p>
                <strong>Plan:</strong> {selectedInvestmentDetails.plan}
              </p>
              <p>
                <strong>Duration:</strong> {selectedInvestmentDetails.duration}{" "}
                hours
              </p>
              <p>
                <strong>ROI Percentage:</strong> {selectedInvestmentDetails.roi}
                %
              </p>
              <p>
                <strong>Calculated ROI Amount:</strong>{" "}
                {formatCurrency(
                  (selectedInvestmentDetails.amount *
                    selectedInvestmentDetails.roi) /
                    100
                )}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    selectedInvestmentDetails.status === "active"
                      ? "bg-blue-600"
                      : "bg-green-600"
                  }`}
                >
                  {selectedInvestmentDetails.status}
                </span>
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {moment(selectedInvestmentDetails.startDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {moment(selectedInvestmentDetails.endDate).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {moment(selectedInvestmentDetails.createdAt).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
              </p>
              <p>
                <strong>Last Updated:</strong>{" "}
                {moment(selectedInvestmentDetails.updatedAt).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
              </p>
            </div>
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminInvestmentsDashboard;
