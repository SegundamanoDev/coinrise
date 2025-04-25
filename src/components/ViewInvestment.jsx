import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2"; // For the performance graph
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Register the necessary chart elements
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const ViewInvestment = () => {
  const navigate = useNavigate();
  const [investments] = useState([
    {
      id: "plan1",
      name: "Basic Plan",
      amount: 100,
      profit: 10,
      status: "Active",
      date: "2025-01-10",
    },
    {
      id: "plan2",
      name: "Premium Plan",
      amount: 500,
      profit: 50,
      status: "Completed",
      date: "2025-02-15",
    },
    {
      id: "plan3",
      name: "Gold Plan",
      amount: 1000,
      profit: 100,
      status: "Active",
      date: "2025-03-05",
    },
  ]);

  const investmentSummary = {
    totalInvested: 1600,
    totalProfit: 160,
    currentBalance: 1760,
  };

  // Dummy data for investment performance chart
  const chartData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Investment Value",
        data: [1000, 1500, 1600, 1700], // Change these values as necessary
        fill: false,
        borderColor: "rgba(255, 159, 64, 1)",
        tension: 0.1,
      },
    ],
  };

  useEffect(() => {
    // Cleanup Chart.js instance when component unmounts or is re-rendered
    return () => {
      if (window.Chart) {
        window.Chart.instances.forEach((chartInstance) => {
          chartInstance.destroy();
        });
      }
    };
  }, []);

  return (
    <div className="p-6 bg-[#1f2937] text-white min-h-screen">
      {/* Investment Summary Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-yellow-400 mb-4">
            Investment Overview
          </h2>
          <p className="text-lg">
            Total Invested: ₿{investmentSummary.totalInvested}
          </p>
          <p className="text-lg">
            Total Profit: ₿{investmentSummary.totalProfit}
          </p>
          <p className="text-xl font-semibold text-yellow-400">
            Current Balance: ₿{investmentSummary.currentBalance}
          </p>
        </div>
      </div>

      {/* Investment Performance Graph */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-yellow-400 mb-4">
          Investment Performance
        </h3>
        <div className="bg-[#374151] p-6 rounded-xl shadow-lg border border-[#2d3a47]">
          <Line data={chartData} />
        </div>
      </div>

      {/* Active Investments Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-yellow-400 mb-4">
          Active Investments
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {investments.map(
            (investment) =>
              investment.status === "Active" && (
                <div
                  key={investment.id}
                  className="bg-[#374151] p-6 rounded-xl shadow-lg border border-[#2d3a47]"
                >
                  <h4 className="text-xl font-semibold text-yellow-400">
                    {investment.name}
                  </h4>
                  <p className="text-lg">
                    Amount Invested: ₿{investment.amount}
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    Start Date: {investment.date}
                  </p>
                  <div className="bg-yellow-400 text-black p-2 rounded-lg font-semibold">
                    Active
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      {/* Investment History Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-yellow-400 mb-4">
          Investment History
        </h3>
        <div className="bg-[#374151] p-6 rounded-xl shadow-lg border border-[#2d3a47]">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left text-sm text-gray-400">Plan Name</th>
                <th className="text-left text-sm text-gray-400">Amount</th>
                <th className="text-left text-sm text-gray-400">Date</th>
                <th className="text-left text-sm text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment) => (
                <tr key={investment.id} className="border-t border-[#2d3a47]">
                  <td className="py-2 text-sm text-white">{investment.name}</td>
                  <td className="py-2 text-sm text-white">
                    ₿{investment.amount}
                  </td>
                  <td className="py-2 text-sm text-white">{investment.date}</td>
                  <td className="py-2 text-sm">
                    <span
                      className={`px-3 py-1 rounded-lg font-semibold ${
                        investment.status === "Active"
                          ? "bg-green-400"
                          : "bg-gray-400"
                      }`}
                    >
                      {investment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Section */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate("/invest")}
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
        >
          Add Investment
        </button>
        <button
          onClick={() => navigate("/withdraw")}
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
        >
          Withdraw Funds
        </button>
      </div>
    </div>
  );
};

export default ViewInvestment;
