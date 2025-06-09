import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; // Import Link for Terms & Conditions
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthFormWrapper from "./AuthFormWrapper";
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Ensure this is imported for base styles
import countries from "./countryCurrency"; // Assuming this array is structured correctly
import { signupUser, clearAuthMessage } from "../features/users/authSlice";
import { Loader2 } from "lucide-react"; // Import Loader2 for button loading state

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, statusMessage, token } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    referredBy: "",
    agreeTerms: false,
    ageConfirmed: false,
    country: "",
    currency: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (statusMessage) {
      toast.success(statusMessage);
      const timer = setTimeout(() => {
        navigate("/sign-in");
        dispatch(clearAuthMessage());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAuthMessage());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhoneChange = (phoneValue) => {
    setFormData((prev) => ({ ...prev, phone: phoneValue }));
    if (formErrors.phone) {
      setFormErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid.";
    }
    // Phone number validation might be more complex depending on the library and requirements
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
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(signupUser(formData));
    }
  };

  return (
    <AuthFormWrapper title="Start Your Investment Journey!">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-6 bg-[#000000] rounded-xl shadow-md space-y-5 text-white border border-gray-800"
      >
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">
          Create Your Account
        </h2>

        {/* Full Name */}
        <div>
          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-gray-900 border ${
              formErrors.fullName ? "border-red-500" : "border-gray-700"
            } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
          />
          {formErrors.fullName && (
            <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-gray-900 border ${
              formErrors.email ? "border-red-500" : "border-gray-700"
            } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
          />
          {formErrors.email && (
            <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div
          className={`rounded-lg border ${
            formErrors.phone ? "border-red-500" : "border-gray-700"
          } focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-colors duration-200`}
        >
          <PhoneInput
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handlePhoneChange}
            defaultCountry="US"
          />
          {formErrors.phone && (
            <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-gray-900 border ${
              formErrors.password ? "border-red-500" : "border-gray-700"
            } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
          />
          {formErrors.password && (
            <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-gray-900 border ${
              formErrors.confirmPassword ? "border-red-500" : "border-gray-700"
            } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200`}
          />
          {formErrors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {formErrors.confirmPassword}
            </p>
          )}
        </div>

        {/* Referral Code */}
        <input
          name="referredBy"
          type="text"
          placeholder="Referral Code (Optional)"
          value={formData.referredBy}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        />

        {/* Select Country */}
        <div
          className={`rounded-lg border ${
            formErrors.country ? "border-red-500" : "border-gray-700"
          } focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-colors duration-200`}
        >
          <ReactFlagsSelect
            selected={formData.country}
            onSelect={(country) => {
              setFormData((prev) => ({ ...prev, country }));
              if (formErrors.country) {
                setFormErrors((prev) => ({ ...prev, country: "" }));
              }
            }}
            placeholder="Select country"
            searchable
            searchPlaceholder="Search countries"
            selectButtonClassName="bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200"
            selectedSize={16}
            optionsSize={16}
            fullWidth={true}
          />
          {formErrors.country && (
            <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>
          )}
        </div>

        {/* Select Currency */}
        <div>
          <select
            className={`w-full p-3 rounded-lg bg-gray-900 border ${
              formErrors.currency ? "border-red-500" : "border-gray-700"
            } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 appearance-none pr-8`}
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          >
            <option value="" className="bg-gray-900 text-gray-500">
              Select Currency
            </option>
            {countries.map((c, index) => (
              <option
                key={index}
                value={c.currency}
                className="bg-gray-900 text-white"
              >
                {c.countryName} ({c.currency})
              </option>
            ))}
          </select>
          {formErrors.currency && (
            <p className="text-red-500 text-xs mt-1">{formErrors.currency}</p>
          )}
        </div>

        {/* Terms & Conditions Checkbox */}
        <label className="flex items-center space-x-3 text-gray-300 cursor-pointer">
          <input
            name="agreeTerms"
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-600 rounded bg-gray-800"
          />
          <span>
            I agree to the{" "}
            <Link to="/terms" className="text-blue-400 hover:underline">
              Terms & Conditions
            </Link>
          </span>
        </label>
        {formErrors.agreeTerms && (
          <p className="text-red-500 text-xs">{formErrors.agreeTerms}</p>
        )}

        {/* Age Confirmation Checkbox */}
        <label className="flex items-center space-x-3 text-gray-300 cursor-pointer">
          <input
            name="ageConfirmed"
            type="checkbox"
            checked={formData.ageConfirmed}
            onChange={handleChange}
            className="h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-600 rounded bg-gray-800"
          />
          <span>I confirm I am 18 years or older</span>
        </label>
        {formErrors.ageConfirmed && (
          <p className="text-red-500 text-xs">{formErrors.ageConfirmed}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-purple-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" /> Signing Up...
            </>
          ) : (
            "Sign Up"
          )}
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-blue-400 hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthFormWrapper>
  );
};

export default SignUp;
