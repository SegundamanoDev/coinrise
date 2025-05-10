import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section
      className=" py-20 px-6 text-center"
      data-aos="fade-up"
      data-aos-duration="1200"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Earning Today
        </h2>
        <p className="mb-8">
          Join thousands of users mining real Bitcoin and earning passive income
          every day.
        </p>
        <Link
          data-aos="zoom-in"
          data-aos-delay="200"
          to="/sign-up"
          className="inline-flex items-center bg-gradient-to-r from-[#00befe] to-[#a700ff] text-[#ffffff] px-6 py-3 font-semibold rounded-xl shadow "
        >
          Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
