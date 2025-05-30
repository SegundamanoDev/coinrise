import React, { useEffect, useState, useCallback } from "react";
import {
  DollarSign,
  TrendingUp,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";
import { notifications } from "./notifications"; // This file needs to be updated manually

const EarningsPopup = () => {
  const [current, setCurrent] = useState(() =>
    Math.floor(Math.random() * notifications.length)
  );
  const [visible, setVisible] = useState(false);

  // Function to format currency
  const formatCurrency = useCallback((amount) => {
    const numericAmount = parseFloat(amount.replace(/[^0-9.-]+/g, ""));
    if (isNaN(numericAmount)) return amount;

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD", // IMPORTANT: Adjust 'USD' if your primary currency is different (e.g., 'GBP', 'EUR')
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(numericAmount);
  }, []);

  // Function to determine icon based on transaction type
  const getTransactionIcon = useCallback((type) => {
    switch (type) {
      case "deposited":
        return <ArrowUpCircle size={24} className="text-green-400" />;
      case "withdrew":
        return <ArrowDownCircle size={24} className="text-red-400" />;
      case "invested":
        return <TrendingUp size={24} className="text-blue-400" />;
      default:
        return <DollarSign size={24} className="text-yellow-400" />;
    }
  }, []);

  useEffect(() => {
    let intervalId;
    let timeoutId;

    const showNextNotification = () => {
      setVisible(true);
      timeoutId = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          setCurrent((prev) => (prev + 1) % notifications.length);
        }, 500);
      }, 4000);
    };

    showNextNotification();

    intervalId = setInterval(() => {
      showNextNotification();
    }, 7000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  const notification = notifications[current];

  if (!notification) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-700 ease-in-out font-montserrat
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        } 
        bg-gray-800 text-white px-5 py-4 rounded-xl shadow-2xl border border-gray-700 max-w-[280px] sm:max-w-xs w-full
        flex items-center space-x-3 backdrop-blur-sm bg-opacity-90`}
    >
      <div className="flex-shrink-0">
        {getTransactionIcon(notification.type)}
      </div>
      <div>
        <h2 className="font-semibold text-base text-gray-200">
          <span className="font-bold text-blue-400">{notification.name}</span>{" "}
          from {notification.country}
        </h2>
        <p className="text-sm text-gray-300 leading-tight mt-1">
          {notification.type === "deposited"
            ? "just deposited"
            : notification.type === "withdrew"
            ? "just withdrew"
            : "just invested"}
          <br className="sm:hidden" />
          <span className="font-bold text-yellow-400 text-lg ml-1">
            {formatCurrency(notification.amount)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default EarningsPopup;
