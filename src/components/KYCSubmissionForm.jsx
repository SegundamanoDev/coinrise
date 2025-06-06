// components/KYCSubmissionForm.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  submitKYCDocuments,
  resetKYCSubmissionStatus,
  fetchProfile, // To refresh profile after submission
} from "../features/users/userSlice";
import {
  UploadCloud,
  Loader2,
  CheckCircle,
  XCircle,
  FileText,
  ShieldAlert,
  User,
  Home,
  Clock,
} from "lucide-react";

const KYCSubmissionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { kycSubmissionStatus, profile } = useSelector((state) => state.users);

  // States for document files
  const [proofOfId, setProofOfId] = useState(null);
  const [proofOfAddress, setProofOfAddress] = useState(null);

  // States for validation errors
  const [idError, setIdError] = useState("");
  const [addressError, setAddressError] = useState("");

  const MAX_FILE_SIZE_MB = 5; // Max 5MB per file

  // Handle Redux state changes for submission feedback
  useEffect(() => {
    if (kycSubmissionStatus.success) {
      toast.success(kycSubmissionStatus.message);
      // Clear form fields
      setProofOfId(null);
      setProofOfAddress(null);
      // Reset file inputs visually
      document.getElementById("proofOfIdInput").value = "";
      document.getElementById("proofOfAddressInput").value = "";
      // Dispatch fetchProfile to immediately update kycStatus on ProfilePage
      dispatch(fetchProfile());
      dispatch(resetKYCSubmissionStatus());
      // Optionally navigate back to profile after success
      // navigate('/profile');
    } else if (kycSubmissionStatus.error) {
      toast.error(kycSubmissionStatus.error);
      dispatch(resetKYCSubmissionStatus());
    }
  }, [kycSubmissionStatus, dispatch, navigate]);

  // Helper function for file validation
  const handleFileChange = (e, setFile, setError) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(`File size should not exceed ${MAX_FILE_SIZE_MB}MB.`);
        setFile(null);
      } else if (
        !file.type.startsWith("image/") &&
        !file.type.startsWith("application/pdf")
      ) {
        setError("Only image (JPG, PNG) or PDF files are allowed.");
        setFile(null);
      } else {
        setError("");
        setFile(file);
      }
    } else {
      setFile(null);
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setIdError("");
    setAddressError("");

    // Client-side validation
    let isValid = true;
    if (!proofOfId) {
      setIdError("Proof of Identity is required.");
      isValid = false;
    }
    if (!proofOfAddress) {
      setAddressError("Proof of Address is required.");
      isValid = false;
    }

    if (!isValid) {
      toast.error("Please upload all required documents.");
      return;
    }

    const formData = new FormData();
    formData.append("proofOfId", proofOfId);
    formData.append("proofOfAddress", proofOfAddress);

    // Dispatch the thunk
    dispatch(submitKYCDocuments(formData));
  };

  // Prevent user from submitting again if KYC is already approved or pending
  const currentKycStatus = profile?.kycStatus || "not_submitted";
  const isFormDisabled =
    kycSubmissionStatus.loading ||
    currentKycStatus === "pending" ||
    currentKycStatus === "approved";

  // Determine button text based on status
  const submitButtonText = () => {
    if (kycSubmissionStatus.loading) return "Submitting...";
    if (currentKycStatus === "pending") return "Already Submitted (Pending)";
    if (currentKycStatus === "approved") return "Account Verified";
    return "Submit Documents";
  };

  return (
    <div className="min-h-screen bg-[#000000] text-gray-200 flex items-center justify-center p-4">
      <div className="bg-[#121212] shadow-xl rounded-xl p-6 md:p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-blue-400 text-center">
          KYC Verification
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Please upload the required documents to verify your account and unlock
          full platform features.
        </p>

        {/* Current KYC Status Display (repeated for clarity within form context) */}
        <div className="mb-6 p-4 rounded-lg bg-gray-800 border border-gray-700 text-center">
          {profile?.kycStatus === "approved" && (
            <div className="flex items-center justify-center text-green-500 font-bold">
              <ShieldCheck size={20} className="mr-2" /> Verified
            </div>
          )}
          {profile?.kycStatus === "pending" && (
            <div className="flex items-center justify-center text-yellow-500 font-bold">
              <Clock size={20} className="mr-2" /> Pending Review
            </div>
          )}
          {profile?.kycStatus === "rejected" && (
            <div className="flex items-center justify-center text-red-500 font-bold">
              <XCircle size={20} className="mr-2" /> Rejected
            </div>
          )}
          {(profile?.kycStatus === "not_submitted" || !profile?.kycStatus) && (
            <div className="flex items-center justify-center text-gray-400 font-bold">
              <ShieldAlert size={20} className="mr-2" /> Not Submitted
            </div>
          )}
          {profile?.kycStatus === "rejected" && (
            <p className="text-red-400 text-sm mt-2">
              Reason:{" "}
              {profile?.kycRejectionReason ||
                "Unknown. Please re-upload corrected documents."}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Proof of Identity */}
          <div>
            <label
              htmlFor="proofOfIdInput"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              <FileText size={16} className="inline-block mr-2" /> Proof of
              Identity
              <span className="text-gray-500 text-xs ml-1">
                (Passport, Driver's License, National ID)
              </span>
            </label>
            <div className="relative border border-gray-700 rounded-lg p-3 flex items-center justify-center bg-gray-800 cursor-pointer hover:border-blue-500 transition-colors duration-200">
              <input
                id="proofOfIdInput"
                type="file"
                onChange={(e) => handleFileChange(e, setProofOfId, setIdError)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*,application/pdf"
                disabled={isFormDisabled}
              />
              <div className="flex flex-col items-center text-gray-400">
                <UploadCloud size={32} className="mb-2" />
                <span className="text-sm">
                  {proofOfId
                    ? proofOfId.name
                    : `Click to upload (Max ${MAX_FILE_SIZE_MB}MB)`}
                </span>
              </div>
            </div>
            {idError && <p className="text-red-400 text-sm mt-2">{idError}</p>}
          </div>

          {/* Proof of Address */}
          <div>
            <label
              htmlFor="proofOfAddressInput"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              <Home size={16} className="inline-block mr-2" /> Proof of Address
              <span className="text-gray-500 text-xs ml-1">
                (Utility Bill, Bank Statement - last 3 months)
              </span>
            </label>
            <div className="relative border border-gray-700 rounded-lg p-3 flex items-center justify-center bg-gray-800 cursor-pointer hover:border-blue-500 transition-colors duration-200">
              <input
                id="proofOfAddressInput"
                type="file"
                onChange={(e) =>
                  handleFileChange(e, setProofOfAddress, setAddressError)
                }
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*,application/pdf"
                disabled={isFormDisabled}
              />
              <div className="flex flex-col items-center text-gray-400">
                <UploadCloud size={32} className="mb-2" />
                <span className="text-sm">
                  {proofOfAddress
                    ? proofOfAddress.name
                    : `Click to upload (Max ${MAX_FILE_SIZE_MB}MB)`}
                </span>
              </div>
            </div>
            {addressError && (
              <p className="text-red-400 text-sm mt-2">{addressError}</p>
            )}
          </div>

          {/* Submission Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 px-4 rounded-lg font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-purple-800 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isFormDisabled}
          >
            {kycSubmissionStatus.loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mr-3" /> Submitting...
              </>
            ) : (
              submitButtonText()
            )}
          </button>
        </form>

        {/* Back to Profile Link */}
        <div className="text-center mt-6">
          <Link to="/profile" className="text-blue-400 hover:underline">
            Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KYCSubmissionForm;
