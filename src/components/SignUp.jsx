import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Ensure toast is imported
import "react-toastify/dist/ReactToastify.css";
import AuthFormWrapper from "./AuthFormWrapper";
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countries from "./countryCurrency"; // Assuming this array is structured correctly
import { signupUser, clearAuthMessage } from "../features/users/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Destructure relevant state from Redux auth slice
  const { loading, error, statusMessage } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "", // Initialize phone to an empty string
    password: "",
    confirmPassword: "",
    referredBy: "",
    agreeTerms: false,
    ageConfirmed: false,
    country: "",
    currency: "",
  });

  // State for input-specific errors
  const [formErrors, setFormErrors] = useState({});

  // Handle Redux state changes for success/error messages
  useEffect(() => {
    if (statusMessage) {
      toast.success(statusMessage);
      dispatch(clearAuthMessage()); // Clear message after displaying
      // Redirect to sign-in after a brief delay for user to read toast
      const timer = setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [statusMessage, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthMessage()); // Clear error after displaying
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear specific error when user starts typing/changing input
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle phone input change separately
  const handlePhoneChange = (phoneValue) => {
    setFormData((prev) => ({ ...prev, phone: phoneValue }));
    if (formErrors.phone) {
      setFormErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  // Client-side validation function
  const validateForm = () => {
    let errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid.";
    }
    if (!formData.phone) errors.phone = "Phone number is required.";
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.country) errors.country = "Country is required.";
    if (!formData.currency) errors.currency = "Currency is required.";
    if (!formData.agreeTerms)
      errors.agreeTerms = "You must agree to the Terms & Conditions.";
    if (!formData.ageConfirmed)
      errors.ageConfirmed = "You must be at least 18 years old.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Dispatch signup action only if validation passes
      dispatch(signupUser(formData));
    }
  };

  return (
    <AuthFormWrapper title="Welcome!">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-6 bg-[#000000] rounded-xl shadow-md space-y-5 text-white" // Added text-white for visibility
      >
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

        <div>
          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full p-2 border ${
              formErrors.fullName ? "border-red-500" : "border-divider"
            } rounded bg-gray-800 text-white placeholder-gray-500`}
          />
          {formErrors.fullName && (
            <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>
          )}
        </div>

        <div>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border ${
              formErrors.email ? "border-red-500" : "border-divider"
            } rounded bg-gray-800 text-white placeholder-gray-500`}
          />
          {formErrors.email && (
            <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
          )}
        </div>

        <div>
          <PhoneInput
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handlePhoneChange}
            defaultCountry="US"
            className={`w-full p-2 border ${
              formErrors.phone ? "border-red-500" : "border-divider"
            } rounded bg-gray-800 text-white placeholder-gray-500`}
            inputStyle={{
              backgroundColor: "rgb(31 41 55)", // Tailwind gray-800
              color: "white",
              border: "none",
              padding: "0.5rem",
            }}
            countrySelectStyle={{
              backgroundColor: "rgb(31 41 55)", // Tailwind gray-800
              color: "white",
              border: "none",
            }}
            // Fix for react-phone-number-input's default styling potentially overriding
            style={{ "--PhoneInput-color--focus": "#00befe" }}
          />
          {formErrors.phone && (
            <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
          )}
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 border ${
              formErrors.password ? "border-red-500" : "border-divider"
            } rounded bg-gray-800 text-white placeholder-gray-500`}
          />
          {formErrors.password && (
            <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
          )}
        </div>

        <div>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full p-2 border ${
              formErrors.confirmPassword ? "border-red-500" : "border-divider"
            } rounded bg-gray-800 text-white placeholder-gray-500`}
          />
          {formErrors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {formErrors.confirmPassword}
            </p>
          )}
        </div>

        <input
          name="referredBy"
          type="text"
          placeholder="Referral Code (Optional)"
          value={formData.referredBy}
          onChange={handleChange}
          className="w-full p-2 border border-divider rounded bg-gray-800 text-white placeholder-gray-500"
        />

        <div>
          <ReactFlagsSelect
            selected={formData.country}
            onSelect={(country) =>
              setFormData((prev) => ({ ...prev, country }))
            }
            placeholder="Select country"
            searchable
            searchPlaceholder="Search countries"
            className={`flag-select-container ${
              formErrors.country ? "border-red-500" : "border-divider"
            }`}
            selectButtonClassName="bg-gray-800 text-white border border-divider"
            fullWidth={true}
          />
          {formErrors.country && (
            <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>
          )}
        </div>

        <div>
          <select
            className={`w-full p-2 border ${
              formErrors.currency ? "border-red-500" : "border-divider"
            } rounded bg-gray-800 text-white`}
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          >
            <option value="" className="text-gray-500">
              Select Currency
            </option>
            {countries.map((c, index) => (
              <option key={index} value={c.currency} className="text-white">
                {c.countryName} ({c.currency})
              </option>
            ))}
          </select>
          {formErrors.currency && (
            <p className="text-red-500 text-xs mt-1">{formErrors.currency}</p>
          )}
        </div>

        <label className="flex items-center space-x-2 text-gray-300">
          <input
            name="agreeTerms"
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="form-checkbox h-4 w-4 text-[#00befe] rounded" // Style checkbox
          />
          <span>I agree to the Terms & Conditions</span>
        </label>
        {formErrors.agreeTerms && (
          <p className="text-red-500 text-xs">{formErrors.agreeTerms}</p>
        )}

        <label className="flex items-center space-x-2 text-gray-300">
          <input
            name="ageConfirmed"
            type="checkbox"
            checked={formData.ageConfirmed}
            onChange={handleChange}
            className="form-checkbox h-4 w-4 text-[#00befe] rounded" // Style checkbox
          />
          <span>I confirm I am 18 years or older</span>
        </label>
        {formErrors.ageConfirmed && (
          <p className="text-red-500 text-xs">{formErrors.ageConfirmed}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#00befe] to-[#a700ff] text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </AuthFormWrapper>
  );
};

export default SignUp;
