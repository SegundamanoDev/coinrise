import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = {
  General: [
    {
      question: "How long does it take to process my withdrawal?",
      answer:
        "Withdrawals are usually processed instantly, but can take up to 24 hours depending on network traffic.",
    },
    {
      question: "Do I have to withdraw my funds only in bitcoin?",
      answer:
        "We support multiple crypto withdrawal options including Bitcoin, Ethereum, and USDT.",
    },
    {
      question: "How can I withdraw funds from my account?",
      answer:
        "Go to your dashboard, select Withdraw, choose the amount and preferred method, then confirm.",
    },
    {
      question: "Are we a financial pyramid?",
      answer:
        "No. We are a legitimate crypto trading and mining company registered and regulated under UK law.",
    },
    {
      question: "How much is the minimum deposit amount?",
      answer: "The minimum deposit amount is $500.",
    },
  ],
  Payment: [
    {
      question: "Can I register without deposit?",
      answer:
        "Yes, you can register and explore the platform before making a deposit.",
    },
    {
      question: "How can I deposit funds into my account?",
      answer:
        "Log in, navigate to Deposit, and follow the instructions to transfer crypto to your wallet address.",
    },
    {
      question: "Where can I find my investor ID/ wallet address?",
      answer:
        "Your investor ID and wallet address are available in your dashboard profile section.",
    },
    {
      question: "How long does it take to process my deposit?",
      answer:
        "Deposits are typically processed within 10–30 minutes depending on the blockchain.",
    },
    {
      question: "Are we a financial pyramid?",
      answer:
        "No. We offer real services and returns based on active trading, not recruitment.",
    },
  ],
  "Security & Privacy": [
    {
      question: "Does my trading manager have access to my funds?",
      answer:
        "No. Only you can control deposits and withdrawals. Managers can only view and advise.",
    },
    {
      question: "If I forget my password, can I change or reset it?",
      answer:
        "Yes. Use the ‘Forgot Password’ link on the login page to reset your password securely.",
    },
    {
      question: "Is depositing safe and secure?",
      answer:
        "Absolutely. We use advanced encryption and cold wallets to keep your funds safe.",
    },
    {
      question: "Can I lose my investment?",
      answer:
        "All investments carry some risk. We mitigate this by using low-risk strategies, but returns aren’t guaranteed.",
    },
    {
      question: "Does my trading manager have access to my funds?",
      answer:
        "No. Your trading manager cannot withdraw or control your funds — only you can.",
    },
  ],
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState({});

  const toggleOpen = (category, index) => {
    setOpenIndex((prev) => ({
      ...prev,
      [category]: prev[category] === index ? null : index,
    }));
  };

  return (
    <section className="bg-[#000000] text-[#ffffff] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          data-aos="fade-up"
        >
          Frequently Asked Questions
        </h2>

        {Object.entries(faqs).map(([category, questions]) => (
          <div key={category} className="mb-10">
            <h3
              className="text-2xl font-semibold mb-4"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              {category}
            </h3>
            {questions.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-700 py-4"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <button
                  onClick={() => toggleOpen(category, index)}
                  className="flex justify-between w-full items-center text-left focus:outline-none"
                >
                  <span className="font-medium text-lg">{faq.question}</span>
                  {openIndex[category] === index ? (
                    <ChevronUp className="text-white" />
                  ) : (
                    <ChevronDown className="text-white" />
                  )}
                </button>
                {openIndex[category] === index && (
                  <p className="mt-2 text-gray-300">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
