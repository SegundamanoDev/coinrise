import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Menu,
  Copy,
  X,
  LayoutDashboard,
  ArrowDownCircle,
  ArrowUpCircle,
  ListOrdered, // Changed from Receipt for general history
  Receipt, // Keeping Receipt for Transaction History specifically
  TrendingUp, // For Upgrade Account
  KeyRound, // For Trading Plans
  Settings, // For Profile Settings
  ShieldCheck, // For Account-Type/Security
  Home, // For Back to Home
  ChevronUp,
  ChevronDown,
  Lock, // For security banner
  Lightbulb,
  DollarSign, // For Deposit button, and general currency icon
  Wallet, // For Withdraw button, and general wallet icon
  ArrowRightLeft, // For Transaction History (replaces faExchangeAlt)
  Rocket, // For Upgrade Account (replaces faArrowUpRightDots)
  History, // For Deposit History (replaces faListAlt)
  UserCog, // For Profile Settings (replaces faUserGear)
  ArrowLeft, // For Back to Home (replaces faArrowLeft)
  Sun, // For light mode toggle
  Moon, // For dark mode toggle
  Star, // For watchlist
  Newspaper,
  Clock, // For news/insights
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import TradingViewChart from "./TradingViewChart";
import ForexRates from "./FRate";
import Loader from "./LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../features/dashboard/dashboard";
import MarketOverviewWidget from "./MarketOverviewWidget";
import { fetchProfile } from "../features/users/userSlice";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import CryptoNewsFeed from "./CryptoNewsFeed";
import CryptoScreener from "./CryptoScreener";
import MarketTimeline from "./MarketTimeline";

// Utility for formatting money
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

// Utility for formatting percentage change
const formatPercentage = (value) => {
  if (value === undefined || value === null) return "N/A";
  const formattedValue = parseFloat(value).toFixed(2);
  const colorClass = formattedValue >= 0 ? "text-green-500" : "text-red-500";
  const sign = formattedValue >= 0 ? "+" : "";
  return (
    <span className={colorClass}>
      {sign}
      {formattedValue}%
    </span>
  );
};

// Utility for formatting last login date and time
const formatLastLogin = (isoString) => {
  if (!isoString) return "N/A";
  try {
    const date = new Date(isoString);
    return (
      date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }) +
      ` at ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })}`
    );
  } catch (error) {
    console.error("Error formatting last login date:", error);
    return "N/A";
  }
};

const DashboardLayout = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const [isOpen, setIsOpen] = useState(false); // State for mobile sidebar
  const [showModal, setShowModal] = useState(false); // State for funding modal
  const [theme, setTheme] = useState("dark"); // 'dark' or 'light'
  const [selectedCurrency, setSelectedCurrency] = useState("USD"); // Default currency for display
  const [copied, setCopied] = useState(false); // State for referral code copy status
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth); // Logged-in user from auth slice
  const { profile } = useSelector((state) => state.users); // User profile from users slice

  // States for live crypto prices, sorting, and trending coins
  const [cryptoPrices, setCryptoPrices] = useState([]);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [watchlist, setWatchlist] = useState([]); // User's watchlist

  // Mock data for Deposit Dropdown (replace with actual logic)
  const depositOptions = [
    {
      name: "Bitcoin",
      currency: "BTC",
      address: "1QGgLGPNRvnRW7kX67SQw3TjNmj1ycwKcB",
      qrCode: "https://placehold.co/192x192/000000/FFFFFF?text=BTC+QR", // Placeholder QR
    },
    {
      name: "USDT (TRC20)",
      currency: "USDT",
      address: "0xf8e859551b74b2a230c6fbe5300a32a2bc585e23",
      qrCode: "https://placehold.co/192x192/000000/FFFFFF?text=USDT+QR", // Placeholder QR
    },
  ];
  const [selectedDepositCoin, setSelectedDepositCoin] = useState(
    depositOptions[0]
  );

  // Currency options for the switcher
  const currencyOptions = [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
    { value: "JPY", label: "JPY" },
    // Add more currencies as needed
  ];

  // Helper to format money based on selected currency
  const formatMoneyWithSelectedCurrency = useCallback(
    (amount) => {
      // Use profile?.currency as a fallback if selectedCurrency is not set or valid
      const effectiveCurrency = selectedCurrency || profile?.currency || "USD";
      return formatMoney(amount, effectiveCurrency);
    },
    [selectedCurrency, profile?.currency]
  );

  // Get Bitcoin price from fetched crypto data
  const btcPriceInUsd = useMemo(() => {
    const btcData = cryptoPrices.find((coin) => coin.symbol === "btc");
    return btcData ? btcData.current_price : 0;
  }, [cryptoPrices]);

  // Utility for converting USD to BTC
  const convertToBitcoin = useCallback(
    (usdAmount) => {
      if (
        !btcPriceInUsd ||
        btcPriceInUsd === 0 ||
        usdAmount === undefined ||
        usdAmount === null ||
        usdAmount <= 0
      ) {
        return null;
      }
      const btcAmount = usdAmount / btcPriceInUsd;
      return btcAmount.toFixed(8); // BTC usually shown with 8 decimal places
    },
    [btcPriceInUsd]
  );

  const handleCopyClick = async () => {
    const referralCode = data?.referralCode || ""; // Ensure referralCode is available
    if (!referralCode) {
      console.warn("No referral code to copy.");
      return;
    }
    try {
      // Using document.execCommand('copy') for broader iframe compatibility
      const textarea = document.createElement("textarea");
      textarea.value = referralCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      setCopied(true); // Show "Copied!" message

      // Hide "Copied!" message after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Fallback message if copy fails
      // You could use a toast here if you prefer
      // toast.error("Failed to copy referral code.");
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    // We add/remove 'dark' class from document.documentElement
    // Tailwind will then apply appropriate styles based on your tailwind.config.js setup
    document.documentElement.classList.toggle("dark", theme === "light");
    document.documentElement.classList.toggle("light", theme === "dark"); // For explicit 'light' class if needed
  };

  // Fetch user profile and dashboard data on mount
  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchDashboardData());

    // Apply initial theme based on state
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [dispatch, theme]); // Re-run if theme changes to apply root class

  // Show funding modal if balance is zero after data loads
  useEffect(() => {
    // Only show modal if data has loaded and balance is 0
    if (!loading && !error && data?.availableBalance === 0) {
      setShowModal(true);
    }
  }, [data?.availableBalance, loading, error]); // Depend on data and loading state

  // Fetch live crypto prices and trending coins
  const fetchCryptoData = useCallback(async () => {
    try {
      const pricesResponse = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=true"
      );
      const pricesData = await pricesResponse.json();
      setCryptoPrices(pricesData);

      const trendingResponse = await fetch(
        "https://api.coingecko.com/api/v3/search/trending"
      );
      const trendingData = await trendingResponse.json();
      setTrendingCoins(trendingData.coins.slice(0, 5));
    } catch (err) {
      console.error("Error fetching crypto data:", err);
    }
  }, []); // No external dependencies for fetchCryptoData itself currently

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, [fetchCryptoData]); // Now fetchCryptoData is in the dependency array

  // Simulate Watchlist functionality (add/remove)
  const toggleWatchlist = (coinId) => {
    setWatchlist((prev) =>
      prev.includes(coinId)
        ? prev.filter((id) => id !== coinId)
        : [...prev, coinId]
    );
  };

  const getWatchlistCoins = useMemo(() => {
    return cryptoPrices.filter((coin) => watchlist.includes(coin.id));
  }, [watchlist, cryptoPrices]);

  // Define stats with raw values, to be formatted in JSX
  const stats = [
    {
      title: "Available Balance",
      value: data?.availableBalance,
      sub: "Withdrawable funds",
    },
    {
      title: "Total Deposited",
      value: data?.totalDeposited,
      sub: "Sum of all deposits",
    },
    {
      title: "Total Profits Earned",
      value: data?.totalProfits,
      sub: "Cumulative profit",
    },
    {
      title: "Referral Earnings",
      value: data?.referralEarnings,
      sub: "Referral commissions",
    },
    {
      title: "Pending Withdrawals",
      value: data?.pendingWithdrawals,
      sub: "Awaiting approval",
    },
  ];

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="text-red-500 p-4 text-center">
        Error: {error.message || "An error occurred fetching dashboard data."}
      </div>
    );

  const referralCode = data?.referralCode || "N/A";

  return (
    <>
      {/* Modal for funding account */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div
            className={`relative rounded-2xl shadow-xl p-6 w-full max-w-md mx-4 text-center space-y-4 border
              ${
                theme === "dark"
                  ? "bg-cardBackground border-borderColor text-textPrimary"
                  : "bg-white border-gray-200 text-gray-900"
              }
            `}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-textSecondary hover:text-red-400 transition"
              aria-label="Close Modal"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold">Fund your account</h2>
            <p className="text-textSecondary">
              Transfer Crypto to start trading now. Make use of the various
              options to trade whichever cryptocurrency you like best.
            </p>
            <button
              onClick={() => {
                navigate("/deposit");
                setShowModal(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition duration-200"
            >
              Deposit
            </button>
          </div>
        </div>
      )}

      {/* Mobile Header (Fixed at top for small screens) */}
      <div
        className={`md:hidden fixed w-full top-0 z-40 py-5 px-4 shadow-md flex justify-between items-center
          ${theme === "dark" ? "bg-darkBackground" : "bg-white"}
        `}
      >
        <button
          onClick={() => setIsOpen(true)}
          className={`p-2 rounded-md transition mx-2 ${
            theme === "dark"
              ? "hover:bg-[#1f2937] text-textPrimary"
              : "hover:bg-gray-200 text-gray-700"
          }`}
          aria-label="Open Menu"
        >
          <Menu />
        </button>
        {/* You might want a logo or title here too */}
      </div>

      {/* Mobile Slideout Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)} // Close sidebar when clicking overlay
        ></div>
      )}

      {/* Mobile Slideout Menu (Actual Sidebar) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${theme === "dark" ? "bg-sidebarBackground" : "bg-white"}
          md:hidden
        `}
      >
        <div className="w-full h-full p-6 shadow-lg">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsOpen(false)}
              className={`p-2 rounded-md ${
                theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              aria-label="Close mobile menu"
            >
              <X />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 mt-4">
            {/* Theme Toggle in Mobile Menu */}
            <div className="flex items-center justify-between pb-3 border-b border-borderColor mb-4">
              <span
                className={`text-textSecondary ${
                  theme === "light" ? "text-gray-700" : ""
                }`}
              >
                Theme
              </span>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                    : "bg-gray-200 text-blue-500 hover:bg-gray-300"
                }`}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Sidebar Links (now using Lucide Icons) */}
            <Link
              to="/dashboard"
              className={`flex items-center space-x-3 py-2  hover:text-blueAccent
                ${theme === "dark" ? "text-textSecondary" : "text-gray-700"}
              `}
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard size={20} />
              <span className="text-base">Dashboard</span>
            </Link>
            <Link
              to="/deposit"
              className={`flex items-center space-x-3 py-2  hover:text-blueAccent
                ${theme === "dark" ? "text-textSecondary" : "text-gray-700"}
              `}
              onClick={() => setIsOpen(false)}
            >
              <DollarSign size={20} />
              <span className="text-base">Deposit Now</span>
            </Link>
            <Link
              to="/withdraw"
              className={`flex items-center space-x-3 py-2  hover:text-blueAccent
                ${theme === "dark" ? "text-textSecondary" : "text-gray-700"}
              `}
              onClick={() => setIsOpen(false)}
            >
              <Wallet size={20} />
              <span className="text-base">Withdraw Funds</span>
            </Link>
            <Link
              to="/deposit-history"
              className={`flex items-center space-x-3 py-2  hover:text-blueAccent
                ${theme === "dark" ? "text-textSecondary" : "text-gray-700"}
              `}
              onClick={() => setIsOpen(false)}
            >
              <History size={20} />
              <span className="text-base">Deposit History</span>
            </Link>
            <Link
              to="/transaction-history"
              className={`flex items-center space-x-3 py-2  hover:text-blueAccent
                ${theme === "dark" ? "text-textSecondary" : "text-gray-700"}
              `}
              onClick={() => setIsOpen(false)}
            >
              <ArrowRightLeft size={20} />
              <span className="text-base">Transaction History</span>
            </Link>
            <Link
              to="/upgrade-account"
              className={`flex items-center space-x-3 py-2  hover:text-blueAccent
                ${theme === "dark" ? "text-textSecondary" : "text-gray-700"}
              `}
              onClick={() => setIsOpen(false)}
            >
              <Rocket size={20} />
              <span className="text-base">Upgrade Account</span>
            </Link>
            <Link
              to="/investment-plans"
              className={`flex items-center space-x-3 py-2  hover:text-blueAccent
                ${theme === "dark" ? "text-textSecondary" : "text-gray-700"}
              `}
              onClick={() => setIsOpen(false)}
            >
              <KeyRound size={20} />
              <span className="text-base">Trading Plans</span>
            </Link>
            <Link
              to="/profile"
              className={`flex items-center space-x-3 py-2  hover:text-blueAccent
                ${theme === "dark" ? "text-textSecondary" : "text-gray-700"}
              `}
              onClick={() => setIsOpen(false)}
            >
              <UserCog size={20} />
              <span className="text-base">Profile Settings</span>
            </Link>

            <Link
              to="/"
              className={`flex items-center space-x-3 py-2  hover:text-blueAccent
                ${theme === "dark" ? "text-textSecondary" : "text-gray-700"}
              `}
              onClick={() => setIsOpen(false)}
            >
              <ArrowLeft size={20} />
              <span className="text-base">Back to Home</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Layout Container */}
      <div
        className={`md:flex pt-16 md:pt-0 justify-between font-poppins text-textPrimary transition-colors duration-300
          ${
            theme === "dark" ? "bg-darkBackground" : "bg-gray-100 text-gray-900"
          }
        `}
      >
        {/* Sidebar - Desktop */}
        <aside
          className={`hidden md:flex w-64 flex-col p-6 border-r ${
            theme === "dark"
              ? "bg-sidebarBackground border-borderColor"
              : "bg-white border-gray-200"
          } min-h-screen font-montserrat`}
        >
          <nav className="flex flex-col gap-6 text-lg">
            {/* Theme Toggle in Sidebar */}
            <div className="flex items-center justify-between mb-4 mt-2">
              <span
                className={`text-textSecondary ${
                  theme === "light" ? "text-gray-700" : ""
                }`}
              >
                Theme
              </span>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  theme === "dark"
                    ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                    : "bg-gray-200 text-blue-500 hover:bg-gray-300"
                }`}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            {/* Desktop Sidebar Links (now using Lucide Icons) */}
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 hover:text-blueAccent ${
                theme === "dark" ? "text-textSecondary" : "text-gray-600"
              }`}
            >
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link
              to="/deposit"
              className={`flex items-center gap-2 hover:text-blueAccent ${
                theme === "dark" ? "text-textSecondary" : "text-gray-600"
              }`}
            >
              <ArrowDownCircle size={20} /> Deposit Now
            </Link>
            <Link
              to="/withdraw"
              className={`flex items-center gap-2 hover:text-blueAccent ${
                theme === "dark" ? "text-textSecondary" : "text-gray-600"
              }`}
            >
              <ArrowUpCircle size={20} /> Withdraw Funds
            </Link>
            <Link
              to="/deposit-history"
              className={`flex items-center gap-2 hover:text-blueAccent ${
                theme === "dark" ? "text-textSecondary" : "text-gray-600"
              }`}
            >
              <History size={20} /> Deposit History
            </Link>
            <Link
              to="/transaction-history"
              className={`flex items-center gap-2 hover:text-blueAccent ${
                theme === "dark" ? "text-textSecondary" : "text-gray-600"
              }`}
            >
              <Receipt size={20} /> Transaction History
            </Link>
            <Link
              to="/upgrade-account"
              className={`flex items-center gap-2 hover:text-blueAccent ${
                theme === "dark" ? "text-textSecondary" : "text-gray-600"
              }`}
            >
              <Rocket size={20} /> Upgrade Account
            </Link>
            <Link
              to="/investment-plans"
              className={`flex items-center gap-2 hover:text-blueAccent ${
                theme === "dark" ? "text-textSecondary" : "text-gray-600"
              }`}
            >
              <KeyRound size={20} /> Trading Plans
            </Link>
            <Link
              to="/profile"
              className={`flex items-center gap-2 hover:text-blueAccent ${
                theme === "dark" ? "text-textSecondary" : "text-gray-600"
              }`}
            >
              <Settings size={20} /> Profile Settings
            </Link>

            <Link
              to="/"
              className={`flex items-center gap-2 hover:text-blueAccent ${
                theme === "dark" ? "text-textSecondary" : "text-gray-600"
              }`}
            >
              <Home size={20} /> Back to Home
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 overflow-y-auto min-h-screen p-4 md:p-8 font-poppins
            ${theme === "dark" ? "bg-darkBackground" : "bg-gray-100"}
          `}
        >
          <div className="pt-4 md:pt-8" />{" "}
          {/* Spacer for fixed mobile header */}
          {/* Welcome Banner + Quick Actions */}
          <div
            className={`rounded-2xl shadow-lg border p-6 mb-6
            ${
              theme === "dark"
                ? "bg-cardBackground border-borderColor"
                : "bg-white border-gray-200"
            }
          `}
          >
            <h2 className="text-2xl font-bold mb-2 text-textPrimary">
              {getGreeting()}, {user?.fullName || "Trader"} 👋
            </h2>
            <p className="text-textSecondary mb-4">
              Markets are live. Let’s make some smart moves!
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/deposit")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition duration-200 text-sm transform hover:scale-105"
              >
                <DollarSign size={18} /> Deposit
              </button>
              <button
                onClick={() => navigate("/withdraw")}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-xl transition duration-200 text-sm transform hover:scale-105"
              >
                <Wallet size={18} /> Withdraw
              </button>
              <button
                onClick={() => navigate("/investment-plans")}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-xl transition duration-200 text-sm transform hover:scale-105"
              >
                <TrendingUp size={18} /> Invest
              </button>
            </div>
          </div>
          {/* Trust Banners & Last Login Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div
              className={`p-4 rounded-xl shadow-md flex items-center justify-center gap-2 border
              ${
                theme === "dark"
                  ? "bg-cardBackground border-borderColor"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center">
                <ShieldCheck size={24} className="text-green-400" />
                <p className="font-semibold text-lg text-textPrimary">
                  Account-Type:
                </p>
              </div>
              <p className="font-bold">{profile?.currentPlan}</p>
            </div>
            <div
              className={`p-4 rounded-xl shadow-md flex items-center justify-center gap-3 border
              ${
                theme === "dark"
                  ? "bg-cardBackground border-borderColor"
                  : "bg-white border-gray-200"
              }`}
            >
              <Lock size={24} className="text-blue-400" />
              <p className="font-semibold text-lg text-textPrimary">
                Funds Secured via 2FA + Cold Wallet 🔐
              </p>
            </div>
            <div
              className={`p-4 rounded-xl shadow-md flex items-center gap-3 border
                ${
                  theme === "dark"
                    ? "bg-cardBackground border-borderColor"
                    : "bg-white border-gray-200"
                }`}
            >
              <Clock size={20} className="text-textSecondary" />
              <div>
                <p className="font-semibold text-textPrimary">Last Login:</p>
                <p className="text-sm text-textSecondary">
                  {formatLastLogin(user?.lastLoginAt)}
                </p>
                <p className="text-xs text-gray-400">
                  {user?.lastLoginIpAddress || "N/A"}
                </p>
              </div>
            </div>
          </div>
          {/* Grid Layout for Main Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Column 1 (e.g., Chart, Stats) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                {stats.map((card, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-2xl shadow-lg border transition-all duration-300
                      ${
                        theme === "dark"
                          ? "bg-cardBackground border-borderColor hover:shadow-xl"
                          : "bg-white border-gray-200 hover:shadow-lg"
                      }
                    `}
                  >
                    <h3 className="text-lg bg-gradient-to-r from-blueAccent to-purpleAccent bg-clip-text text-transparent font-bold mb-2">
                      {card.title}
                    </h3>
                    {/* Display in selected currency */}
                    <p className="text-3xl font-bold text-textPrimary">
                      {formatMoneyWithSelectedCurrency(card.value)}
                    </p>
                    {/* Display in BTC if value > 0 and BTC price is available */}
                    {card.value > 0 && btcPriceInUsd > 0 && (
                      <p className="text-sm mt-1 text-textSecondary">
                        ≈ {convertToBitcoin(card.value)} BTC
                      </p>
                    )}
                    <p className="text-sm mt-1 text-textSecondary">
                      {card.sub}
                    </p>
                  </div>
                ))}
                {/* Referral Code Card - Integrated into stats grid */}
                <div
                  className={`p-5 rounded-2xl shadow-lg border transition-all duration-300
                    ${
                      theme === "dark"
                        ? "bg-cardBackground border-borderColor hover:shadow-xl"
                        : "bg-white border-gray-200 hover:shadow-lg"
                    }
                  `}
                >
                  <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-blueAccent to-purpleAccent bg-clip-text text-transparent">
                    Your Referral Code
                  </h3>
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg
                      ${theme === "dark" ? "bg-[#1f2937]" : "bg-gray-100"}
                    `}
                  >
                    <p className="text-textPrimary font-mono select-all overflow-auto text-sm">
                      {referralCode}
                    </p>
                    <button
                      onClick={handleCopyClick}
                      className={`ml-2 p-2 rounded-md transition duration-300 ease-in-out flex items-center justify-center
                        ${
                          theme === "dark"
                            ? "hover:bg-gray-700 bg-gray-800 text-gray-200" // Added background and text for dark theme button
                            : "hover:bg-gray-200 bg-gray-100 text-gray-700"
                        }`}
                      title="Copy to clipboard"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                  {copied && (
                    <span
                      className={`ml-2 text-sm font-medium ${
                        theme === "dark" ? "text-green-400" : "text-green-600"
                      }`}
                    >
                      Copied! 👌
                    </span>
                  )}
                  <p className="text-sm text-textSecondary mt-2">
                    Share this code to earn rewards
                  </p>
                </div>
              </div>
              {/* TradingView Chart */}
              <div
                className={`rounded-2xl shadow-lg border overflow-hidden
                ${
                  theme === "dark"
                    ? "bg-cardBackground border-borderColor"
                    : "bg-white border-gray-200"
                }
              `}
              >
                <TradingViewChart theme={theme} /> {/* Pass theme prop */}
              </div>
            </div>

            {/* Column 2 (e.g., P&L, Trending Coins, News) */}
            <div className="lg:col-span-1 space-y-6">
              {/* Trending Coins Card */}
              <div
                className={`p-6 rounded-2xl shadow-lg border
                ${
                  theme === "dark"
                    ? "bg-cardBackground border-borderColor"
                    : "bg-white border-gray-200"
                }
              `}
              >
                <h3 className="text-xl font-bold mb-4 text-textPrimary flex items-center gap-2">
                  🔥 Trending Coins
                </h3>
                {trendingCoins.length > 0 ? (
                  <ul className="space-y-4">
                    {trendingCoins.map((trend, index) => (
                      <li
                        key={trend.item.id}
                        className={`flex items-center justify-between pb-3 last:border-b-0
                          ${
                            theme === "dark"
                              ? "border-b border-[#1f2937]"
                              : "border-b border-gray-200"
                          }
                        `}
                      >
                        <div className="flex items-center">
                          <img
                            src={trend.item.small}
                            alt={trend.item.name}
                            className="w-8 h-8 mr-3 rounded-full"
                          />
                          <div>
                            <p className="font-semibold text-textPrimary">
                              {trend.item.name}
                            </p>
                            <p className="text-sm text-textSecondary uppercase">
                              {trend.item.symbol}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-textSecondary">
                            Rank: #{trend.item.market_cap_rank}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-textSecondary">
                      No trending coins available at the moment.
                    </p>
                  </div>
                )}
              </div>
             
            </div>
          </div>
          {/* Live Coin Prices Table */}
          <div
            className={`rounded-2xl shadow-lg border overflow-hidden mb-8
            ${
              theme === "dark"
                ? "bg-cardBackground border-borderColor"
                : "bg-white border-gray-200"
            }
          `}
          >
            <CryptoScreener theme={theme} />
          </div>
          <MarketTimeline theme={theme} />
          {/* Watchlist Component */}
          <div
            className={`rounded-2xl shadow-lg border overflow-hidden mb-8
            ${
              theme === "dark"
                ? "bg-cardBackground border-borderColor"
                : "bg-white border-gray-200"
            }
          `}
          >
            <h2
              className={`text-xl font-bold p-6 border-b
              ${
                theme === "dark"
                  ? "text-textPrimary border-borderColor"
                  : "text-gray-900 border-gray-200"
              }
            `}
            >
              <Star size={20} className="inline-block mr-2 text-yellow-400" />{" "}
              Your Watchlist
            </h2>
            <div className="p-6">
              {getWatchlistCoins.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getWatchlistCoins.map((coin) => (
                    <div
                      key={coin.id}
                      className={`flex items-center gap-4 p-4 rounded-lg
                        ${theme === "dark" ? "bg-[#1f2937]" : "bg-gray-100"}
                      `}
                    >
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-textPrimary">
                          {coin.name} ({coin.symbol.toUpperCase()})
                        </p>
                        <p className="text-lg font-bold text-textPrimary">
                          {formatMoney(coin.current_price, selectedCurrency)}
                        </p>
                        <p className="text-sm">
                          {formatPercentage(coin.price_change_percentage_24h)}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleWatchlist(coin.id)}
                        className="ml-auto text-red-400 hover:text-red-500 transition"
                        title="Remove from watchlist"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-textSecondary mb-2">
                    Your watchlist is empty.
                  </p>
                  <p className="text-sm text-textSecondary">
                    Add coins from the "Live Crypto Prices" table to track them
                    here.
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Deposit Dropdown with QR and Wallet */}
          <div
            className={`rounded-2xl shadow-lg border p-6 mb-8
            ${
              theme === "dark"
                ? "bg-cardBackground border-borderColor"
                : "bg-white border-gray-200"
            }
          `}
          >
            <h2 className="text-xl font-bold mb-4 text-textPrimary">
              Deposit Crypto
            </h2>
            <div className="mb-4">
              <label
                htmlFor="crypto-select"
                className="block text-textSecondary text-sm font-semibold mb-2"
              >
                Select Cryptocurrency:
              </label>
              <select
                id="crypto-select"
                className={`w-full p-3 rounded-lg border focus:ring-blue-500 focus:border-blue-500
                  ${
                    theme === "dark"
                      ? "bg-[#1f2937] border-borderColor text-textPrimary"
                      : "bg-gray-50 border-gray-300 text-gray-900"
                  }
                `}
                value={selectedDepositCoin.currency}
                onChange={(e) =>
                  setSelectedDepositCoin(
                    depositOptions.find(
                      (coin) => coin.currency === e.target.value
                    )
                  )
                }
              >
                {depositOptions.map((coin) => (
                  <option key={coin.currency} value={coin.currency}>
                    {coin.name} ({coin.currency})
                  </option>
                ))}
              </select>
            </div>

            {selectedDepositCoin && (
              <div className="text-center">
                <p className="text-textSecondary mb-3">
                  Send {selectedDepositCoin.name} (
                  {selectedDepositCoin.currency}) to the address below:
                </p>
                <div
                  className={`p-4 rounded-lg inline-block mb-4
                    ${theme === "dark" ? "bg-[#1f2937]" : "bg-gray-100"}
                  `}
                >
                  <img
                    src={selectedDepositCoin.qrCode}
                    alt={`${selectedDepositCoin.name} QR Code`}
                    className="w-48 h-48"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/192x192/CCCCCC/000000?text=QR+Error`;
                    }}
                  />
                </div>
                <div className="relative mb-4">
                  <input
                    type="text"
                    readOnly
                    value={selectedDepositCoin.address}
                    className={`w-full p-3 pr-12 rounded-lg border font-mono text-sm overflow-auto
                      ${
                        theme === "dark"
                          ? "bg-darkBackground border-borderColor text-textPrimary"
                          : "bg-gray-50 border-gray-300 text-gray-900"
                      }
                    `}
                  />
                  <button
                    onClick={() => {
                      // Using document.execCommand('copy') for broader iframe compatibility
                      const textarea = document.createElement("textarea");
                      textarea.value = selectedDepositCoin.address;
                      document.body.appendChild(textarea);
                      textarea.select();
                      document.execCommand("copy");
                      document.body.removeChild(textarea);
                      alert("Wallet address copied!"); // Using alert as per original request, but consider a toast
                    }}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-md transition
                      ${
                        theme === "dark"
                          ? "hover:bg-[#374151]"
                          : "hover:bg-gray-200"
                      }
                    `}
                    title="Copy address"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <p className="text-sm text-yellow-400">
                  <Lightbulb size={16} className="inline-block mr-1" />
                  Ensure you send only {selectedDepositCoin.name} (
                  {selectedDepositCoin.currency}) to this address to avoid loss
                  of funds.
                </p>
              </div>
            )}
          </div>
          {/* Currency Switcher */}
          <div
            className={`rounded-2xl shadow-lg border p-6 mb-8
            ${
              theme === "dark"
                ? "bg-cardBackground border-borderColor"
                : "bg-white border-gray-200"
            }
          `}
          >
            <h2 className="text-xl font-bold mb-4 text-textPrimary">
              Display Currency
            </h2>
            <div className="flex items-center gap-4">
              <label htmlFor="currency-switcher" className="text-textSecondary">
                Show balances in:
              </label>
              <select
                id="currency-switcher"
                className={`p-2 rounded-lg border focus:ring-blue-500 focus:border-blue-500
                  ${
                    theme === "dark"
                      ? "bg-[#1f2937] border-borderColor text-textPrimary"
                      : "bg-gray-50 border-gray-300 text-gray-900"
                  }
                `}
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
              >
                {currencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-textSecondary mt-2">
              (This affects display values, actual transactions use specified
              currency)
            </p>
          </div>
          {/* Market Overview Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div
              className={`rounded-2xl shadow-lg border p-6
                ${
                  theme === "dark"
                    ? "bg-cardBackground border-borderColor"
                    : "bg-white border-gray-200"
                }
              `}
            >
              <h2 className="text-xl font-bold mb-4 text-textPrimary">
                Forex Rates
              </h2>
              <ForexRates theme={theme} />
            </div>
            <div
              className={`rounded-2xl shadow-lg border p-6
                ${
                  theme === "dark"
                    ? "bg-cardBackground border-borderColor"
                    : "bg-white border-gray-200"
                }
              `}
            >
              <h2 className="text-xl font-bold mb-4 text-textPrimary">
                Market Overview
              </h2>
              <MarketOverviewWidget theme={theme} />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sticky Quick Actions (Conditional rendering for mobile only) */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 p-4 shadow-lg
          ${
            theme === "dark"
              ? "bg-[#1f2937] border-t border-borderColor"
              : "bg-white border-t border-gray-200"
          }
        `}
      >
        <div className="flex justify-around items-center text-sm font-semibold">
          <button
            onClick={() => navigate("/deposit")}
            className="flex flex-col items-center gap-1 text-blue-400 hover:text-blue-500 transition-colors"
          >
            <DollarSign size={20} /> Deposit
          </button>
          <button
            onClick={() => navigate("/withdraw")}
            className="flex flex-col items-center gap-1 text-purple-400 hover:text-purple-500 transition-colors"
          >
            <Wallet size={20} /> Withdraw
          </button>
          <button
            onClick={() => navigate("/investment-plans")}
            className="flex flex-col items-center gap-1 text-green-400 hover:text-green-500 transition-colors"
          >
            <TrendingUp size={20} /> Invest
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
