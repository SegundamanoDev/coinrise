// src/components/MarketTimeline.js
import React, { useEffect, useRef } from "react";

const MarketTimeline = () => {
  const containerRef = useRef(); // Ref to attach the widget to

  useEffect(() => {
    // Check if the widget has already been added to avoid duplicates on re-renders
    if (!containerRef.current.querySelector("iframe")) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        feedMode: "all_symbols",
        isTransparent: false,
        displayMode: "regular",
        width: "100%", // Use 100% for responsiveness
        height: 550,
        colorTheme: "dark", // Black theme
        locale: "en",
      });

      // Append the script to the div referenced by containerRef
      containerRef.current.appendChild(script);
    }

    // Optional: Cleanup function
    return () => {
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

export default MarketTimeline;
