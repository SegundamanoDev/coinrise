import React, { useEffect, useState } from "react";
import { Users, Wallet, Clock, Headphones, Briefcase } from "lucide-react";

const stats = [
  {
    label: "TOTAL ASSETS",
    value: "$84M+",
    icon: <Briefcase size={40} className="text-green-500" />,
  },

  {
    label: "YEARS OF EXPERIENCE",
    value: "16+",
    icon: <Clock size={40} className="text-green-500" />,
  },
  {
    label: "REGISTERED INVESTORS",
    value: "3,672,334+",
    icon: <Users size={40} className="text-green-500" />,
  },
  {
    label: "WITHDRAWN EACH MONTH",
    value: "$6,542,170+",
    icon: <Wallet size={40} className="text-green-500" />,
  },
  {
    label: "SUPPORT AVAILABILITY",
    value: "24/7",
    icon: <Headphones size={40} className="text-green-500" />,
  },
];

const StatisticsCountersSection = () => {
  return (
    <section className="bg-black text-gray-200 py-16 px-6 text-center">
      <div className="">
        <h2 className="text-4xl font-bold mb-4 text-white">Platform Stats</h2>
        <p className=" mb-10">What makes us stand out in crypto mining</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-duration="1200"
              className=" p-6 rounded-2xl shadow-md flex flex-col items-center justify-center hover:shadow-lg transition"
            >
              <div className="mb-3">{stat.icon}</div>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
              <div className="text-md font-bold mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsCountersSection;
