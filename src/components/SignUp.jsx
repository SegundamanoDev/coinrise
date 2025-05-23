import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthFormWrapper from "./AuthFormWrapper";
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countries from "./countryCurrency";
import { signupUser, clearAuthMessage } from "../features/users/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading, error, statusMessage } = useSelector((state) => state.auth);

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

  useEffect(() => {
    if (statusMessage) {
      toast.success(statusMessage);
      dispatch(clearAuthMessage());
    }
  }, [statusMessage, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agreeTerms)
      return alert("You must agree to the Terms & Conditions");
    if (!formData.ageConfirmed)
      return alert("You must be at least 18 years old");
    if (formData.password !== formData.confirmPassword)
      return alert("Passwords do not match");

    dispatch(signupUser(formData));
  };

  return (
    <AuthFormWrapper title="Welcome!">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-6 bg-[#000000] rounded-xl shadow-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

        <input
          name="fullName"
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full p-2 border border-divider rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border border-divider rounded"
        />
        <PhoneInput
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
          defaultCountry="US"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border border-divider rounded"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full p-2 border border-divider rounded"
        />
        <input
          name="referredBy"
          type="text"
          placeholder="Referral Code (Optional)"
          value={formData.referredBy}
          onChange={handleChange}
          className="w-full p-2 border border-divider rounded"
        />

        <ReactFlagsSelect
          selected={formData.country}
          onSelect={(country) => setFormData((prev) => ({ ...prev, country }))}
          placeholder="Select country"
          searchable
          searchPlaceholder="Search countries"
        />

        <select
          className="w-full p-2 border border-divider rounded"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          required
        >
          <option value="">Select Currency</option>
          {countries.map((c, index) => (
            <option key={index} value={c.currency}>
              {c.countryName} ({c.currency})
            </option>
          ))}
        </select>

        <label className="flex items-center space-x-2">
          <input
            name="agreeTerms"
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={handleChange}
            required
          />
          <span>I agree to the Terms & Conditions</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            name="ageConfirmed"
            type="checkbox"
            checked={formData.ageConfirmed}
            onChange={handleChange}
            required
          />
          <span>I confirm I am 18 years or older</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#00befe] to-[#a700ff] text-white py-2 rounded"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </AuthFormWrapper>
  );
};

export default SignUp;
