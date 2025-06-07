import React, { useEffect } from "react";

const MarketOverview = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "dark",
      dateRange: "12M",
      showChart: true,
      locale: "en",
      width: "100%",
      height: 450,
      defaultColumn: "overview",
      largeChartUrl: "",

      showSymbolLogo: true,
      plotLineColorGrowing: "rgba(60, 188, 152, 1)",
      plotLineColorFalling: "rgba(255, 74, 104, 1)",
      gridLineColor: "rgba(240, 243, 250, 0)",
      scaleFontColor: "rgba(120, 123, 134, 1)",
      belowLineFillColorGrowing: "rgba(60, 188, 152, 0.05)",
      belowLineFillColorFalling: "rgba(255, 74, 104, 0.05)",
      symbolActiveColor: "rgba(242, 250, 254, 1)",
      tabs: [
        {
          title: "Forex",
          symbols: [
            { s: "FX:EURUSD" },
            { s: "FX:USDJPY" },
            { s: "FX:GBPUSD" },
            { s: "FX:USDCHF" },
          ],
        },
        {
          title: "Crypto",
          symbols: [
            { s: "BITSTAMP:BTCUSD" },
            { s: "BITSTAMP:ETHUSD" },
            { s: "BINANCE:BNBUSDT" },
          ],
        },
      ],
    });
    document.getElementById("market-overview-container").appendChild(script);
  }, []);

  return (
    <div className="tradingview-widget-container bg-gray-800 p-4 rounded-lg shadow-lg">
      <div id="market-overview-container" />
    </div>
  );
};

export default MarketOverview;
