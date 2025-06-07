import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchUsers,
  deleteUser,
  topupUserProfit,
  clearStatusMessage,
} from "../../features/users/userSlice"; // Assuming this path is correct
import { toast } from "react-toastify";
import {
  AlertTriangle,
  PlusCircle,
  Trash2,
  Edit,
  Info,
  Loader2,
  XCircle,
  ShieldCheck, // For approved KYC
  Clock, // For pending KYC
  ShieldAlert, // For unverified/rejected KYC
  FileText, // For KYC actions
} from "lucide-react";

const formatMoney = (amount, currency = "USD") => {
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount || 0);
  } catch (error) {
    // Fallback for invalid currency codes
    return `${currency} ${parseFloat(amount || 0).toFixed(2)}`;
  }
};

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error, statusMessage } = useSelector(
    (state) => state.users
  );

  // State for top-up modal
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);
  const [topupUserId, setTopupUserId] = useState(null);
  const [topupAmount, setTopupAmount] = useState("");

  // State for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (statusMessage) {
      toast.success(statusMessage);
      dispatch(clearStatusMessage());
    }
  }, [statusMessage, dispatch]);

  const openTopupModal = (userId) => {
    setTopupUserId(userId);
    setTopupAmount(""); // Clear previous amount
    setIsTopupModalOpen(true);
  };

  const closeTopupModal = () => {
    setIsTopupModalOpen(false);
    setTopupUserId(null);
  };

  const submitTopup = () => {
    const amount = parseFloat(topupAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive amount.");
      return;
    }
    dispatch(topupUserProfit({ id: topupUserId, amount }));
    closeTopupModal();
  };

  const confirmDeleteUser = () => {
    if (!selectedUserToDelete) return;
    dispatch(deleteUser(selectedUserToDelete._id));
    setIsDeleteModalOpen(false);
    setSelectedUserToDelete(null);
  };

  // Helper function to render KYC status in table
  const renderKycStatusBadge = (kycStatus) => {
    let text = "";
    let colorClass = "";
    let icon = null;

    switch (kycStatus) {
      case "approved":
        text = "Approved";
        colorClass = "bg-green-100 text-green-800";
        icon = <ShieldCheck size={14} className="mr-1" />;
        break;
      case "pending":
        text = "Pending";
        colorClass = "bg-yellow-100 text-yellow-800";
        icon = <Clock size={14} className="mr-1" />;
        break;
      case "rejected":
        text = "Rejected";
        colorClass = "bg-red-100 text-red-800";
        icon = <ShieldAlert size={14} className="mr-1" />;
        break;
      case "not_submitted":
      default:
        text = "Not Submitted";
        colorClass = "bg-gray-100 text-gray-800";
        icon = <Info size={14} className="mr-1" />;
        break;
    }

    return (
      <span
        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass} items-center`}
      >
        {icon}
        {text}
      </span>
    );
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto text-[#ffffff] bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">
        All Users
      </h2>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-20 text-gray-600">
          <Loader2 className="animate-spin w-10 h-10 text-blue-500 mb-3" />
          <p className="text-lg">Loading users...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col justify-center items-center py-20 bg-red-800 bg-opacity-30 border border-red-700 text-red-300 rounded-lg">
          <XCircle className="w-10 h-10 text-red-500 mb-3" />
          <p className="text-lg text-center">Failed to load users: {error}</p>
          <p className="text-sm text-red-400 mt-2">
            Please try again later or check your network.
          </p>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-20 bg-gray-800 rounded-lg border border-dashed border-gray-700">
          <Info className="mx-auto w-12 h-12 mb-4 text-gray-500" />
          <p className="text-xl text-gray-400 font-semibold">
            No users found yet.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            New user registrations will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Profit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  KYC Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Account Status
                </th>
                {/* NEW: Last Seen At Column Header */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Last Seen
                </th>
                {/* END NEW: Last Seen At Column Header */}
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {user.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.country || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-semibold">
                    {formatMoney(user?.balance, user?.currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 font-semibold">
                    {formatMoney(user.totalProfits, user?.currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 capitalize">
                    {user?.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {renderKycStatusBadge(user.kycStatus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {user.isBlocked ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-600 bg-opacity-30 text-red-300">
                        Blocked
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-600 bg-opacity-30 text-green-300">
                        Active
                      </span>
                    )}
                  </td>
                  {/* NEW: Last Seen At Data Cell */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.lastSeenAt
                      ? new Date(user.lastSeenAt).toLocaleString()
                      : "N/A"}
                  </td>
                  {/* END NEW: Last Seen At Data Cell */}
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                    <button
                      onClick={() => openTopupModal(user._id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      title="Top up profit"
                    >
                      <PlusCircle size={16} className="mr-1" /> Top Up
                    </button>
                    {/* Link to Edit User Details (existing) */}
                    <Link
                      to={`/admin/users/${user._id}`}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                      title="Edit User Details"
                    >
                      <Edit size={16} className="mr-1" /> Edit
                    </Link>
                    {/* NEW Link to View KYC Details */}
                    <Link
                      to={`/admin/users/kyc-details/${user._id}`}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                      title="View KYC Documents"
                    >
                      <FileText size={16} className="mr-1" /> View KYC
                    </Link>
                    {/* End NEW Link */}
                    <button
                      onClick={() => {
                        setSelectedUserToDelete(user);
                        setIsDeleteModalOpen(true);
                      }}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                      title="Delete User"
                    >
                      <Trash2 size={16} className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Top-up Modal */}
      {isTopupModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-sm transform scale-in-center border border-blue-500">
            <h3 className="text-xl font-bold mb-4 text-white">
              Top Up User Profit
            </h3>
            <p className="text-gray-300 mb-4">
              Enter amount to add to{" "}
              <span className="font-semibold text-blue-400">
                {users.find((u) => u._id === topupUserId)?.fullName ||
                  "selected user"}
              </span>
              's profit.
            </p>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full border border-gray-700 rounded-md px-4 py-2 mb-4 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={topupAmount}
              onChange={(e) => setTopupAmount(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeTopupModal}
                className="px-5 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={submitTopup}
                className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200 font-semibold"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-sm transform scale-in-center border border-red-500">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-7 h-7 text-red-500 mr-3" />
              <h3 className="text-xl font-semibold text-white">
                Confirm Delete
              </h3>
            </div>
            <p className="mb-6 text-gray-300">
              Are you sure you want to delete{" "}
              <strong className="text-red-400">
                {selectedUserToDelete?.fullName}
              </strong>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-5 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
                className="px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition duration-200 font-semibold"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
