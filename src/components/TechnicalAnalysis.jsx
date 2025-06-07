import React, { useEffect } from "react";

const TechnicalAnalysis = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      interval: "1h",
      width: "100%",
      height: 450,
      defaultColumn: "overview",
      isTransparent: false,
      symbol: "FX:EURUSD",
      showIntervalTabs: true,
      locale: "en",
      colorTheme: "dark",
    });
    document.getElementById("technical-analysis-container").appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container bg-gray-800 p-4 rounded-lg shadow-lg">
      <div id="technical-analysis-container" />
    </div>
  );
};

export default TechnicalAnalysis;
