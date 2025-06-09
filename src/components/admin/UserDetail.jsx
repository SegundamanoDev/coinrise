import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserById,
  updateUser,
  clearStatusMessage,
  resetAdminUpdateUserStatus,
} from "../../features/users/userSlice";
import AdminLayout from "../../components/admin/AdminLayout";
import { toast } from "react-toastify";
import {
  Loader2,
  User,
  Mail,
  Globe,
  Phone,
  Home,
  Tag,
  DollarSign,
  Clock,
  Settings,
  Wallet,
  TrendingUp,
  Gift,
  LinkIcon,
  XCircle,
  CheckCircle,
  Info,
  Edit,
  Landmark,
  Briefcase, // Import Briefcase icon for occupation
} from "lucide-react";
import { format } from "date-fns";

const formatLastLogin = (isoString) => {
  if (!isoString) return "N/A";
  try {
    const date = new Date(isoString);
    return (
      date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }) +
      ` at ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })}`
    );
  } catch (error) {
    console.error("Error formatting last login date:", error);
    return "N/A";
  }
};

// Helper to generate initials for avatar placeholder (copied from ProfilePage.jsx)
const getInitials = (fullName) => {
  if (!fullName) return "N/A";
  const parts = fullName.split(" ").filter(Boolean); // Filter out empty strings
  if (parts.length === 0) return "NA";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedUser, loading, error, statusMessage, adminUpdateUserStatus } =
    useSelector((state) => state.users);

  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = adminUpdateUserStatus;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    currency: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    occupation: "", // Added occupation to form data
    currentPlan: "",
    role: "",
    isBlocked: false,
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [id, dispatch]);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [navigate]);
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        fullName: selectedUser.fullName || "",
        email: selectedUser.email || "",
        country: selectedUser.country || "",
        currency: selectedUser.currency || "",
        phone: selectedUser.phone || "",
        address: selectedUser.address || "",
        city: selectedUser.city || "",
        zip: selectedUser.zip || "",
        occupation: selectedUser.occupation || "", // Initialize occupation from selectedUser
        currentPlan: selectedUser.currentPlan || "free",
        role: selectedUser.role || "user",
        isBlocked: selectedUser.isBlocked || false,
      });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (statusMessage) {
      toast.success(statusMessage);
      dispatch(clearStatusMessage());
    }

    if (updateSuccess) {
      setEditMode(false);
      dispatch(resetAdminUpdateUserStatus());
    }

    if (updateError) {
      toast.error(`Update failed: ${updateError}`);
      dispatch(resetAdminUpdateUserStatus());
    }
  }, [statusMessage, updateSuccess, updateError, dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateUser({ id, updates: formData }));
    }
  };

  if (loading && !selectedUser)
    return (
      <AdminLayout>
        <div className="flex flex-col justify-center items-center py-20 text-white">
          <Loader2 className="animate-spin w-10 h-10 text-blue-400 mb-3" />
          <p className="text-lg">Loading user details...</p>
        </div>
      </AdminLayout>
    );

  if (error && !selectedUser)
    return (
      <AdminLayout>
        <div className="flex flex-col justify-center items-center py-20 bg-red-900/20 border border-red-700 rounded-lg text-red-400">
          <XCircle className="w-10 h-10 mb-3" />
          <p className="text-lg text-center">Failed to load user: {error}</p>
          <p className="text-sm text-red-300 mt-2">
            Please try again later or check your network.
          </p>
        </div>
      </AdminLayout>
    );

  if (!selectedUser) {
    return (
      <AdminLayout>
        <div className="text-center py-20 bg-gray-800 rounded-lg border border-dashed border-gray-700 text-gray-400">
          <Info className="mx-auto w-12 h-12 mb-4 text-gray-500" />
          <p className="text-xl font-semibold">User not found.</p>
          <p className="text-sm text-gray-500 mt-2">
            The requested user details could not be loaded.
          </p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 max-w-4xl mx-auto text-white font-[Montserrat] bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400">
          User Details: {selectedUser?.fullName}
        </h2>

        {editMode ? (
          // Edit Form
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="currency"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Currency
                </label>
                <input
                  type="text"
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* NEW: Occupation input field */}
              <div>
                <label
                  htmlFor="occupation"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Occupation
                </label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* END NEW: Occupation input field */}
              <div>
                <label
                  htmlFor="currentPlan"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Current Plan
                </label>
                <select
                  id="currentPlan"
                  name="currentPlan"
                  value={formData.currentPlan}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="free">Free</option>
                  <option value="basic">Basic</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex items-center col-span-1 md:col-span-2">
                <input
                  type="checkbox"
                  id="isBlocked"
                  name="isBlocked"
                  checked={formData.isBlocked}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isBlocked"
                  className="ml-2 block text-sm font-medium text-gray-300"
                >
                  Block User
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  if (selectedUser) {
                    setFormData({
                      fullName: selectedUser.fullName || "",
                      email: selectedUser.email || "",
                      country: selectedUser.country || "",
                      currency: selectedUser.currency || "",
                      phone: selectedUser.phone || "",
                      address: selectedUser.address || "",
                      city: selectedUser.city || "",
                      zip: selectedUser.zip || "",
                      occupation: selectedUser.occupation || "", // Reset occupation
                      currentPlan: selectedUser.currentPlan || "free",
                      role: selectedUser.role || "user",
                      isBlocked: selectedUser.isBlocked || false,
                    });
                  }
                  dispatch(resetAdminUpdateUserStatus());
                }}
                className="px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition duration-200 font-semibold flex items-center gap-2"
              >
                <XCircle size={20} /> Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200 font-semibold flex items-center gap-2"
                disabled={updateLoading}
              >
                {updateLoading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <CheckCircle size={20} />
                )}{" "}
                {updateLoading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        ) : (
          // Display Details
          <div className="bg-gray-800 p-6 rounded-xl text-white border border-gray-700 shadow-xl space-y-4">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setEditMode(true)}
                className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition duration-200 font-semibold flex items-center gap-2"
              >
                <Edit size={20} /> Edit User
              </button>
            </div>
            {/* Avatar Display Section */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full border-4 border-blue-500 overflow-hidden flex items-center justify-center">
                {selectedUser?.avatar ? (
                  <img
                    src={selectedUser.avatar}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/96x96/555/FFF?text=${getInitials(
                        selectedUser?.fullName
                      )}`;
                      e.target.style.objectFit = "contain";
                      e.target.style.backgroundColor = "#2563eb"; // blue-600
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-700 text-white text-3xl font-bold">
                    {getInitials(selectedUser?.fullName)}
                  </div>
                )}
              </div>
            </div>
            {/* End Avatar Display Section */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p className="flex items-center gap-2">
                <User size={20} className="text-blue-400" />
                <strong>Full Name:</strong> {selectedUser?.fullName}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={20} className="text-blue-400" />
                <strong>Email:</strong> {selectedUser?.email}
              </p>
              <p className="flex items-center gap-2">
                <Globe size={20} className="text-blue-400" />
                <strong>Country:</strong> {selectedUser?.country || "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <DollarSign size={20} className="text-blue-400" />
                <strong>Currency:</strong> {selectedUser?.currency || "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={20} className="text-blue-400" />
                <strong>Phone:</strong> {selectedUser?.phone || "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <Home size={20} className="text-blue-400" />
                <strong>Address:</strong> {selectedUser?.address || "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <Landmark size={20} className="text-blue-400" />
                <strong>City:</strong> {selectedUser?.city || "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <Tag size={20} className="text-blue-400" />
                <strong>ZIP Code:</strong> {selectedUser?.zip || "N/A"}
              </p>
              {/* NEW: Display Occupation */}
              <p className="flex items-center gap-2">
                <Briefcase size={20} className="text-blue-400" />
                <strong>Occupation:</strong> {selectedUser?.occupation || "N/A"}
              </p>
              {/* END NEW: Display Occupation */}
              <p className="flex items-center gap-2">
                <Settings size={20} className="text-blue-400" />
                <strong>Current Plan:</strong>{" "}
                <span className="capitalize">
                  {selectedUser?.currentPlan || "N/A"}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <User size={20} className="text-blue-400" />
                <strong>Role:</strong>{" "}
                <span className="capitalize">{selectedUser?.role}</span>
              </p>
              <p className="flex items-center gap-2">
                <Wallet size={20} className="text-green-400" />
                <strong>Balance:</strong>{" "}
                {selectedUser?.balance
                  ? `${
                      selectedUser.currency || "USD"
                    } ${selectedUser.balance.toFixed(2)}`
                  : "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <TrendingUp size={20} className="text-emerald-400" />
                <strong>Total Profits:</strong>{" "}
                {selectedUser?.totalProfits
                  ? `${
                      selectedUser.currency || "USD"
                    } ${selectedUser.totalProfits.toFixed(2)}`
                  : "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <Gift size={20} className="text-purple-400" />
                <strong>Referral Earnings:</strong>{" "}
                {selectedUser?.referralEarnings
                  ? `${
                      selectedUser.currency || "USD"
                    } ${selectedUser.referralEarnings.toFixed(2)}`
                  : "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <LinkIcon size={20} className="text-yellow-400" />
                <strong>Referral Code:</strong>{" "}
                {selectedUser?.referralCode || "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <User size={20} className="text-yellow-400" />
                <strong>Referred By:</strong>{" "}
                {selectedUser?.referredBy || "N/A"}
              </p>
              <p className="flex items-center gap-2">
                <Clock size={20} className="text-gray-400" />
                <strong>Last Login:</strong>{" "}
                {formatLastLogin(selectedUser?.lastLoginAt)}
              </p>
              <p className="flex items-center gap-2">
                <Info size={20} className="text-gray-400" />
                <strong>Last Login IP:</strong>{" "}
                {selectedUser?.lastLoginIpAddress || "N/A"}
              </p>
              {/* NEW: Display Last Seen At */}
              <p className="flex items-center gap-2">
                <Clock size={20} className="text-gray-400" />
                <strong>Last Seen:</strong>{" "}
                {selectedUser?.lastSeenAt
                  ? new Date(selectedUser.lastSeenAt).toLocaleString()
                  : "N/A"}
              </p>
              {/* END NEW: Display Last Seen At */}
              <p className="flex items-center gap-2">
                <Clock size={20} className="text-gray-400" />
                <strong>Member Since:</strong>{" "}
                {selectedUser?.createdAt
                  ? format(
                      new Date(selectedUser.createdAt),
                      "MMM dd, yyyy HH:mm"
                    )
                  : "N/A"}
              </p>
              <p className="flex items-center gap-2 col-span-1 md:col-span-2">
                {selectedUser?.isBlocked ? (
                  <span className="px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 bg-red-500/20 text-red-400">
                    <XCircle size={16} /> Blocked
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 bg-green-500/20 text-green-400">
                    <CheckCircle size={16} /> Active
                  </span>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserDetail;
