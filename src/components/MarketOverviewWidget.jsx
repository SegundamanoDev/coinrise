import React from "react";

const MarketOverviewWidget = () => {
  return (
    <div className="market-overview-container">
      <div className="card">
        <div className="card-header d-flex justify-between flex-wrap">
          <div className="header-title text-center">
            <h4 className="card-title mb-2">Market Overview</h4>
          </div>
        </div>

        <div
          className="tradingview-widget-container"
          style={{ width: "100%", height: 450 }}
        >
          <iframe
            title="market quotes TradingView widget"
            scrolling="no"
            allowTransparency="true"
            frameBorder="0"
            src="https://www.tradingview-widget.com/embed-widget/market-quotes/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A450%2C%22symbolsGroups%22%3A%5B%7B%22name%22%3A%22Indices%22%2C%22symbols%22%3A%5B%7B%22name%22%3A%22FOREXCOM%3ASPXUSD%22%2C%22displayName%22%3A%22S%26P%20500%22%7D%2C%7B%22name%22%3A%22FOREXCOM%3ANSXUSD%22%2C%22displayName%22%3A%22US%20100%22%7D%2C%7B%22name%22%3A%22FOREXCOM%3ADJI%22%2C%22displayName%22%3A%22Dow%2030%22%7D%2C%7B%22name%22%3A%22INDEX%3ANKY%22%2C%22displayName%22%3A%22Nikkei%20225%22%7D%2C%7B%22name%22%3A%22INDEX%3ADEU40%22%2C%22displayName%22%3A%22DAX%20Index%22%7D%2C%7B%22name%22%3A%22FOREXCOM%3AUKXGBP%22%2C%22displayName%22%3A%22UK%20100%22%7D%5D%7D%2C%7B%22name%22%3A%22Futures%22%2C%22symbols%22%3A%5B%7B%22name%22%3A%22CME_MINI%3AES1!%22%2C%22displayName%22%3A%22S%26P%20500%22%7D%2C%7B%22name%22%3A%22CME%3A6E1!%22%2C%22displayName%22%3A%22Euro%22%7D%2C%7B%22name%22%3A%22COMEX%3AGC1!%22%2C%22displayName%22%3A%22Gold%22%7D%2C%7B%22name%22%3A%22NYMEX%3ACL1!%22%2C%22displayName%22%3A%22Oil%22%7D%2C%7B%22name%22%3A%22NYMEX%3ANG1!%22%2C%22displayName%22%3A%22Gas%22%7D%2C%7B%22name%22%3A%22CBOT%3AZC1!%22%2C%22displayName%22%3A%22Corn%22%7D%5D%7D%2C%7B%22name%22%3A%22Bonds%22%2C%22symbols%22%3A%5B%7B%22name%22%3A%22CME%3AGE1!%22%2C%22displayName%22%3A%22Eurodollar%22%7D%2C%7B%22name%22%3A%22CBOT%3AZB1!%22%2C%22displayName%22%3A%22T-Bond%22%7D%2C%7B%22name%22%3A%22CBOT%3AUB1!%22%2C%22displayName%22%3A%22Ultra%20T-Bond%22%7D%2C%7B%22name%22%3A%22EUREX%3AFGBL1!%22%2C%22displayName%22%3A%22Euro%20Bund%22%7D%2C%7B%22name%22%3A%22EUREX%3AFBTP1!%22%2C%22displayName%22%3A%22Euro%20BTP%22%7D%2C%7B%22name%22%3A%22EUREX%3AFGBM1!%22%2C%22displayName%22%3A%22Euro%20BOBL%22%7D%5D%7D%2C%7B%22name%22%3A%22Forex%22%2C%22symbols%22%3A%5B%7B%22name%22%3A%22FX%3AEURUSD%22%2C%22displayName%22%3A%22EUR%20to%20USD%22%7D%2C%7B%22name%22%3A%22FX%3AGBPUSD%22%2C%22displayName%22%3A%22GBP%20to%20USD%22%7D%2C%7B%22name%22%3A%22FX%3AUSDJPY%22%2C%22displayName%22%3A%22USD%20to%20JPY%22%7D%2C%7B%22name%22%3A%22FX%3AUSDCHF%22%2C%22displayName%22%3A%22USD%20to%20CHF%22%7D%2C%7B%22name%22%3A%22FX%3AAUDUSD%22%2C%22displayName%22%3A%22AUD%20to%20USD%22%7D%2C%7B%22name%22%3A%22FX%3AUSDCAD%22%2C%22displayName%22%3A%22USD%20to%20CAD%22%7D%5D%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Atrue%2C%22utm_source%22%3A%22tshareinvest.org%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22market-quotes%22%2C%22page-uri%22%3A%22tshareinvest.org%2Fdashboard%2Fmain.php%22%7D"
            style={{
              userSelect: "none",
              boxSizing: "border-box",
              display: "block",
              height: "100%",
              width: "100%",
              allowtransparency: "true",
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MarketOverviewWidget;
