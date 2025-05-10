import React, { useState } from "react";
import TradingPlans from "./InvestmentPlanSection";
import CryptoTicker from "./CryptoTicker";
import ReuseableForm from "./ReuseableForm";

const UpgradeAccount = () => {
  return (
    <div>
      <CryptoTicker />
      <ReuseableForm
        heading="Upgrade your account"
        title="Make sure that you are sending funds to the correct wallet
                  address and blockchain network. Sending coins or tokens other
                  than {selectedCoin} to this address may result in loss of your
                  deposit."
        note="Upgrade your account to enjoy premium features"
        desc="Deposit reflects after 2 network confirmations."
      />
      <TradingPlans />
    </div>
  );
};

export default UpgradeAccount;
