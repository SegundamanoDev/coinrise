import { Menu, Copy } from "lucide-react";
import React from "react";
import TradingViewChart from "./TradingViewChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faMoneyBillWave,
  faMoneyCheckAlt,
  faExchangeAlt,
  faUser,
  faGear,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const referralCode = "CRYPTO123";
  const accountType = "Starter"; // Change this dynamically if needed

  return (
    <>
      <div
        className={`md:flex pt-16 md:pt-0 justify-between font-sans text-[#f5f5f5] transition-opacity duration-300 ${
          isOpen ? "opacity-60 pointer-events-none" : "opacity-100"
        } bg-[#0d1117]`}
      >
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex w-64 bg-[#1f2937] flex-col p-6 border-r border-[#374151] min-h-screen">
          <h2 className="text-2xl font-bold text-yellow-400 mb-8">
            CryptoDash
          </h2>
          <nav className="flex flex-col gap-6 text-lg">
            <a href="/dashboard" className="hover:text-yellow-400">
              Overview & activity
            </a>
            <a href="/deposit" className="hover:text-yellow-400">
              Deposit
            </a>
            <a href="/withdraw" className="hover:text-yellow-400">
              Withdraw
            </a>
            <a href="/transaction" className="hover:text-yellow-400">
              Transactions
            </a>
            <a href="/profile" className="hover:text-yellow-400">
              Profile
            </a>
            <a href="/settings" className="hover:text-yellow-400">
              Settings
            </a>
            <a href="/" className="hover:text-yellow-400">
              Back to home
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#0d1117] min-h-screen">
          {/* Mobile Header */}
          <div className="md:hidden fixed w-full top-0 z-40 bg-[#0d1117] py-5 px-4 shadow-md flex justify-between items-center mb-6">
            <h1 className="text-lg font-semibold">Welcome back, John!</h1>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-md hover:bg-[#1f2937] transition mx-2"
              aria-label="Open Menu"
            >
              <Menu />
            </button>
          </div>

          <div className="pt-4 md:pt-8" />

          {/* Account Type Banner */}
          <div className="bg-[#1f2937] text-sm md:text-base text-white p-4 mb-4 mx-4 md:mx-8 rounded-xl shadow border border-[#374151] flex items-center justify-between">
            <div>
              <span className="font-semibold text-yellow-400">
                Account Type:{" "}
              </span>
              <span className="uppercase font-bold tracking-wide text-green-400">
                {accountType}
              </span>
            </div>
            <a
              href="/settings"
              className="text-blue-400 hover:underline text-sm"
            >
              Upgrade Account
            </a>
          </div>

          {/* TradingView Chart */}
          <div className="px-4 md:px-8 mb-3">
            <TradingViewChart />
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 px-4 md:px-8">
            {[
              {
                title: "Available Balance",
                value: "$150.00",
                sub: "Withdrawable funds",
              },
              {
                title: "Total Deposited",
                value: "$500.00",
                sub: "Sum of all deposits",
              },
              {
                title: "Total Profits Earned",
                value: "$75.00",
                sub: "Cumulative profit",
              },
              {
                title: "Referral Earnings",
                value: "$25.00",
                sub: "Referral commissions",
              },
              {
                title: "Active Investments",
                value: "$300.00",
                sub: "2 plans active",
              },
              {
                title: "Pending Withdrawals",
                value: "$100.00",
                sub: "Awaiting approval",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151]"
              >
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-3xl font-bold text-yellow-400">
                  {card.value}
                </p>
                <span className="text-sm text-gray-400">{card.sub}</span>
              </div>
            ))}

            {/* Referral Code Card */}
            <div className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151]">
              <h3 className="text-lg font-semibold mb-2">Your Referral Code</h3>
              <div className="flex items-center justify-between">
                <span className="text-yellow-400 font-mono">
                  {referralCode}
                </span>
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

          {/* Transactions & Plan Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-8 mb-10">
            <div className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151]">
              <h3 className="text-lg font-semibold mb-4">
                Recent Transactions
              </h3>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>
                  Deposited $200.00 -{" "}
                  <span className="text-green-400">Success</span>
                </li>
                <li>
                  Profit Earned $25.00 -{" "}
                  <span className="text-green-400">Completed</span>
                </li>
                <li>
                  Withdraw Requested $100.00 -{" "}
                  <span className="text-yellow-400">Pending</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151]">
              <h3 className="text-lg font-semibold mb-4">Your Plans</h3>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>Plan A - $150.00 - Active</li>
                <li>Plan B - $150.00 - Active</li>
              </ul>
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
        <div className="w-64 bg-[#1f2937] h-full p-6 shadow-lg">
          <h2 className="text-xl font-bold text-yellow-400 mb-6">
            Dashboard & Overview
          </h2>
          <nav className="flex flex-col space-y-6">
            <Link
              to="/dashboard"
              className="flex items-center space-x-3 py-2 text-white"
            >
              <FontAwesomeIcon icon={faGauge} className="text-xl" />
              <span className="text-base">Dashboard</span>
            </Link>
            <Link
              to="/deposit"
              className="flex items-center space-x-3 py-2 text-white"
            >
              <FontAwesomeIcon icon={faMoneyBillWave} className="text-xl" />
              <span className="text-base">Deposit</span>
            </Link>
            <Link
              to="/withdraw"
              className="flex items-center space-x-3 py-2 text-white"
            >
              <FontAwesomeIcon icon={faMoneyCheckAlt} className="text-xl" />
              <span className="text-base">Withdraw</span>
            </Link>
            <Link
              to="/transaction"
              className="flex items-center space-x-3 py-2 text-white"
            >
              <FontAwesomeIcon icon={faExchangeAlt} className="text-xl" />
              <span className="text-base">Transaction</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center space-x-3 py-2 text-white"
            >
              <FontAwesomeIcon icon={faUser} className="text-xl" />
              <span className="text-base">Profile</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center space-x-3 py-2 text-white"
            >
              <FontAwesomeIcon icon={faGear} className="text-xl" />
              <span className="text-base">Settings</span>
            </Link>
            <Link
              to="/"
              className="flex items-center space-x-3 py-2 text-white"
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
