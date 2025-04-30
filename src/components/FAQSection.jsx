import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How do I start investing?",
    answer:
      "Just create an account, fund your wallet, and choose a mining plan. It's that easy.",
  },
  {
    question: "How fast can I withdraw my earnings?",
    answer: "Withdrawals are processed instantly after request, 24/7.",
  },
  {
    question: "Is there a minimum investment?",
    answer: "Yes, you can start investing with as little as $50.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-gray-900 text-gray-300 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">
          Frequently Asked Questions
        </h2>

        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-700 py-4">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex justify-between w-full items-center text-left focus:outline-none"
            >
              <span className="font-medium text-lg">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="text-yellow-400" />
              ) : (
                <ChevronDown className="text-yellow-400" />
              )}
            </button>
            {openIndex === index && (
              <p className="mt-2 text-gray-400">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
