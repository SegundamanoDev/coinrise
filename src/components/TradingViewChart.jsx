import React, { useEffect } from "react";

const TradingViewChart = () => {
  useEffect(() => {
    // Load the TradingView library
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new TradingView.widget({
          container_id: "tradingview_widget",
          width: "100%",
          height: "100%",
          symbol: "BITFINEX:BTCUSD",
          interval: "1",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1", // Candlestick
          locale: "en",
          toolbar_bg: "#0a0a0a",
          hide_top_toolbar: true,
          hide_side_toolbar: true, // Hides the left tools toolbar
          save_image: false,
          studies: ["BB@tv-basicstudies", "Volume@tv-basicstudies"],
          enable_publishing: false,
          allow_symbol_change: false,
          hide_legend: false,
          backgroundColor: "#0a0a0a",
          gridColor: "#333",
          autosize: true,
          // Add this line to hide the right price scale and watchlist
          withdateranges: false,
          details: false,
          hotlist: false,
          calendar: false,
          hideideas: true,
          show_popup_button: false,
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="tradingview_widget"
      style={{
        width: "100%",
        height: "50vh",
        marginBottom: "10px",
      }}
    />
  );
};

export default TradingViewChart;
