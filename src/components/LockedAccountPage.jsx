import { Lock, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/users/userSlice";
import { useEffect } from "react";

export default function BlockedAccountPage() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Function to format the balance as currency
  const formatBalance = (balance) => {
    if (balance === undefined || balance === null) {
      return "$0.00"; // Default or loading state
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(balance);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-2xl shadow-xl p-8 max-w-xl text-center">
        <div className="flex justify-center mb-4 text-red-600">
          <Lock size={48} />
        </div>

        <h2 className="text-2xl font-semibold mb-2 text-blue-300">
          Account Suspended
        </h2>

        <p className="mb-4">
          Your account has been temporarily suspended due to unusual investment
          activity.
        </p>

        <div className="text-left text-sm font-bold mb-4 space-y-2">
          <p>
            <strong>Reason:</strong> Continuous investments without withdrawals
            have triggered our automated compliance system.
          </p>

          <p>
            {/* Display the formatted current balance using the hardcoded value */}
            <strong>Current Balance:</strong> {formatBalance(profile?.balance)}
          </p>

          <p>
            <strong>Status:</strong> Under Review
          </p>
        </div>

        <p className="text-sm mb-4">
          To unlock your account, please complete the following steps:
        </p>

        <ul className="text-left list-disc pl-6 text-sm mb-6 space-y-1">
          <li>Complete KYC update (ID & address verification)</li>
          <li>Submit source of funds documentation</li>
          <li>Fill out a risk assessment form</li>
        </ul>

        <p className="text-sm mb-2">
          Estimated review time: <strong>3–5 business days</strong>.
        </p>

        <p className="text-sm mb-6">
          Contact us:{" "}
          <a
            href="mailto:compliance@yourcompany.com"
            className="text-blue-600 underline"
          >
            trustvestinfo@gmail.com
          </a>
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
}
