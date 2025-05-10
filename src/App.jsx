import React, { useEffect, useLayoutEffect, useState } from "react";
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
import ScrollToTop from "react-scroll-to-top";
import ScrollToTops from "./components/ScrollToTop";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import LoadingSpinner from "./components/LoadingSpinner";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import AMLPolicy from "./components/AMLPolicy";
import { ThemeProvider } from "./components/context/ThemeContext";
import Whatsapp from "./components/Whatsapp";
import UpgradeAccount from "./components/UpgradeAccount";
import DepositHistory from "./components/DepositHistory";

// Custom wrapper to check route
const AppRoutes = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [showRoutes, setShowRoutes] = useState(false);

  useLayoutEffect(() => {
    // Before render: hide routes and show loader
    setShowRoutes(false);
    setLoading(true);
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowRoutes(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [location]);

  const hideSupportBar = ["/sign-in", "/sign-up"].includes(location.pathname);
  const hidewhatsapp = ["/sign-in", "/sign-up"].includes(location.pathname);

  return (
    <>
      {loading && <LoadingSpinner />}
      {showRoutes && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/mining-pool" element={<MiningPoolPage />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/transaction-history" element={<Transactions />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/deposit-history" element={<DepositHistory />} />
          <Route path="/invest" element={<Invest />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/confirm-success" element={<SuccessModal />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/view-investment" element={<ViewInvestment />} />
          <Route path="/activity-overview" element={<ActivityOverview />} />
          <Route
            path="/invest/confirm/:planId"
            element={<ConfirmInvestment />}
          />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/users/:id" element={<Users />} />
          <Route path="/admin/investments" element={<Investments />} />
          <Route path="/admin/transactions" element={<AdminTransactions />} />
          <Route path="/admin/referrals" element={<Referrals />} />
          <Route path="/admin/logs" element={<Logs />} />
          <Route path="/admin/settings" element={<Setting />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/aml-policy" element={<AMLPolicy />} />
          <Route path="/upgrade-account" element={<UpgradeAccount />} />
        </Routes>
      )}

      {/* Only show support on allowed pages */}
      {!hideSupportBar && <StickySupportBar />}
      {!hidewhatsapp && <Whatsapp />}
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <ScrollToTops />
    <ScrollToTop
      smooth
      color="#fff"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#333",
        borderRadius: "50%",
        zIndex: 9999,
        width: "50px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
    <Provider store={store}>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);

export default App;
