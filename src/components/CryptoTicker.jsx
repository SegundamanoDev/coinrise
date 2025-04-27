import React, { useEffect, useState } from "react";
import axios from "axios";

const CryptoTicker = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 50,
              page: 1,
              price_change_percentage: "1h",
            },
          }
        );
        setCoins(res.data);
      } catch (error) {
        console.error("Failed to fetch coins:", error);
      }
    };

    fetchCoins();
  }, []);

  return (
    <div className="relative overflow-hidden bg-gray-900 py-4 mb-5">
      <div
        className=" whitespace-nowrap flex"
        style={{
          animation: "marquee 150s linear infinite",
          width: "max-content",
        }}
      >
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="flex items-center space-x-2 mx-8 min-w-max"
          >
            <img src={coin.image} alt={coin.name} className="w-6 h-6" />
            <div className="text-white text-sm">
              {coin.symbol.toUpperCase()} ${coin.current_price.toLocaleString()}
            </div>
            <div
              className={`text-xs ${
                coin.price_change_percentage_1h_in_currency >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {coin.price_change_percentage_1h_in_currency
                ? coin.price_change_percentage_1h_in_currency.toFixed(2)
                : "0.00"}
              %
            </div>
          </div>
        ))}

        {/* duplicate the list for infinite effect */}
        {coins.map((coin) => (
          <div
            key={coin.id + "-duplicate"}
            className="flex items-center space-x-2 mx-8 min-w-max"
          >
            <img src={coin.image} alt={coin.name} className="w-6 h-6" />
            <div className="text-white text-sm">
              {coin.symbol.toUpperCase()} ${coin.current_price.toLocaleString()}
            </div>
            <div
              className={`text-xs ${
                coin.price_change_percentage_1h_in_currency >= 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {coin.price_change_percentage_1h_in_currency
                ? coin.price_change_percentage_1h_in_currency.toFixed(2)
                : "0.00"}
              %
            </div>
          </div>
        ))}
      </div>
      <style>
        {`@keyframes marquee{
        0% {transform: translateX(0%)}
        100%{transform: translateX(-100%)}
        }`}
      </style>
    </div>
  );
};

export default CryptoTicker;
