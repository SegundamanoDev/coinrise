import React, { useEffect } from "react";
import { fetchProfile } from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.users);
  console.log(profile);
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <svg
            className="animate-spin h-8 w-8 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Full Name</p>
              <p>{profile.fullName}</p>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <p>{profile.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Phone</p>
              <p>{profile.phone || "Not Provided"}</p>
            </div>
            <div>
              <p className="text-gray-500">Country</p>
              <p>{profile.country || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Referral Code</p>
              <p className="flex items-center gap-2">
                {profile.referralCode}
                <button
                  className="text-sm text-blue-600"
                  onClick={() =>
                    navigator.clipboard.writeText(profile.referralCode)
                  }
                >
                  Copy
                </button>
              </p>
            </div>
            <div>
              <p className="text-gray-500">Referred By</p>
              <p>{profile.referredBy || "N/A"}</p>
            </div>
          </div>

          <hr className="my-6" />

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Balance</p>
              <p className="text-lg font-bold">
                {profile.currency} {profile.balance.toFixed(2)}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Total Profits</p>
              <p className="text-lg font-bold">
                {profile.currency} {profile.totalProfits.toFixed(2)}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Referral Earnings</p>
              <p className="text-lg font-bold">
                {profile.currency} {profile.referralEarnings.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
