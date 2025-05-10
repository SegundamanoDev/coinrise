import React, { useState } from "react";

const KYCVerificationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "Alex Vega",
    dateOfBirth: "",
    houseAddress: "",
    phoneNumber: "",
    govtIdType: "",
    govtIdFile: null,
    proofOfAddressFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send to backend)
    console.log(formData);
  };

  return (
    <div className="min-h-screen border border-divider bg-[#000000] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-md shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6">KYC Verification</h2>

        <label className="block mb-2">Fullname:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
          readOnly
        />

        <label className="block mb-2">Date of Birth:</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        />

        <label className="block mb-2">House Address:</label>
        <input
          type="text"
          name="houseAddress"
          value={formData.houseAddress}
          onChange={handleChange}
          placeholder="Enter House Address"
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        />

        <label className="block mb-2">Phone Number:</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        />

        <label className="block mb-2">Government Issued ID:</label>
        <select
          name="govtIdType"
          value={formData.govtIdType}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
        >
          <option value="">-- select --</option>
          <option value="driver_license">Driver's License</option>
          <option value="passport">International Passport</option>
          <option value="national_id">National ID</option>
        </select>

        <label className="block mb-2">Upload Government Issued ID:</label>
        <input
          type="file"
          name="govtIdFile"
          onChange={handleChange}
          className="w-full mb-4 bg-gray-700 text-white p-2 rounded"
        />

        <label className="block mb-2">Upload Proof of Address:</label>
        <input
          type="file"
          name="proofOfAddressFile"
          onChange={handleChange}
          className="w-full mb-6 bg-transparent  text-[#ffffff] p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#00befe] to-[#a700ff] text-white font-semibold py-2 px-4 rounded"
        >
          Proceed
        </button>

        <div className="text-center text-sm mt-6 text-gray-400">© 2025</div>
      </form>
    </div>
  );
};

export default KYCVerificationForm;
