import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSettings,
  updateSettings,
} from "../../features/setting/settingSlice";
import { Plus, Trash2 } from "lucide-react";
import AdminLayout from "../admin/AdminLayout";

const Setting = () => {
  const dispatch = useDispatch();
  const { data: settings, loading } = useSelector((state) => state.settings);

  const [formData, setFormData] = useState({
    roiPercent: 0,
    referralBonus: 0,
    minDeposit: 0,
    maxDeposit: 0,
    walletAddress: "",
    maintenanceMode: false,
  });

  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({
    name: "",
    amount: "",
    roi: "",
    duration: "",
  });

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings) setFormData(settings);
  }, [settings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSettings(formData));
  };

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

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-[#1f2937] p-6 rounded-xl border border-[#374151] shadow-lg space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["roiPercent", "referralBonus", "minDeposit", "maxDeposit"].map(
              (field) => (
                <label key={field} className="text-sm text-gray-300 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                  <input
                    type="number"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 bg-[#111827] text-white border border-[#374151] rounded"
                  />
                </label>
              )
            )}

            <label className="text-sm text-gray-300 md:col-span-2">
              Wallet Address
              <input
                type="text"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleChange}
                className="w-full mt-1 p-2 bg-[#111827] text-white border border-[#374151] rounded"
              />
            </label>

            <div className="flex items-center space-x-3 mt-2 md:col-span-2">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={formData.maintenanceMode}
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
      )}

      {/* Plan Management (still local state) */}
      <div className="mt-10 bg-[#1f2937] p-6 rounded-xl border border-[#374151] shadow-lg">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">
          Manage Investment Plans
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {["name", "amount", "roi", "duration"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={newPlan[field]}
              onChange={handlePlanChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="bg-[#111827] text-white p-2 rounded border border-[#374151]"
            />
          ))}
        </div>

        <button
          onClick={addPlan}
          className="mb-6 flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded"
        >
          <Plus size={16} />
          <span>Add Plan</span>
        </button>

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
