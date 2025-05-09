import React from "react";

const CryptoTicker = () => {
  return (
    <div className=" rounded overflow-hidden shadow">
      {" "}
      <iframe
        src="https://s.tradingview.com/embed-widget/ticker-tape/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22displayMode%22%3A%22adaptive%22%2C%22locale%22%3A%22en%22%7D"
        className="w-full h-14"
        frameBorder="0"
        scrolling="no"
        allowTransparency="true"
        title="Crypto Ticker"
      ></iframe>{" "}
    </div>
  );
};

export default CryptoTicker;
