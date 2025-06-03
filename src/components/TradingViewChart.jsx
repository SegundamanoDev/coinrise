// import React from "react";

// const TradingViewChart = () => {
//   return (
//     <div className="w-full max-w-[100%] mx-auto">
//       <div className="relative pb-[60%] h-0 md:pb-[50%]">
//         <iframe
//           src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12345&symbol=BTCUSD&interval=D&hidesidetoolbar=0&theme=dark&style=1"
//           frameBorder="0"
//           allowTransparency
//           allowFullScreen
//           title="TradingView"
//           className="absolute top-0 left-0 w-full h-full scale-[1] md:scale-[1] origin-top"
//         ></iframe>
//       </div>
//     </div>
//   );
// };

// export default TradingViewChart;

// src/components/TradingViewChart.js
import React, { useEffect, useRef } from "react";

const TradingViewChart = ({
  symbol = "BTCUSD",
  interval = "D",
  theme = "dark",
}) => {
  const containerRef = useRef();

  useEffect(() => {
    // Prevent loading if the widget is already there (e.g., on re-renders)
    if (!containerRef.current.querySelector("iframe")) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true, // This is key: widget will fill its container
        symbol: symbol,
        interval: interval,
        timezone: "exchange", // Or "America/New_York", etc.
        theme: theme, // "dark" for black theme
        style: "1", // Candlestick style
        locale: "en",
        toolbar_bg: "#f1f3f6", // Consider a dark toolbar background for a black theme
        enable_publishing: false,
        allow_symbol_change: true,
        calendar: false, // Hide economic calendar by default
        studies: ["Volume@tv-basicstudies"], // Example: include Volume indicator
        show_popup_button: false, // Hide 'Launch chart in popup' button
        details: false, // Hide symbol details by default
        hotlist: false, // Hide hotlist by default
        watchlist: false, // Hide watchlist by default
        news: ["headlines"], // Show news headlines
      });

      containerRef.current.appendChild(script);
    }

    // Cleanup function
    return () => {
      if (containerRef.current && containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
    };
  }, [symbol, interval, theme]); // Re-run effect if symbol, interval, or theme changes

  return (
    // The parent div dictates the dimensions.
    // Use Tailwind classes to set width and height directly.
    <div
      className="tradingview-widget-container bg-gray-900 p-2 rounded-lg shadow-xl"
      style={{ width: "100%", height: "500px" }}
    >
      {" "}
      {/* Set a fixed height that works for your layout */}
      <div
        className="tradingview-widget-container__widget"
        ref={containerRef}
        style={{ width: "100%", height: "100%" }}
      >
        {" "}
        {/* Inner div fills parent */}
      </div>
    </div>
  );
};

export default TradingViewChart;
