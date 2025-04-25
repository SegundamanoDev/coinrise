import React from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    investments: [
      {
        id: "plan1",
        name: "Basic Plan",
        amount: 100,
        profit: 10,
        status: "Active",
      },
      {
        id: "plan2",
        name: "Gold Plan",
        amount: 1000,
        profit: 100,
        status: "Completed",
      },
    ],
    recentActivities: [
      "Deposited ₿100",
      "Withdrew ₿50",
      "Invested in Gold Plan",
    ],
  };

  return (
    <div className="p-6 bg-[#1f2937] text-white min-h-screen">
      {/* Profile Header */}
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-400 flex justify-center items-center text-2xl font-bold text-white">
          {user.name[0]} {/* Display first letter of the name */}
        </div>
        <div className="ml-4">
          <h2 className="text-3xl font-semibold text-yellow-400">
            {user.name}
          </h2>
          <p className="text-lg text-gray-400">{user.email}</p>
          <p className="text-sm text-gray-500">{user.phone}</p>
        </div>
      </div>

      {/* Account Details Card */}
      <div className="bg-[#374151] p-6 rounded-xl shadow-lg border border-[#2d3a47] mb-6">
        <h3 className="text-xl font-semibold text-yellow-400 mb-4">
          Account Details
        </h3>
        <div className="text-sm text-gray-400 mb-2">Email: {user.email}</div>
        <div className="text-sm text-gray-400 mb-2">Phone: {user.phone}</div>
        <button
          onClick={() => navigate("/settings")}
          className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300 mt-4"
        >
          Edit Profile
        </button>
      </div>

      {/* Investment Overview */}
      <div className="bg-[#374151] p-6 rounded-xl shadow-lg border border-[#2d3a47] mb-6">
        <h3 className="text-xl font-semibold text-yellow-400 mb-4">
          Investment Overview
        </h3>
        <div className="space-y-4">
          {user.investments.map((plan) => (
            <div key={plan.id} className="flex justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-300">
                  {plan.name}
                </h4>
                <p className="text-sm text-gray-500">Profit: ₿{plan.profit}</p>
              </div>
              <p
                className={`text-sm ${
                  plan.status === "Active" ? "text-green-500" : "text-gray-500"
                }`}
              >
                {plan.status}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate("/view-investment")}
          className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300 mt-4"
        >
          View Investments
        </button>
      </div>

      {/* Recent Activities */}
      <div className="bg-[#374151] p-6 rounded-xl shadow-lg border border-[#2d3a47]">
        <h3 className="text-xl font-semibold text-yellow-400 mb-4">
          Recent Activities
        </h3>
        <div className="space-y-2">
          {user.recentActivities.map((activity, index) => (
            <p key={index} className="text-sm text-gray-400">
              {activity}
            </p>
          ))}
        </div>
        <button
          onClick={() => navigate("/activity-overview")}
          className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300 mt-4"
        >
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
