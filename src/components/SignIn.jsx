import React, { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthFormWrapper from "./AuthFormWrapper";
import { signinUser, clearAuthMessage } from "../features/users/authSlice"; // Import clearAuthMessage for cleanup
import { toast } from "react-toastify"; // Ensure toast is imported

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Destructure relevant state from Redux auth slice
  const { loading, error, statusMessage, token } = useSelector(
    (state) => state.auth
  );

  // Redirect to dashboard on successful sign-in (token presence)
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  // Handle Redux state changes for error and success messages
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthMessage()); // Clear error after displaying
    }
    if (statusMessage) {
      toast.success(statusMessage);
      dispatch(clearAuthMessage()); // Clear message after displaying
    }
  }, [error, statusMessage, dispatch]); // Added dispatch to dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic client-side validation
    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password.");
      return;
    }
    dispatch(signinUser(formData));
  };

  return (
    <AuthFormWrapper title="Welcome Back">
      <form onSubmit={handleSubmit} className="space-y-5 text-white">
        {" "}
        {/* Added text-white */}
        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full pl-10 pr-4 py-3 border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00befe] transition-all duration-300 ease-in-out bg-gray-800 text-white placeholder-gray-500"
            required
          />
        </div>
        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full pl-10 pr-10 py-3 border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00befe] transition-all duration-300 ease-in-out bg-gray-800 text-white placeholder-gray-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {/* Forgot Password */}
        <div className="text-right">
          <a
            href="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </a>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#00befe] to-[#a700ff] text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
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
              Signing In...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
        {/* Sign Up Link */}
        <p className="text-sm text-center mt-2 text-gray-400">
          {" "}
          {/* Adjusted text color */}
          Don’t have an account?{" "}
          <a
            href="/sign-up"
            className="bg-gradient-to-r from-[#00befe] to-[#a700ff] bg-clip-text text-transparent font-medium"
          >
            Sign Up
          </a>
        </p>
      </form>
    </AuthFormWrapper>
  );
};

export default SignIn;
