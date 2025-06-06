import React from "react";

const PaymentPolicy = () => {
  return (
    <div className="bg-gray-950 text-gray-200 p-6 rounded-xl shadow-lg max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-blue-400 text-center">
        Trustvest Payment Policy
      </h1>

      <p className="mb-6 leading-relaxed">
        This Payment Policy clearly outlines the responsibilities of{" "}
        <strong>Trustvest</strong> ("the Company") and its valued clients
        concerning all deposits, withdrawals, and financial transactions
        conducted on the Trustvest platform.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        1. Account Balance Responsibility
      </h2>
      <p className="mb-6 leading-relaxed">
        Trustvest is fully responsible for maintaining accurate and real-time
        records of the Client’s account balance. This responsibility commences
        the moment the Client’s first deposit is successfully recorded and
        continues without interruption until a full and final withdrawal is
        processed.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        2. Authorized Deposit and Withdrawal Methods
      </h2>
      <p className="mb-6 leading-relaxed">
        Only the payment methods explicitly listed and approved on the official
        Trustvest website are considered valid for transactions. Trustvest
        cannot be held responsible for any delays, cancellations, or issues
        caused by third-party payment providers. Clients must directly contact
        these third-party providers to resolve such issues and promptly notify
        Trustvest of any significant concerns.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        3. Third-Party Payment Provider Liabilities
      </h2>
      <p className="mb-6 leading-relaxed">
        Trustvest's responsibility for funds begins exclusively once they have
        been confirmed as received in an approved company account. We are not
        liable for any issues, discrepancies, or delays that occur with
        third-party or intermediary payment systems. In cases where fraud or
        suspicious activity is detected, transactions may be canceled, and the
        associated accounts may be temporarily or permanently suspended.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        4. Technical Issues During Transactions
      </h2>
      <p className="mb-6 leading-relaxed">
        Should technical issues arise during any transaction process, this may
        result in the cancellation of the transaction and temporary account
        restrictions while the issue is investigated and resolved.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        5. Client's Payment System Responsibilities
      </h2>
      <p className="mb-6 leading-relaxed">
        Trustvest is not responsible for any failures or issues directly related
        to your personal bank or chosen payment system. You, the Client, are
        solely responsible for all payment-related charges, including but not
        limited to, foreign exchange fees, network fees, and transaction charges
        imposed by your financial institution or payment service.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        6. Client Identification (KYC)
      </h2>
      <p className="mb-6 leading-relaxed">
        Clients are required to complete identity verification (Know Your
        Customer - KYC) procedures within ten (10) business days of account
        registration or as otherwise prompted. In specific circumstances, this
        period may be extended up to thirty (30) days as deemed necessary by
        Trustvest for compliance purposes.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        7. Deposit Process Guidelines
      </h2>
      <p className="mb-6 leading-relaxed">
        All deposits must be initiated exclusively from the Client’s personal
        dashboard using the available and approved payment options. It is
        mandatory that all required transaction details are accurately entered
        before proceeding with any deposit request.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        8. Transaction Processing Times
      </h2>
      <p className="mb-6 leading-relaxed">
        Transaction processing times vary significantly depending on the chosen
        payment method and network conditions. Electronic payments may take
        anywhere from a few seconds to several business days for full
        confirmation, while international bank wire transfers can take up to 45
        business days to complete.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        9. Tax Compliance Responsibility
      </h2>
      <p className="mb-6 leading-relaxed">
        Trustvest operates as a financial service provider and does not act as a
        tax agent or advisor. We will not disclose client financial data to tax
        authorities unless explicitly required to do so by applicable law or a
        court order. Clients are solely responsible for their tax obligations
        related to their activities on the Trustvest platform.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        10. Acceptance of Payment Terms
      </h2>
      <p className="mb-6 leading-relaxed">
        By utilizing any of Trustvest's services, you unequivocally accept and
        agree to all the terms outlined in this Payment Policy. You further
        acknowledge that Trustvest processes all payments and transactions in
        strict accordance with these established guidelines.
      </p>
    </div>
  );
};

export default PaymentPolicy;
