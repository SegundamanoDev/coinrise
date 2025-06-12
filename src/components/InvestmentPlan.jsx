// components/InvestmentPlanSection.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "../features/investmentPlan/investmentPlan"; // Assuming this action fetches all plans
import TradingPlans from "./InvestmentPlanSection";

const InvestmentPlanSection = () => {
  const dispatch = useDispatch();
  const { plans, loading, error } = useSelector(
    (state) => state.investmentPlan
  );

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">
          Our Investment Plans
        </h2>

        {loading &&
          !plans.length && ( // Show loading only if plans are not yet fetched
            <p className="text-center text-gray-400">
              Loading investment plans...
            </p>
          )}

        {error && (
          <p className="text-center text-red-500">
            Error loading plans: {error.message}
          </p>
        )}

        {!loading && !plans.length && !error && (
          <p className="text-center text-gray-400">
            No investment plans available at the moment.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <TradingPlans key={plan._id || plan.id} plan={plan} /> // Use plan._id if from backend, otherwise plan.id
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentPlanSection;
