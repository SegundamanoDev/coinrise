import React, { useEffect } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import {
  Users,
  Wallet,
  Clock,
  Headphones,
  Briefcase,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const stats = [
  {
    label: "TOTAL ASSETS UNDER MANAGEMENT",
    value: 83.4,
    suffix: "M+",
    prefix: "$",
    icon: <Briefcase />,
    decimals: 1,
    color: "text-blue-400",
  },
  {
    label: "YEARS OF MARKET EXPERIENCE",
    value: 8,
    suffix: "+",
    icon: <Clock />,
    color: "text-green-400",
  },
  {
    label: "GLOBAL INVESTORS",
    value: 1258943,
    icon: <Users />,
    color: "text-purple-400",
  },
  {
    label: "MONTHLY WITHDRAWALS",
    value: 4376920,
    prefix: "$",
    icon: <Wallet />,
    color: "text-red-400",
  },
  {
    label: "DEDICATED SUPPORT",
    value: 24,
    suffix: "/7",
    icon: <Headphones />,
    color: "text-yellow-400",
  },
];

const StatsCountersSection = () => {
  useEffect(() => {
    AOS.init({ once: true, offset: 100, duration: 1000 });
  }, []);

  return (
    <section className="bg-gray-950 py-20 px-4 font-montserrat relative overflow-hidden">
      {/* Background Gradients/Shapes for visual interest */}
      <div
        className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
        style={{ animationDelay: "-2s" }}
      ></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
        style={{ animationDelay: "-4s" }}
      ></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 relative z-10
                     before:content-[''] before:absolute before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-36 before:h-1.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Our Performance in Numbers
        </h2>
        <p
          className="max-w-3xl mx-auto mb-16 text-gray-300 text-lg md:text-xl"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          Discover the scale and success of our operations, reflecting our
          commitment to growth and client satisfaction.
        </p>

        {/* Adjusted grid to provide more space per card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {stats.map((stat, i) => {
            const { ref, inView } = useInView({
              triggerOnce: true,
              threshold: 0.5,
            });

            return (
              <div
                key={i}
                ref={ref}
                className="bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center
                           transform hover:scale-105 hover:shadow-2xl transition-all duration-300
                           group border border-gray-800 hover:border-blue-500"
                data-aos="fade-up"
                data-aos-delay={i * 150}
                data-aos-duration="1000"
              >
                {/* Icon with circular background */}
                <div className="mb-4 bg-gray-800 p-4 rounded-full inline-flex justify-center items-center shadow-inner">
                  {React.cloneElement(stat.icon, {
                    className: `${stat.color} w-10 h-10 group-hover:text-blue-300 transition-colors duration-300`,
                  })}
                </div>

                {/* Adjusted font size for numbers and added `text-nowrap` for single line */}
                <h2 className="text-3xl sm:text-4xl font-extrabold text-yellow-400 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                  {inView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      prefix={stat.prefix || ""}
                      suffix={stat.suffix || ""}
                      decimals={stat.decimals || 0}
                    />
                  ) : (
                    `${stat.prefix || ""}${stat.decimals > 0 ? "0.0" : "0"}${
                      stat.suffix || ""
                    }`
                  )}
                </h2>
                {/* Adjusted text properties for labels to ensure they wrap well */}
                <p className="text-sm sm:text-base font-semibold mt-2 text-gray-300 uppercase leading-tight">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsCountersSection;
