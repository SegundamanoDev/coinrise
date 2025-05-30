import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules"; // Import Autoplay for continuous slide
import AOS from "aos";
import "aos/dist/aos.css";
import { Quote, Send, User, Mail, MessageSquare } from "lucide-react"; // Lucide icons for quotes and form

const testimonials = [
  {
    name: "John Doe",
    country: "USA",
    flag: "🇺🇸",
    image:
      "https://images.unsplash.com/photo-1506748686213-1e8e99c9f6d7?auto=format&fit=crop&q=80&w=100&h=100", // Adjusted for better cropping
    feedback:
      "It was my first time investing in crypto and forex. I was a bit scared, but thanks to the excellent customer support, I understood everything perfectly. I just received my payout today and I am very happy! I will not only continue investing but will also refer my friends. Thank you.",
  },
  {
    name: "Emily Clark",
    country: "Canada",
    flag: "🇨🇦",
    image:
      "https://images.unsplash.com/photo-1594851328428-c7b0cce72b7e?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "I've been trading forex for 3 years, and in all my experience, I've never found a platform that makes it so simple and easy for everyone to join. I totally recommend it to anyone out there looking for a way to make passive income.",
  },
  {
    name: "Michael Smith",
    country: "UK",
    flag: "🇬🇧",
    image:
      "https://images.unsplash.com/photo-1569732199-6a7046d5994a?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "I never believed in online investment after a friend was scammed. But then I was convinced to give TrustVest a trial, and to my greatest surprise, I got my payouts with no stress. Thank you for your openness!",
  },
  {
    name: "Sophia Johnson",
    country: "Australia",
    flag: "🇦🇺",
    image:
      "https://images.unsplash.com/photo-1512561251284-d017568dc5c7?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "I let TrustVest manage my trading because they know what they are doing, and the returns are great. I just walk to the bank with a big smile across my face every Friday. TrustVest deserves my full endorsement.",
  },
  {
    name: "Lucas White",
    country: "Germany",
    flag: "🇩🇪",
    image:
      "https://images.unsplash.com/photo-1606287653512-ef55a8285d65?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "Overall, one of the easiest platforms to use. I recommend it to anyone. Awesome broker, great withdrawals, and the Customer Support is second to none! Fair, caring, knowledgeable, and quick to respond. Been here about a year, and support staff is patient and respectful... Love these guys!",
  },
  {
    name: "Olivia Brown",
    country: "New Zealand",
    flag: "🇳🇿",
    image:
      "https://images.unsplash.com/photo-1516835031164-d51e77dbff8e?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "I am having the best experience using TrustVest. I like the concept behind the investments. The only broker that helps you to trade and earn money, I would recommend this platform for beginners.",
  },
  {
    name: "Ethan Wilson",
    country: "USA",
    flag: "🇺🇸",
    image:
      "https://images.unsplash.com/photo-1491295152030-3be5be945c73?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "TrustVest has a very friendly user-interface, which helps you see your trade progress and open/close trades all at once. The copy feature, when used, can add to generous passive income. I would recommend TrustVest to all.",
  },
  {
    name: "Ava Taylor",
    country: "Canada",
    flag: "🇨🇦",
    image:
      "https://images.unsplash.com/photo-1583403352208-08d0e1bdb5be?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "I trust TrustVest Fx for all my trades. They offer some of the best investment opportunities in the market.",
  },
  {
    name: "James Harris",
    country: "UK",
    flag: "🇬🇧",
    image:
      "https://images.unsplash.com/photo-1502922057084-31a1380fd8a0?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "Great returns on my investments with TrustVest Fx! The platform is user-friendly, and withdrawals are quick.",
  },
  {
    name: "Charlotte Martinez",
    country: "Spain",
    flag: "🇪🇸",
    image:
      "https://images.unsplash.com/photo-1587758926704-57365c6bc54f?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "I love how easy it is to trade with TrustVest Fx. The market insights are incredibly helpful for making decisions.",
  },
  {
    name: "Benjamin Lewis",
    country: "USA",
    flag: "🇺🇸",
    image:
      "https://images.unsplash.com/photo-1518711770430-87bb1a7f4f5f?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "Hello friends, TrustVest is the only broker I can trust... best support team ever!",
  },
  {
    name: "Mia Robinson",
    country: "Canada",
    flag: "🇨🇦",
    image:
      "https://images.unsplash.com/photo-1524748832474-d63f6749da04?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "Since starting with TrustVest Fx, my portfolio has grown steadily. I’m more confident with my investments.",
  },
  {
    name: "Daniel Lee",
    country: "Australia",
    flag: "🇦🇺",
    image:
      "https://images.unsplash.com/photo-1600185059241-b29a30e9a315?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "Fantastic trading platform with a lot of tools to help you succeed. TrustVest Fx has been amazing!",
  },
  {
    name: "Amelia Walker",
    country: "UK",
    flag: "🇬🇧",
    image:
      "https://images.unsplash.com/photo-1572495921167-cb3a290a1b9c?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "Highly satisfied with TrustVest Fx! I’ve seen incredible profits from my trades in a short amount of time.",
  },
  {
    name: "Sebastian Young",
    country: "Germany",
    flag: "🇩🇪",
    image:
      "https://images.unsplash.com/photo-1572105221559-618d11095db6?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "TrustVest Fx offers an intuitive platform that’s perfect for both new and experienced traders. Highly recommend!",
  },
  {
    name: "Isla King",
    country: "New Zealand",
    flag: "🇳🇿",
    image:
      "https://images.unsplash.com/photo-1509382120716-10588a3b5f88?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "I’ve learned so much since joining TrustVest Fx. Their tools and customer support have been exceptional.",
  },
  {
    name: "Henry Scott",
    country: "USA",
    flag: "🇺🇸",
    image:
      "https://images.unsplash.com/photo-1552440152-c9702b6f02f0?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "The tools and resources provided by TrustVest Fx have helped me stay on top of the market and make smart decisions.",
  },
  {
    name: "Grace Adams",
    country: "Canada",
    flag: "🇨🇦",
    image:
      "https://images.unsplash.com/photo-1548098324-b84c37069cc6?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "TrustVest Fx has given me the confidence to invest in the forex market. Their platform is secure and easy to use.",
  },
  {
    name: "Samuel Carter",
    country: "Australia",
    flag: "🇦🇺",
    image:
      "https://images.unsplash.com/photo-1587614313213-f8c37fc4a33b?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "I’ve made great returns on my trades with TrustVest Fx, and their support team is always ready to help.",
  },
  {
    name: "Ella Thomas",
    country: "UK",
    flag: "🇬🇧",
    image:
      "https://images.unsplash.com/photo-1529209827745-c16fd65069c8?auto=format&fit=crop&q=80&w=100&h=100",
    feedback:
      "I highly recommend TrustVest Fx for anyone looking to trade forex. The platform is reliable and easy to navigate.",
  },
];

export default function TestimonialSlider() {
  useEffect(() => {
    AOS.init({ once: true, offset: 50, duration: 800 });
  }, []);

  const defaultImage = "https://placehold.co/100x100/334155/E2E8F0?text=User"; // Placeholder image

  return (
    <div className="bg-gray-950 text-white py-20 px-4 font-montserrat relative overflow-hidden">
      {/* Background Gradients/Shapes for visual interest */}
      <div
        className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
        style={{ animationDelay: "-2s" }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
        style={{ animationDelay: "-4s" }}
      ></div>

      <h2
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 text-center relative z-10
                   before:content-[''] before:absolute before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-36 before:h-1.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        What Our Valued Clients Say
      </h2>
      <p
        className="max-w-3xl mx-auto mb-16 text-gray-300 text-lg md:text-xl text-center"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="1000"
      >
        Hear directly from our satisfied traders about their experiences and
        success stories with TrustVest.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto relative z-10">
        {/* Testimonials Slider */}
        <div
          data-aos="fade-right"
          data-aos-delay="200"
          data-aos-duration="1000"
          className="w-full"
        >
          <Swiper
            spaceBetween={30} // Increased space between slides
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]} // Added Autoplay module
            autoplay={{
              delay: 5000, // 5 seconds delay
              disableOnInteraction: false, // Keep autoplaying even after user interaction
            }}
            className="w-full h-full pb-12" // Added padding-bottom for pagination dots
          >
            {testimonials.map((user, index) => (
              <SwiperSlide key={index} className="!h-auto">
                {" "}
                {/* !h-auto to allow content to dictate height */}
                <div className="bg-gray-900 rounded-2xl shadow-xl p-8 text-center flex flex-col items-center justify-between h-full border border-gray-800 hover:border-blue-500 transition-all duration-300 transform hover:scale-[1.01]">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-28 h-28 rounded-full mx-auto mb-6 object-cover border-4 border-blue-500 shadow-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultImage;
                    }} // Fallback image
                  />
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {user.name}
                  </h3>
                  <div className="flex justify-center items-center gap-2 mb-4 text-gray-400">
                    <span className="text-3xl">{user.flag}</span>
                    <span className="text-lg">{user.country}</span>
                  </div>
                  <div className="relative text-base text-gray-300 leading-relaxed italic mb-6">
                    <Quote
                      size={36}
                      className="absolute top-0 left-0 text-blue-500 opacity-20 -translate-x-4 -translate-y-4 rotate-180"
                    />
                    <p className="z-10 relative px-4">{user.feedback}</p>
                    <Quote
                      size={36}
                      className="absolute bottom-0 right-0 text-purple-500 opacity-20 translate-x-4 translate-y-4"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom Swiper Pagination Styling */}
          <style jsx="true">{`
            .swiper-pagination-bullet {
              background: #4b5563 !important; /* Default gray */
              opacity: 0.7 !important;
              width: 10px !important;
              height: 10px !important;
              margin: 0 5px !important;
              transition: all 0.3s ease;
            }

            .swiper-pagination-bullet-active {
              background: linear-gradient(
                to right,
                #3b82f6,
                #8b5cf6
              ) !important; /* Blue to Purple gradient */
              width: 12px !important;
              height: 12px !important;
              opacity: 1 !important;
              box-shadow: 0 0 8px rgba(59, 130, 246, 0.6); /* Subtle glow */
            }

            /* Adjust pagination position */
            .swiper-pagination {
              bottom: 0px !important; /* Adjust as needed */
            }
          `}</style>
        </div>

        {/* Contact / Feedback Form */}
        <div
          data-aos="fade-left"
          data-aos-delay="400"
          data-aos-duration="1000"
          className="bg-gray-900 rounded-2xl p-8 shadow-xl w-full h-full border border-gray-800 flex flex-col justify-between"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Send Us Your Feedback
          </h3>
          <form className="space-y-6 flex-grow flex flex-col justify-between">
            <div>
              <label
                htmlFor="feedback-name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Name
              </label>
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  id="feedback-name"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your Full Name"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="feedback-email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  id="feedback-email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="feedback-message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Message
              </label>
              <div className="relative">
                <MessageSquare
                  size={20}
                  className="absolute left-3 top-4 text-gray-400"
                />
                <textarea
                  id="feedback-message"
                  rows={5}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
                  placeholder="Share your experience..."
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Send size={20} /> Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
