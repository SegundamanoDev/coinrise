import React, { useState } from "react";
import AuthFormWrapper from "./AuthFormWrapper";
import ReactFlagsSelect from "react-flags-select";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import CurrencyInput from "react-currency-input-field";
import countries from "./countryCurrency";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    kyc: null,
    agreeTerms: false,
    ageConfirmed: false,
  });

  const [country, setCountry] = useState(null);
  const [phone, setPhone] = useState(null);
  const [CountryCurrency, setCountryCurrency] = useState(null);

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
    console.log("Submitted:", formData);
    // You can integrate API call or Firebase logic here
  };

  return (
    <AuthFormWrapper title="Welcome!">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
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
          placeholder="Select Language"
          searchable
          searchPlaceholder="Search countries"
        />

        <select
          className="w-full"
          onChange={(e) => setCountryCurrency(e.target.value)}
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
          className="w-full bg-yellow-400 hover:bg-blue-700 text-white py-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </AuthFormWrapper>
  );
};

export default SignUp;
