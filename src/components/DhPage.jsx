import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

// ========== Live Price Ticker ==========
const PriceTicker = () => {
  const [prices, setPrices] = useState({
    btc: 0,
    eth: 0,
    eurusd: 0,
    gbpusd: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cryptoRes, forexRes] = await Promise.all([
          axios.get(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
          ),
          axios.get(
            "https://api.exchangerate.host/latest?base=USD&symbols=EUR,GBP"
          ),
        ]);

        const crypto = cryptoRes.data;
        const forex = forexRes.data;

        setPrices({
          btc: crypto.bitcoin.usd,
          eth: crypto.ethereum.usd,
          eurusd: 1 / forex.rates.EUR,
          gbpusd: 1 / forex.rates.GBP,
        });
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 text-sm font-medium">
      <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow">
        BTC/USD: ${prices.btc.toFixed(2)}
      </div>
      <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow">
        ETH/USD: ${prices.eth.toFixed(2)}
      </div>
      <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow">
        EUR/USD: {prices.eurusd.toFixed(4)}
      </div>
      <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow">
        GBP/USD: {prices.gbpusd.toFixed(4)}
      </div>
    </div>
  );
};

// ========== TradingView Chart Component ==========
const TradingViewChart = ({ symbol = "BINANCE:BTCUSDT", height = 400 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const loadWidget = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          width: "100%",
          height,
          symbol,
          interval: "1",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          hide_top_toolbar: false,
          save_image: false,
          container_id: `tradingview_${symbol.replace(":", "")}`,
        });
      }
    };

    const scriptId = "tradingview-widget-script";
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://s3.tradingview.com/tv.js";
      script.onload = loadWidget;
      document.body.appendChild(script);
    } else {
      loadWidget();
    }

    return () => {
      containerRef.current.innerHTML = "";
    };
  }, [symbol, height]);

  return (
    <div id={`tradingview_${symbol.replace(":", "")}`} ref={containerRef}></div>
  );
};

// ========== Portfolio Summary ==========
const PortfolioSummary = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <p className="text-gray-500">Total Portfolio Value</p>
      <h2 className="text-2xl font-bold">$12,500</h2>
    </div>
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <p className="text-gray-500">Total Invested</p>
      <h2 className="text-2xl font-bold">$10,000</h2>
    </div>
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <p className="text-gray-500">Total Profit</p>
      <h2 className="text-2xl font-bold text-green-500">+$2,500</h2>
    </div>
  </div>
);

// ========== Chart Tabs ==========
const ChartTabs = ({ type }) => {
  const [activeTab, setActiveTab] = useState(
    type === "crypto" ? "BINANCE:BTCUSDT" : "FX:EURUSD"
  );

  const tabs =
    type === "crypto"
      ? ["BINANCE:BTCUSDT", "BINANCE:ETHUSDT", "COINBASE:BTCUSD"]
      : ["FX:EURUSD", "FX:GBPUSD", "FX:USDJPY"];

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-2">
        {tabs.map((symbol) => (
          <button
            key={symbol}
            onClick={() => setActiveTab(symbol)}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === symbol
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {symbol.replace(/.*:/, "")}
          </button>
        ))}
      </div>
      <TradingViewChart symbol={activeTab} />
    </div>
  );
};

// ========== Dashboard Page ==========
const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <PriceTicker />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold px-4">Crypto Charts</h2>
          <ChartTabs type="crypto" />
        </div>
        <div>
          <h2 className="text-lg font-semibold px-4">Forex Charts</h2>
          <ChartTabs type="forex" />
        </div>
      </div>

      <PortfolioSummary />
    </div>
  );
};

export default DashboardPage;
