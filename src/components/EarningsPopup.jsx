import React, { useEffect, useState } from "react";
import { notifications } from "./notifications";

const EarningsPopup = () => {
  const [current, setCurrent] = useState(() =>
    Math.floor(Math.random() * notifications.length)
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(true);
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 3500);
      setCurrent((prev) => (prev + 1) % notifications.length);
      return () => clearTimeout(timeout);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const notification = notifications[current];

  return (
    <div
      className={`fixed bottom-14 left-6 z-50 transition-all duration-700 ease-in-out 
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} 
        bg-black text-white px-4 py-3 rounded-md shadow-lg border-l-4 border-yellow-500 max-w-xs w-full`}
    >
      <div className="flex items-center space-x-2">
        <span className="text-2xl">₿</span>
        <div>
          <h2 className="font-bold">Transaction</h2>
          <p className="text-sm">
            {notification.name} from {notification.country} has just{" "}
            {notification.type}{" "}
            <span className="font-semibold">{notification.amount}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EarningsPopup;
