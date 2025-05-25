import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "../features/investmentPlan/investmentPlan";
import { investInPlan } from "../features/investment/investmentsSlice";
import { Check, X } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const TradingPlans = ({ heading }) => {
  const dispatch = useDispatch();
  const { plans, loading } = useSelector((state) => state.investmentPlan);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    dispatch(getAllPlans());
    AOS.init({ once: true });
  }, [dispatch]);

  const handleSubmit = () => {
    if (!amount || isNaN(amount)) {
      return;
    }

    dispatch(
      investInPlan({
        amount: Number(amount),
        planId: selectedPlan,
        roi: selectedPlan.roiPercent,
        duration: selectedPlan.durationHours,
      })
    );

    setShowModal(false);
    setAmount("");
    setSelectedPlan(null);
  };

  return (
    <section className="py-10 px-4 font-[Montserrat] bg-black text-white">
      <h2 className="text-3xl font-bold text-center mb-10">{heading}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {loading ? (
          <p className="text-center col-span-full">Loading plans...</p>
        ) : (
          plans.map((plan, idx) => (
            <div
              key={plan._id}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              data-aos-duration="800"
              className="shadow-lg rounded-xl p-6 border border-gray-700 bg-[#111]"
            >
              <h3 className="text-center text-sm font-semibold uppercase mb-2">
                {plan.name}
              </h3>
              <p className="text-3xl text-center font-bold mb-4">
                ${plan.minAmount.toLocaleString()}
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center space-x-2">
                  <Check className="text-green-500 w-5 h-5" />
                  <span className="text-white text-sm">
                    ${plan.minAmount} - ${plan.maxAmount}
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="text-green-500 w-5 h-5" />
                  <span className="text-white text-sm">
                    {plan.roiPercent}% in {plan.durationHours} hours
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  {plan.support ? (
                    <Check className="text-green-500 w-5 h-5" />
                  ) : (
                    <X className="text-gray-500 w-5 h-5" />
                  )}
                  <span
                    className={`${
                      plan.support ? "text-white" : "text-gray-400"
                    } text-sm`}
                  >
                    24/7 Support
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  {plan.dailyReport ? (
                    <Check className="text-green-500 w-5 h-5" />
                  ) : (
                    <X className="text-gray-500 w-5 h-5" />
                  )}
                  <span
                    className={`${
                      plan.dailyReport ? "text-white" : "text-gray-400"
                    } text-sm`}
                  >
                    Daily Status Report
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="text-green-500 w-5 h-5" />
                  <span className="text-white text-sm">
                    {plan.commissionPercent}% commission
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="text-green-500 w-5 h-5" />
                  <span className="text-white text-sm">
                    Capital Insurance: {plan.capitalInsurancePercent}%
                  </span>
                </li>
              </ul>
              <button
                className="w-full py-2 rounded-full font-semibold text-white bg-gradient-to-r from-[#00befe] to-[#a700ff]"
                onClick={() => {
                  setSelectedPlan(plan);
                  setShowModal(true);
                }}
              >
                JOIN
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white text-black rounded-lg p-6 w-[90%] max-w-md shadow-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-2 text-center">
              Invest in {selectedPlan.name}
            </h2>
            <p className="text-sm text-center mb-4">
              ROI: {selectedPlan.roiPercent}% in {selectedPlan.durationHours}{" "}
              hours
            </p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Enter amount ($${selectedPlan.minAmount} - $${selectedPlan.maxAmount})`}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-[#00befe] to-[#a700ff] text-white py-2 rounded-md font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default TradingPlans;
