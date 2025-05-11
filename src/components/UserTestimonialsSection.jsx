import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";

const testimonials = [
  {
    name: "John Doe",
    country: "USA",
    flag: "🇺🇸",
    image:
      "https://images.unsplash.com/photo-1506748686213-1e8e99c9f6d7?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8MXx8cGVyZmVjdCUyMHN0b2NrdHxlbnwwfDB8fHwyfDE",
    feedback:
      "It was my first time investing in crypto and forex I was a bit scared but thanks to the good customer support who helped me understood everything perfectly. I just got my payout today and I am very happy not only will I continue investing but I will refer my friends. Thank you .",
  },
  {
    name: "Emily Clark",
    country: "Canada",
    flag: "🇨🇦",
    image:
      "https://images.unsplash.com/photo-1594851328428-c7b0cce72b7e?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8NXx8Y2VsZmljfGVufDB8fHx8fDE",
    feedback:
      "I have been trading in forex for 3 years in all my years of experience I have never found any platform like that makes it very simple and easy for everyone to join the wagon I totally recommend to anyone out there looking for a way to make passive income",
  },
  {
    name: "Michael Smith",
    country: "UK",
    flag: "🇬🇧",
    image:
      "https://images.unsplash.com/photo-1569732199-6a7046d5994a?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8cGVyZmVjdCUyMG1lbnxlbnwwfDB8fHwyfDE",
    feedback:
      " I never believed in online investment as a friend of mine was scammed off a thousand dollars investing with bitdouble scam platform. but then I was convinced to give a trial here, and to my greatest surprise, I got my payouts with no stress. Thank you for your openness! ",
  },
  {
    name: "Sophia Johnson",
    country: "Australia",
    flag: "🇦🇺",
    image:
      "https://images.unsplash.com/photo-1512561251284-d017568dc5c7?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8NHx8cGVyZmVjdCUyMGZlbWFsZSUyMHdhbGx8ZW58fDB8fHx8fDE",
    feedback:
      " I let do my trading for me because they know what they are doing and the returns are great. I just walk to the bank with a big smile across my face every Friday. deserve my full endorsement",
  },
  {
    name: "Lucas White",
    country: "Germany",
    flag: "🇩🇪",
    image:
      "https://images.unsplash.com/photo-1606287653512-ef55a8285d65?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8OXx8bWVufGVufDB8fHx8fDE",
    feedback:
      " Overall one of the easiest to use, I recommend to anyone. Awesome broker, Great withdrawals, the Customer Support is 2nd to none! Fair, Caring, Knowledgable, and Quick to respond. Been here about a year, and support staff is patient and respectful... Love these guys!",
  },
  {
    name: "Olivia Brown",
    country: "New Zealand",
    flag: "🇳🇿",
    image:
      "https://images.unsplash.com/photo-1516835031164-d51e77dbff8e?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8OHx8cGVyZmVjdCUyMGdyb3dlfGVufDB8fHx8fDE",
    feedback:
      " I am having the best experience using . I like the concept behind the investments. The only broker that help you to trade and earn money, I would recommend this platform for beginners.",
  },
  {
    name: "Ethan Wilson",
    country: "USA",
    flag: "🇺🇸",
    image:
      "https://images.unsplash.com/photo-1491295152030-3be5be945c73?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8OXx8Y2VydC1lbnRlcnByZXllfGVufDB8fHx8fDE",
    feedback:
      " has very friendly user-interface, which helps to see you trade progress, open/close trades all at one go. The copy feature when used can add to generous passive income. I would recommend BTC to all",
  },
  {
    name: "Ava Taylor",
    country: "Canada",
    flag: "🇨🇦",
    image:
      "https://images.unsplash.com/photo-1583403352208-08d0e1bdb5be?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8Y2VsZm18ZW58fDB8fHx8fDE",
    feedback:
      "I trust TrustVest Fx for all my trades. They offer some of the best investment opportunities in the market.",
  },
  {
    name: "James Harris",
    country: "UK",
    flag: "🇬🇧",
    image:
      "https://images.unsplash.com/photo-1502922057084-31a1380fd8a0?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8Y2VydC1lbnRlcnByZXllfGVufDB8fHx8fDE",
    feedback:
      "Great returns on my investments with TrustVest Fx! The platform is user-friendly, and withdrawals are quick.",
  },
  {
    name: "Charlotte Martinez",
    country: "Spain",
    flag: "🇪🇸",
    image:
      "https://images.unsplash.com/photo-1587758926704-57365c6bc54f?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8OXx8cGVyZmVjdCUyMHRyYWRlczxlbnwwfDB8fHx8fDE",
    feedback:
      "I love how easy it is to trade with TrustVest Fx. The market insights are incredibly helpful for making decisions.",
  },
  {
    name: "Benjamin Lewis",
    country: "USA",
    flag: "🇺🇸",
    image:
      "https://images.unsplash.com/photo-1518711770430-87bb1a7f4f5f?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8Y2VydC1lbnRlcnByZXllfGVufDB8fHx8fDE",
    feedback:
      " Hello friends, is the only broker that i can trust....best support team ever",
  },
  {
    name: "Mia Robinson",
    country: "Canada",
    flag: "🇨🇦",
    image:
      "https://images.unsplash.com/photo-1524748832474-d63f6749da04?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8Y2VsZmFjfGVufDB8fHx8fDE",
    feedback:
      "Since starting with TrustVest Fx, my portfolio has grown steadily. I’m more confident with my investments.",
  },
  {
    name: "Daniel Lee",
    country: "Australia",
    flag: "🇦🇺",
    image:
      "https://images.unsplash.com/photo-1600185059241-b29a30e9a315?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8MXx8Y2VsZmF8ZW58fDB8fHx8fDE",
    feedback:
      "Fantastic trading platform with a lot of tools to help you succeed. TrustVest Fx has been amazing!",
  },
  {
    name: "Amelia Walker",
    country: "UK",
    flag: "🇬🇧",
    image:
      "https://images.unsplash.com/photo-1572495921167-cb3a290a1b9c?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8MXx8cGVyZmVjdCUyMGdpcmwxfGVufDB8fHx8fDE",
    feedback:
      "Highly satisfied with TrustVest Fx! I’ve seen incredible profits from my trades in a short amount of time.",
  },
  {
    name: "Sebastian Young",
    country: "Germany",
    flag: "🇩🇪",
    image:
      "https://images.unsplash.com/photo-1572105221559-618d11095db6?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8OHx8cGVyZmVjdCUyMHRyYWRlczxlbnwwfDB8fHx8fDE",
    feedback:
      "TrustVest Fx offers an intuitive platform that’s perfect for both new and experienced traders. Highly recommend!",
  },
  {
    name: "Isla King",
    country: "New Zealand",
    flag: "🇳🇿",
    image:
      "https://images.unsplash.com/photo-1509382120716-10588a3b5f88?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8NXx8cGVyZmVjdCUyMGdyb3dlfGVufDB8fHx8fDE",
    feedback:
      "I’ve learned so much since joining TrustVest Fx. Their tools and customer support have been exceptional.",
  },
  {
    name: "Henry Scott",
    country: "USA",
    flag: "🇺🇸",
    image:
      "https://images.unsplash.com/photo-1552440152-c9702b6f02f0?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8MXx8Y2VydC1lbnRlcnByZXllfGVufDB8fHx8fDE",
    feedback:
      "The tools and resources provided by TrustVest Fx have helped me stay on top of the market and make smart decisions.",
  },
  {
    name: "Grace Adams",
    country: "Canada",
    flag: "🇨🇦",
    image:
      "https://images.unsplash.com/photo-1548098324-b84c37069cc6?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8cGVyZmVjdCUyMG5vcm5hbHxlbnwwfDB8fHx8fDE",
    feedback:
      "TrustVest Fx has given me the confidence to invest in the forex market. Their platform is secure and easy to use.",
  },
  {
    name: "Samuel Carter",
    country: "Australia",
    flag: "🇦🇺",
    image:
      "https://images.unsplash.com/photo-1587614313213-f8c37fc4a33b?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8cGVyZmVjdCUyMGdyb3dlfGVufDB8fHx8fDE",
    feedback:
      "I’ve made great returns on my trades with TrustVest Fx, and their support team is always ready to help.",
  },
  {
    name: "Ella Thomas",
    country: "UK",
    flag: "🇬🇧",
    image:
      "https://images.unsplash.com/photo-1529209827745-c16fd65069c8?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8MXx8cGVyZmVjdCUyMGdyb3dlfGVufDB8fHx8fDE",
    feedback:
      "I highly recommend TrustVest Fx for anyone looking to trade forex. The platform is reliable and easy to navigate.",
  },
];

export default function TestimonialSlider() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return (
    <div className="bg-black text-white py-16 px-4 md:px-10 overflow-x-hidden">
      <h2 className="text-3xl font-bold text-center mb-12">
        What Our Traders Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-screen-xl mx-auto">
        {/* Testimonials Slider */}
        <div
          data-aos="fade-right"
          data-aos-delay="200"
          data-aos-duration="1000"
          className="w-full"
        >
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="w-full"
          >
            {testimonials.map((user, index) => (
              <SwiperSlide key={index} className="!w-full">
                <div className="border border-gray-700 rounded-xl shadow-lg p-6 text-center bg-[#111]">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <span className="text-lg font-semibold">{user.name}</span>
                  <div className="flex justify-center items-center space-x-2 my-1">
                    <span className="text-xl">{user.flag}</span>
                    <span className="text-sm">{user.country}</span>
                  </div>
                  <p className="text-sm mt-3 text-gray-300">{user.feedback}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Contact / Feedback Form */}
        <div
          data-aos="fade-left"
          data-aos-delay="400"
          data-aos-duration="1000"
          className="bg-[#111] rounded-xl p-8 shadow-lg w-full"
        >
          <h3 className="text-2xl font-semibold mb-6 text-white">
            Send Us Your Feedback
          </h3>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:border-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:border-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:border-white"
              />
            </div>
            <button
              type="submit"
              className="bg-white text-black font-semibold px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
