import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "NASDAQ:AAPL",
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      support_host: "https://www.tradingview.com",
    });

    if (containerRef.current) {
      containerRef.current.innerHTML = ""; // Clear existing if hot reloaded
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full" style={{ minHeight: "450px" }}>
      <div
        className="tradingview-widget-container__widget"
        ref={containerRef}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default memo(TradingViewWidget);
