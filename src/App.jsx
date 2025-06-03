import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import DashboardLayout from "./components/Dashboard";
import Transactions from "./components/Transaction";
import Deposit from "./components/Deposit";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Withdraw from "./components/Withdraw";
import ConfirmInvestment from "./components/ConfirmInvest";
import SuccessModal from "./components/SuccMsg";
import ActivityOverview from "./components/ActivityOverview";
import StickySupportBar from "./components/SupportChat";
import AOS from "aos";
import "aos/dist/aos.css";
import AdminDashboard from "./components/admin/AdminDashboard";
import Users from "./components/admin/User";
import UserDetail from "./components/admin/UserDetail";
import AdminTransactions from "./components/admin/Transaction";
import Setting from "./components/admin/Settings";
import ScrollToTops from "./components/ScrollToTop";
import { store } from "./redux/store";
import { Provider, useSelector } from "react-redux"; // Import useSelector
import LoadingSpinner from "./components/LoadingSpinner";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import AMLPolicy from "./components/AMLPolicy";
import { ThemeProvider } from "./components/context/ThemeContext";
// import Whatsapp from "./components/Whatsapp";
import UpgradeAccount from "./components/UpgradeAccount";
import DepositHistory from "./components/DepositHistory";
import WithdrawPin from "./components/WithdrawPin";
import AffiliateProgram from "./components/AffiliateProgram";
import Footer from "./components/Footer";

// Import ToastContainer and toast styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InvestmentPlans from "./components/CreateInvestmentPlan";
import AdminInvestmentsDashboard from "./components/admin/Investment";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import TradingPlans from "./components/InvestmentPlanSection";
import ProfilePage from "./components/Profile";
import DashboardPage from "./components/DhPage";
import InvestmentPlanSection from "./components/InvestmentPlan";

// PrivateRoute component to protect routes
const PrivateRoute = ({ children, roles }) => {
  const { user, token } = useSelector((state) => state.auth); // Access auth state from Redux
  const location = useLocation();

  if (!token || !user) {
    // Redirect to sign-in page if not authenticated
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  if (roles && !roles.includes(user.role)) {
    // Redirect to a forbidden page or dashboard if user role doesn't match
    // For now, redirecting to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// // AdminRoute component to protect admin routes
// const AdminRoute = ({ children }) => {
//   const { user, token } = useSelector((state) => state.auth);
//   const location = useLocation();

//   if (!token || !user) {
//     return <Navigate to="/sign-in" replace state={{ from: location }} />;
//   }

//   if (user && user.role !== "admin") {
//     // Redirect to a forbidden page or regular dashboard if not an admin
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };

const AppRoutes = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [showRoutes, setShowRoutes] = useState(false);

  useLayoutEffect(() => {
    setShowRoutes(false);
    setLoading(true);
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowRoutes(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [location]);

  const hideSupportBar = [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password/:token",
  ].includes(location.pathname);
  const hidewhatsapp = [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password/:token",
  ].includes(location.pathname);
  const footer = [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password/:token",
  ].includes(location.pathname);

  return (
    <>
      {loading && <LoadingSpinner />}
      {showRoutes && (
        <Routes>
          {/* Public Routes - Accessible without login */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/aml-policy" element={<AMLPolicy />} />
          <Route path="/confirm-success" element={<SuccessModal />} />{" "}
          {/* Consider if this should be public or private */}
          {/* Authenticated User Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          />
          <Route
            path="/transaction-history"
            element={
              <PrivateRoute>
                <Transactions />
              </PrivateRoute>
            }
          />
          <Route
            path="/deposit"
            element={
              <PrivateRoute>
                <Deposit />
              </PrivateRoute>
            }
          />
          <Route
            path="/deposit-history"
            element={
              <PrivateRoute>
                <DepositHistory />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-investmentplan"
            element={
              <PrivateRoute>
                <InvestmentPlans />
              </PrivateRoute>
            }
          />
          <Route
            path="/investment-plans"
            element={
              <PrivateRoute>
                <InvestmentPlanSection />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/withdraw"
            element={
              <PrivateRoute>
                <Withdraw />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/withdrawal-pin"
            element={
              <PrivateRoute>
                <WithdrawPin />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/activity-overview"
            element={
              <PrivateRoute>
                <ActivityOverview />
              </PrivateRoute>
            }
          />
          <Route
            path="/invest/confirm/:planId"
            element={
              <PrivateRoute>
                <ConfirmInvestment />
              </PrivateRoute>
            }
          />
          <Route
            path="/affiliate"
            element={
              <PrivateRoute>
                <AffiliateProgram />
              </PrivateRoute>
            }
          />
          <Route
            path="/upgrade-account"
            element={
              <PrivateRoute>
                <UpgradeAccount />
              </PrivateRoute>
            }
          />
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/users/:id" element={<UserDetail />} />
          <Route
            path="/admin/investments"
            element={<AdminInvestmentsDashboard />}
          />
          <Route path="/admin/transactions" element={<AdminTransactions />} />
          <Route path="/admin/settings" element={<Setting />} />
        </Routes>
      )}

      {!hideSupportBar && <StickySupportBar />}
      {/* {!hidewhatsapp && <Whatsapp />} */}
      {!footer && <Footer />}

      {/* Toast notifications container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <ScrollToTops />
    <Provider store={store}>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);

export default App;
