import React from "react";
import Navbar from "./Navbar";
import CryptoTicker from "./CryptoTicker";
import Footer from "./Footer";
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
import EarningsPopup from "./EarningsPopup";

const Home = () => {
  return (
    <>
      <Navbar />
      <CryptoTicker />
      <HeroSection />
      <TrustSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <PartnerLogosSection />
      <InvestmentPlansSection />
      <UserTestimonialsSection />
      <StatsCountersSection />
      <FAQSection />
      <CTACallToActionSection />
      <EarningsPopup />
      <Footer />
    </>
  );
};

export default Home;
