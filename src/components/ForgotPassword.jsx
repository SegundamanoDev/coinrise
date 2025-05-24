import React, { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearAuthMessage } from "../features/users/authSlice";
import { toast } from "react-toastify";
import AuthFormWrapper from "./AuthFormWrapper";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, error, statusMessage } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (statusMessage) {
      toast.success(statusMessage);
    }

    return () => {
      dispatch(clearAuthMessage()); // Clear messages when unmounting
    };
  }, [error, statusMessage, dispatch]);

  return (
    <AuthFormWrapper title="Forgot Password">
      <form onSubmit={handleSubmit} className="space-y-6">
        <p className="text-sm text-gray-600 text-center">
          Enter your registered email address. We’ll send you a link to reset
          your password.
        </p>

        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full pl-10 pr-4 py-3 border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#00befe] to-[#a700ff] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="text-sm text-center text-gray-600">
          <a href="/sign-in" className="text-blue-600 hover:underline">
            Back to Sign In
          </a>
        </p>
      </form>
    </AuthFormWrapper>
  );
};

export default ForgotPassword;
