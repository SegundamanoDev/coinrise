import { useEffect, useRef } from "react";

const ForexRates = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: 450,
        defaultColumn: "overview",
        currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
        isTransparent: false,
        colorTheme: "dark",
        locale: "en",
      });
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container bg-gray-800 p-4 rounded-lg shadow-lg">
      <div ref={containerRef} />
    </div>
  );
};

export default ForexRates;
