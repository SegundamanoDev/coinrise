import React from "react";
import AdminLayout from "../admin/AdminLayout";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    deposits: "$1,200",
    investments: "$800",
    referrals: 5,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Suspended",
    deposits: "$500",
    investments: "$300",
    referrals: 2,
  },
  // Add more mock users...
];

const Users = () => {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">
        User Management
      </h2>

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
            {mockUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t border-[#374151] hover:bg-[#2c3441]"
              >
                <td className="px-6 py-4 font-medium">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.deposits}</td>
                <td className="px-6 py-4">{user.investments}</td>
                <td className="px-6 py-4">{user.referrals}</td>
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
                  <button className="text-yellow-400 hover:underline">
                    View
                  </button>
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
