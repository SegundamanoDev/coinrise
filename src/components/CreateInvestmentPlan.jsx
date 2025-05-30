import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from "../features/investmentPlan/investmentPlan"; // Ensure these Redux actions are correctly defined
import {
  Edit,
  Trash2,
  PlusCircle,
  X,
  DollarSign,
  Percent,
  Clock,
  CheckSquare,
  Square,
  Tag,
  Shield,
  HelpCircle,
  FileText,
} from "lucide-react"; // Lucide icons

const InvestmentPlans = () => {
  const dispatch = useDispatch();
  const { plans, loading, error } = useSelector(
    (state) => state.investmentPlan
  );

  const [formData, setFormData] = useState({
    name: "",
    amount: "", // Changed from minAmount/maxAmount to a single 'amount'
    roiPercent: "",
    durationHours: "",
    support: false,
    dailyReport: false,
    commissionPercent: "",
    capitalInsurancePercent: "",
  });

  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [planToDeleteId, setPlanToDeleteId] = useState(null);

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  const resetForm = () => {
    setFormData({
      name: "",
      amount: "", // Reset single 'amount'
      roiPercent: "",
      durationHours: "",
      support: false,
      dailyReport: false,
      commissionPercent: "",
      capitalInsurancePercent: "",
    });
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      amount: Number(formData.amount), // Ensure 'amount' is a number
      roiPercent: Number(formData.roiPercent),
      durationHours: Number(formData.durationHours),
      commissionPercent: Number(formData.commissionPercent),
      capitalInsurancePercent: Number(formData.capitalInsurancePercent),
    };

    try {
      const action = editId
        ? updatePlan({ id: editId, data: payload })
        : createPlan(payload);
      await dispatch(action).unwrap();
      toast.success(
        editId ? "Plan updated successfully!" : "Plan created successfully!"
      );
      dispatch(getAllPlans()); // Refresh plans
      resetForm();
    } catch (err) {
      toast.error(err.message || "Failed to save plan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (plan) => {
    // When editing, load the single 'amount' field
    setFormData({
      ...plan,
      amount: plan.amount, // Ensure 'amount' is correctly set for editing
    });
    setEditId(plan._id);
  };

  const handleDeleteClick = (id) => {
    setPlanToDeleteId(id);
    setShowDeleteConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (planToDeleteId) {
      try {
        await dispatch(deletePlan(planToDeleteId)).unwrap();
        toast.success("Plan deleted successfully!");
        dispatch(getAllPlans()); // Refresh plans
      } catch (err) {
        toast.error(err.message || "Failed to delete plan.");
      } finally {
        setShowDeleteConfirmModal(false);
        setPlanToDeleteId(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmModal(false);
    setPlanToDeleteId(null);
  };

  // Helper to format money
  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  if (loading && !plans.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <p className="text-white text-lg">Loading plans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center bg-gray-900 rounded-lg mx-auto max-w-md mt-10">
        Error: {error.message || "An error occurred fetching plans."}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 font-montserrat">
      <ToastContainer position="top-right" theme="dark" />

      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-400">
        Manage Investment Plans
      </h1>

      {/* Create or Update Form */}
      <div className="bg-gray-900 p-6 md:p-8 rounded-xl shadow-lg border border-gray-800 mb-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          {editId ? "Edit Investment Plan" : "Create New Investment Plan"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Text/Number Inputs */}
          {[
            { label: "Plan Name", name: "name", type: "text", icon: Tag },
            {
              label: "Investment Amount ($)",
              name: "amount",
              type: "number",
              icon: DollarSign,
            }, // Changed to 'amount'
            {
              label: "ROI (%)",
              name: "roiPercent",
              type: "number",
              icon: Percent,
            },
            {
              label: "Duration (Hours)",
              name: "durationHours",
              type: "number",
              icon: Clock,
            },
            {
              label: "Commission (%)",
              name: "commissionPercent",
              type: "number",
              icon: Percent,
            },
            {
              label: "Capital Insurance (%)",
              name: "capitalInsurancePercent",
              type: "number",
              icon: Shield,
            },
          ].map(({ label, name, type = "text", icon: Icon }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {label}
              </label>
              <div className="relative">
                <Icon
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                  min={type === "number" ? "0" : undefined}
                />
              </div>
            </div>
          ))}

          {/* Checkbox Inputs */}
          <div className="flex items-center gap-3 md:col-span-1">
            <input
              type="checkbox"
              id="support"
              name="support"
              checked={formData.support}
              onChange={handleChange}
              className="w-5 h-5 rounded text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
            />
            <label
              htmlFor="support"
              className="text-gray-300 flex items-center gap-2"
            >
              <HelpCircle size={20} /> 24/7 Customer Support
            </label>
          </div>

          <div className="flex items-center gap-3 md:col-span-1">
            <input
              type="checkbox"
              id="dailyReport"
              name="dailyReport"
              checked={formData.dailyReport}
              onChange={handleChange}
              className="w-5 h-5 rounded text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
            />
            <label
              htmlFor="dailyReport"
              className="text-gray-300 flex items-center gap-2"
            >
              <FileText size={20} /> Daily Report
            </label>
          </div>

          {/* Form Actions */}
          <div className="col-span-full flex gap-4 mt-4 justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg shadow-md transition-all duration-300
                ${
                  isSubmitting
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white transform hover:scale-105"
                }
              `}
            >
              {editId ? (
                <>
                  <Edit size={20} />{" "}
                  {isSubmitting ? "Updating..." : "Update Plan"}
                </>
              ) : (
                <>
                  <PlusCircle size={20} />{" "}
                  {isSubmitting ? "Creating..." : "Create Plan"}
                </>
              )}
            </button>
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
              >
                <X size={20} /> Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* All Plans List */}
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-400">
        Existing Investment Plans
      </h2>
      {loading ? (
        <p className="col-span-full text-center text-gray-400">
          Loading plans...
        </p>
      ) : plans.length === 0 ? (
        <p className="col-span-full text-center text-gray-400">
          No investment plans created yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg flex flex-col justify-between transform hover:scale-[1.01] transition-transform duration-300"
            >
              <div>
                <h3 className="text-2xl font-bold mb-2 text-yellow-400">
                  {plan.name}
                </h3>
                <p className="text-lg text-gray-300 mb-1">
                  <DollarSign
                    size={18}
                    className="inline-block mr-2 text-green-400"
                  />
                  Amount: {formatMoney(plan.amount)} {/* Changed to 'amount' */}
                </p>
                <p className="text-lg text-gray-300 mb-1">
                  <Percent
                    size={18}
                    className="inline-block mr-2 text-purple-400"
                  />
                  ROI: {plan.roiPercent}%
                </p>
                <p className="text-lg text-gray-300 mb-1">
                  <Clock
                    size={18}
                    className="inline-block mr-2 text-cyan-400"
                  />
                  Duration: {plan.durationHours} hours
                </p>
                <p className="text-lg text-gray-300 mb-1">
                  <Percent
                    size={18}
                    className="inline-block mr-2 text-orange-400"
                  />
                  Commission: {plan.commissionPercent}%
                </p>
                <p className="text-lg text-gray-300 mb-4">
                  <Shield
                    size={18}
                    className="inline-block mr-2 text-indigo-400"
                  />
                  Capital Insurance: {plan.capitalInsurancePercent}%
                </p>

                <div className="space-y-2 text-gray-300 text-base">
                  <p className="flex items-center gap-2">
                    {plan.support ? (
                      <CheckSquare size={20} className="text-green-500" />
                    ) : (
                      <Square size={20} className="text-red-500" />
                    )}
                    24/7 Customer Support
                  </p>
                  <p className="flex items-center gap-2">
                    {plan.dailyReport ? (
                      <CheckSquare size={20} className="text-green-500" />
                    ) : (
                      <Square size={20} className="text-red-500" />
                    )}
                    Daily Report
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => handleEdit(plan)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded-lg text-white font-semibold shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  <Edit size={20} /> Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(plan._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 px-4 rounded-lg text-white font-semibold shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  <Trash2 size={20} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-xl shadow-2xl p-8 max-w-sm mx-4 text-center border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this investment plan? This action
              cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold px-6 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentPlans;
