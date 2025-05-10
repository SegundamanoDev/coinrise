import React from "react";
import ReuseableForm from "./ReuseableForm";
import TvWidget from "./TradingViewWidget.";

const Deposit = () => {
  return (
    <div>
      <ReuseableForm
        heading="Deposit into your wallet"
        title=" Make sure that you are sending funds to the correct wallet
                  address and blockchain network. Sending coins or tokens other
                  than {selectedCoin} to this address may result in loss of your
                  deposit."
        desc="Deposit reflects after 2 network confirmations."
      />
      <TvWidget />
    </div>
  );
};

export default Deposit;
