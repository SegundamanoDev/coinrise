// components/ProfilePage.jsx (Enhanced)

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfile,
  updateProfile,
  changePassword,
  resetUpdateStatus,
  resetPasswordStatus,
} from "../features/users/userSlice"; // Import new actions and resets
import {
  User,
  Pencil,
  Loader2,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Assuming you use react-toastify for notifications

const ProfilePage = () => {
  const dispatch = useDispatch();
  const {
    profile,
    loading,
    error,
    updateStatus,
    passwordStatus,
    avatarStatus,
  } = useSelector((state) => state.users);
  const fileInputRef = useRef(null);

  // State for editable profile fields
  const [profileData, setProfileData] = useState({
    fullName: "",
    address: "",
    phone: "",
    city: "",
    zip: "",
    country: "",
  });

  // State for password change fields
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Populate form fields when profile data is loaded
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setProfileData({
        fullName: profile.fullName || "",
        address: profile.address || "",
        phone: profile.phone || "",
        city: profile.city || "",
        zip: profile.zip || "",
        country: profile.country || "",
      });
    }
  }, [profile]);

  // Handle Notifications for Profile Updates
  useEffect(() => {
    if (updateStatus.success) {
      toast.success("Profile updated successfully!");
      dispatch(resetUpdateStatus());
    } else if (updateStatus.error) {
      toast.error(updateStatus.error);
      dispatch(resetUpdateStatus());
    }
  }, [updateStatus, dispatch]);

  // Handle Notifications for Password Changes
  useEffect(() => {
    if (passwordStatus.success) {
      toast.success("Password changed successfully!");
      setPasswordFields({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }); // Clear password fields
      dispatch(resetPasswordStatus());
    } else if (passwordStatus.error) {
      toast.error(passwordStatus.error);
      dispatch(resetPasswordStatus());
    }
  }, [passwordStatus, dispatch]);

  const handleProfileInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordInputChange = (e) => {
    setPasswordFields({ ...passwordFields, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profileData));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    dispatch(changePassword(passwordFields));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#000000] text-white">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
        <p className="ml-3">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#000000] text-red-500">
        <XCircle className="w-8 h-8 mr-2" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 p-6 bg-[#000000] min-h-screen text-gray-200">
      {/* Profile Picture & General Info Card */}
      <div className="bg-[#121212] shadow-xl rounded-xl p-6 flex flex-col items-center col-span-1">
        <h2 className="text-2xl font-bold mb-6 text-white">Your Profile</h2>

        <div className="text-center w-full">
          <h3 className="text-xl font-semibold text-white mb-2">
            {profile?.fullName}
          </h3>
          <p className="text-blue-400 font-medium text-lg mb-1">
            Level: {profile?.currentPlan}
          </p>
          <p className="text-gray-400 text-sm mb-4">Email: {profile?.email}</p>
          <div className="flex items-center justify-center text-gray-400 text-sm mb-2">
            <Info size={16} className="mr-2" />
            Last Login:{" "}
            {profile?.lastLoginAt
              ? new Date(profile.lastLoginAt).toLocaleString()
              : "N/A"}
          </div>
          <div className="flex items-center justify-center text-gray-400 text-sm">
            <Info size={16} className="mr-2" />
            Last Login IP: {profile?.lastLoginIpAddress || "N/A"}
          </div>

          <Link
            to="/upgrade-account" // Link to your upgrade page
            className="mt-6 inline-block bg-gradient-to-r from-green-500 to-teal-600 text-white py-2 px-5 rounded-lg font-semibold hover:from-green-600 hover:to-teal-700 transition duration-300 shadow-md"
          >
            Upgrade Account
          </Link>
        </div>
      </div>

      {/* Edit User Info Section */}
      <div className="bg-[#121212] shadow-xl rounded-xl p-6 xl:col-span-2">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Edit Personal Information
        </h2>
        <form
          onSubmit={handleProfileSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={profileData.fullName}
              onChange={handleProfileInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              House Address
            </label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleProfileInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleProfileInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile?.email || ""}
              readOnly // Email is usually not editable via profile settings
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-400 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Town/City
            </label>
            <input
              type="text"
              name="city"
              value={profileData.city}
              onChange={handleProfileInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Zip Code
            </label>
            <input
              type="text"
              name="zip"
              value={profileData.zip}
              onChange={handleProfileInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={profileData.country}
              onChange={handleProfileInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>
          <div className="col-span-full">
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={updateStatus.loading}
            >
              {updateStatus.loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2 inline-block" />{" "}
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Edit Security Section */}
      <div className="bg-[#121212] shadow-xl rounded-xl p-6 xl:col-span-2">
        <h2 className="text-2xl font-bold mb-6 text-white">Change Password</h2>
        <form
          onSubmit={handlePasswordSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwordFields.currentPassword}
              onChange={handlePasswordInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwordFields.newPassword}
              onChange={handlePasswordInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordFields.confirmPassword}
              onChange={handlePasswordInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder:text-gray-500 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              required
            />
          </div>
          <div className="col-span-full">
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={passwordStatus.loading}
            >
              {passwordStatus.loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2 inline-block" />{" "}
                  Changing...
                </>
              ) : (
                "Change Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
