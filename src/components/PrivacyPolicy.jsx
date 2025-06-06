import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-950 text-gray-200 p-6 rounded-xl shadow-lg max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-blue-400 text-center">
        Trustvest Privacy Policy
      </h1>

      <p className="mb-6 leading-relaxed">
        At <strong>Trustvest</strong>, safeguarding the privacy and security of
        your personal information is our utmost priority. This Privacy Policy
        details how we collect, utilize, disclose, and protect your data when
        you use our services, ensuring transparency and trust.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        1. Account Security and Login Credentials
      </h2>
      <p className="mb-6 leading-relaxed">
        Clients are solely responsible for maintaining the confidentiality and
        security of their login credentials. Trustvest cannot be held liable for
        any unauthorized access, use, or activity on your account resulting from
        shared, compromised, or insecure login data. We strongly advise using
        unique, strong passwords and enabling Two-Factor Authentication (2FA)
        for enhanced security.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        2. Marketing and Communication Preferences
      </h2>
      <p className="mb-6 leading-relaxed">
        Clients may receive promotional emails, newsletters, and service-related
        communications from Trustvest. You have the option to opt-out of
        marketing communications at any time during the sign-up process, via a
        direct unsubscribe link in emails, or through your account settings.
        Requests to unsubscribe from marketing communications will be processed
        within seven (7) business days.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        3. Identity Verification (KYC) and Data Accuracy
      </h2>
      <p className="mb-6 leading-relaxed">
        To comply with regulatory requirements and ensure the integrity of our
        platform, clients are required to provide accurate and verifiable
        identification details (Know Your Customer - KYC). Failure to submit the
        necessary documents or provide accurate information may result in
        temporary account restrictions, suspension of services, or permanent
        account closure. Clients are also responsible for keeping their personal
        details accurate and updated within thirty (30) days of any change.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        4. Information We Collect
      </h2>
      <p className="mb-6 leading-relaxed">
        We collect various types of personal information to provide and improve
        our services, including but not limited to:
      </p>
      <ul className="list-disc list-inside ml-4 mb-6 space-y-2">
        <li>
          <strong>Registration Data:</strong> Your email address, encrypted
          password, full name, and residential address.
        </li>
        <li>
          <strong>Identification Data:</strong> Copies of government-issued IDs,
          proof of address, and other KYC documents as required.
        </li>
        <li>
          <strong>Transaction Data:</strong> Details of your deposits,
          withdrawals, investment activities, and trading history.
        </li>
        <li>
          <strong>Device and Usage Data:</strong> IP address, device type,
          operating system, browser type, access times, and pages visited on our
          platform.
        </li>
      </ul>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        5. Disclosure to Legal Authorities
      </h2>
      <p className="mb-6 leading-relaxed">
        Trustvest may disclose your personal information to legal, regulatory,
        or governmental authorities if we are legally obligated to do so by
        applicable laws, regulations, subpoenas, court orders, or other valid
        legal processes. We will always strive to protect your privacy within
        the bounds of the law.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        6. Use of Non-Confidential Information in Marketing
      </h2>
      <p className="mb-6 leading-relaxed">
        Trustvest may, at its discretion, use aggregated or anonymized data, or
        other non-confidential information provided by clients (e.g.,
        testimonials explicitly given for marketing purposes), in our
        advertising, promotional material, or public reports. This information
        will never personally identify you unless explicit written consent is
        obtained beforehand.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        7. Corporate Account Representation
      </h2>
      <p className="mb-6 leading-relaxed">
        Any individual who registers an account on behalf of a business entity
        or legal organization implicitly warrants that they possess the full and
        necessary authority to act for and bind that entity to all terms and
        policies of Trustvest.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        8. Data Confidentiality and Sharing
      </h2>
      <p className="mb-6 leading-relaxed">
        We maintain strict confidentiality over your personal data. Your
        information is shared only under specific circumstances, including when
        legally required, with your explicit written consent, or with trusted
        third-party service providers who are contractually bound to protect
        your data and process it only for the purposes for which they were
        engaged.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        9. Information Use in Disputes
      </h2>
      <p className="mb-6 leading-relaxed">
        In the event of a dispute, claim, or legal proceeding involving
        Trustvest, relevant portions of your account and transaction information
        may be accessed and utilized as necessary to defend our rights, protect
        our interests, and resolve the matter in accordance with applicable
        laws.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        10. Data Review and Verification
      </h2>
      <p className="mb-6 leading-relaxed">
        Trustvest reserves the right to review and verify any data provided by
        clients. While we implement measures to ensure data integrity, we are
        not perpetually obligated to verify the accuracy of all user-submitted
        information or to act upon it, unless required by law or our internal
        compliance protocols.
      </p>

      {/* --- */}
      <h2 className="text-xl font-semibold mb-3 text-blue-300">
        11. Data Protection Measures
      </h2>
      <p className="mb-6 leading-relaxed">
        We implement and routinely update a comprehensive suite of stringent
        technical and organizational security practices to protect your personal
        information from unauthorized access, alteration, disclosure, or
        destruction. These measures include encryption, access controls, secure
        network configurations, and regular security audits.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
