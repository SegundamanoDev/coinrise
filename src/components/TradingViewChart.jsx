import React from "react";

const TradingViewChart = () => {
  return (
    <div className="w-full max-w-[100%] mx-auto">
      <div className="relative pb-[60%] h-0 md:pb-[50%]">
        <iframe
          src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12345&symbol=BTCUSD&interval=D&hidesidetoolbar=0&theme=dark&style=1"
          frameBorder="0"
          allowTransparency
          allowFullScreen
          title="TradingView"
          className="absolute top-0 left-0 w-full h-full scale-[1] md:scale-[1] origin-top"
        ></iframe>
      </div>
    </div>
  );
};

export default TradingViewChart;
