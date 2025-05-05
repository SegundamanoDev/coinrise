import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../admin/AdminLayout";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../features/users/userSlice";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">
        User Management
      </h2>

      {loading && <p className="text-gray-400">Loading users...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="overflow-x-auto rounded-xl border border-[#374151] bg-[#1f2937]">
        <table className="min-w-full text-sm text-left text-gray-300">
          <thead className="bg-[#111827] text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Deposits</th>
              <th className="px-6 py-3">Investments</th>
              <th className="px-6 py-3">Referrals</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-[#374151] hover:bg-[#2c3441] cursor-pointer"
              >
                <td className="px-6 py-4 font-medium">
                  <Link
                    to={`/admin/users/${user._id}`}
                    className="hover:underline text-yellow-400"
                  >
                    {user.name}
                  </Link>
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">${user.deposits || 0}</td>
                <td className="px-6 py-4">${user.investments || 0}</td>
                <td className="px-6 py-4">{user.referrals || 0}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      user.status === "Active"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <Link
                    to={`/admin/users/${user._id}`}
                    className="text-yellow-400 hover:underline"
                  >
                    View
                  </Link>
                  <button className="text-blue-400 hover:underline">
                    Reset
                  </button>
                  <button className="text-red-400 hover:underline">
                    {user.status === "Active" ? "Suspend" : "Unsuspend"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Users;
