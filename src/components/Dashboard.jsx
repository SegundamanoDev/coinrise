import { Menu } from "lucide-react";
import React from "react";
import LiveBinaryChart from "./LiveTradingChart";
import CryptoTicker from "./CryptoTicker";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div
        className={`md:flex justify-between font-sans text-[#f5f5f5] transition-opacity duration-300 ${
          isOpen ? "opacity-60 pointer-events-none" : "opacity-100"
        } bg-[#0d1117]`}
      >
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex w-64 bg-[#1f2937] flex-col p-6 border-r border-[#374151]">
          <h2 className="text-2xl font-bold text-yellow-400 mb-8">
            CryptoDash
          </h2>
          <nav className="flex flex-col gap-6 text-lg">
            <a href="/dashboard" className="hover:text-yellow-400">
              Dashboard
            </a>
            <a href="/transaction" className="hover:text-yellow-400">
              Transactions
            </a>
            <a href="/wallet" className="hover:text-yellow-400">
              Wallet
            </a>
            <a href="/invest" className="hover:text-yellow-400">
              Invest
            </a>
            <a href="/withdraw" className="text-white hover:text-yellow-400">
              Withdraw
            </a>
            <a href="/deposit" className="hover:text-yellow-400">
              Deposit
            </a>
            <a href="/profile" className="hover:text-yellow-400">
              Profile
            </a>
            <a href="/settings" className="hover:text-yellow-400">
              Settings
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Mobile Header */}
          <div className="md:hidden flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <button
              onClick={() => setIsOpen(true)}
              className=" px-4 py-1 rounded-md font-semibold"
            >
              <Menu />
            </button>
          </div>

          <CryptoTicker />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151]">
              <h3 className="text-lg font-semibold mb-2">Total Balance</h3>
              <p className="text-3xl font-bold text-yellow-400">₿0.753</p>
              <span className="text-sm text-gray-400">≈ $48,200</span>
            </div>
            <div className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151]">
              <h3 className="text-lg font-semibold mb-2">Active Investments</h3>
              <p className="text-3xl font-bold text-yellow-400">₿0.300</p>
              <span className="text-sm text-gray-400">3 plans active</span>
            </div>
            <div className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151]">
              <h3 className="text-lg font-semibold mb-2">Pending Deposits</h3>
              <p className="text-3xl font-bold text-yellow-400">₿0.150</p>
              <span className="text-sm text-gray-400">
                Awaiting confirmation
              </span>
            </div>
          </div>

          <LiveBinaryChart />
        </main>
      </div>

      {/* Mobile Slideout Menu */}
      <div
        className={`fixed inset-0 z-50 flex transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Drawer */}
        <div className="w-64 bg-[#1f2937] h-full p-6 shadow-lg">
          <h2 className="text-xl font-bold text-yellow-400 mb-6">CryptoDash</h2>
          <nav className="flex flex-col gap-4">
            <a
              href="/dashboard"
              className="text-white hover:text-yellow-400"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </a>
            <a
              href="/transaction"
              className="text-white hover:text-yellow-400"
              onClick={() => setIsOpen(false)}
            >
              Transactions
            </a>
            <a
              href="/wallet"
              className="text-white hover:text-yellow-400"
              onClick={() => setIsOpen(false)}
            >
              Wallet
            </a>
            <a
              href="/deposit"
              className="text-white hover:text-yellow-400"
              onClick={() => setIsOpen(false)}
            >
              Deposit
            </a>
            <a
              href="/withdraw"
              className="text-white hover:text-yellow-400"
              onClick={() => setIsOpen(false)}
            >
              Withdraw
            </a>
            <a
              href="/invest"
              className="text-white hover:text-yellow-400"
              onClick={() => setIsOpen(false)}
            >
              Invest
            </a>
            <a
              href="/profile"
              className="text-white hover:text-yellow-400"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </a>
            <a
              href="/settings"
              className="text-white hover:text-yellow-400"
              onClick={() => setIsOpen(false)}
            >
              Settings
            </a>
          </nav>
        </div>

        {/* Transparent Backdrop */}
        <div
          onClick={() => setIsOpen(false)}
          className="flex-1 bg-black bg-opacity-30"
        />
      </div>
    </>
  );
};

export default DashboardLayout;
