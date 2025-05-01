import React, { useEffect, useState } from "react";
import { Users, Wallet, Clock, Headphones } from "lucide-react";

const stats = [
  {
    label: "Active Investors",
    value: 1000,
    suffix: "+",
    icon: <Users size={40} className="text-yellow-500" />,
  },
  {
    label: "Paid Out",
    value: 20000000,
    prefix: "$",
    suffix: "+",
    icon: <Wallet size={40} className="text-green-600" />,
  },
  {
    label: "Years Experience",
    value: 4,
    icon: <Clock size={40} className="text-blue-500" />,
  },
  {
    label: "Support Availability",
    value: 24,
    suffix: "/7",
    icon: <Headphones size={40} className="text-red-500" />,
  },
];

const formatNumber = (num) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num;
};

const StatisticsCountersSection = () => {
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 1000;
    const interval = 10;
    const steps = duration / interval;

    const newValues = [...animatedValues];

    const intervals = stats.map((stat, i) =>
      setInterval(() => {
        newValues[i] += stat.value / steps;
        if (newValues[i] >= stat.value) {
          newValues[i] = stat.value;
          clearInterval(intervals[i]);
        }
        setAnimatedValues([...newValues]);
      }, interval)
    );

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section className="bg-gray-900 text-gray-300 py-16 px-6" id="statistics">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Platform Stats</h2>
        <p className=" mb-10">What makes us stand out in crypto mining</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-duration="1200"
              className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center justify-center hover:shadow-lg transition"
            >
              <div className="mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-800">
                {stat.prefix || ""}
                {formatNumber(Math.floor(animatedValues[i]))}
                {stat.suffix || ""}
              </div>
              <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsCountersSection;
