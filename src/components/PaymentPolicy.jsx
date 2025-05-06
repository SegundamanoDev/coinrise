import React from "react";

const PaymentPolicy = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 rounded-xl shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payment Policy</h1>

      <p className="mb-4">
        This Payment Policy outlines the responsibilities of{" "}
        <strong>CoinRise</strong> ("the Company") and its clients regarding
        deposits, withdrawals, and transactions conducted on the platform.
      </p>

      <h2 className="text-xl font-semibold mb-2">
        1. Account Balance Responsibility
      </h2>
      <p className="mb-4">
        CoinRise is responsible for maintaining accurate records of the Client’s
        Account balance at all times. This responsibility begins once the
        Client’s first deposit is recorded and continues until a full withdrawal
        is processed.
      </p>

      <h2 className="text-xl font-semibold mb-2">
        2. Deposit and Withdrawal Methods
      </h2>
      <p className="mb-4">
        Only the payment methods listed on the official CoinRise website are
        considered valid. CoinRise is not responsible for delays or
        cancellations by third-party providers. Clients must contact them
        directly and notify CoinRise of any issues.
      </p>

      <h2 className="text-xl font-semibold mb-2">
        3. Third-Party Payment Providers
      </h2>
      <p className="mb-4">
        CoinRise is only responsible for funds once they reach an approved
        company account. We are not liable for third-party or intermediary
        issues. In cases of fraud, transactions may be canceled and accounts
        suspended.
      </p>

      <h2 className="text-xl font-semibold mb-2">4. Technical Issues</h2>
      <p className="mb-4">
        Technical issues during a transaction may result in cancellation and
        account restriction.
      </p>

      <h2 className="text-xl font-semibold mb-2">5. Payment System Failures</h2>
      <p className="mb-4">
        CoinRise is not responsible for failures related to your bank or payment
        system. You are responsible for all payment-related charges, including
        foreign exchange fees.
      </p>

      <h2 className="text-xl font-semibold mb-2">6. Client Identification</h2>
      <p className="mb-4">
        Clients must complete identity verification within ten (10) business
        days. In some cases, this may extend to thirty (30) days.
      </p>

      <h2 className="text-xl font-semibold mb-2">7. Deposits Process</h2>
      <p className="mb-4">
        Deposits must be initiated from the Client’s dashboard using available
        payment options. All required details must be entered before proceeding.
      </p>

      <h2 className="text-xl font-semibold mb-2">8. Processing Time</h2>
      <p className="mb-4">
        Processing times vary by method. Electronic payments may take seconds to
        days, while bank wires may take up to 45 business days.
      </p>

      <h2 className="text-xl font-semibold mb-2">9. Tax Compliance</h2>
      <p className="mb-4">
        CoinRise does not act as a tax agent and will not disclose client data
        unless required by law.
      </p>

      <h2 className="text-xl font-semibold mb-2">10. Acceptance of Terms</h2>
      <p className="mb-4">
        By using our services, you accept these terms and acknowledge that
        CoinRise processes all payments in accordance with this policy.
      </p>
    </div>
  );
};

export default PaymentPolicy;
