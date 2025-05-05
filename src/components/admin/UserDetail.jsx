import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../features/users/userSlice";
import AdminLayout from "../AdminLayout";

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedUser, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (id) dispatch(fetchUserById(id));
  }, [id, dispatch]);

  if (loading)
    return (
      <AdminLayout>
        <p className="text-white">Loading user...</p>
      </AdminLayout>
    );
  if (error)
    return (
      <AdminLayout>
        <p className="text-red-500">{error}</p>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">User Details</h2>
      <div className="bg-[#1f2937] p-6 rounded-xl text-white border border-[#374151]">
        <p>
          <strong>Name:</strong> {selectedUser?.name}
        </p>
        <p>
          <strong>Email:</strong> {selectedUser?.email}
        </p>
        <p>
          <strong>Status:</strong> {selectedUser?.status}
        </p>
        <p>
          <strong>Deposits:</strong> ${selectedUser?.totalDeposits}
        </p>
        <p>
          <strong>Investments:</strong> ${selectedUser?.totalInvestments}
        </p>
        <p>
          <strong>Referrals:</strong> {selectedUser?.referralCount}
        </p>
      </div>
    </AdminLayout>
  );
};

export default UserDetail;
