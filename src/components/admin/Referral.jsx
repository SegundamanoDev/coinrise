import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReferrals } from "../../features/referral/referralSlice";
import AdminLayout from "../admin/AdminLayout";

const Referrals = () => {
  const dispatch = useDispatch();
  const {
    data: referralData,
    loading,
    error,
  } = useSelector((state) => state.referrals);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newBonus, setNewBonus] = useState("");

  useEffect(() => {
    dispatch(fetchReferrals());
  }, [dispatch]);

  const openModal = (user) => {
    setSelectedUser(user);
    setNewBonus("");
    setIsModalOpen(true);
  };

  const handleBonusUpdate = () => {
    console.log(`Bonus for ${selectedUser.name} set to ${newBonus}`);
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">
        Referral Management
      </h2>

      {loading && <p className="text-gray-300">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="grid md:grid-cols-2 gap-6">
        {referralData.map((ref) => (
          <div
            key={ref._id}
            className="bg-[#1f2937] p-6 rounded-xl shadow-lg border border-[#374151]"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">
              {ref.user.name}
            </h3>
            <p className="text-sm text-gray-400 mb-1">
              Referred Users:{" "}
              <span className="text-yellow-400 font-semibold">
                {ref.referredUsers.length}
              </span>
            </p>
            <p className="text-sm text-gray-400 mb-3">
              Total Bonus Earned:{" "}
              <span className="text-green-400 font-semibold">
                ${ref.totalBonus || 0}
              </span>
            </p>

            <div className="mb-3">
              <h4 className="text-sm text-gray-300 font-semibold mb-1">
                Referrals:
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-400">
                {ref.referredUsers.map((ru, i) => (
                  <li key={i}>{ru.name}</li>
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
              Adjust Bonus for {selectedUser.name}
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
