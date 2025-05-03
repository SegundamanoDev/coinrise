// Contact.jsx
import React from "react";
import Navbar from "./Navbar";

const Contact = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gray-900 text-gray-300 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            Contact Us
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block mb-2 text-sm">Name</label>
              <input
                type="text"
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Message</label>
              <textarea
                rows="5"
                className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
