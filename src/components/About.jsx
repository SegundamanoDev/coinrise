import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Lightbulb,
  Eye,
  Award,
  Sparkles,
  CheckCircle,
  Users,
  Briefcase,
  TrendingUp,
} from "lucide-react";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  // Generic fallback image if Unsplash fails (though less likely with these stable URLs)
  const defaultTeamImage =
    "https://placehold.co/120x120/1F2937/F3F4F6?text=Team";

  return (
    <div className="bg-gray-950 text-white font-montserrat relative overflow-hidden">
      {/* Background Gradients/Shapes for visual interest */}
      <div
        className="absolute top-0 left-0 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
        style={{ animationDelay: "-2s" }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
        style={{ animationDelay: "-4s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"
        style={{ animationDelay: "-6s" }}
      ></div>

      {/* Hero Banner Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden flex items-center justify-center text-center">
        <img
          src="/images/file_000000005dcc61f5be8aa0d22490900f.png"
          alt="About TrustVest Banner"
          className="absolute inset-0 w-full h-full object-cover transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-transparent to-purple-900/70 mix-blend-multiply opacity-80"></div>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 p-4" data-aos="fade-up">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight drop-shadow-lg">
            About TrustVest
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200 drop-shadow-md">
            Your trusted partner in navigating the future of finance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        {/* Our Story & Mission Section */}
        <div className="text-center mb-20">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 relative z-10
                       before:content-[''] before:absolute before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-36 before:h-1.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
            data-aos="fade-up"
          >
            Our Story & Mission
          </h2>
          <p
            className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            At **TrustVest**, we believe in democratizing access to high-growth
            investment opportunities. With **over 8 years of pioneering
            experience** in the dynamic Crypto and Forex markets, we've built a
            platform designed for both seasoned investors and newcomers alike.
          </p>
          <p
            className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Our mission is to create a level playing field, enabling
            individuals, groups, and businesses to effortlessly participate in
            and benefit from the global financial and stock markets. We bridge
            the gap between complex trading landscapes and simple, transparent
            wealth creation.
          </p>
          <p
            className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Our team of expert-managed trading and investment professionals
            meticulously crafts and diversifies portfolios, ensuring your funds
            are not just at work, but are strategically positioned for optimal,
            transparent returns with a favorable management fee.
          </p>
        </div>

        {/* Core Values Section */}
        <div className="mt-20 text-center mb-20">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-12 relative z-10
                       before:content-[''] before:absolute before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-36 before:h-1.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
            data-aos="fade-up"
          >
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {[
              {
                icon: <Lightbulb />,
                title: "Simplicity",
                content:
                  "We strive to remove all barriers, making online trading and investing accessible, intuitive, and straightforward for every user, regardless of their experience level.",
              },
              {
                icon: <Sparkles />,
                title: "Innovation",
                content:
                  "As pioneers in the FinTech revolution, we are committed to continuously integrating cutting-edge AI and blockchain technologies to enhance your trading and investment experience.",
              },
              {
                icon: <Eye />,
                title: "Transparency",
                content:
                  "Openness is at the heart of everything we do. We ensure a fully transparent experience by eliminating hidden fees and providing clear, verifiable transaction records.",
              },
              {
                icon: <Award />,
                title: "Excellence",
                content:
                  "Every detail, from our platform's design to our customer support, is meticulously crafted to offer a top-tier, reliable, and secure investment environment.",
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-800
                           transform hover:scale-105 hover:border-blue-500 transition-all duration-300 group"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className="mb-4 bg-gray-800 p-3 rounded-full inline-flex justify-center items-center shadow-inner">
                  {React.cloneElement(value.icon, {
                    className:
                      "text-blue-400 w-8 h-8 group-hover:text-blue-300 transition-colors duration-300",
                  })}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-base text-gray-400 leading-relaxed">
                  {value.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal & Regulatory Section */}
        <div className="mt-20 text-center mb-20">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-12 relative z-10
                       before:content-[''] before:absolute before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-36 before:h-1.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
            data-aos="fade-up"
          >
            Registered and Regulated
          </h2>
          <p
            className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Your security and trust are paramount. TrustVest operates under a
            robust framework of international regulations, ensuring a safe and
            compliant environment for all your investments.
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
                Registered by **Companies House**, The Registrar of Companies
                for England and Wales (since 1999).
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
                Accredited by the **Financial Conduct Authority (FCA)** in the
                UK (since 2015).
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
        </div>

        {/* Meet the Team Section */}
        <div className="mt-20 text-center">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-12 relative z-10
                       before:content-[''] before:absolute before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-36 before:h-1.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
            data-aos="fade-up"
          >
            Meet Our Expert Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              {
                name: "George Thompson",
                role: "Chief Executive Officer",
                image:
                  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120&h=120&facepad=2&fit=facearea&face=top",
              },
              {
                name: "Jack Smith",
                role: "Lead Software Engineer",
                image:
                  "https://images.unsplash.com/photo-1542178243-bc2e7f82855b?auto=format&fit=crop&q=80&w=120&h=120&facepad=2&fit=facearea&face=top",
              },
              {
                name: "Isabella Walker",
                role: "Head Market Analyst",
                image:
                  "https://images.unsplash.com/photo-1573496359142-b8d87734094b?auto=format&fit=crop&q=80&w=120&h=120&facepad=2&fit=facearea&face=top",
              },
              {
                name: "Able Raymond",
                role: "Senior Account Manager",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a3dd782ecc9?auto=format&fit=crop&q=80&w=120&h=120&facepad=2&fit=facearea&face=top",
              },
              {
                name: "Maria Sanchez",
                role: "Client Success Lead",
                image:
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120&h=120&facepad=2&fit=facearea&face=top",
              },
              {
                name: "Dr. Anya Sharma",
                role: "AI & Data Scientist",
                image:
                  "https://images.unsplash.com/photo-1557862921-37829c790f51?auto=format&fit=crop&q=80&w=120&h=120&facepad=2&fit=facearea&face=top",
              },
              {
                name: "Ben Carter",
                role: "Head of Compliance",
                image:
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120&facepad=2&fit=facearea&face=top",
              },
              {
                name: "Chloe Li",
                role: "Blockchain Specialist",
                image:
                  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=120&h=120&facepad=2&fit=facearea&face=top",
              },
              {
                name: "Daniel O'Connell",
                role: "Risk Management Officer",
                image:
                  "https://images.unsplash.com/photo-1531427186611-ecfd6fd9392c?auto=format&fit=crop&q=80&w=120&h=120&facepad=2&fit=facearea&face=top",
              },
              {
                name: "Jessica Kim",
                role: "Marketing Director",
                image:
                  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120&facepad=2&fit=facearea&face=top",
              },
              {
                name: "Paul Miller",
                role: "Senior Trader",
                image:
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120&h=120&facepad=2&fit=facearea&face=top",
              },
              {
                name: "Linda Brown",
                role: "Human Resources Lead",
                image:
                  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=120&h=120&facepad=2&fit=facearea&face=top",
              },
            ].map((member, index) => (
              <div
                key={member.name}
                className="p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-800
                           transform hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-blue-500 shadow-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultTeamImage;
                  }}
                />
                <h3 className="text-xl font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
