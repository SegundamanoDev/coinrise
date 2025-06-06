// components/ProfilePage.jsx (Enhanced)

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProfile,
  updateProfile,
  changePassword,
  uploadAvatar, // Import the new action
  resetUpdateStatus,
  resetPasswordStatus,
  resetAvatarUploadStatus, // Import the new reset action
} from "../features/users/userSlice";
import {
  User,
  Pencil,
  Loader2,
  CheckCircle,
  XCircle,
  Info,
  ShieldCheck,
  Clock,
  ShieldAlert,
  FileText,
  UploadCloud, // For upload icon
} from "lucide-react";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const {
    profile,
    loading,
    error,
    updateStatus,
    passwordStatus,
    avatarUploadStatus, // Get the new avatar upload status
  } = useSelector((state) => state.users);

  const fileInputRef = useRef(null); // Ref for the hidden file input

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

  // Fetch profile data on component mount
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Populate form fields when profile data is loaded
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
      });
      dispatch(resetPasswordStatus());
    } else if (passwordStatus.error) {
      toast.error(passwordStatus.error);
      dispatch(resetPasswordStatus());
    }
  }, [passwordStatus, dispatch]);

  // Handle Notifications for Avatar Upload
  useEffect(() => {
    if (avatarUploadStatus.success) {
      toast.success(avatarUploadStatus.message);
      dispatch(resetAvatarUploadStatus());
    } else if (avatarUploadStatus.error) {
      toast.error(avatarUploadStatus.error);
      dispatch(resetAvatarUploadStatus());
    }
  }, [avatarUploadStatus, dispatch]);

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

  // --- New Avatar Upload Logic ---
  const handleAvatarClick = () => {
    // Trigger the hidden file input click
    fileInputRef.current.click();
  };

  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const MAX_FILE_SIZE_MB = 5;
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`File size should not exceed ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed for profile pictures.");
        return;
      }

      const formData = new FormData();
      formData.append("avatar", file); // 'avatar' must match the name in upload.single('avatar') in backend

      dispatch(uploadAvatar(formData));
    }
  };
  // --- End New Avatar Upload Logic ---

  // Helper function to render KYC status display
  const renderKycStatus = () => {
    const kycStatus = profile?.kycStatus || "not_submitted"; // Default to 'not_submitted'
    let statusText = "";
    let statusIcon = null;
    let iconColorClass = "";
    let actionButton = null;
    let descriptionText = "";

    switch (kycStatus) {
      case "not_submitted":
        statusText = "Not Verified";
        statusIcon = <ShieldAlert size={20} />;
        iconColorClass = "text-red-500";
        descriptionText =
          "To unlock full platform features like withdrawals, please verify your account.";
        actionButton = (
          <Link
            to="/kyc-verification"
            className="mt-3 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 shadow-md"
          >
            <FileText size={18} className="mr-2" /> Verify Account Now
          </Link>
        );
        break;
      case "pending":
        statusText = "Verification Pending";
        statusIcon = <Clock size={20} />;
        iconColorClass = "text-yellow-500";
        descriptionText =
          "Your documents are under review. This usually takes 24-48 hours. We'll notify you once complete.";
        actionButton = (
          <Link
            to="/kyc-verification"
            className="mt-3 inline-flex items-center px-4 py-2 bg-gray-600 text-gray-300 font-semibold rounded-lg cursor-not-allowed opacity-75"
            disabled // This link is disabled since status is pending
          >
            <Info size={18} className="mr-2" /> View Submission
          </Link>
        );
        break;
      case "approved":
        statusText = "Verified";
        statusIcon = <ShieldCheck size={20} />;
        iconColorClass = "text-green-500";
        descriptionText =
          "Your account is fully verified! Enjoy all platform features.";
        actionButton = (
          <button
            className="mt-3 inline-flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg opacity-75 cursor-default"
            disabled
          >
            <CheckCircle size={18} className="mr-2" /> Verified
          </button>
        );
        break;
      case "rejected":
        statusText = "Verification Failed";
        statusIcon = <XCircle size={20} />;
        iconColorClass = "text-red-500";
        descriptionText = `Your KYC verification was rejected. Reason: ${
          profile?.kycRejectionReason ||
          "Please check your email or contact support."
        } Please re-submit correct documents.`;
        actionButton = (
          <Link
            to="/kyc-verification"
            className="mt-3 inline-flex items-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300 shadow-md"
          >
            <FileText size={18} className="mr-2" /> Re-submit Documents
          </Link>
        );
        break;
      default:
        statusText = "Unknown Status";
        statusIcon = <Info size={20} />;
        iconColorClass = "text-gray-400";
        descriptionText =
          "Unable to determine KYC status. Please contact support.";
        actionButton = null;
    }

    return (
      <div className="text-center w-full">
        <h3 className="text-xl font-semibold text-white mb-2">KYC Status</h3>
        <div
          className={`flex items-center justify-center font-bold text-lg mb-2 ${iconColorClass}`}
        >
          {statusIcon}
          <span className="ml-2">{statusText}</span>
        </div>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {descriptionText}
        </p>
        {actionButton}
      </div>
    );
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

  // Helper to generate initials for avatar placeholder
  const getInitials = (fullName) => {
    if (!fullName) return "N/A";
    const parts = fullName.split(" ").filter(Boolean); // Filter out empty strings
    if (parts.length === 0) return "NA";
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 p-6 bg-[#000000] min-h-screen text-gray-200">
      {/* Profile Picture & General Info Card (Column 1) */}
      <div className="bg-[#121212] shadow-xl rounded-xl p-6 flex flex-col items-center col-span-1 h-fit">
        <h2 className="text-2xl font-bold mb-6 text-white">Your Profile</h2>

        {/* Avatar Section */}
        <div
          className="relative w-32 h-32 rounded-full border-4 border-blue-500 overflow-hidden mb-6 group cursor-pointer"
          onClick={handleAvatarClick}
        >
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              alt="Profile Avatar"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-700 text-white text-5xl font-bold transition-transform duration-300 group-hover:scale-110">
              {getInitials(profile?.fullName)}
            </div>
          )}
          {/* Overlay for upload icon */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {avatarUploadStatus.loading ? (
              <Loader2 className="animate-spin w-8 h-8 text-white" />
            ) : (
              <UploadCloud size={40} className="text-white" />
            )}
          </div>
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>
        {/* End Avatar Section */}

        <div className="text-center w-full mb-6">
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
            to="/upgrade-account"
            className="mt-6 inline-block bg-gradient-to-r from-green-500 to-teal-600 text-white py-2 px-5 rounded-lg font-semibold hover:from-green-600 hover:to-teal-700 transition duration-300 shadow-md"
          >
            Upgrade Account
          </Link>
        </div>

        {/* KYC Status Section */}
        <div className="w-full border-t border-gray-700 pt-6 mt-6">
          {renderKycStatus()}
        </div>
      </div>

      {/* Edit User Info Section (Column 2) */}
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
              readOnly
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

      {/* Edit Security Section (Column 3) */}
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
