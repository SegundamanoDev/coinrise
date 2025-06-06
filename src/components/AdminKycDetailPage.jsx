// components/AdminKycDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserById,
  updateUserKycStatus, // Action for admin to update KYC status
  clearSelectedUser, // To clear user data when component unmounts
  resetAdminKycUpdateStatus, // To clear status messages after update
} from "../features/users/userSlice"; // Assuming updateUserKycStatus and resetAdminKycUpdateStatus are in userSlice
import { toast } from "react-toastify";
import {
  Loader2,
  XCircle,
  CheckCircle,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Clock,
  Info,
  ShieldAlert,
  ArrowLeft,
  Download,
} from "lucide-react";

const AdminKycDetailPage = () => {
  const { id } = useParams(); // Get user ID from URL params
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedUser, loading, error, adminKycUpdateStatus } = useSelector(
    (state) => state.users
  );

  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionReasonInput, setShowRejectionReasonInput] =
    useState(false);

  // Fetch user details when component mounts or ID changes
  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
    // Clean up selectedUser state when component unmounts
    return () => {
      dispatch(clearSelectedUser());
      dispatch(resetAdminKycUpdateStatus()); // Clear status on unmount
    };
  }, [dispatch, id]);

  // Handle success/error notifications for KYC status updates
  useEffect(() => {
    if (adminKycUpdateStatus.success) {
      toast.success(adminKycUpdateStatus.message);
      dispatch(resetAdminKycUpdateStatus());
      setRejectionReason(""); // Clear reason input on success
      setShowRejectionReasonInput(false); // Hide input after successful update
    } else if (adminKycUpdateStatus.error) {
      toast.error(adminKycUpdateStatus.message || adminKycUpdateStatus.error);
      dispatch(resetAdminKycUpdateStatus());
    }
  }, [adminKycUpdateStatus, dispatch]);

  const handleApprove = () => {
    // Prevent approval if no KYC documents are submitted
    if (!selectedUser?.kycDocuments || selectedUser.kycDocuments.length === 0) {
      toast.error("Cannot approve: No KYC documents submitted by the user.");
      return;
    }
    dispatch(updateUserKycStatus({ id, kycStatus: "approved" }));
  };

  const handleReject = () => {
    // If the rejection reason input is not yet shown, show it.
    // If it is shown, proceed with rejection.
    if (showRejectionReasonInput) {
      // Validate rejection reason only when submitting
      if (!rejectionReason.trim()) {
        toast.error("Please provide a reason for rejection.");
        return;
      }
      dispatch(
        updateUserKycStatus({
          id,
          kycStatus: "rejected",
          kycRejectionReason: rejectionReason.trim(),
        })
      );
    } else {
      // Before showing the rejection input, check if documents exist to reject
      if (
        !selectedUser?.kycDocuments ||
        selectedUser.kycDocuments.length === 0
      ) {
        toast.error("Cannot reject: No KYC documents submitted to review.");
        return;
      }
      setShowRejectionReasonInput(true);
    }
  };

  // Helper to render KYC status badge
  const renderKycStatusBadge = (kycStatus) => {
    let text = "";
    let colorClass = "";
    let icon = null;

    switch (kycStatus) {
      case "approved":
        text = "Approved";
        colorClass = "bg-green-100 text-green-800";
        icon = <ShieldCheck size={16} className="mr-1" />;
        break;
      case "pending":
        text = "Pending Review";
        colorClass = "bg-yellow-100 text-yellow-800";
        icon = <Clock size={16} className="mr-1" />;
        break;
      case "rejected":
        text = "Rejected";
        colorClass = "bg-red-100 text-red-800";
        icon = <ShieldAlert size={16} className="mr-1" />;
        break;
      case "not_submitted":
      default:
        text = "Not Submitted";
        colorClass = "bg-gray-100 text-gray-800";
        icon = <Info size={16} className="mr-1" />;
        break;
    }

    return (
      <span
        className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${colorClass} items-center`}
      >
        {icon}
        {text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#000000] text-white">
        <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
        <p className="ml-3">Loading user details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#000000] text-red-500">
        <XCircle className="w-8 h-8 mr-2" />
        <p>Error: {error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#000000] text-gray-400">
        <Info className="w-8 h-8 mb-3" />
        <p>No user data found for this ID.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    fullName,
    email,
    kycStatus,
    kycDocuments,
    kycRejectionReason,
    createdAt,
    lastLoginAt,
    lastLoginIpAddress,
    phone,
    address,
    city,
    zip,
    country,
    role,
  } = selectedUser;

  // Determine if action buttons should be enabled/disabled
  const isUpdatingKycStatus = adminKycUpdateStatus.loading;
  const hasKycDocuments = kycDocuments && kycDocuments.length > 0;

  // Buttons are only relevant if status is pending AND documents are present
  // Also, prevent re-approving or re-rejecting if already in that state
  const canApprove =
    kycStatus === "pending" && hasKycDocuments && !isUpdatingKycStatus;
  const canReject =
    kycStatus === "pending" && hasKycDocuments && !isUpdatingKycStatus;

  return (
    <div className="p-4 md:p-6 bg-[#000000] min-h-screen text-gray-200">
      <div className="max-w-4xl mx-auto bg-[#121212] shadow-xl rounded-xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-700">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" /> Back to Users
          </button>
          <h1 className="text-3xl font-bold text-blue-500">
            KYC Review: {fullName}
          </h1>
        </div>

        {/* User Information Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            User Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <p>
              <strong>Name:</strong> {fullName}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Role:</strong> {role}
            </p>
            <p>
              <strong>Phone:</strong> {phone || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {address || "N/A"}
            </p>
            <p>
              <strong>City:</strong> {city || "N/A"}
            </p>
            <p>
              <strong>Zip:</strong> {zip || "N/A"}
            </p>
            <p>
              <strong>Country:</strong> {country || "N/A"}
            </p>
            <p>
              <strong>Registered:</strong>{" "}
              {new Date(createdAt).toLocaleDateString()}
            </p>
            <p>
              <strong>Last Login:</strong>{" "}
              {lastLoginAt ? new Date(lastLoginAt).toLocaleString() : "N/A"}
            </p>
            <p>
              <strong>Last Login IP:</strong> {lastLoginIpAddress || "N/A"}
            </p>
          </div>
        </div>

        {/* KYC Status Section */}
        <div className="mb-8 p-6 rounded-lg bg-gray-800 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-3 text-white">KYC Status</h2>
          <div className="flex items-center mb-3">
            <p className="text-lg font-medium mr-3">Current Status:</p>
            {renderKycStatusBadge(kycStatus)}
          </div>
          {kycStatus === "rejected" && kycRejectionReason && (
            <div className="mt-4 p-3 bg-red-800 bg-opacity-40 border border-red-700 rounded-md text-red-200">
              <strong className="text-red-100">Rejection Reason:</strong>{" "}
              {kycRejectionReason}
            </div>
          )}
        </div>

        {/* KYC Documents Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Uploaded Documents
          </h2>
          {hasKycDocuments ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {kycDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg p-4 shadow-md border border-gray-700"
                >
                  <h3 className="text-lg font-semibold text-blue-400 mb-2 capitalize">
                    {doc.docType === "proofOfId"
                      ? "Proof of Identity"
                      : "Proof of Address"}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Uploaded On: {new Date(doc.uploadedAt).toLocaleString()}
                  </p>
                  {doc.secure_url.endsWith(".pdf") ? (
                    <div className="flex flex-col items-center justify-center h-48 bg-gray-700 rounded-md">
                      <FileText size={48} className="text-red-400 mb-3" />
                      <a
                        href={doc.secure_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline flex items-center text-sm"
                      >
                        <Download size={16} className="mr-1" /> View PDF
                      </a>
                    </div>
                  ) : (
                    <div className="relative w-full h-48 bg-gray-700 rounded-md overflow-hidden flex items-center justify-center">
                      {/* Fallback image if actual image fails to load */}
                      <img
                        src={doc.secure_url}
                        alt={`${doc.docType}`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src =
                            "https://placehold.co/400x200/555/FFF?text=Image+Not+Found";
                          e.target.style.objectFit = "contain";
                          e.target.style.backgroundColor = "#4a5568"; // tailwind gray-700
                        }}
                      />
                      <a
                        href={doc.secure_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-2 right-2 text-white bg-black bg-opacity-60 rounded-full p-2 hover:bg-opacity-80 transition-opacity"
                        title="Open Image"
                      >
                        <Download size={20} />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-gray-800 rounded-lg text-center border border-gray-700">
              <p className="text-gray-400">
                No KYC documents uploaded for this user.
              </p>
            </div>
          )}
        </div>

        {/* Admin Actions Section */}
        <div className="p-6 rounded-lg bg-gray-800 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Admin Actions
          </h2>

          {/* Show Approve/Reject buttons ONLY IF there are documents AND status is pending */}
          {hasKycDocuments &&
          kycStatus === "pending" &&
          !showRejectionReasonInput ? (
            <div className="mb-4">
              <button
                onClick={handleApprove}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold mr-4 hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isUpdatingKycStatus}
              >
                {isUpdatingKycStatus &&
                adminKycUpdateStatus.message?.includes("approved") ? (
                  <Loader2 className="animate-spin w-5 h-5 inline-block mr-2" />
                ) : (
                  <CheckCircle size={20} className="inline-block mr-2" />
                )}
                Approve KYC
              </button>
              <button
                onClick={handleReject}
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isUpdatingKycStatus}
              >
                {isUpdatingKycStatus &&
                adminKycUpdateStatus.message?.includes("rejected") ? (
                  <Loader2 className="animate-spin w-5 h-5 inline-block mr-2" />
                ) : (
                  <XCircle size={20} className="inline-block mr-2" />
                )}
                Reject KYC
              </button>
            </div>
          ) : (
            // Message if actions are not available (no docs, or already processed)
            <p className="text-md text-gray-400 mb-4">
              {hasKycDocuments && kycStatus !== "pending"
                ? `KYC for this user is already ${kycStatus}.`
                : "No KYC documents submitted, or status is not pending. Actions are not available."}
            </p>
          )}

          {/* Rejection Reason Input and Confirm Button */}
          {showRejectionReasonInput && (
            <div className="mt-4">
              <label
                htmlFor="rejectionReason"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                Reason for Rejection:
              </label>
              <textarea
                id="rejectionReason"
                rows="3"
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason for rejection (e.g., blurry ID, address mismatch, missing documents)"
                disabled={isUpdatingKycStatus}
              ></textarea>
              <div className="flex justify-end space-x-3 mt-3">
                <button
                  onClick={() => {
                    setShowRejectionReasonInput(false);
                    setRejectionReason(""); // Clear reason if canceled
                  }}
                  className="px-5 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition duration-300"
                  disabled={isUpdatingKycStatus}
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject} // Re-use handleReject to submit with reason
                  className="px-5 py-2 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUpdatingKycStatus || !rejectionReason.trim()}
                >
                  {isUpdatingKycStatus &&
                  adminKycUpdateStatus.message?.includes("rejected") ? (
                    <Loader2 className="animate-spin w-5 h-5 inline-block mr-2" />
                  ) : (
                    <XCircle size={20} className="inline-block mr-2" />
                  )}
                  Confirm Rejection
                </button>
              </div>
            </div>
          )}

          {/* General loading indicator for KYC actions */}
          {isUpdatingKycStatus && (
            <div className="mt-4 flex items-center text-blue-400">
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
              Updating KYC status...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminKycDetailPage;
