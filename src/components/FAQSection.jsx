import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS CSS

const faqs = {
  General: [
    {
      question: "How long does it take to process my withdrawal?",
      answer:
        "Withdrawals are usually processed instantly, but can take up to 24 hours depending on network traffic and blockchain confirmations. We prioritize swift processing.",
    },
    {
      question: "Do I have to withdraw my funds only in Bitcoin?",
      answer:
        "No, we support multiple crypto withdrawal options to give you flexibility, including Bitcoin (BTC), Ethereum (ETH), USDT, and other popular cryptocurrencies.",
    },
    {
      question: "How can I withdraw funds from my account?",
      answer:
        "Simply navigate to your dashboard, select the 'Withdraw' option, enter the desired amount, choose your preferred cryptocurrency and wallet address, then confirm the transaction. It's designed to be straightforward.",
    },
    {
      question: "Are we a financial pyramid scheme?",
      answer:
        "Absolutely not. We are a legitimate and transparent crypto trading and mining company, officially registered and fully regulated under robust UK financial laws. Our returns are generated through genuine market activities, not by recruiting new investors.",
    },
    {
      question: "What is the minimum deposit amount?",
      answer:
        "The minimum deposit amount required to start investing with us is $950. This allows us to ensure meaningful participation in our trading strategies.",
    },
  ],
  Payment: [
    {
      question: "Can I register without making an immediate deposit?",
      answer:
        "Yes, certainly! You can register for a free account and explore the platform, familiarize yourself with our features, and even access educational resources before deciding to make a deposit.",
    },
    {
      question: "How can I deposit funds into my account?",
      answer:
        "After logging in, navigate to the 'Deposit' section. You'll be provided with a unique cryptocurrency wallet address. Simply transfer your desired crypto amount to this address, and your balance will be updated after network confirmations.",
    },
    {
      question: "Where can I find my investor ID/wallet address?",
      answer:
        "Your unique investor ID and designated deposit wallet addresses are securely located within your personalized dashboard, typically in the 'Profile' or 'Deposit' section for easy access.",
    },
    {
      question: "How long does it take to process my deposit?",
      answer:
        "Deposits are typically processed and credited to your account within 10–30 minutes. This timeframe can vary slightly depending on the specific blockchain network's confirmation times.",
    },
    {
      question: "Is there any charge for deposit or withdrawal?",
      answer:
        "We do not charge any fees for deposits. For withdrawals, standard blockchain network fees may apply, which are typically minimal and depend on network congestion.",
    },
  ],
  "Security & Privacy": [
    {
      question: "Does my trading manager have access to my funds?",
      answer:
        "No, absolutely not. Your funds are entirely under your control. Only you have the authority to initiate deposits and withdrawals. Our managers can only view your account activity and provide expert trading advice.",
    },
    {
      question: "If I forget my password, can I change or reset it?",
      answer:
        "Yes, you can easily reset your password. On the login page, simply click the 'Forgot Password' link and follow the secure instructions sent to your registered email address.",
    },
    {
      question: "Is depositing funds with TrustVest safe and secure?",
      answer:
        "Security is our top priority. We employ advanced encryption technologies, multi-factor authentication, and cold storage solutions for assets to ensure your funds and personal data are protected against unauthorized access.",
    },
    {
      question: "Can I lose my investment?",
      answer:
        "All investments inherently carry some degree of risk. While we implement sophisticated low-risk trading strategies to maximize returns and mitigate potential losses, we cannot guarantee returns. We encourage responsible investing.",
    },
    {
      question: "How do you protect my personal data and privacy?",
      answer:
        "We adhere to strict data protection regulations. Your personal information is encrypted and stored securely, never shared with third parties without your explicit consent. Our privacy policy details our commitment to your data security.",
    },
  ],
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState({});

  useEffect(() => {
    AOS.init({ once: true, offset: 100, duration: 800 });
  }, []);

  const toggleOpen = (category, index) => {
    setOpenIndex((prev) => ({
      ...prev,
      [category]: prev[category] === index ? null : index,
    }));
  };

  return (
    <section className="bg-gray-950 text-white py-20 px-4 font-montserrat relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
        style={{ animationDelay: "-1s" }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
        style={{ animationDelay: "-3s" }}
      ></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 text-center relative z-10
                     before:content-[''] before:absolute before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-36 before:h-1.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
          data-aos="fade-up"
        >
          Frequently Asked Questions
        </h2>
        <p
          className="max-w-3xl mx-auto mb-16 text-gray-300 text-lg md:text-xl text-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Find quick answers to the most common questions about our platform,
          services, and security.
        </p>

        {Object.entries(faqs).map(([category, questions]) => (
          <div key={category} className="mb-12">
            <h3
              className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6 text-center lg:text-left"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {questions.map((faq, index) => {
                const isOpen = openIndex[category] === index;
                return (
                  <div
                    key={index}
                    className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden
                               transform hover:scale-[1.005] hover:shadow-xl transition-all duration-300"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <button
                      onClick={() => toggleOpen(category, index)}
                      className="flex justify-between items-center w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
                    >
                      <span className="font-semibold text-lg sm:text-xl text-white pr-4">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="text-blue-400 w-6 h-6 flex-shrink-0 transform rotate-180 transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="text-blue-400 w-6 h-6 flex-shrink-0 transform rotate-0 transition-transform duration-300" />
                      )}
                    </button>
                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        isOpen
                          ? "max-h-screen opacity-100 p-6 pt-0"
                          : "max-h-0 opacity-0 px-6"
                      }`}
                    >
                      <p className="text-base text-gray-400 leading-relaxed border-t border-gray-800 pt-6">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
