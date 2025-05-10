// import { Menu, Copy } from "lucide-react";
// import React from "react";
// import TradingViewChart from "./TradingViewChart";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faGauge,
//   faMoneyBillWave,
//   faMoneyCheckAlt,
//   faExchangeAlt,
//   faUser,
//   faGear,
//   faArrowLeft,
// } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";

// const DashboardLayout = () => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const referralCode = "CRYPTO123";
//   const accountType = "Starter"; // Change this dynamically if needed

//   return (
//     <>
//       <div
//         className={`md:flex pt-16 md:pt-0 justify-between font-sans text-[#f5f5f5] transition-opacity duration-300 ${
//           isOpen ? "opacity-60 pointer-events-none" : "opacity-100"
//         } bg-[#0d1117]`}
//       >
//         {/* Sidebar - Desktop */}
//         <aside className="hidden md:flex w-64 bg-[#1f2937] flex-col p-6 border-r border-[#374151] min-h-screen">
//           <h2 className="text-2xl font-bold text-[#ffffff] mb-8">
//             CryptoDash
//           </h2>
//           <nav className="flex flex-col gap-6 text-lg">
//             <a href="/dashboard" className="hover:text-yellow-400">
//               Overview & activity
//             </a>
//             <a href="/deposit" className="hover:text-yellow-400">
//               Deposit
//             </a>
//             <a href="/withdraw" className="hover:text-yellow-400">
//               Withdraw
//             </a>
//             <a href="/transaction" className="hover:text-yellow-400">
//               Transactions
//             </a>
//             <a href="/profile" className="hover:text-yellow-400">
//               Profile
//             </a>
//             <a href="/settings" className="hover:text-yellow-400">
//               Settings
//             </a>
//             <a href="/" className="hover:text-yellow-400">
//               Back to home
//             </a>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto bg-[#0d1117] min-h-screen">
//           {/* Mobile Header */}
//           <div className="md:hidden fixed w-full top-0 z-40 bg-[#0d1117] py-5 px-4 shadow-md flex justify-between items-center mb-6">
//             <h1 className="text-lg font-semibold">Welcome back, John!</h1>
//             <button
//               onClick={() => setIsOpen(true)}
//               className="p-2 rounded-md hover:bg-[#1f2937] transition mx-2"
//               aria-label="Open Menu"
//             >
//               <Menu />
//             </button>
//           </div>

//           <div className="pt-4 md:pt-8" />

//           {/* Account Type Banner */}
//           <div className="bg-[#1f2937] text-sm md:text-base text-gray-400 font-[Montserrat] p-4 mb-4 mx-4 md:mx-8 rounded-xl shadow border border-[#374151] flex items-center justify-between">
//             <div>
//               <span className="font-semibold text-yellow-400">
//                 Account Type:{" "}
//               </span>
//               <span className="uppercase font-bold tracking-wide text-green-400">
//                 {accountType}
//               </span>
//             </div>
//             <a
//               href="/settings"
//               className="text-blue-400 hover:underline text-sm"
//             >
//               Upgrade Account
//             </a>
//           </div>

//           {/* TradingView Chart */}
//           <div className="px-4 md:px-8 mb-3">
//             <TradingViewChart />
//           </div>

//           {/* Stat Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 px-4 md:px-8">
//             {[
//               {
//                 title: "Available Balance",
//                 value: "$150.00",
//                 sub: "Withdrawable funds",
//               },
//               {
//                 title: "Total Deposited",
//                 value: "$500.00",
//                 sub: "Sum of all deposits",
//               },
//               {
//                 title: "Total Profits Earned",
//                 value: "$75.00",
//                 sub: "Cumulative profit",
//               },
//               {
//                 title: "Referral Earnings",
//                 value: "$25.00",
//                 sub: "Referral commissions",
//               },

//               {
//                 title: "Pending Withdrawals",
//                 value: "$100.00",
//                 sub: "Awaiting approval",
//               },
//             ].map((card, index) => (
//               <div
//                 key={index}
//                 className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151]"
//               >
//                 <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
//                 <p className="text-3xl font-bold text-yellow-400">
//                   {card.value}
//                 </p>
//                 <span className="text-sm text-gray-400">{card.sub}</span>
//               </div>
//             ))}

//             {/* Referral Code Card */}
//             <div className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151]">
//               <h3 className="text-lg font-semibold mb-2">Your Referral Code</h3>
//               <div className="flex items-center justify-between">
//                 <span className="text-yellow-400 font-mono">
//                   {referralCode}
//                 </span>
//                 <button
//                   onClick={() => navigator.clipboard.writeText(referralCode)}
//                 >
//                   <Copy size={16} />
//                 </button>
//               </div>
//               <p className="text-sm text-gray-400 mt-2">
//                 Share this code to earn rewards
//               </p>
//             </div>
//           </div>

//           {/* Transactions & Plan Summary */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-8 mb-10">
//             <div className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151]">
//               <h3 className="text-lg font-semibold mb-4">
//                 Recent Transactions
//               </h3>
//               <ul className="text-sm space-y-2 text-gray-300">
//                 <li>
//                   Deposited $200.00 -{" "}
//                   <span className="text-green-400">Success</span>
//                 </li>
//                 <li>
//                   Profit Earned $25.00 -{" "}
//                   <span className="text-green-400">Completed</span>
//                 </li>
//                 <li>
//                   Withdraw Requested $100.00 -{" "}
//                   <span className="text-yellow-400">Pending</span>
//                 </li>
//               </ul>
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
//         <div className="w-64 bg-[#1f2937] h-full p-6 shadow-lg">
//           <h2 className="text-xl font-bold text-yellow-400 mb-6">
//             Dashboard & Overview
//           </h2>
//           <nav className="flex flex-col space-y-6">
//             <Link
//               to="/dashboard"
//               className="flex items-center space-x-3 py-2 text-gray-400 font-[Montserrat]"
//             >
//               <FontAwesomeIcon icon={faGauge} className="text-xl" />
//               <span className="text-base">Dashboard</span>
//             </Link>
//             <Link
//               to="/deposit"
//               className="flex items-center space-x-3 py-2 text-gray-400 font-[Montserrat]"
//             >
//               <FontAwesomeIcon icon={faMoneyBillWave} className="text-xl" />
//               <span className="text-base">Deposit</span>
//             </Link>
//             <Link
//               to="/withdraw"
//               className="flex items-center space-x-3 py-2 text-gray-400 font-[Montserrat]"
//             >
//               <FontAwesomeIcon icon={faMoneyCheckAlt} className="text-xl" />
//               <span className="text-base">Withdraw</span>
//             </Link>
//             <Link
//               to="/transaction"
//               className="flex items-center space-x-3 py-2 text-gray-400 font-[Montserrat]"
//             >
//               <FontAwesomeIcon icon={faExchangeAlt} className="text-xl" />
//               <span className="text-base">Transaction</span>
//             </Link>
//             <Link
//               to="/profile"
//               className="flex items-center space-x-3 py-2 text-gray-400 font-[Montserrat]"
//             >
//               <FontAwesomeIcon icon={faUser} className="text-xl" />
//               <span className="text-base">Profile</span>
//             </Link>
//             <Link
//               to="/settings"
//               className="flex items-center space-x-3 py-2 text-gray-400 font-[Montserrat]"
//             >
//               <FontAwesomeIcon icon={faGear} className="text-xl" />
//               <span className="text-base">Settings</span>
//             </Link>
//             <Link
//               to="/"
//               className="flex items-center space-x-3 py-2 text-gray-400 font-[Montserrat]"
//             >
//               <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
//               <span className="text-base">Back to Home</span>
//             </Link>
//           </nav>
//         </div>
//         <div
//           onClick={() => setIsOpen(false)}
//           className="flex-1 bg-black bg-opacity-30"
//         />
//       </div>
//     </>
//   );
// };

// export default DashboardLayout;

import React, { useEffect, useState } from "react";
import { Menu, Copy, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faMoneyBillWave,
  faMoneyCheckAlt,
  faListAlt,
  faExchangeAlt,
  faArrowUpRightDots,
  faKey,
  faUserGear,
  faCircleCheck,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import {
  LayoutDashboard,
  ArrowDownCircle,
  ArrowUpCircle,
  ListOrdered,
  Receipt,
  TrendingUp,
  KeyRound,
  Settings,
  ShieldCheck,
  Home,
} from "lucide-react";

import { Link } from "react-router-dom";
import axios from "axios";
import TradingViewChart from "./TradingViewChart";
import AdvancedChart from "./AdChart";
import ForexRates from "./FRate";
import Loader from "./LoadingSpinner";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatMoney = (value, currency = "USD") =>
    value?.toLocaleString("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }) || "0.00";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/users/dashboard");
        setData(res.data);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    {
      title: "Available Balance",
      value: formatMoney(data?.availableBalance, data?.currency),
      sub: "Withdrawable funds",
    },
    {
      title: "Total Deposited",
      value: formatMoney(data?.totalDeposited, data?.currency),
      sub: "Sum of all deposits",
    },
    {
      title: "Total Profits Earned",
      value: formatMoney(data?.totalProfits, data?.currency),
      sub: "Cumulative profit",
    },
    {
      title: "Referral Earnings",
      value: formatMoney(data?.referralBonus, data?.currency),
      sub: "Referral commissions",
    },
    {
      title: "Pending Withdrawals",
      value: formatMoney(data?.totalPendingWithdrawals, data?.currency),
      sub: "Awaiting approval",
    },
  ];

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  const referralCode = data?.referralCode || "N/A";

  return (
    <>
      <div
        className={`md:flex pt-16 md:pt-0 justify-between font-sans text-[#f5f5f5] transition-opacity duration-300 ${
          isOpen ? "opacity-60 pointer-events-none" : "opacity-100"
        } bg-[#000000]`}
      >
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex w-64 bg-[#000000] flex-col p-6 border-r border-[#374151] min-h-screen font-montserrat">
          <nav className="flex flex-col gap-6 text-lg text-gray-400 font-[Montserrat]">
            <a
              href="/dashboard"
              className="flex items-center gap-2 hover:text-[#ffffff]"
            >
              <LayoutDashboard size={20} /> Dashboard
            </a>
            <a
              href="/deposit"
              className="flex items-center gap-2 hover:text-[#ffffff]"
            >
              <ArrowDownCircle size={20} /> Deposit Now
            </a>
            <a
              href="/withdraw"
              className="flex items-center gap-2 hover:text-[#ffffff]"
            >
              <ArrowUpCircle size={20} /> Withdraw Funds
            </a>
            <a
              href="/deposit-history"
              className="flex items-center gap-2 hover:text-[#ffffff]"
            >
              <ListOrdered size={20} /> Deposit History
            </a>
            <a
              href="/transaction-history"
              className="flex items-center gap-2 hover:text-[#ffffff]"
            >
              <Receipt size={20} /> Transaction History
            </a>
            <a
              href="/upgrade-account"
              className="flex items-center gap-2 hover:text-[#ffffff]"
            >
              <TrendingUp size={20} /> Upgrade Account
            </a>
            <a
              href="/withdrawal-pin"
              className="flex items-center gap-2 hover:text-[#ffffff]"
            >
              <KeyRound size={20} /> Withdrawal Pin
            </a>
            <a
              href="/profile-settings"
              className="flex items-center gap-2 hover:text-[#ffffff]"
            >
              <Settings size={20} /> Profile Settings
            </a>
            <a
              href="/verify-account"
              className="flex items-center gap-2 hover:text-[#ffffff]"
            >
              <ShieldCheck size={20} /> Verified Account
            </a>
            <a
              href="/"
              className="flex items-center gap-2 hover:text-[#ffffff]"
            >
              <Home size={20} /> Back to Home
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#0d1117] min-h-screen">
          {/* Mobile Header */}
          <div className="md:hidden fixed w-full top-0 z-40 bg-[#0d1117] py-5 px-4 shadow-md flex justify-between items-center mb-6">
            <h1 className="text-lg font-semibold">Welcome back!</h1>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-md hover:bg-[#1f2937] transition mx-2"
              aria-label="Open Menu"
            >
              <Menu />
            </button>
          </div>

          <div className="pt-4 md:pt-8" />

          {/* TradingView Chart */}
          <div className="px-4 md:px-8 mb-3">
            <TradingViewChart />
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 px-4 md:px-8">
            {stats.map((card, index) => (
              <div
                key={index}
                className=" p-5 rounded-xl shadow-lg border border-divider"
              >
                <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
                <p className="text-3xl font-bold">{card.value}</p>
                <p className="text-sm">{card.sub}</p>
              </div>
            ))}

            {/* Referral Code Card */}
            <div className=" p-5 rounded-xl shadow-lg border border-divider">
              <h3 className="text-lg font-semibold mb-2">Your Referral Code</h3>
              <div className="flex items-center justify-between">
                <p className="text-[#ffffff] font-mono">{referralCode}</p>
                <button
                  onClick={() => navigator.clipboard.writeText(referralCode)}
                >
                  <Copy size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Share this code to earn rewards
              </p>
            </div>
          </div>
          <div className="mb-5">
            <div className="">
              <AdvancedChart />
            </div>

            <div className="">
              <ForexRates />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Slideout Menu */}
      <div
        className={`fixed inset-0 z-50 flex transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-64 bg-[#000000] h-full p-6 shadow-lg">
          <div
            className="close flex justify-end text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            <X />
          </div>
          <nav className="flex flex-col space-y-6 font-montserrat">
            <Link
              to="/dashboard"
              className="flex items-center space-x-3 py-2 text-gray-400 font-[Montserrat] hover:text-[#ffffff]"
            >
              <FontAwesomeIcon icon={faGauge} className="text-xl" />
              <span className="text-base">Dashboard</span>
            </Link>
            <Link
              to="/deposit"
              className="flex items-center space-x-3 py-2 text-gray-400 font-[Montserrat] hover:text-[#ffffff]"
            >
              <FontAwesomeIcon icon={faMoneyBillWave} className="text-xl" />
              <span className="text-base">Deposit Now</span>
            </Link>
            <Link
              to="/withdraw"
              className="flex items-center space-x-3 py-2 text-gray-400 font-[Montserrat] hover:text-[#ffffff]"
            >
              <FontAwesomeIcon icon={faMoneyCheckAlt} className="text-xl" />
              <span className="text-base">Withdraw Funds</span>
            </Link>
            <Link
              to="/deposit-history"
              className="flex items-center space-x-3 py-2 text-gray-400 font-[Montserrat] hover:text-[#ffffff]"
            >
              <FontAwesomeIcon icon={faListAlt} className="text-xl" />
              <span className="text-base">Deposit History</span>
            </Link>
            <Link
              to="/transaction-history"
              className="flex items-center space-x-3 py-2 text-gray-400 font-[Montserrat] hover:text-[#ffffff]"
            >
              <FontAwesomeIcon icon={faExchangeAlt} className="text-xl" />
              <span className="text-base">Transaction History</span>
            </Link>
            <Link
              to="/upgrade-account"
              className="flex items-center space-x-3 py-2 text-gray-400 font-[Montserrat] hover:text-[#ffffff]"
            >
              <FontAwesomeIcon icon={faArrowUpRightDots} className="text-xl" />
              <span className="text-base">Upgrade Account</span>
            </Link>
            <Link
              to="/withdrawal-pin"
              className="flex items-center space-x-3 py-2 text-gray-400 font-[Montserrat] hover:text-[#ffffff]"
            >
              <FontAwesomeIcon icon={faKey} className="text-xl" />
              <span className="text-base">Withdrawal Pin</span>
            </Link>
            <Link
              to="/profile-settings"
              className="flex items-center space-x-3 py-2 text-gray-400 font-[Montserrat] hover:text-[#ffffff]"
            >
              <FontAwesomeIcon icon={faUserGear} className="text-xl" />
              <span className="text-base">Profile Settings</span>
            </Link>
            <Link
              to="/verify-account"
              className="flex items-center space-x-3 py-2 text-gray-400 font-[Montserrat] hover:text-[#ffffff]"
            >
              <FontAwesomeIcon icon={faCircleCheck} className="text-xl" />
              <span className="text-base">Verified Account</span>
            </Link>
            <Link
              to="/"
              className="flex items-center space-x-3 py-2 text-gray-400 font-[Montserrat] hover:text-[#ffffff]"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
              <span className="text-base">Back to Home</span>
            </Link>
          </nav>
        </div>
        <div
          onClick={() => setIsOpen(false)}
          className="flex-1 bg-black bg-opacity-30"
        />
      </div>
    </>
  );
};

export default DashboardLayout;
