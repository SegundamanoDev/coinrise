import React from "react";
import Navbar from "./Navbar";
import CryptoTicker from "./CryptoTicker";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import HowItWorksSection from "./HowItWorksSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import InvestmentPlansSection from "./InvestmentPlanSection";
import StatsCountersSection from "./StatsCountersSection";
import FAQSection from "./FAQSection";
import CTACallToActionSection from "./CTACallToActionSection";
import TrustSection from "./Trust";
import EarningsPopup from "./EarningsPopup";
import TestimonialSlider from "./UserTestimonialsSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <CryptoTicker />
      <HeroSection />
      <TrustSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <InvestmentPlansSection />
      <TestimonialSlider />
      <StatsCountersSection />
      <FAQSection />
      <CTACallToActionSection />
      <EarningsPopup />
      <Footer />
    </>
  );
};

export default Home;
