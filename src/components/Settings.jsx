import React, { useState } from "react";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    profilePic: null,
  });

  const [newName, setNewName] = useState(userData.name);
  const [newEmail, setNewEmail] = useState(userData.email);
  const [newPhone, setNewPhone] = useState(userData.phone);
  const [newProfilePic, setNewProfilePic] = useState(null);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    setNewProfilePic(URL.createObjectURL(file)); // Show preview
  };

  const handleSaveChanges = () => {
    // Here you can handle the saving of the changes, possibly sending to an API or updating a global state.
    setUserData({
      name: newName,
      email: newEmail,
      phone: newPhone,
      profilePic: newProfilePic,
    });
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6 bg-[#1f2937] text-white min-h-screen">
      {/* Edit Profile Header */}
      <h2 className="text-3xl font-semibold text-yellow-400 mb-6">
        Edit Profile
      </h2>

      {/* Profile Picture Section */}
      <div className="flex items-center mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-400">
          <img
            src={newProfilePic || "/default-avatar.png"} // Default image if no profile picture
            alt="Profile"
            className="w-full h-full object-cover text-center justify-center "
          />
        </div>
        <label
          htmlFor="profilePic"
          className="ml-4 text-yellow-400 cursor-pointer"
        >
          Change Profile Picture
        </label>
        <input
          type="file"
          id="profilePic"
          accept="image/*"
          onChange={handleProfilePicChange}
          className="hidden"
        />
      </div>

      {/* Personal Information Form */}
      <div className="bg-[#374151] p-6 rounded-xl shadow-lg border border-[#2d3a47] mb-6">
        <h3 className="text-xl font-semibold text-yellow-400 mb-4">
          Personal Information
        </h3>
        <form>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-3 bg-[#2d3a47] rounded-lg border border-[#2d3a47] text-white"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full p-3 bg-[#2d3a47] rounded-lg border border-[#2d3a47] text-white"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="w-full p-3 bg-[#2d3a47] rounded-lg border border-[#2d3a47] text-white"
              placeholder="Your Phone Number"
            />
          </div>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="bg-[#374151] p-6 rounded-xl shadow-lg border border-[#2d3a47] mb-6">
        <h3 className="text-xl font-semibold text-yellow-400 mb-4">
          Change Password
        </h3>
        <form>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full p-3 bg-[#2d3a47] rounded-lg border border-[#2d3a47] text-white"
              placeholder="New Password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full p-3 bg-[#2d3a47] rounded-lg border border-[#2d3a47] text-white"
              placeholder="Confirm Password"
            />
          </div>
        </form>
      </div>

      {/* Save Changes Button */}
      <button
        onClick={handleSaveChanges}
        className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProfile;
