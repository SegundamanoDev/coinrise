import React, { useEffect, useRef } from "react";

const TradingViewChart = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Load TradingView script dynamically
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          width: 1050,
          height: 500,
          symbol: "BITFINEX:BTCUSD",
          interval: "1",
          timezone: "Etc/UTC",
          theme: "Dark",
          style: "9",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          calendar: true,
          studies: ["BB@tv-basicstudies"],
          container_id: "tradingview_f933e",
        });
      }
    };

    containerRef.current.appendChild(script);

    return () => {
      // Cleanup: optional depending on routing strategy
      const container = document.getElementById("tradingview_f933e");
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_f933e" ref={containerRef}></div>
      <div className="tradingview-widget-copyright" style={{ width: "100%" }}>
        <a href="#" rel="noopener" target="_blank">
          <span className="blue-text">Personal trading chart</span>
        </a>
      </div>
    </div>
  );
};

export default TradingViewChart;
