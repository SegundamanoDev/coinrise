import React, { useEffect } from "react";
import { fetchProfile } from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { User, Pencil } from "lucide-react";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-6 bg-[#000000] rounded-2xl shadow-md text-white overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-white p-2 rounded-full">
          <User className="text-black w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
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
      ) : profile ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Full Name", value: profile.fullName },
            { label: "Email", value: profile.email },
            { label: "Phone", value: profile.phone || "Not provided" },
            { label: "Role", value: profile.role || "User" },
            {
              label: "Status",
              value: profile.isBlocked ? "Blocked" : "Active",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg p-4 hover:bg-gray-900 transition duration-300 ease-in-out"
            >
              <div className="flex items-center gap-2 mb-1 text-gray-400 text-sm font-medium">
                <Pencil className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              <p className="text-base text-white break-words">{item.value}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
};

export default ProfilePage;
