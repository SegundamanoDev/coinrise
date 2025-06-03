import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Phone, Mail, MapPin, Clock, User, MessageSquare } from "lucide-react"; // Lucide icons for contact info and form

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  return (
    <div className="bg-gray-950 text-white font-montserrat relative overflow-hidden">
      {/* Background Gradients/Shapes */}
      <div
        className="absolute top-0 left-0 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
        style={{ animationDelay: "-2s" }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
        style={{ animationDelay: "-4s" }}
      ></div>

      {/* Hero Banner Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden flex items-center justify-center text-center">
        <img
          src="/images/contact (1).jpg" // Placeholder for a professional contact banner
          alt="Contact Us Banner"
          className="absolute inset-0 w-full h-full object-cover transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-transparent to-purple-900/70 mix-blend-multiply opacity-80"></div>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 p-4" data-aos="fade-up">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight drop-shadow-lg">
            Contact Us
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200 drop-shadow-md">
            We're here to help! Reach out to our dedicated support team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        {/* Contact Information Section */}
        <div className="text-center mb-20">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 relative z-10
                       before:content-[''] before:absolute before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-36 before:h-1.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
            data-aos="fade-up"
          >
            Get In Touch
          </h2>
          <p
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Whether you have a question about our services, need technical
            assistance, or want to provide feedback, our team is ready to assist
            you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div
              className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 flex flex-col items-center text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="mb-4 bg-gray-800 p-3 rounded-full inline-flex justify-center items-center shadow-inner">
                <Mail size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Email Support
              </h3>
              <p className="text-gray-400 text-base">support@trustvest.com</p>
              <p className="text-gray-500 text-sm mt-1">
                Response within 24 hours
              </p>
            </div>

            <div
              className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 flex flex-col items-center text-center"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="mb-4 bg-gray-800 p-3 rounded-full inline-flex justify-center items-center shadow-inner">
                <MapPin size={32} className="text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Our Office
              </h3>
              <p className="text-gray-400 text-base">
                123 Main Street, Anytown, CA 90210, USA.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Visits by appointment only
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div
          className="bg-gray-900 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-800 max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Send Us a Message
          </h3>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="contact-name"
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
                  id="contact-name"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your Full Name"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="contact-email"
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
                  id="contact-email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="contact-message"
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
                  id="contact-message"
                  rows={5}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Send Message <Mail size={20} />
            </button>
          </form>
        </div>

        {/* Optional: Embedded Map Section (if you have a physical location) */}
        {/*
        <div className="mt-20 text-center" data-aos="fade-up" data-aos-delay="700">
          <h3 className="text-3xl font-bold text-white mb-8">
            Find Us on the Map
          </h3>
          <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.909544719266!2d-0.12775838423000002!3d51.5073509796356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26967%3A0x8599c81f0b0a444!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1678912345678!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
              className="rounded-xl"
            ></iframe>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default Contact;
