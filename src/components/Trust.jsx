import React from "react";
import {
  ShieldCheck,
  Lock,
  BadgeCheck,
  Globe,
  Banknote,
  UserCheck,
} from "lucide-react";

const trustItems = [
  {
    icon: <ShieldCheck className="text-yellow-400 w-6 h-6" />,
    label: "KYC Verified Platform",
  },
  {
    icon: <Lock className="text-yellow-400 w-6 h-6" />,
    label: "256-bit SSL Encryption",
  },
  {
    icon: <BadgeCheck className="text-yellow-400 w-6 h-6" />,
    label: "Doxxed Team & Company",
  },
  {
    icon: <Globe className="text-yellow-400 w-6 h-6" />,
    label: "Global Coverage",
  },
  {
    icon: <Banknote className="text-yellow-400 w-6 h-6" />,
    label: "Transparent Payout Records",
  },
  {
    icon: <UserCheck className="text-yellow-400 w-6 h-6" />,
    label: "User Verified Testimonials",
  },
];

const TrustSection = () => {
  return (
    <section className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-2xl md:text-3xl font-bold text-white mb-6"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Trusted By Thousands Worldwide
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-gray-800 rounded-lg py-3 px-4 shadow-sm hover:shadow-md transition"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-duration="800"
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 text-center" data-aos="zoom-in" data-aos-delay="600">
        <a
          href="/Coinrise_Security_Audit_Report.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-400 text-sm hover:underline"
        >
          View our latest audit report
        </a>
      </div>
    </section>
  );
};

export default TrustSection;
