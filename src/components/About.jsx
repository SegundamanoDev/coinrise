import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-16 py-10 text-gray-800">
      {/* Banner Image */}
      <div className="w-full mb-10" data-aos="fade-up">
        <img
          src="/images/file_000000005dcc61f5be8aa0d22490900f.png"
          alt="About Banner"
          className="w-full h-64 md:h-96 object-cover rounded-md shadow-lg"
        />
      </div>

      {/* ABOUT Section */}
      <div className="max-w-4xl w-full text-center" data-aos="fade-up">
        <h2 className="text-4xl font-bold mb-6">ABOUT</h2>

        <p className="text-lg mb-6" data-aos="fade-up" data-aos-delay="100">
          <span className="font-semibold">British Trading Option</span> is an
          online trading platform that helps you trade daily to make profits. It
          is a distinctive platform where we offer investors access to high
          growth investment opportunities in the Crypto and Forex market.
        </p>

        <p className="text-lg mb-6" data-aos="fade-up" data-aos-delay="200">
          Our vision is to make it a plain field for everyone to trade and earn
          money simply and transparently from the global market.
        </p>

        <p className="text-lg mb-6" data-aos="fade-up" data-aos-delay="300">
          We make it possible for individuals, groups, families, companies, etc.
          who may not be professionals in the fields to meaningfully engage and
          benefit from financial and stock markets, and expert-managed trading
          and investment portfolios. Our trading and investment experts ensure
          not only that your funds are at work, but are put in carefully planned
          and strategically diversified trading and investment portfolios. We
          ensure transparent returns, with a favorable management fee.
        </p>

        {/* Core Values */}
        <div className="mt-10" data-aos="fade-up">
          <h2 className="text-3xl font-semibold mb-4">Our Core Values</h2>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              {
                title: "Simplicity",
                content:
                  "One of our main goals is to remove barriers and make online trading and investing more accessible to the everyday user...",
              },
              {
                title: "Innovation",
                content:
                  "We pride ourselves on being pioneers of the Fintech Revolution...",
              },
              {
                title: "Transparency",
                content:
                  "Openness is a core value. We promote a transparent experience by eliminating hidden fees...",
              },
              {
                title: "Quality",
                content:
                  "Every detail is carefully considered to offer a top-tier experience...",
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="p-4 rounded-2xl shadow bg-[#121212]"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h2 className="text-2xl font-semibold mb-2">{value.title}</h2>
                <p>{value.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Section */}
        <div className="mt-10" data-aos="fade-up">
          <h2 className="text-2xl font-semibold mb-2">
            Registered and Regulated
          </h2>
          <p className="text-lg">
            We are registered in the United Kingdom under the Companies Act of
            2006 with company number{" "}
            <span className="font-medium">03747454</span>, legally certified to
            operate. We are also authorized and registered with the U.S.
            National Futures Association.
          </p>
        </div>

        {/* Meet the Team */}
        <div className="mt-16" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-6">MEET SOME OF OUR TEAM</h2>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            {[
              { name: "George Thompson", role: "Chief Executive Officer" },
              { name: "Jack Smith", role: "Software Engineer" },
              { name: "Isabella Walker", role: "Head Market Analyst" },
              { name: "Able Raymond", role: "Senior Account Manager" },
            ].map((member, index) => (
              <div
                key={member.name}
                className="flex items-center space-x-4"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <img
                  src="/images/newfile.png"
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">{member.name}</h2>
                  <p className="text-sm font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
