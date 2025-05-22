import React, { useEffect, useState } from "react";
import {
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from "../features/investmentPlan/investmentPlan";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InvestmentPlans = () => {
  const dispatch = useDispatch();
  const { plans, loading } = useSelector((state) => state.investmentPlan);

  const [formData, setFormData] = useState({
    name: "",
    minAmount: "",
    maxAmount: "",
    roiPercent: "",
    durationHours: "",
    support: false,
    dailyReport: false,
    commissionPercent: "",
    capitalInsurancePercent: "",
  });

  const [editId, setEditId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  const resetForm = () => {
    setFormData({
      name: "",
      minAmount: "",
      maxAmount: "",
      roiPercent: "",
      durationHours: "",
      support: false,
      dailyReport: false,
      commissionPercent: "",
      capitalInsurancePercent: "",
    });
    setEditId(null);
    setEditModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      minAmount: Number(formData.minAmount),
      maxAmount: Number(formData.maxAmount),
      roiPercent: Number(formData.roiPercent),
      durationHours: Number(formData.durationHours),
      commissionPercent: Number(formData.commissionPercent),
      capitalInsurancePercent: Number(formData.capitalInsurancePercent),
    };

    const action = editId
      ? updatePlan({ id: editId, data: payload })
      : createPlan(payload);

    dispatch(action)
      .unwrap()
      .then(() => {
        toast.success(editId ? "Plan updated!" : "Plan created!");
        dispatch(getAllPlans()); // refresh plans
        resetForm();
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsSubmitting(false));
  };

  const handleEdit = (plan) => {
    setFormData({ ...plan });
    setEditId(plan._id);
    setEditModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this plan?")) {
      dispatch(deletePlan(id))
        .unwrap()
        .then(() => toast.success("Plan deleted"))
        .catch(() => toast.error("Delete failed"));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <ToastContainer position="top-right" />
      <h1 className="text-2xl font-bold mb-6">Investment Plans</h1>

      {/* Create or Update Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#111111] p-6 rounded-xl shadow-lg"
      >
        {[
          { label: "Name", name: "name" },
          { label: "Min Amount", name: "minAmount", type: "number" },
          { label: "Max Amount", name: "maxAmount", type: "number" },
          { label: "ROI %", name: "roiPercent", type: "number" },
          { label: "Duration (hours)", name: "durationHours", type: "number" },
          { label: "Commission %", name: "commissionPercent", type: "number" },
          {
            label: "Capital Insurance %",
            name: "capitalInsurancePercent",
            type: "number",
          },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full bg-black text-white border border-white rounded-md px-3 py-2"
              required
            />
          </div>
        ))}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="support"
            checked={formData.support}
            onChange={handleChange}
            className="accent-white"
          />
          <label>Support</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="dailyReport"
            checked={formData.dailyReport}
            onChange={handleChange}
            className="accent-white"
          />
          <label>Daily Report</label>
        </div>

        <div className="col-span-full flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition"
          >
            {isSubmitting
              ? "Submitting..."
              : editId
              ? "Done (Update)"
              : "Create Plan"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded-md"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* All Plans */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="col-span-full text-center">Loading plans...</p>
        ) : (
          plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-[#111111] border border-gray-700 rounded-xl p-5 shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
              <p>Min: ${plan.minAmount}</p>
              <p>Max: ${plan.maxAmount}</p>
              <p>ROI: {plan.roiPercent}%</p>
              <p>Duration: {plan.durationHours} hours</p>
              <p>Support: {plan.support ? "Yes" : "No"}</p>
              <p>Daily Report: {plan.dailyReport ? "Yes" : "No"}</p>
              <p>Commission: {plan.commissionPercent}%</p>
              <p>Capital Insurance: {plan.capitalInsurancePercent}%</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(plan)}
                  className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan._id)}
                  className="w-full bg-red-600 hover:bg-red-700 py-2 px-4 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InvestmentPlans;
