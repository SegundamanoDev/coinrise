import { Menu, Copy } from "lucide-react";
import React from "react";
import LiveBinaryChart from "./LiveTradingChart";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const referralCode = "CRYPTO123";

  return (
    <>
      <div
        className={`md:flex pt-16 md:pt-0 justify-between font-sans text-[#f5f5f5] transition-opacity duration-300 ${
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
              Overview & activity
            </a>
            <a href="/#" className="hover:text-yellow-400">
              Upgrade Account
            </a>
            <a href="/invest" className="hover:text-yellow-400">
              Invest
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
        <main className="flex-1 overflow-y-auto p-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
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
              {
                title: "Mining Pool Share",
                value: "0.005 BTC",
                sub: "Hashrate: 12 MH/s",
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

          {/* Recent Transactions */}
          <div className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151] mb-6">
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
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

          {/* Optional: Plan Summary */}
          <div className="bg-[#1f2937] p-5 rounded-xl shadow-lg border border-[#374151]">
            <h3 className="text-lg font-semibold mb-4">Your Plans</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              <li>Plan A - $150.00 - Active</li>
              <li>Plan B - $150.00 - Active</li>
            </ul>
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
        <div className="w-64 bg-[#1f2937] h-full p-6 shadow-lg">
          <h2 className="text-xl font-bold text-yellow-400 mb-6">CryptoDash</h2>
          <nav className="flex flex-col gap-4">
            {[
              "dashboard",
              "upgrade",
              "invest",
              "deposit",
              "withdraw",
              "transaction",
              "profile",
              "settings",
            ].map((link, index) => (
              <a
                key={index}
                onClick={() => setIsOpen(false)}
                href={`/${link}`}
                className="hover:text-yellow-400 text-white"
              >
                {link.charAt(0).toUpperCase() +
                  link.slice(1).replace(/-/g, " ")}
              </a>
            ))}
            <a
              onClick={() => setIsOpen(false)}
              href="/"
              className="hover:text-yellow-400 text-white mt-4"
            >
              Back to Home
            </a>
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
