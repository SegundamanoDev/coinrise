import React, { useEffect } from "react";

const TradingViewWidget = ({ symbol }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      width: "100%",
      height: "220",
      locale: "en",
      dateRange: "12M",
      colorTheme: "dark",
      isTransparent: false,
      autosize: true,
      largeChartUrl: "",
      chartOnly: false,
      scalePosition: "no",
      scaleMode: "percentage",
      fontFamily: "Open-sans",
      fontSize: "12",
      noTimeScale: false,
      valuesTracking: "1",
      chartType: "area",
      lineWidth: 2,
    });

    document.getElementById(`tv-widget-${symbol}`).innerHTML = "";
    document.getElementById(`tv-widget-${symbol}`).appendChild(script);
  }, [symbol]);

  return (
    <div
      id={`tv-widget-${symbol}`}
      className="bg-black rounded-xl shadow-md overflow-hidden mb-4 p-5"
    />
  );
};

const TvWidget = ({ heading }) => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">{heading}</h1>
      <div className="mb-6">
        <TradingViewWidget symbol="FX:EURUSD" />
      </div>
      <div className="mb-6">
        <TradingViewWidget symbol="BINANCE:BTCUSDT" />
      </div>
      <div className="mb-6">
        <TradingViewWidget symbol="NYSE:LTC" />
      </div>
    </div>
  );
};

export default TvWidget;
