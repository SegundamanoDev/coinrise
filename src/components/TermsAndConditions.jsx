import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-950 text-gray-200 p-6 rounded-xl shadow-lg max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-blue-400 text-center">
        Trustvest Terms & Conditions
      </h1>
      <p className="mb-6 text-sm italic text-gray-400 text-center">
        Effective Date: Upon account registration and funding.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        1. Language and Legal Precedence
      </h2>
      <p className="mb-6 leading-relaxed">
        The **Trustvest** website is primarily presented in English. The English
        version of these Terms & Conditions is the original, legally binding,
        and authoritative version. Trustvest is not liable for any errors,
        discrepancies, or misinterpretations that may arise from translations
        into other languages.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        2. Access to Services and Agreement
      </h2>
      <p className="mb-4 leading-relaxed">
        By accessing or utilizing the **Trustvest** platform and its services,
        any individual or corporate entity (hereinafter referred to as the
        "Client" or "Investor") explicitly agrees to abide by these
        comprehensive Terms and Conditions. This Agreement comes into full
        effect at the moment the Client successfully opens an investment account
        and funds it with the stipulated minimum deposit.
      </p>
      <p className="mb-6 leading-relaxed">
        All references to "individuals" within this Agreement apply equally to
        corporations, partnerships, and unincorporated associations, recognizing
        the diverse nature of our clientele. Headings and subheadings are
        provided for convenience and reference purposes only and shall not
        influence or affect the interpretation or construction of this
        Agreement.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        3. Client Responsibilities and Prohibited Conduct
      </h2>
      <ul className="list-disc list-inside ml-4 mb-6 space-y-2">
        <li>
          <strong>Prohibited Conduct:</strong> Any action by a Client that
          disrupts, interferes with, or compromises the integrity, stability, or
          performance of Trustvest’s systems, services, or operations may lead
          to severe consequences. This includes, but is not limited to, abusive
          behavior, unauthorized access attempts, or malicious activities. Such
          violations may result in the immediate termination of services,
          cancellation of any active investment orders, and a full refund of any
          remaining eligible balance. Trustvest reserves the right to notify the
          Client of such actions and may permanently reject future
          registrations.
        </li>
        <li>
          <strong>Age Restriction:</strong> Individuals who are under the age of
          eighteen (18) years are strictly prohibited from using Trustvest’s
          financial services or opening an account. By agreeing to these terms,
          you confirm you are of legal age.
        </li>
        <li>
          <strong>Information Accuracy:</strong> Clients are solely responsible
          for ensuring that all personal and financial information provided to
          Trustvest is consistently true, accurate, and up-to-date. It is the
          Client's ongoing responsibility to promptly update any changes to
          their details. Furthermore, the registered email address must be used
          exclusively by the Client for all official communications.
        </li>
        <li>
          <strong>Identity Verification Requirements:</strong> Trustvest may, at
          its sole discretion, request identity verification documents (e.g.,
          government-issued ID, proof of residence) from Clients to comply with
          AML/KYC regulations. Failure to comply with such verification requests
          within the stipulated timeframe may result in the suspension or
          termination of services and account closure, with any remaining
          eligible funds being returned.
        </li>
      </ul>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        4. Prohibition of Duplicate Accounts
      </h2>
      <p className="mb-6 leading-relaxed">
        In instances where multiple accounts are registered by the same Client,
        **Trustvest** reserves the absolute right to identify and cancel any
        duplicate registrations. This may include freezing all associated
        accounts, canceling any outstanding or active trades, and initiating a
        comprehensive investigation into the Client's activities.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        5. General Provisions
      </h2>
      <ul className="list-disc list-inside ml-4 mb-6 space-y-2">
        <li>
          <strong>Notices & Communication:</strong> All electronic
          communications originating from the Client's registered email address
          will be treated as legitimate and valid instructions from the Client.
          Clients are responsible for maintaining secure and exclusive access to
          their registered email.
        </li>
        <li>
          <strong>Right to Refuse or Terminate Service:</strong> Trustvest
          reserves the right, at its sole discretion, to refuse service to any
          Client or to terminate the Agreement with a Client who violates these
          Terms, poses a security risk to the platform, or engages in activities
          deemed detrimental to Trustvest's operations or reputation.
        </li>
      </ul>
    </div>
  );
};

export default TermsAndConditions;
