import React, { useEffect } from "react";

const ForexCrossRates = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: 400,
      currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
      colorTheme: "dark",
      isTransparent: false,
      locale: "en",
    });
    document.getElementById("forex-cross-rates-container").appendChild(script);
  }, []);

  return <div id="forex-cross-rates-container" className="w-full p-5" />;
};

export default ForexCrossRates;
