// import { Menu } from "lucide-react";
// import React from "react";

// const DashboardLayout = () => {
//   const [isOpen, setIsOpen] = React.useState(false);

//   return (
//     <>
//       <div
//         className={`md:flex justify-between h-screen font-sans text-[#f5f5f5] transition-opacity duration-300 ${
//           isOpen ? "opacity-60 pointer-events-none" : "opacity-100"
//         } bg-[#0d1117]`}
//       >
//         {/* Sidebar - Desktop */}
//         <aside className="hidden md:flex w-64 bg-[#1f2937] flex-col p-6 border-r border-[#374151]">
//           <h2 className="text-2xl font-bold text-yellow-400 mb-8">
//             CryptoDash
//           </h2>
//           <nav className="flex flex-col gap-6 text-lg">
//             <a href="/dashboard" className="hover:text-yellow-400">
//               Dashboard
//             </a>
//             <a href="/transaction" className="hover:text-yellow-400">
//               Transactions
//             </a>
//             <a href="/wallet" className="hover:text-yellow-400">
//               Wallet
//             </a>
//             <a href="/invest" className="hover:text-yellow-400">
//               Invest
//             </a>
//             <a href="/deposit" className="hover:text-yellow-400">
//               Deposit
//             </a>
//             <a href="/profile" className="hover:text-yellow-400">
//               Profile
//             </a>
//             <a href="/settings" className="hover:text-yellow-400">
//               Settings
//             </a>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto p-6">
//           {/* Mobile Header */}
//           <div className="md:hidden flex justify-between items-center mb-6">
//             <h1 className="text-xl font-bold">Dashboard</h1>
//             <button
//               onClick={() => setIsOpen(true)}
//               className=" px-4 py-1 rounded-md font-semibold"
//             >
//               <Menu />
//             </button>
//           </div>

//           {/* Dashboard Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//             <div className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151]">
//               <h3 className="text-lg font-semibold mb-2">Total Balance</h3>
//               <p className="text-3xl font-bold text-yellow-400">₿0.753</p>
//               <span className="text-sm text-gray-400">≈ $48,200</span>
//             </div>
//             <div className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151]">
//               <h3 className="text-lg font-semibold mb-2">Active Investments</h3>
//               <p className="text-3xl font-bold text-yellow-400">₿0.300</p>
//               <span className="text-sm text-gray-400">3 plans active</span>
//             </div>
//             <div className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151]">
//               <h3 className="text-lg font-semibold mb-2">Pending Deposits</h3>
//               <p className="text-3xl font-bold text-yellow-400">₿0.150</p>
//               <span className="text-sm text-gray-400">
//                 Awaiting confirmation
//               </span>
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* Mobile Slideout Menu */}
//       <div
//         className={`fixed inset-0 z-50 flex transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* Sidebar Drawer */}
//         <div className="w-64 bg-[#1f2937] h-full p-6 shadow-lg">
//           <h2 className="text-xl font-bold text-yellow-400 mb-6">CryptoDash</h2>
//           <nav className="flex flex-col gap-4">
//             <a href="/dashboard" className="text-white hover:text-yellow-400">
//               Dashboard
//             </a>
//             <a href="/transaction" className="text-white hover:text-yellow-400">
//               Transactions
//             </a>
//             <a href="/wallet" className="text-white hover:text-yellow-400">
//               Wallet
//             </a>
//             <a href="/deposit" className="text-white hover:text-yellow-400">
//               Deposit
//             </a>
//             <a href="/invest" className="text-white hover:text-yellow-400">
//               Invest
//             </a>
//             <a href="/profile" className="text-white hover:text-yellow-400">
//               Profile
//             </a>
//             <a href="/settings" className="text-white hover:text-yellow-400">
//               Settings
//             </a>
//           </nav>
//         </div>

//         {/* Transparent Backdrop */}
//         <div
//           onClick={() => setIsOpen(false)}
//           className="flex-1 bg-black bg-opacity-30"
//         />
//       </div>
//     </>
//   );
// };

// export default DashboardLayout;

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import axios from "axios";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LiveForexTrade = () => {
  const [forexData, setForexData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Forex live data (replace with your Forex API URL)
  const fetchForexData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/USD"
      ); // Example API
      const rates = response.data.rates;
      const time = new Date().toLocaleTimeString();

      // For demonstration, we'll simulate buying (green) and selling (red) data
      setForexData((prevData) => [
        ...prevData,
        { time, buy: rates["EUR"], sell: rates["GBP"] },
      ]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Forex data:", error);
      setLoading(false);
    }
  };

  // Fetch Forex data every 5 seconds for real-time update
  useEffect(() => {
    const interval = setInterval(() => {
      fetchForexData();
    }, 5000); // Every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Prepare chart data for Chart.js
  const chartData = {
    labels: forexData.map((data) => data.time),
    datasets: [
      {
        label: "Buy (EUR/USD)",
        data: forexData.map((data) => data.buy),
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Sell (GBP/USD)",
        data: forexData.map((data) => data.sell),
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-[#374151] p-6 rounded-xl shadow-lg border border-[#2d3a47] mt-6">
      <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
        Live Forex Trade
      </h3>
      {loading ? (
        <p className="text-sm text-gray-400">Loading Forex data...</p>
      ) : forexData.length === 0 ? (
        <p className="text-sm text-gray-400">No Forex data available.</p>
      ) : (
        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Time",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Price",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default LiveForexTrade;
