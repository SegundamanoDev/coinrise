import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react"; // Import CheckCircle icon for bullet points
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS CSS

const CertificateSection = () => {
  useEffect(() => {
    AOS.init({ once: true, offset: 100, duration: 800 }); // Initialize AOS
  }, []);

  return (
    <section className="bg-gray-950 text-white py-20 px-4 font-montserrat relative overflow-hidden">
      {/* Background Gradients/Shapes for visual interest */}
      <div
        className="absolute top-1/4 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
        style={{ animationDelay: "-2s" }}
      ></div>
      <div
        className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
        style={{ animationDelay: "-4s" }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 text-center relative z-10
                     before:content-[''] before:absolute before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-36 before:h-1.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
          data-aos="fade-up"
        >
          Regulation and Fund Safety
        </h2>
        <p
          className="max-w-3xl mx-auto mb-16 text-gray-300 text-lg md:text-xl text-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          As a fully regulated broker with over 8 years of experience, your
          safety is our priority. Your funds are protected by stringent
          compliance and industry best practices.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-16 max-w-5xl mx-auto">
          <li
            className="flex items-start text-gray-300 text-lg"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <CheckCircle
              size={24}
              className="text-blue-500 flex-shrink-0 mr-3 mt-1"
            />
            <span>
              Registered by **Companies House**, The Registrar of Companies for
              England and Wales (since 1999).
            </span>
          </li>
          <li
            className="flex items-start text-gray-300 text-lg"
            data-aos="fade-up"
            data-aos-delay="350"
          >
            <CheckCircle
              size={24}
              className="text-blue-500 flex-shrink-0 mr-3 mt-1"
            />
            <span>
              Regulated by the **Cyprus Securities and Exchange Commission
              (CySEC)** (since 2014).
            </span>
          </li>
          <li
            className="flex items-start text-gray-300 text-lg"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <CheckCircle
              size={24}
              className="text-blue-500 flex-shrink-0 mr-3 mt-1"
            />
            <span>
              Accredited by the **Financial Conduct Authority (FCA)** in the UK
              (since 2015).
            </span>
          </li>
          <li
            className="flex items-start text-gray-300 text-lg"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            <CheckCircle
              size={24}
              className="text-blue-500 flex-shrink-0 mr-3 mt-1"
            />
            <span>
              Authorized and registered with the **U.S. National Futures
              Association (NFA)** – ID: 0308926 (since 2001).
            </span>
          </li>
          <li
            className="flex items-start text-gray-300 text-lg"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <CheckCircle
              size={24}
              className="text-blue-500 flex-shrink-0 mr-3 mt-1"
            />
            <span>
              A proud member of the **Financial Commission (Category A)**,
              providing up to £20,000 coverage per client complaint.
            </span>
          </li>
          <li
            className="flex items-start text-gray-300 text-lg"
            data-aos="fade-up"
            data-aos-delay="550"
          >
            <CheckCircle
              size={24}
              className="text-blue-500 flex-shrink-0 mr-3 mt-1"
            />
            <span>
              Holds a **USA Markets Limited License** under Section 14 of the
              Financial Services Act (since 2000).
            </span>
          </li>
        </ul>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          {/* Ensure your image paths are correct relative to your public folder */}
          <img
            src="/images/certificate1.jpg"
            alt="Regulatory Certificate 1"
            className="rounded-xl shadow-2xl border border-gray-800 hover:scale-[1.02] transition-transform duration-300 hover:border-blue-500 object-cover w-full h-auto"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/400x300/1F2937/F3F4F6?text=Certificate+1";
            }} // Fallback
          />
          <img
            src="/images/certificate2.jpg"
            alt="Regulatory Certificate 2"
            className="rounded-xl shadow-2xl border border-gray-800 hover:scale-[1.02] transition-transform duration-300 hover:border-blue-500 object-cover w-full h-auto"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/400x300/1F2937/F3F4F6?text=Certificate+2";
            }} // Fallback
          />
          <img
            src="/images/certificate3.jpg"
            alt="Regulatory Certificate 3"
            className="rounded-xl shadow-2xl border border-gray-800 hover:scale-[1.02] transition-transform duration-300 hover:border-blue-500 object-cover w-full h-auto"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/400x300/1F2937/F3F4F6?text=Certificate+3";
            }} // Fallback
          />
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
