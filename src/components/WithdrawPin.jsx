import React from "react";
import ReuseableForm from "./ReuseableForm";

const WithdrawPin = () => {
  return (
    <>
      <ReuseableForm
        heading="Request Withdrawal Pin"
        title="Make sure that you are sending funds to the correct wallet
                  address and blockchain network. Sending coins or tokens other
                  than {selectedCoin} to this address may result in loss of your
                  deposit."
        desc="Request a withdrawal pin"
        btn="Request Pin"
      />
    </>
  );
};

export default WithdrawPin;
