import React from "react";

const TestimonialForm = () => {
  return (
    <section className="py-10 px-4 max-w-xl mx-auto text-left bg-[#111827]">
      <h2 className="text-xl font-bold mb-2  text-center text-white">
        LEAVE A REVIEW
      </h2>
      <p className="mb-4 text-sm text-gray-400">
        Your feedback helps us to improve service and provide you with a better
        trading experience tailored to your needs. The reviews are published
        without changes to the original text.
      </p>
      <form className="space-y-4 text-white">
        <div>
          <label className="block text-sm mb-1 italic">
            Upload your picture below
          </label>
          <input type="file" className="w-full border rounded px-3 py-2" />
        </div>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded px-3 py-2 "
        />
        <input
          type="email"
          placeholder="Full Address"
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          placeholder="Your feedback"
          rows="4"
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-full font-semibold"
        >
          SUBMIT
        </button>
      </form>
    </section>
  );
};

export default TestimonialForm;
