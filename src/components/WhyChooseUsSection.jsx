import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadset,
  faLock,
  faMoneyBillWave,
  faPiggyBank,
  faShieldAlt,
  faUserFriends,
  faBook,
  faChartLine,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    icon: (
      <FontAwesomeIcon icon={faHeadset} className="text-3xl text-[#ffffff]" />
    ),
    title: "24/7 SUPPORT",
    description:
      "We provide an unbeatable 24/7 customer support service to ensure your experience is smooth.",
  },
  {
    icon: <FontAwesomeIcon icon={faLock} className="text-3xl text-[#ffffff]" />,
    title: "STRONG SECURITY",
    description:
      "We implemented extra security to make sure your funds and data are not lost or stolen by hackers.",
  },
  {
    icon: (
      <FontAwesomeIcon
        icon={faMoneyBillWave}
        className="text-3xl text-[#ffffff]"
      />
    ),
    title: "INSTANT WITHDRAW",
    description:
      "Your funds are solely yours, you can withdraw at any time using a wide range of payment methods.",
  },
  {
    icon: (
      <FontAwesomeIcon icon={faPiggyBank} className="text-3xl text-[#ffffff]" />
    ),
    title: "LUCRATIVE RETURNS",
    description:
      "We trade strategically and you share the returns. Your investments will always yield returns.",
  },
  {
    icon: (
      <FontAwesomeIcon icon={faShieldAlt} className="text-3xl text-[#ffffff]" />
    ),
    title: "REGULATED & INSURED",
    description:
      "Our company is fully regulated by the United Kingdom government, FCA, and CySec.",
  },
  {
    icon: (
      <FontAwesomeIcon
        icon={faUserFriends}
        className="text-3xl text-[#ffffff]"
      />
    ),
    title: "REFERRAL PROGRAM",
    description:
      "Our rich referral commission system encourages the work of promoters, you can be part of the company.",
  },
  {
    icon: <FontAwesomeIcon icon={faBook} className="text-3xl text-[#ffffff]" />,
    title: "COMPREHENSIVE EDUCATION",
    description:
      "Our support section contains tutorials, mentorship, guides and various trading strategies.",
  },
  {
    icon: (
      <FontAwesomeIcon icon={faChartLine} className="text-3xl text-[#ffffff]" />
    ),
    title: "TRADING ADVANTAGES",
    description:
      "We provide cashback and other advantages for a more comfortable experience with sustainable earnings.",
  },
];

const WhychooseUsSection = () => {
  return (
    <section className=" py-20 px-6 text-center">
      {" "}
      <h2 className="text-3xl font-bold mb-4 text-[#ffffff]">WHY US</h2>{" "}
      <p className="max-w-2xl mx-auto mb-8">
        {" "}
        We have extensive experience in the field of cryptocurrencies, forex
        trading and the stock market. Our knowledge helps us earn money for our
        clients. Here are our main features, what distinguishes us from our
        competitors.{" "}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 border border-divider rounded-xl shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="mb-3 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-[#ffffff]">
              {feature.title}
            </h3>
            <p className="text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 font-bold text-lg">
        <FontAwesomeIcon icon={faTrophy} className="mr-2" />
        BEST CRYPTO MINING ECN BROKER 2017
      </div>
    </section>
  );
};

export default WhychooseUsSection;
