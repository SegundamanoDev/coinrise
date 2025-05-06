import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="mb-4 text-sm italic">
        Effective Date: Upon account registration and funding.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Language and Legal Precedence
      </h2>
      <p className="mb-4">
        The CoinRise website (www.coinrise.com) is presented in English. The
        English version is the original and legally binding version. CoinRise is
        not liable for any errors or misinterpretations arising from
        translations.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. Access and Agreement
      </h2>
      <p className="mb-4">
        By accessing the CoinRise platform or services, any individual or
        corporate entity (hereinafter referred to as the "Investor" or "Client")
        agrees to these Terms and Conditions. The Agreement takes effect when
        the Client opens an investment account and funds it with the required
        minimum deposit.
      </p>
      <p className="mb-4">
        All references to individuals in this Agreement apply equally to
        corporations, partnerships, and unincorporated associations. Headings
        are provided for reference and do not affect the interpretation of the
        Agreement.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. Client Responsibilities and Restrictions
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Conduct Violations:</strong> Any Client action that disrupts
          CoinRise’s systems, services, or performance may result in immediate
          termination of services, cancellation of active orders, and full
          refund of any remaining balance. CoinRise will notify the Client of
          such action and may reject future registrations.
        </li>
        <li>
          <strong>Age Restriction:</strong> Individuals under the age of 18 are
          prohibited from using CoinRise’s financial services.
        </li>
        <li>
          <strong>Information Accuracy:</strong> Clients must ensure their
          provided information is true and up to date and are responsible for
          updates. The provided email must be solely used by the Client.
        </li>
        <li>
          <strong>Verification Requirements:</strong> CoinRise may request ID
          and proof of residence. Failure to comply may result in service
          termination and account closure with a refund of remaining funds.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Duplicate Accounts</h2>
      <p className="mb-4">
        In case of multiple registrations by the same Client, CoinRise reserves
        the right to cancel duplicates, freeze accounts, cancel trades, and
        conduct an investigation.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. General Provisions</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Notices & Communication:</strong> All communication from the
          registered email is treated as valid. Clients must maintain secure
          access.
        </li>
        <li>
          <strong>Right to Refuse Service:</strong> CoinRise may refuse service
          to any Client violating terms or posing platform risks.
        </li>
      </ul>
    </div>
  );
};

export default TermsAndConditions;
