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
import AdminDashboard from "./components/admin/AdminDashboard";
import Users from "./components/admin/User";
import Investments from "./components/admin/Investment";
import AdminTransactions from "./components/admin/Transaction";
import Referrals from "./components/admin/Referral";
import Logs from "./components/admin/Log";
import Setting from "./components/admin/Settings";

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

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/investments" element={<Investments />} />
        <Route path="/admin/transactions" element={<AdminTransactions />} />
        <Route path="/admin/referrals" element={<Referrals />} />
        <Route path="/admin/logs" element={<Logs />} />
        <Route path="/admin/settings" element={<Setting />} />
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
