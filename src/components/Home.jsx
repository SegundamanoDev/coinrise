import React from "react";
import Navbar from "./Navbar";

import CryptoTicker from "./CryptoTicker";
import Footer from "./Footer";
import RealTimeBtcChart from "./RealTimeBtcChart";
import HeroSection from "./HeroSection";
import HowItWorksSection from "./HowItWorksSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import InvestmentPlansSection from "./InvestmentPlanSection";
import UserTestimonialsSection from "./UserTestimonialsSection";
import StatsCountersSection from "./StatsCountersSection";
import FAQSection from "./FAQSection";
import CTACallToActionSection from "./CTACallToActionSection";
import TrustSection from "./Trust";
import PartnerLogosSection from "./PartnerLogo";

const Home = () => {
  return (
    <>
      <Navbar />
      <CryptoTicker />
      <HeroSection />
      <TrustSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <RealTimeBtcChart />
      <PartnerLogosSection />
      <InvestmentPlansSection />
      <UserTestimonialsSection />
      <StatsCountersSection />
      <FAQSection />
      <CTACallToActionSection />

      <Footer />
    </>
  );
};

export default Home;
