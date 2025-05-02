import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import AdminLayout from "../admin/AdminLayout";

const Setting = () => {
  const [settings, setSettings] = useState({
    roi: 5,
    referralBonus: 10,
    minDeposit: 50,
    maxDeposit: 10000,
    walletAddress: "1A2b3C4d5E6f7G8h9I0J",
    maintenanceMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: save settings to backend
    alert("Settings updated!");
  };

  const [plans, setPlans] = useState([
    { id: 1, name: "Starter", amount: 100, roi: 5, duration: 10 },
    { id: 2, name: "Pro", amount: 500, roi: 6, duration: 15 },
  ]);

  const [newPlan, setNewPlan] = useState({
    name: "",
    amount: "",
    roi: "",
    duration: "",
  });

  const handlePlanChange = (e) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({ ...prev, [name]: value }));
  };

  const addPlan = () => {
    if (!newPlan.name || !newPlan.amount || !newPlan.roi || !newPlan.duration)
      return;
    const newId = plans.length + 1;
    setPlans([...plans, { ...newPlan, id: newId }]);
    setNewPlan({ name: "", amount: "", roi: "", duration: "" });
  };

  const deletePlan = (id) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };
  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">
        System Settings
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-[#1f2937] p-6 rounded-xl border border-[#374151] shadow-lg space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="text-sm text-gray-300">
            ROI Percentage (%)
            <input
              type="number"
              name="roi"
              value={settings.roi}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-[#111827] text-white border border-[#374151] rounded"
            />
          </label>

          <label className="text-sm text-gray-300">
            Referral Bonus (%)
            <input
              type="number"
              name="referralBonus"
              value={settings.referralBonus}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-[#111827] text-white border border-[#374151] rounded"
            />
          </label>

          <label className="text-sm text-gray-300">
            Minimum Deposit ($)
            <input
              type="number"
              name="minDeposit"
              value={settings.minDeposit}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-[#111827] text-white border border-[#374151] rounded"
            />
          </label>

          <label className="text-sm text-gray-300">
            Maximum Deposit ($)
            <input
              type="number"
              name="maxDeposit"
              value={settings.maxDeposit}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-[#111827] text-white border border-[#374151] rounded"
            />
          </label>

          <label className="text-sm text-gray-300 md:col-span-2">
            Wallet Address
            <input
              type="text"
              name="walletAddress"
              value={settings.walletAddress}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-[#111827] text-white border border-[#374151] rounded"
            />
          </label>

          <div className="flex items-center space-x-3 mt-2 md:col-span-2">
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-yellow-500"
            />
            <span className="text-sm text-gray-300">
              Enable Maintenance Mode
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded"
        >
          Save Settings
        </button>
      </form>
      <div className="mt-10 bg-[#1f2937] p-6 rounded-xl border border-[#374151] shadow-lg">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">
          Manage Investment Plans
        </h3>

        {/* Plan Form */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            name="name"
            value={newPlan.name}
            onChange={handlePlanChange}
            placeholder="Plan Name"
            className="bg-[#111827] text-white p-2 rounded border border-[#374151]"
          />
          <input
            type="number"
            name="amount"
            value={newPlan.amount}
            onChange={handlePlanChange}
            placeholder="Amount ($)"
            className="bg-[#111827] text-white p-2 rounded border border-[#374151]"
          />
          <input
            type="number"
            name="roi"
            value={newPlan.roi}
            onChange={handlePlanChange}
            placeholder="ROI (%)"
            className="bg-[#111827] text-white p-2 rounded border border-[#374151]"
          />
          <input
            type="number"
            name="duration"
            value={newPlan.duration}
            onChange={handlePlanChange}
            placeholder="Duration (days)"
            className="bg-[#111827] text-white p-2 rounded border border-[#374151]"
          />
        </div>

        <button
          onClick={addPlan}
          className="mb-6 flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded"
        >
          <Plus size={16} />
          <span>Add Plan</span>
        </button>

        {/* Plan List */}
        <ul className="space-y-4">
          {plans.map((plan) => (
            <li
              key={plan.id}
              className="flex justify-between items-center bg-[#111827] p-4 rounded border border-[#374151]"
            >
              <div>
                <p className="text-white font-semibold">{plan.name}</p>
                <p className="text-sm text-gray-400">
                  ${plan.amount} - {plan.roi}% ROI for {plan.duration} days
                </p>
              </div>
              <button
                onClick={() => deletePlan(plan.id)}
                className="text-red-400 hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default Setting;
