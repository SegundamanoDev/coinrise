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
} from "lucide-react";

const formatMoney = (amount, currency = "USD") => {
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount || 0);
  } catch (error) {
    return `${currency} ${parseFloat(amount || 0).toFixed(2)}`;
  }
};

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error, statusMessage } = useSelector(
    (state) => state.users
  );
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false); // Renamed for clarity
  const [topupUserId, setTopupUserId] = useState(null);
  const [topupAmount, setTopupAmount] = useState("");

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
    setTopupAmount("");
    setIsTopupModalOpen(true);
  };

  const closeTopupModal = () => {
    // Renamed for clarity
    setIsTopupModalOpen(false);
    setTopupUserId(null);
  };

  const submitTopup = () => {
    const amount = parseFloat(topupAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount.");
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
        <div className="flex flex-col justify-center items-center py-20 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <XCircle className="w-10 h-10 text-red-500 mb-3" />
          <p className="text-lg text-center">Failed to load users: {error}</p>
          <p className="text-sm text-red-600 mt-2">
            Please try again later or check your network.
          </p>
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <Info className="mx-auto w-12 h-12 mb-4 text-gray-400" />
          <p className="text-xl text-gray-600 font-semibold">
            No users found yet.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            New user registrations will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Currency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-[#ffffff] bg-gradient-to-br from-gray-900 to-black divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#ffffff]">
                    {user.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ffffff]">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ffffff]">
                    {user.country || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ffffff]">
                    {user.currency || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ffffff] font-semibold">
                    {formatMoney(user?.balance, user?.currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ffffff] font-semibold">
                    {formatMoney(user.totalProfits, user?.currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#ffffff] capitalize">
                    {user?.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {user.isBlocked ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Blocked
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                    <button
                      onClick={() => openTopupModal(user._id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      title="Top up profit"
                    >
                      <PlusCircle size={16} className="mr-1" /> Top Up
                    </button>
                    <Link
                      to={`/admin/users/${user._id}`}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                      title="Edit User Details"
                    >
                      <Edit size={16} className="mr-1" /> Edit
                    </Link>
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
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm transform scale-in-center">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Top Up User Profit
            </h3>
            <p className="text-gray-600 mb-4">
              Enter amount to add to{" "}
              <span className="font-semibold text-blue-600">
                {users.find((u) => u._id === topupUserId)?.fullName ||
                  "selected user"}
              </span>
              's profit.
            </p>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={topupAmount}
              onChange={(e) => setTopupAmount(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeTopupModal}
                className="px-5 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200 font-semibold"
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
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm transform scale-in-center">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-7 h-7 text-red-500 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">
                Confirm Delete
              </h3>
            </div>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete{" "}
              <strong className="text-red-600">
                {selectedUserToDelete?.fullName}
              </strong>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-5 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-200 font-semibold"
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
