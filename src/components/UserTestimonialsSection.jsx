import React from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    country: "USA",
    comment:
      "I've tried other platforms, but this is the most reliable and profitable mining site I’ve used. Withdrawals are fast, and support is amazing!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Lee",
    country: "Singapore",
    comment:
      "Super transparent system. I can see my returns grow daily and the dashboard is easy to use. Highly recommended.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Sarah M.",
    country: "Canada",
    comment:
      "I earned 20% returns in just 3 months! This platform is legit and reliable.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "James B.",
    country: "USA",
    comment: "The daily mining profits are real — I withdraw anytime I want!",
    avatar: "https://randomuser.me/api/portraits/men/35.jpg",
  },
  {
    name: "Chinwe E.",
    country: "Nigeria",
    comment:
      "Support is top-notch and profits are consistent. I recommend this 100%.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Liam K.",
    country: "UK",
    comment:
      "I started with the Basic Plan. Now I’m on Premium — and loving it.",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <section className="bg-[#1f2937] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          What Our Users Say
        </h2>
        <p className="text-gray-400 mb-12">Real feedback from real investors</p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <Quote className="text-yellow-400 mb-4 mx-auto" />
              <p className="text-gray-300 italic mb-4">"{t.comment}"</p>
              <div className="flex items-center justify-center mt-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full mr-3 border-2 border-yellow-400"
                />
                <div className="text-left">
                  <div className="text-yellow-200 font-semibold">{t.name}</div>
                  <p className="text-sm text-gray-400">{t.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
