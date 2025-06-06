import React from "react";

const AMLPolicy = () => {
  return (
    <div className="bg-gray-950 text-gray-200 p-6 rounded-xl shadow-lg max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-blue-400 text-center">
        Trustvest Anti-Money Laundering (AML) Policy
      </h1>
      <p className="mb-6 leading-relaxed">
        This Anti-Money Laundering (AML) policy outlines{" "}
        <strong>Trustvest's</strong> ("the Company") steadfast commitment to
        proactively detect, prevent, and report money laundering and any
        activities that facilitate terrorism financing or other illicit
        financial crimes. All Trustvest officers, employees, and affiliates are
        required to adhere strictly to this policy.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        1. Understanding Money Laundering & Terrorism Financing
      </h2>
      <p className="mb-4 leading-relaxed">
        Money laundering generally involves three distinct stages:
      </p>
      <ul className="list-disc list-inside ml-4 mb-6 space-y-2">
        <li>
          <strong>Placement</strong>: Illegally obtained funds are initially
          introduced into the legitimate financial system, often through
          deposits or purchases of monetary instruments.
        </li>
        <li>
          <strong>Layering</strong>: These funds are then rapidly moved through
          a series of complex transactions, multiple accounts, or various
          institutions to obscure their illicit origin.
        </li>
        <li>
          <strong>Integration</strong>: The "cleaned" funds are finally
          reintroduced into the economy, appearing legitimate, often used for
          purchasing assets or funding businesses.
        </li>
      </ul>
      <p className="mb-6 leading-relaxed">
        <strong>Terrorism Financing</strong>, unlike money laundering, may not
        always involve criminal proceeds. Instead, it focuses on disguising the
        true source or intended use of funds (which can be legitimate or
        illicit) to finance terrorist activities.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        2. Client Responsibility
      </h2>
      <p className="mb-6 leading-relaxed">
        Clients using Trustvest services are obligated to affirm and guarantee
        the legal origin, legitimate ownership, and full authorization for any
        funds or assets transferred to their Trustvest account.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        3. Definition of Money Laundering
      </h2>
      <p className="mb-6 leading-relaxed">
        For the purpose of this policy, <strong>money laundering</strong> is
        defined as any attempt to conceal or disguise the true origin of illicit
        proceeds to make them appear legitimate.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        4. Employee Responsibilities
      </h2>
      <p className="mb-6 leading-relaxed">
        All Trustvest employees whose roles involve our services are required to
        be thoroughly familiar with and strictly adhere to all AML regulations
        pertinent to their specific job duties.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        5. Comprehensive Compliance Program
      </h2>
      <p className="mb-6 leading-relaxed">
        Trustvest maintains a robust, company-wide AML and CFT
        (Counter-Terrorism Financing) program. This program is designed to
        ensure strict compliance with all applicable laws and regulations,
        coordinating requirements across all business units and legal entities
        to proactively minimize exposure to illicit financial risks.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        6. Training and Awareness
      </h2>
      <ul className="list-disc list-inside ml-4 mb-6 space-y-2">
        <li>
          All new Trustvest hires receive mandatory AML and CFT training as part
          of their onboarding process.
        </li>
        <li>
          Employees directly involved in AML or KYC operations are required to
          complete comprehensive annual training refreshers.
        </li>
        <li>
          Targeted training sessions are regularly conducted for personnel with
          specific responsibilities related to financial crime prevention.
        </li>
      </ul>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        7. Record Keeping
      </h2>
      <p className="mb-6 leading-relaxed">
        All identification documents and service records are securely retained
        by Trustvest for the minimum duration required by applicable local and
        international laws and regulations.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        8. Affiliate Compliance
      </h2>
      <p className="mb-6 leading-relaxed">
        All affiliates operating under the Trustvest brand are mandated to fully
        comply with this comprehensive AML and KYC policy.
      </p>
    </div>
  );
};

export default AMLPolicy;
