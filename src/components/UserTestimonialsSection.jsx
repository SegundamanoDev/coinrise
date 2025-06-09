import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import { Quote, Send, User, Mail, MessageSquare, Loader2 } from "lucide-react"; // Import Loader2 for submit button
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { toast } from "react-toastify"; // Assuming react-toastify is configured

// Import the async thunk and action from your contact slice
import {
  sendContactMessage,
  clearContactStatus,
} from "../features/contact/contact";

const testimonials = [
  {
    name: "Greg Greenwood",
    country: "USA",
    flag: "🇺🇸",
    image: "images/1749460915462.jpg",
    feedback:
      "It was my first time investing in crypto and forex. I was a bit scared, but thanks to the excellent customer support, I understood everything perfectly. I just received my payout today and I am very happy! I will not only continue investing but will also refer my friends. Thank you.",
  },
  {
    name: "Mason Clark",
    country: "Canada",
    flag: "🇨🇦",
    image: "images/1749461202076.jpg",
    feedback:
      "I've been trading forex for 3 years, and in all my experience, I've never found a platform that makes it so simple and easy for everyone to join. I totally recommend it to anyone out there looking for a way to make passive income.",
  },
  {
    name: "Michael Smith",
    country: "UK",
    flag: "🇬🇧",
    image: "images/1749461004081.jpg",
    feedback:
      "I never believed in online investment after a friend was scammed. But then I was convinced to give TrustVest a trial, and to my greatest surprise, I got my payouts with no stress. Thank you for your openness!",
  },
  {
    name: "Chris Johnson",
    country: "Australia",
    flag: "🇦🇺",
    image: "images/1749461138611.jpg",
    feedback:
      "I let TrustVest manage my trading because they know what they are doing, and the returns are great. I just walk to the bank with a big smile across my face every Friday. TrustVest deserves my full endorsement.",
  },
  {
    name: "Lucas White",
    country: "Germany",
    flag: "🇩🇪",
    image: "images/1749461085975.jpg",
    feedback:
      "Overall, one of the easiest platforms to use. I recommend it to anyone. Awesome broker, great withdrawals, and the Customer Support is second to none! Fair, caring, knowledgeable, and quick to respond. Been here about a year, and support staff is patient and respectful... Love these guys!",
  },
  {
    name: "Olivia Brown",
    country: "New Zealand",
    flag: "🇳🇿",
    image: "images/1749459185922.jpg",
    feedback:
      "I am having the best experience using TrustVest. I like the concept behind the investments. The only broker that helps you to trade and earn money, I would recommend this platform for beginners.",
  },
  {
    name: "Ethan Wilson",
    country: "USA",
    flag: "🇺🇸",
    image: "images/1749460874265.jpg",
    feedback:
      "TrustVest has a very friendly user-interface, which helps you see your trade progress and open/close trades all at once. The copy feature, when used, can add to generous passive income. I would recommend TrustVest to all.",
  },
  {
    name: "Ava Taylor",
    country: "Canada",
    flag: "🇨🇦",
    image: "images/1749460535123.jpg",
    feedback:
      "I trust TrustVest Fx for all my trades. They offer some of the best investment opportunities in the market.",
  },
  {
    name: "James Harris",
    country: "UK",
    flag: "🇬🇧",
    image: "images/1749460798237.jpg",
    feedback:
      "Great returns on my investments with TrustVest Fx! The platform is user-friendly, and withdrawals are quick.",
  },
  {
    name: "Charlotte Martinez",
    country: "Spain",
    flag: "🇪🇸",
    image: "images/1749459328559.jpg",
    feedback:
      "I love how easy it is to trade with TrustVest Fx. The market insights are incredibly helpful for making decisions.",
  },
  {
    name: "Benjamin Lewis",
    country: "USA",
    flag: "🇺🇸",
    image: "images/1749460677455.jpg",
    feedback:
      "Hello friends, TrustVest is the only broker I can trust... best support team ever!",
  },
  {
    name: "Mia Robinson",
    country: "Canada",
    flag: "🇨🇦",
    image: "images/1749459308527.jpg",
    feedback:
      "Since starting with TrustVest Fx, my portfolio has grown steadily. I’m more confident with my investments.",
  },
  {
    name: "Daniel Lee",
    country: "Australia",
    flag: "🇦🇺",
    image: "images/1749460697252.jpg",
    feedback:
      "Fantastic trading platform with a lot of tools to help you succeed. TrustVest Fx has been amazing!",
  },
  {
    name: "Amelia Walker",
    country: "UK",
    flag: "🇬🇧",
    image: "images/1749459148113.jpg",
    feedback:
      "Highly satisfied with TrustVest Fx! I’ve seen incredible profits from my trades in a short amount of time.",
  },
  {
    name: "Sebastian Young",
    country: "Germany",
    flag: "🇩🇪",
    image: "images/1749461345735.jpg",
    feedback:
      "TrustVest Fx offers an intuitive platform that’s perfect for both new and experienced traders. Highly recommend!",
  },
  {
    name: "Isla King",
    country: "New Zealand",
    flag: "🇳🇿",
    image: "images/1749459125377.jpg",
    feedback:
      "I’ve learned so much since joining TrustVest Fx. Their tools and customer support have been exceptional.",
  },
  {
    name: "Henry Scott",
    country: "USA",
    flag: "🇺🇸",
    image: "images/1749460620915.jpg",
    feedback:
      "The tools and resources provided by TrustVest Fx have helped me stay on top of the market and make smart decisions.",
  },
  {
    name: "Grace Adams",
    country: "Canada",
    flag: "🇨🇦",
    image: "images/1749459086791.jpg",
    feedback:
      "TrustVest Fx has given me the confidence to invest in the forex market. Their platform is secure and easy to use.",
  },
  {
    name: "Samuel Carter",
    country: "Australia",
    flag: "🇦🇺",
    image: "images/1749460611022.jpg",
    feedback:
      "I’ve made great returns on my trades with TrustVest Fx, and their support team is always ready to help.",
  },
  {
    name: "Ella Thomas",
    country: "UK",
    flag: "🇬🇧",
    image: "/images/1749459029035.jpg",
    feedback:
      "I highly recommend TrustVest Fx for anyone looking to trade forex. The platform is reliable and easy to navigate.",
  },
];

export default function TestimonialSlider() {
  // Initialize AOS (Animate On Scroll) library
  useEffect(() => {
    AOS.init({ once: true, offset: 50, duration: 800 });
  }, []);

  const defaultImage = "https://placehold.co/100x100/334155/E2E8F0?text=User"; // Placeholder image

  // Redux hooks for feedback form
  const dispatch = useDispatch();
  const { loading, success, error, statusMessage } = useSelector(
    (state) => state.contact
  );

  // Local state for the feedback form
  const [feedbackFormData, setFeedbackFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "New Feedback Submission", // Default subject for feedback
  });
  const [feedbackFormErrors, setFeedbackFormErrors] = useState({});

  // Handler for feedback form input changes
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear the specific error for the field as the user types
    if (feedbackFormErrors[name]) {
      setFeedbackFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Client-side validation for the feedback form
  const validateFeedbackForm = () => {
    let errors = {};
    if (!feedbackFormData.name.trim()) errors.name = "Your Name is required.";
    if (!feedbackFormData.email.trim()) {
      errors.email = "Email Address is required.";
    } else if (!/\S+@\S+\.\S+/.test(feedbackFormData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!feedbackFormData.message.trim())
      errors.message = "Feedback Message is required.";

    setFeedbackFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handler for feedback form submission
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();

    if (!validateFeedbackForm()) {
      toast.error("Please correct the errors in the feedback form.");
      return;
    }

    // Dispatch the sendContactMessage async thunk with feedback form data
    dispatch(sendContactMessage(feedbackFormData));
  };

  // useEffect to react to Redux state changes for the feedback form
  useEffect(() => {
    if (success) {
      toast.success("Thank you for your feedback! It has been sent.");
      // Clear the feedback form fields upon successful submission
      setFeedbackFormData({
        name: "",
        email: "",
        message: "",
        subject: "",
      });
      setFeedbackFormErrors({}); // Clear any form errors

      dispatch(clearContactStatus()); // Clear Redux status after displaying toast
    }

    if (error) {
      toast.error("Failed to submit feedback. Please try again.");

      dispatch(clearContactStatus());
    }
  }, [success, error, statusMessage, dispatch]);

  return (
    <div className="bg-gray-950 text-white font-montserrat relative overflow-hidden">
      {/* Background Gradients/Shapes */}
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
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="w-full h-full pb-12"
          >
            {testimonials.map((user, index) => (
              <SwiperSlide key={index} className="!h-auto">
                {" "}
                <div className="bg-gray-900 rounded-2xl shadow-xl p-8 text-center flex flex-col items-center justify-between h-full border border-gray-800 hover:border-blue-500 transition-all duration-300 transform hover:scale-[1.01]">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-28 h-28 rounded-full mx-auto mb-6 object-cover border-4 border-blue-500 shadow-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultImage;
                    }}
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
          <form
            onSubmit={handleFeedbackSubmit}
            className="space-y-6 flex-grow flex flex-col justify-between"
          >
            {/* Name Input Field */}
            <div>
              <label
                htmlFor="feedback-name"
                className="block text-sm font-medium text-gray-300 mb-2 sr-only"
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
                  name="name" // Important: matches formData key
                  required
                  className={`w-full pl-10 pr-4 py-3 bg-gray-800 border ${
                    feedbackFormErrors.name
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="Your Full Name"
                  value={feedbackFormData.name}
                  onChange={handleFeedbackChange}
                />
                {feedbackFormErrors.name && (
                  <p className="mt-2 text-sm text-red-400">
                    {feedbackFormErrors.name}
                  </p>
                )}
              </div>
            </div>

            {/* Email Input Field */}
            <div>
              <label
                htmlFor="feedback-email"
                className="block text-sm font-medium text-gray-300 mb-2 sr-only"
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
                  name="email" // Important: matches formData key
                  required
                  className={`w-full pl-10 pr-4 py-3 bg-gray-800 border ${
                    feedbackFormErrors.email
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="your@email.com"
                  value={feedbackFormData.email}
                  onChange={handleFeedbackChange}
                />
                {feedbackFormErrors.email && (
                  <p className="mt-2 text-sm text-red-400">
                    {feedbackFormErrors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label
                htmlFor="feedback-message"
                className="block text-sm font-medium text-gray-300 mb-2 sr-only"
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
                  name="message" // Important: matches formData key
                  rows={5}
                  required
                  className={`w-full pl-10 pr-4 py-3 bg-gray-800 border ${
                    feedbackFormErrors.message
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y`}
                  placeholder="Share your experience..."
                  value={feedbackFormData.message}
                  onChange={handleFeedbackChange}
                ></textarea>
                {feedbackFormErrors.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {feedbackFormErrors.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading} // Disable button when Redux is loading
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 className="animate-spin h-5 w-5 mr-2" />}
              {!loading ? <Send size={20} /> : null}{" "}
              {/* Send icon when not loading */}
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
