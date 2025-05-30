import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  UserPlus,
  Link2,
  Share2,
  DollarSign,
  Wallet,
  TrendingUp,
  BarChart2,
  Users,
} from "lucide-react"; // More relevant icons

const AffiliateProgram = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

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
      <div className="relative w-full h-[45vh] md:h-[60vh] overflow-hidden flex items-center justify-center text-center">
        <img
          src="/images/affiliate.jpg" // Your original image path
          alt="TrustVest Affiliate Program Banner"
          className="absolute inset-0 w-full h-full object-cover transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-transparent to-purple-900/70 mix-blend-multiply opacity-80"></div>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 p-4" data-aos="fade-up">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight drop-shadow-lg">
            TrustVest Affiliate Program
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200 drop-shadow-md">
            Partner with us, share the success, and unlock limitless earning
            potential.
          </p>
          <button
            onClick={() => navigate("/sign-up")}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 text-lg"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Become an Affiliate Today! &rarr;
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        {/* Program Overview */}
        <div className="text-center mb-20">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 relative z-10
                       before:content-[''] before:absolute before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-36 before:h-1.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
            data-aos="fade-up"
          >
            Your Path to Passive Income
          </h2>
          <p
            className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            TrustVest invites you to join our exclusive **Affiliate Program**, a
            lucrative opportunity designed for individuals, influencers, and
            communities. Leverage your network and earn substantial commissions
            by simply introducing new investors to our world-class trading
            platform.
          </p>
          <p
            className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Experience the simplicity of our **two-tier commission structure**:
            <span className="font-semibold text-blue-400">
              {" "}
              Earn an impressive **30% commission** on every investment made by
              your direct referrals
            </span>
            , and gain an additional{" "}
            <span className="font-semibold text-purple-400">
              **10% from investments made by their referrals (your
              sub-referrals)**
            </span>
            . No active trading account or personal deposits required to start
            earning!
          </p>
        </div>

        {/* How It Works Section */}
        <div className="mt-20 text-center mb-20">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-12 relative z-10
                       before:content-[''] before:absolute before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-36 before:h-1.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
            data-aos="fade-up"
          >
            It's Easy to Get Started
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <div
              className="p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-800
                         transform hover:scale-105 hover:border-blue-500 transition-all duration-300 group text-center"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <div className="mb-4 bg-gray-800 p-3 rounded-full inline-flex justify-center items-center shadow-inner">
                <UserPlus className="text-blue-400 w-8 h-8 group-hover:text-blue-300 transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                1. Register
              </h3>
              <p className="text-base text-gray-400 leading-relaxed">
                Sign up for a free TrustVest account to get instant access to
                your unique referral link in your personal dashboard.
              </p>
            </div>

            <div
              className="p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-800
                         transform hover:scale-105 hover:border-blue-500 transition-all duration-300 group text-center"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <div className="mb-4 bg-gray-800 p-3 rounded-full inline-flex justify-center items-center shadow-inner">
                <Link2 className="text-blue-400 w-8 h-8 group-hover:text-blue-300 transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                2. Copy Link
              </h3>
              <p className="text-base text-gray-400 leading-relaxed">
                Retrieve your personalized affiliate link directly from your
                dashboard—it's your key to earning commissions.
              </p>
            </div>

            <div
              className="p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-800
                         transform hover:scale-105 hover:border-blue-500 transition-all duration-300 group text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="mb-4 bg-gray-800 p-3 rounded-full inline-flex justify-center items-center shadow-inner">
                <Share2 className="text-blue-400 w-8 h-8 group-hover:text-blue-300 transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                3. Share & Refer
              </h3>
              <p className="text-base text-gray-400 leading-relaxed">
                Share your link across social media, messaging apps, blogs, or
                directly with friends and family.
              </p>
            </div>

            <div
              className="p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-800
                         transform hover:scale-105 hover:border-blue-500 transition-all duration-300 group text-center"
              data-aos="fade-up"
              data-aos-delay="450"
            >
              <div className="mb-4 bg-gray-800 p-3 rounded-full inline-flex justify-center items-center shadow-inner">
                <DollarSign className="text-blue-400 w-8 h-8 group-hover:text-blue-300 transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                4. Earn & Grow
              </h3>
              <p className="text-base text-gray-400 leading-relaxed">
                Watch your commissions grow as your referrals invest, and easily
                withdraw your earnings at any time.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/sign-up")}
            className="mt-12 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-bold py-3 px-10 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 text-lg"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            Start Earning with TrustVest &rarr;
          </button>
        </div>

        {/* Why Partner with TrustVest Section */}
        <div className="mt-20 text-center mb-20">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-12 relative z-10
                       before:content-[''] before:absolute before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-36 before:h-1.5 before:bg-gradient-to-r before:from-blue-500 before:to-purple-600 before:rounded-full"
            data-aos="fade-up"
          >
            Why Partner with TrustVest?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {[
              {
                icon: <TrendingUp />,
                title: "High Commission Rates",
                content:
                  "Our generous 30% direct commission and 10% second-tier commission ensure your efforts are richly rewarded, maximizing your earning potential.",
              },
              {
                icon: <Wallet />,
                title: "Flexible Earning, Easy Withdrawals",
                content:
                  "No active trading account or personal deposits are required to earn. Your commissions are processed efficiently and are fully withdrawable within 24 hours.",
              },
              {
                icon: <Users />,
                title: "Trusted & Global Brand",
                content:
                  "Partner with a legally certified and regulated platform with years of experience, a strong reputation, and a growing global user base.",
              },
              {
                icon: <BarChart2 />,
                title: "Seamless Tracking & Support",
                content:
                  "Utilize our intuitive dashboard to track your referrals and earnings in real-time. Our dedicated support team is always ready to assist you.",
              },
            ].map((benefit, index) => (
              <div
                key={benefit.title}
                className="p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-800
                           transform hover:scale-105 hover:border-blue-500 transition-all duration-300 group"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className="mb-4 bg-gray-800 p-3 rounded-full inline-flex justify-center items-center shadow-inner">
                  {React.cloneElement(benefit.icon, {
                    className:
                      "text-blue-400 w-8 h-8 group-hover:text-blue-300 transition-colors duration-300",
                  })}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-base text-gray-400 leading-relaxed">
                  {benefit.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section (Repeated for emphasis) */}
        <div
          className="mt-20 text-center p-10 bg-gradient-to-r from-blue-700 to-purple-800 rounded-3xl shadow-2xl"
          data-aos="zoom-in"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Ready to Amplify Your Income?
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Join the TrustVest Affiliate Program today and turn your network
            into a powerful source of passive income. It's simple, rewarding,
            and backed by a platform you can trust.
          </p>
          <button
            onClick={() => navigate("/sign-up")}
            className="bg-white text-gray-900 hover:bg-gray-200 font-bold py-4 px-12 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 text-xl"
          >
            Sign Up Now & Start Earning!
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProgram;
