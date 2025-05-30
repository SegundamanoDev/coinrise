import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Headset, // Replaced faHeadset
  Shield, // Replaced faLock / faShieldAlt
  CreditCard, // Replaced faMoneyBillWave for withdrawals
  PiggyBank, // Replaced faPiggyBank
  Globe, // Keeping Globe for global reach/regulation feel
  Users, // Replaced faUserFriends
  BookOpen, // Replaced faBook
  LineChart, // Replaced faChartLine
  Award, // Replaced faTrophy
  Zap, // New icon for 'Instant'
  Gem, // New icon for 'Lucrative Returns'
} from "lucide-react";

// Reimagined features with Lucide icons and updated descriptions
const features = [
  {
    icon: <Headset />,
    title: "24/7 Expert Support",
    description:
      "Our dedicated team is available around the clock to ensure a smooth and responsive experience for all your needs.",
  },
  {
    icon: <Shield />, // Consolidated Lock and ShieldAlt into one strong icon
    title: "Advanced Security & Compliance",
    description:
      "Your funds and data are protected by industry-leading 256-bit encryption and robust security protocols. We prioritize your safety.",
  },
  {
    icon: <Zap />, // Changed to Zap for 'instant' feel
    title: "Instant & Flexible Withdrawals",
    description:
      "Access your earnings whenever you need them. Enjoy swift and secure withdrawals with a variety of convenient payment methods.",
  },
  {
    icon: <Gem />, // Changed to Gem for 'lucrative' feel
    title: "Lucrative & Consistent Returns",
    description:
      "Benefit from strategically managed investments designed to deliver impressive and consistent returns, helping your wealth grow.",
  },
  {
    icon: <Award />, // Changed to Award for 'regulated' feel, aligns with a badge/award
    title: "Globally Regulated & Insured", // More formal, less direct claim
    description:
      "Operating under robust global regulatory frameworks, we offer an insured investment environment for your peace of mind.",
  },
  {
    icon: <Users />,
    title: "Rewarding Referral Program",
    description:
      "Expand your network and earn. Our generous referral program allows you to benefit by inviting others to join our community.",
  },
  {
    icon: <BookOpen />,
    title: "Comprehensive Educational Resources",
    description:
      "Empower your trading journey with extensive tutorials, mentorship programs, and advanced strategies from our expert guides.",
  },
  {
    icon: <LineChart />,
    title: "Exclusive Trading Advantages",
    description:
      "Unlock special benefits like cashback and other unique advantages designed to enhance your trading comfort and profitability.",
  },
];

const WhychooseUsSection = () => {
  useEffect(() => {
    AOS.init({ once: true, offset: 50, duration: 800 });
  }, []);

  return (
    <section className="bg-gray-950 py-20 px-4 font-montserrat relative overflow-hidden">
      {/* Background Gradients/Shapes - add more visual interest */}
      <div
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"
        style={{ animationDelay: "-1s" }}
      ></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"
        style={{ animationDelay: "-3s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
        style={{ animationDelay: "-5s" }}
      ></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 relative z-10
                     before:content-[''] before:absolute before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-36 before:h-1.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Why TrustVest?
        </h2>
        <p
          className="max-w-3xl mx-auto mb-16 text-gray-300 text-lg md:text-xl"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          With extensive expertise in crypto, Forex, and the stock market, we
          consistently deliver exceptional value to our clients. Discover what
          sets us apart from the rest.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 120} // Slightly adjusted delay
              data-aos-duration="800"
              className="p-8 bg-gray-900 rounded-2xl shadow-xl flex flex-col items-center text-center
                         transform hover:scale-105 hover:shadow-2xl transition-all duration-300
                         group border border-gray-800 hover:border-blue-500" // Added border/hover
            >
              <div className="mb-6 bg-gray-800 p-4 rounded-full inline-flex justify-center items-center shadow-inner">
                {/* Dynamically clone icon to apply consistent styling */}
                {React.cloneElement(feature.icon, {
                  className:
                    "text-blue-400 w-10 h-10 group-hover:text-blue-300 transition-colors duration-300",
                })}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3 leading-tight">
                {feature.title}
              </h3>
              <p className="text-base text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-16 text-lg sm:text-xl md:text-2xl font-bold text-gray-200 flex items-center justify-center gap-3 bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800"
          data-aos="fade-up"
          data-aos-delay={features.length * 120 + 200}
          data-aos-duration="1000"
        >
          <Award className="text-purple-400 w-8 h-8 flex-shrink-0" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Recognized as a Leading Platform since 2017
          </span>
        </div>
      </div>
    </section>
  );
};

export default WhychooseUsSection;
