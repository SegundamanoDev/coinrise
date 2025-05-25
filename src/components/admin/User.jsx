import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  toggleUserStatus,
  topupUserProfit,
  clearStatusMessage,
} from "../../features/users/userSlice";
import { toast } from "react-toastify";
import { AlertTriangle } from "lucide-react";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleToggleStatus = (id) => {
    dispatch(toggleUserStatus(id));
  };

  const openTopupModal = (userId) => {
    setTopupUserId(userId);
    setTopupAmount("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTopupUserId(null);
  };

  const submitTopup = () => {
    const amount = parseFloat(topupAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    dispatch(topupUserProfit({ id: topupUserId, amount }));
    closeModal();
  };

  const confirmDeleteUser = () => {
    if (!selectedUserToDelete) return;
    dispatch(deleteUser(selectedUserToDelete._id));
    setIsDeleteModalOpen(false);
    setSelectedUserToDelete(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Users</h2>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && users.length === 0 && <p>No users found.</p>}

      {!loading && users.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Country</th>
              <th className="border p-2">Currency</th>
              <th className="border p-2">Balance</th>
              <th className="border p-2">Profit</th>
              <th className="border p-2">Admin</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border p-2">{user.fullName}</td>
                <td className="border p-2">{user.country}</td>
                <td className="border p-2">{user.currency}</td>
                <td className="border p-2">
                  {formatMoney(user?.balance, user?.currency)}
                </td>
                <td className="border p-2">
                  {formatMoney(user.totalProfits, user?.currency)}
                </td>
                {user.isAdmin ? (
                  <td className="border p-2">True</td>
                ) : (
                  <td className="border p-2">False</td>
                )}
                <td className="border p-2">
                  {user.isBlocked ? (
                    <span className="text-red-600 font-semibold">Blocked</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Active</span>
                  )}
                </td>
                <td className="border p-2 space-x-2 space-y-2">
                  <button
                    onClick={() => openTopupModal(user._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Top
                  </button>
                  <button
                    onClick={() => handleToggleStatus(user._id)}
                    className={`${
                      user.isBlocked ? "bg-green-500" : "bg-yellow-500"
                    } text-white px-3 py-1 rounded hover:opacity-90`}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUserToDelete(user);
                      setIsDeleteModalOpen(true);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Top-up Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Top Up Profit</h3>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full border rounded px-3 py-2 mb-4"
              value={topupAmount}
              onChange={(e) => setTopupAmount(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={submitTopup}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">
                Delete User
              </h3>
            </div>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete{" "}
              <strong>{selectedUserToDelete?.fullName}</strong>? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
