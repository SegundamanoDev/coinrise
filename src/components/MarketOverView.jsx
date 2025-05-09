import React, { useEffect, useRef } from "react";

const MarketOverview = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "dark",
      dateRange: "12M",
      showChart: true,
      locale: "en",
      largeChartUrl: "",
      isTransparent: true,
      width: "100%",
      height: 500,
      showSymbolLogo: true,
      plotLineColorGrowing: "rgba(25, 118, 210, 1)",
      plotLineColorFalling: "rgba(25, 118, 210, 1)",
      gridLineColor: "rgba(42, 46, 57, 0)",
      scaleFontColor: "rgba(120, 123, 134, 1)",
      belowLineFillColorGrowing: "rgba(33, 150, 243, 0.12)",
      belowLineFillColorFalling: "rgba(33, 150, 243, 0.12)",
      symbolActiveColor: "rgba(33, 150, 243, 0.12)",
      tabs: [
        {
          title: "Forex",
          symbols: [
            { s: "FX:EURUSD" },
            { s: "FX:GBPUSD" },
            { s: "FX:USDJPY" },
            { s: "FX:AUDUSD" },
          ],
          originalTitle: "Forex",
        },
        {
          title: "Crypto",
          symbols: [
            { s: "BINANCE:BTCUSDT" },
            { s: "BINANCE:ETHUSDT" },
            { s: "BINANCE:LTCUSDT" },
          ],
          originalTitle: "Crypto",
        },
        {
          title: "Bonds",
          symbols: [{ s: "CBOT:ZB1!" }, { s: "CBOT:UB1!" }],
          originalTitle: "Bonds",
        },
      ],
    });

    containerRef.current.appendChild(script);
  }, []);

  return <div className="w-full max-w-full p-2" ref={containerRef}></div>;
};

export default MarketOverview;
