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
      isTransparent: false,
      height: "450",
      symbol: "FX:EURUSD",
      showIntervalTabs: true,
      locale: "en",
      colorTheme: "dark",
    });
    document.getElementById("technical-analysis-container").appendChild(script);
  }, []);

  return <div id="technical-analysis-container" className="w-full" />;
};

export default TechnicalAnalysis;
