import React from "react";

const CertificateSection = () => {
  return (
    <section className="bg-[#000000] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
          data-aos="fade-up"
        >
          Regulation and Safety of Funds
        </h2>
        <p
          className="text-center max-w-3xl mx-auto mb-10 text-gray-300"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          We are a regulated broker, so trading with us is absolutely safe. Your
          funds are protected by multiple financial authorities and industry
          best practices.
        </p>

        <div className="space-y-6 mb-14 text-gray-300">
          <p data-aos="fade-up" data-aos-delay="150">
            • Registered by the Company House, The Registrar of Companies for
            England and Wales as a Private Limited Company in 1999.
          </p>
          <p data-aos="fade-up" data-aos-delay="200">
            • Regulated by the Cyprus Security Exchange Commission (CySEC) since
            14th December 2014.
          </p>
          <p data-aos="fade-up" data-aos-delay="250">
            • Accredited by the Financial Conduct Authority (FCA) since 2015.
          </p>
          <p data-aos="fade-up" data-aos-delay="300">
            • Authorized and registered with the U.S. National Futures
            Association (NFA) – ID: 0308926 since 12/11/2001.
          </p>
          <p data-aos="fade-up" data-aos-delay="350">
            • Member of the Financial Commission (Category A), entitled to
            £20,000 coverage per client complaint.
          </p>
          <p data-aos="fade-up" data-aos-delay="400">
            • Granted a USA Markets Limited License under Section 14 of the
            Financial Services Act since 11th August 2000.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <img
            src="/images/certificate1.jpg"
            alt="Certificate 1"
            className="rounded-xl shadow-lg"
          />
          <img
            src="/images/certificate2.jpg"
            alt="Certificate 2"
            className="rounded-xl shadow-lg"
          />
          <img
            src="/images/certificate3.jpg"
            alt="Certificate 3"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
