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
import TradingViewChart from "./TradingViewChart";
import AdvancedChart from "./AdChart";
import ForexRates from "./FRate";
import Loader from "./LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../features/dashboard/dashboard";

const formatMoney = (amount, currency = "USD") => {
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount || 0);
  } catch (error) {
    return `${currency} ${parseFloat(amount || 0).toFixed(2)}`;
  }
};

const DashboardLayout = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const stats = [
    {
      title: "Available Balance",
      value: formatMoney(data?.availableBalance, user?.currency),
      sub: "Withdrawable funds",
    },
    {
      title: "Total Deposited",
      value: formatMoney(data?.totalDeposited, user?.currency),
      sub: "Sum of all deposits",
    },
    {
      title: "Total Profits Earned",
      value: formatMoney(data?.totalProfits, user?.currency),
      sub: "Cumulative profit",
    },
    {
      title: "Referral Earnings",
      value: formatMoney(data?.referralEarnings, user?.currency),
      sub: "Referral commissions",
    },
    {
      title: "Pending Withdrawals",
      value: formatMoney(data?.pendingWithdrawals, user?.currency),
      sub: "Awaiting approval",
    },
  ];

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

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
              href="/investment-plans"
              className="flex items-center gap-2 hover:text-[#ffffff]"
            >
              <KeyRound size={20} /> Trading Plans
            </a>
            <a
              href="/profile"
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
            <h1 className="text-lg font-semibold">
              {getGreeting()}, {user?.fullName}!
            </h1>
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
                className=" p-5 rounded-xl shadow-lg bg-[#121212]"
              >
                <h3 className="text-lg bg-gradient-to-r from-[#00befe] to-[#a700ff] bg-clip-text text-transparent font-bold mb-2">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold">{card.value}</p>
                <p className="text-sm mt-1">{card.sub}</p>
              </div>
            ))}

            {/* Referral Code Card */}
            <div className=" p-5 rounded-xl shadow-lg bg-[#121212] ">
              <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-[#00befe] to-[#a700ff] bg-clip-text text-transparent">
                Your Referral Code
              </h3>
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
              <ForexRates />
            </div>
            <div className="">
              <AdvancedChart />
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
          <nav className="flex flex-col space-y-5 font-montserrat">
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
              to="/investment-plans"
              className="flex items-center space-x-3 py-2 text-gray-400 font-[Montserrat] hover:text-[#ffffff]"
            >
              <FontAwesomeIcon icon={faKey} className="text-xl" />
              <span className="text-base">Trading Plans</span>
            </Link>
            <Link
              to="/profile"
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
