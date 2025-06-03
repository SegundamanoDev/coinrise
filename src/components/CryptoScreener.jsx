// src/components/CryptoScreener.js
import React, { useEffect, useRef } from "react";

const CryptoScreener = () => {
  const containerRef = useRef(); // Ref to attach the widget to

  useEffect(() => {
    // Check if the widget has already been added to avoid duplicates on re-renders
    if (!containerRef.current.querySelector("iframe")) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: 550,
        defaultColumn: "overview",
        screener_type: "crypto_mkt",
        displayCurrency: "USD",
        colorTheme: "dark", // Black theme
        locale: "en",
      });

      // Append the script to the div referenced by containerRef
      containerRef.current.appendChild(script);
    }

    // Optional: Cleanup function if you need to remove the widget on component unmount
    return () => {
      // You might need to manually remove the iframe or widget container
      // if TradingView doesn't clean up itself. For simple cases, just appending
      // and letting React handle div removal is usually fine.
      if (containerRef.current && containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <div className="tradingview-widget-container bg-gray-800 p-4 rounded-lg shadow-lg">
      <div
        className="tradingview-widget-container__widget"
        ref={containerRef}
      ></div>
    </div>
  );
};

export default CryptoScreener;
