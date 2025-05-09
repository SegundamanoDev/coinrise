import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
const testimonials = [
  {
    name: "John Doe",
    country: "USA",
    flag: "🇺🇸",
    image:
      "https://images.unsplash.com/photo-1506748686213-1e8e99c9f6d7?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8MXx8cGVyZmVjdCUyMHN0b2NrdHxlbnwwfDB8fHwyfDE",
    feedback:
      "TrustVest Fx provided me with excellent trading tools and guidance. My investments have seen great growth!",
  },
  {
    name: "Emily Clark",
    country: "Canada",
    flag: "🇨🇦",
    image:
      "https://images.unsplash.com/photo-1594851328428-c7b0cce72b7e?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8NXx8Y2VsZmljfGVufDB8fHx8fDE",
    feedback:
      "I've been using TrustVest Fx for a few months, and the platform is easy to use and reliable. Highly recommend!",
  },
  {
    name: "Michael Smith",
    country: "UK",
    flag: "🇬🇧",
    image:
      "https://images.unsplash.com/photo-1569732199-6a7046d5994a?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8Mnx8cGVyZmVjdCUyMG1lbnxlbnwwfDB8fHwyfDE",
    feedback:
      "The customer service at TrustVest Fx is top-notch. I always feel supported, and my investments are doing well.",
  },
  {
    name: "Sophia Johnson",
    country: "Australia",
    flag: "🇦🇺",
    image:
      "https://images.unsplash.com/photo-1512561251284-d017568dc5c7?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8NHx8cGVyZmVjdCUyMGZlbWFsZSUyMHdhbGx8ZW58fDB8fHx8fDE",
    feedback:
      "I had a fantastic experience with TrustVest Fx. They helped me grow my portfolio significantly in just a few months!",
  },
  {
    name: "Lucas White",
    country: "Germany",
    flag: "🇩🇪",
    image:
      "https://images.unsplash.com/photo-1606287653512-ef55a8285d65?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8OXx8bWVufGVufDB8fHx8fDE",
    feedback:
      "The trading experience with TrustVest Fx is smooth, and the platform provides great tools to maximize profits.",
  },
  {
    name: "Olivia Brown",
    country: "New Zealand",
    flag: "🇳🇿",
    image:
      "https://images.unsplash.com/photo-1516835031164-d51e77dbff8e?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8OHx8cGVyZmVjdCUyMGdyb3dlfGVufDB8fHx8fDE",
    feedback:
      "TrustVest Fx is great for beginners. The tutorials and tips have helped me a lot in my trading journey.",
  },
  {
    name: "Ethan Wilson",
    country: "USA",
    flag: "🇺🇸",
    image:
      "https://images.unsplash.com/photo-1491295152030-3be5be945c73?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjUyOXwwfDF8c2VhY2h8OXx8Y2VydC1lbnRlcnByZXllfGVufDB8fHx8fDE",
    feedback:
      "I’ve traded with several platforms, but TrustVest Fx stands out for its transparency and support.",
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
      "TrustVest Fx has made trading accessible for me. I’m seeing steady gains, and the platform is reliable.",
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
  return (
    <div className="bg-white py-10 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        What Our Traders Say
      </h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((user, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-50 rounded-xl shadow-md p-5 text-center">
              <img
                src={user.image}
                alt={user.name}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <p className="text-lg font-semibold">{user.name}</p>
              <div className="flex justify-center items-center space-x-2 my-1">
                <img src={user.flag} alt={user.country} className="w-5 h-5" />
                <span className="text-sm text-gray-600">{user.country}</span>
              </div>
              <p className="text-sm text-gray-700 mt-3">{user.feedback}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
