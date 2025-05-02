import React, { useState } from "react";
import AdminLayout from "../admin/AdminLayout";

const referralData = [
  {
    id: 1,
    user: "Alice",
    referredUsers: 5,
    totalBonus: "$50",
    referrals: ["Bob", "Charlie", "Dave", "Eve", "Frank"],
  },
  {
    id: 2,
    user: "Bob",
    referredUsers: 2,
    totalBonus: "$20",
    referrals: ["Gina", "Harry"],
  },
];

const Referrals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newBonus, setNewBonus] = useState("");

  const openModal = (user) => {
    setSelectedUser(user);
    setNewBonus("");
    setIsModalOpen(true);
  };

  const handleBonusUpdate = () => {
    console.log(`Bonus for ${selectedUser} set to ${newBonus}`);
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">
        Referral Management
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {referralData.map((ref) => (
          <div
            key={ref.id}
            className="bg-[#1f2937] p-6 rounded-xl shadow-lg border border-[#374151]"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">
              {ref.user}
            </h3>
            <p className="text-sm text-gray-400 mb-1">
              Referred Users:{" "}
              <span className="text-yellow-400 font-semibold">
                {ref.referredUsers}
              </span>
            </p>
            <p className="text-sm text-gray-400 mb-3">
              Total Bonus Earned:{" "}
              <span className="text-green-400 font-semibold">
                {ref.totalBonus}
              </span>
            </p>

            <div className="mb-3">
              <h4 className="text-sm text-gray-300 font-semibold mb-1">
                Referrals:
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-400">
                {ref.referrals.map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => openModal(ref.user)}
              className="text-sm text-blue-400 hover:underline"
            >
              Adjust Bonus
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1f2937] p-6 rounded-lg shadow-lg border border-[#374151] w-[90%] max-w-sm">
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">
              Adjust Bonus for {selectedUser}
            </h3>
            <input
              type="text"
              value={newBonus}
              onChange={(e) => setNewBonus(e.target.value)}
              placeholder="$ amount"
              className="w-full px-4 py-2 mb-4 rounded bg-[#111827] text-white border border-[#374151] focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-300 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleBonusUpdate}
                className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Referrals;
