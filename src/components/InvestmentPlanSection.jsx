import { Check, X } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const plans = [
  {
    title: "BASIC",
    price: "$1,100.00",
    features: [
      { label: "$1,100.00 - $9,999.00", included: true },
      { label: "65% 24hours", included: true },
      { label: "24/7 Support", included: true },
      { label: "Daily Status Report", included: false },
      { label: "5% commission", included: false },
      { label: "Capital Insurance: 1%", included: false },
    ],
    buttonColor: "bg-gradient-to-r from-[#00befe] to-[#a700ff]",
  },
  {
    title: "STANDARD",
    price: "$2,100.00",
    features: [
      { label: "$2,100.00 - $99,999.00", included: true },
      { label: "160% 24hours", included: true },
      { label: "24/7 Support", included: true },
      { label: "Daily Status Report", included: true },
      { label: "10% commission", included: true },
      { label: "Capital Insurance: 70%", included: true },
    ],
    buttonColor: "bg-gradient-to-r from-[#00befe] to-[#a700ff]",
  },
  {
    title: "PLATINUM",
    price: "$3,100.00",
    features: [
      { label: "$3,100.00 - $499,999.00", included: true },
      { label: "245% 24hours", included: true },
      { label: "24/7 Support", included: true },
      { label: "Daily Status Report", included: true },
      { label: "12% commission", included: true },
      { label: "Capital Insurance: 80%", included: true },
    ],
    buttonColor: "bg-gradient-to-r from-[#00befe] to-[#a700ff]",
  },
  {
    title: "DIAMOND",
    price: "$5,000.00",
    features: [
      { label: "$5,000.00 - $99,999,999.00", included: true },
      { label: "300% 24hours", included: true },
      { label: "24/7 Support", included: true },
      { label: "Daily Status Report", included: true },
      { label: "15% commission", included: true },
      { label: "Capital Insurance: 95%", included: true },
    ],
    buttonColor: "bg-gradient-to-r from-[#00befe] to-[#a700ff]",
  },
];

const TradingPlans = ({ heading }) => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <section className="py-10 px-4 font-[Montserrat] bg-black text-white">
      <h2 className="text-3xl font-bold text-center mb-10">{heading}</h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            data-aos="fade-up"
            data-aos-delay={idx * 100}
            data-aos-duration="800"
            className="shadow-lg rounded-xl p-6 border border-gray-700 bg-[#111]"
          >
            <h3 className="text-center text-sm font-semibold uppercase mb-2">
              {plan.title}
            </h3>
            <p className="text-3xl text-center font-bold mb-4">{plan.price}</p>
            <ul className="space-y-2 mb-4">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center space-x-2">
                  {feature.included ? (
                    <Check className="text-green-500 w-5 h-5" />
                  ) : (
                    <X className="text-gray-500 w-5 h-5" />
                  )}
                  <span
                    className={`${
                      feature.included ? "text-white" : "text-gray-400"
                    } text-sm`}
                  >
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2 rounded-full font-semibold text-white ${plan.buttonColor}`}
            >
              JOIN
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TradingPlans;
