import { useEffect, useRef } from "react";

const AdvancedChart = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        width: "100%",
        height: 500,
        symbol: "FX_IDC:EURUSD",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#000000",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "advanced-chart-container",
      });
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }
  }, []);

  return <div ref={containerRef} id="advanced-chart-container" />;
};

export default AdvancedChart;
