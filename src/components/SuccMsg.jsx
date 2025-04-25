import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleDashboardRedirect = () => {
    navigate("/dashboard"); // Redirect to dashboard after success
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Investment Successful!
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Your investment has been successfully confirmed. You can now track
          your investment in the dashboard.
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleDashboardRedirect}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Go to Dashboard
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="text-gray-500 underline hover:text-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
