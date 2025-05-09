import React, { useEffect, useState } from "react";
import TestimonialForm from "./TestimonialForm";

const testimonials = [
  {
    name: "Dimitri Ivanov",
    location: "Moscow, Russia",
    flag: "🇷🇺",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    feedback:
      "It was my first time investing in crypto and forex I was a bit scared but thanks to the good customer support who helped me understood everything perfectly. I just got my payout today and I am very happy not only will I continue investing but I will refer my friends. Thank you .",
    rating: 5,
  },
  {
    name: "Ahmed Al-Farsi",
    location: "Riyadh, Saudi Arabia",
    flag: "🇸🇦",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    feedback:
      "I have been trading in forex for 3 years in all my years of experience I have never found any platform like that makes it very simple and easy for everyone to join the wagon I totally recommend to anyone out there looking for a way to make passive income",
    rating: 4,
  },
  {
    name: "Emily Johnson",
    location: "New York, USA",
    flag: "🇺🇸",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    feedback:
      " I never believed in online investment as a friend of mine was scammed off a thousand dollars investing with bitdouble scam platform. but then I was convinced to give a trial here, and to my greatest surprise, I got my payouts with no stress. Thank you for your openness! ",
    rating: 5,
  },
  {
    name: "Wayne Henderson",
    location: "Lagos, Nigeria",
    flag: "🇳🇬",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    feedback:
      " I let do my trading for me because they know what they are doing and the returns are great. I just walk to the bank with a big smile across my face every Friday. deserve my full endorsement",
    rating: 4,
  },
  {
    name: "Sofia González",
    location: "Madrid, Spain",
    flag: "🇪🇸",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    feedback:
      "I love the concept behind this platform. Clear, quick, and reliable.",
    rating: 5,
  },
  {
    name: "Takahiro Sato",
    location: "Tokyo, Japan",
    flag: "🇯🇵",
    image: "https://randomuser.me/api/portraits/men/38.jpg",
    feedback:
      "It’s been a smooth experience overall. Interface is user-friendly.",
    rating: 4,
  },
  {
    name: "Fatima El Amrani",
    location: "Casablanca, Morocco",
    flag: "🇲🇦",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    feedback: "Excellent service and prompt support. I’m happy I joined.",
    rating: 5,
  },
  {
    name: "Jean Dupont",
    location: "Paris, France",
    flag: "🇫🇷",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
    feedback:
      "Very professional team and transparent results. Highly recommend.",
    rating: 4,
  },
  {
    name: "Meera Patel",
    location: "Mumbai, India",
    flag: "🇮🇳",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    feedback:
      "Great investment opportunities. The daily status reports are helpful.",
    rating: 5,
  },
  {
    name: "Lucas Müller",
    location: "Berlin, Germany",
    flag: "🇩🇪",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    feedback: "Fantastic experience. Love how simple everything is.",
    rating: 5,
  },
];

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10 px-4 bg-[#111827] text-center">
      <h2 className="text-2xl font-bold text-white mb-4">WHAT PEOPLE SAY</h2>
      <p className="text-gray-400 mb-8">
        More than 3 million customers worldwide trust us and earn daily. We
        don't like to brag, but we don't mind letting our customers do it for
        us. Here are a few nice things folks have said about us over the years.
      </p>

      <div className="overflow-hidden relative h-[320px]  py-10">
        <div
          className="whitespace-nowrap transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="inline-block w-full px-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <blockquote className="text-white italic mb-4 px-4">
                "{t.feedback}"
              </blockquote>
              <div className="text-yellow-500 mb-1">
                {"★".repeat(t.rating) + "☆".repeat(5 - t.rating)}
              </div>
              <p className="font-bold text-white">{t.name}</p>
              <p className="text-sm text-gray-200">
                {t.location} <span>{t.flag}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-1">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-4 rounded-full ${
              i === index ? "bg-red-500" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
      <TestimonialForm />
    </section>
  );
};

export default TestimonialSlider;
