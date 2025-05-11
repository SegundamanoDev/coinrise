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
import MarketOverview from "./MarketOverView";
import TechnicalAnalysis from "./TechnicalAnalysis";
import ForexCrossRates from "./ForexCrossRates";
import CertificateSection from "./CertificateSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <CryptoTicker />
      <HeroSection />
      <TrustSection />
      <MarketOverview />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <TechnicalAnalysis />
      <InvestmentPlansSection heading="TRADING PLANS" />
      <TestimonialSlider />
      <StatsCountersSection />
      <ForexCrossRates />

      <FAQSection />
      <CertificateSection />
      <CTACallToActionSection />
      <EarningsPopup />
      <Footer />
    </>
  );
};

export default Home;
