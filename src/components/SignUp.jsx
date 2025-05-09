import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthFormWrapper from "./AuthFormWrapper";
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import countries from "./countryCurrency";
import { signupUser } from "../features/users/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    agreeTerms: false,
    ageConfirmed: false,
  });

  const [country, setCountry] = useState(null);
  const [phone, setPhone] = useState(null);
  const [currency, setCurrency] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert("You must agree to the Terms & Conditions");
      return;
    }
    if (!formData.ageConfirmed) {
      alert("You must be at least 18 years old");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      ...formData,
      country,
      phone,
      currency,
    };

    dispatch(signupUser(payload));
    console.log(payload);
  };

  return (
    <AuthFormWrapper title="Welcome!">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm text-center">{successMessage}</p>
        )}

        <input
          name="fullName"
          type="text"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <PhoneInput
          placeholder="Enter phone number"
          value={phone}
          onChange={setPhone}
          defaultCountry="US"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="referralCode"
          type="text"
          placeholder="Referral Code (Optional)"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <ReactFlagsSelect
          selected={country}
          onSelect={(code) => setCountry(code)}
          placeholder="Select country"
          searchable
          searchPlaceholder="Search countries"
        />

        <select
          className="w-full p-2 border rounded"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
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
          className="w-full bg-yellow-400 text-white py-2 rounded hover:bg-yellow-500"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </AuthFormWrapper>
  );
};

export default SignUp;
