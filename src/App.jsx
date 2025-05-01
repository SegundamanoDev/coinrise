import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import MiningPoolPage from "./components/MiningPool";
import DashboardLayout from "./components/Dashboard";
import Transactions from "./components/Transaction";
import Deposit from "./components/Deposit";
import Invest from "./components/Invest";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Withdraw from "./components/Withdraw";
import ConfirmInvestment from "./components/ConfirmInvest";
import SuccessModal from "./components/SuccMsg";
import ViewInvestment from "./components/ViewInvestment";
import ActivityOverview from "./components/ActivityOverview";
import StickySupportBar from "./components/SupportChat";
import AOS from "aos";
import "aos/dist/aos.css";

// Custom wrapper to check route
const AppRoutes = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const location = useLocation();
  const hideSupportBar = ["/sign-in", "/sign-up"].includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/mining-pool" element={<MiningPoolPage />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/transaction" element={<Transactions />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/confirm-success" element={<SuccessModal />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/view-investment" element={<ViewInvestment />} />
        <Route path="/activity-overview" element={<ActivityOverview />} />
        <Route path="/invest/confirm/:planId" element={<ConfirmInvestment />} />
      </Routes>

      {/* Only show support on allowed pages */}
      {!hideSupportBar && <StickySupportBar />}
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
