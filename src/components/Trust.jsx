import React from "react";
import {
  ShieldCheck,
  Lock,
  BadgeCheck,
  Globe,
  Banknote,
  UserCheck,
  Star, // Added Star for a potential 'Trusted' badge if needed
} from "lucide-react";

const trustItems = [
  {
    icon: <ShieldCheck />,
    label: "KYC Verified Platform",
    description:
      "Ensure secure transactions and compliance with identity verification protocols.",
  },
  {
    icon: <Lock />,
    label: "256-bit SSL Encryption",
    description:
      "Your data and communications are protected with industry-leading encryption standards.",
  },
  {
    icon: <BadgeCheck />,
    label: "Transparent Leadership", // More professional wording
    description:
      "Operated by a fully doxxed team, committed to honesty and accountability.",
  },
  {
    icon: <Globe />,
    label: "Global Accessibility", // More impactful wording
    description:
      "Access our services from virtually anywhere in the world, with seamless integration.",
  },
  {
    icon: <Banknote />,
    label: "Verifiable Payout Records",
    description:
      "All transactions and payout histories are transparent and auditable for your peace of mind.",
  },
  {
    icon: <UserCheck />,
    label: "Authentic User Testimonials",
    description:
      "Real feedback from satisfied users, validating our commitment to excellence.",
  },
];

const TrustSection = () => {
  return (
    <section className="bg-gray-950 py-16 px-4 font-montserrat">
      <div className="max-w-7xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-12 relative z-10
                     before:content-[''] before:absolute before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-1 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Your Trust, Our Foundation
        </h2>
        <p
          className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-16"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          We prioritize security, transparency, and user confidence. Here's how
          we build and maintain your trust every day.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-800
                         transform hover:scale-105 hover:border-blue-500 transition-all duration-300 group"
              data-aos="fade-up"
              data-aos-delay={index * 150} // Staggered animation for a nicer effect
              data-aos-duration="800"
            >
              <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300 mb-4">
                {/* Dynamically adjust icon size */}
                {React.cloneElement(item.icon, { className: "w-12 h-12" })}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {item.label}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed text-center">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
