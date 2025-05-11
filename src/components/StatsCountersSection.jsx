import React, { useEffect } from "react";
import { Users, Wallet, Clock, Headphones, Briefcase } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const stats = [
  {
    label: "TOTAL ASSETS",
    value: "$83.4M",
    icon: <Briefcase size={40} className="text-white" />,
  },
  {
    label: "YEARS OF EXPERIENCE",
    value: "12+",
    icon: <Clock size={40} className="text-white" />,
  },
  {
    label: "REGISTERED INVESTORS",
    value: "1,258,943",
    icon: <Users size={40} className="text-white" />,
  },
  {
    label: "WITHDRAWN EACH MONTH",
    value: "$4,376,920",
    icon: <Wallet size={40} className="text-white" />,
  },
  {
    label: "SUPPORT AVAILABILITY",
    value: "24/7",
    icon: <Headphones size={40} className="text-white" />,
  },
];

const StatsCountersSection = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <section className="py-16 px-6 text-center bg-black text-white">
      <div>
        <h2
          className="text-4xl font-bold mb-4"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Platform Stats
        </h2>
        <p
          className="text-gray-300 mb-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          What makes us stand out in crypto mining
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#111111] p-6 rounded-2xl shadow-md flex flex-col items-center justify-center hover:shadow-lg transition"
              data-aos="fade-up"
              data-aos-delay={i * 150}
              data-aos-duration="1000"
            >
              <div className="mb-3">{stat.icon}</div>
              <h2 className="text-3xl font-bold">{stat.value}</h2>
              <p className="text-md font-semibold mt-2 text-gray-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCountersSection;
