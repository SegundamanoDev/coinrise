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

// Helper function to get auth state from localStorage
const getAuthFromLocalStorage = () => {
  try {
    const serializedAuth = localStorage.getItem("authUser");
    if (serializedAuth === null) {
      return { user: null, token: null };
    }
    const authData = JSON.parse(serializedAuth);
    // Ensure both user and token are present in the stored object
    return {
      user: authData.user || null,
      token: authData.token || null,
    };
  } catch (e) {
    console.error("Error parsing authUser from localStorage:", e);
    return { user: null, token: null };
  }
};

// PrivateRoute component to protect routes
const PrivateRoute = ({ children, roles }) => {
  // Prioritize Redux state, but fall back to localStorage if Redux is empty
  let { user, token } = useSelector((state) => state.auth);
  const location = useLocation();

  // If Redux state for user or token is empty, try localStorage
  if (!user || !token) {
    const localStorageAuth = getAuthFromLocalStorage();
    user = localStorageAuth.user;
    token = localStorageAuth.token;
  }

  // --- Add extensive logging here ---
  console.log("--- PrivateRoute Check ---");
  console.log("Location:", location.pathname);
  console.log("Token (after lookup):", token ? "Present" : "Missing");
  console.log("User Object (after lookup):", user);
  if (user) {
    console.log("User Role (after lookup):", user.role);
    console.log("Required Roles:", roles);
  }
  // --- End logging ---

  if (!token || !user) {
    console.log("PrivateRoute: Redirecting to sign-in (no token or user).");
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  // Check if user.role exists and matches the required roles
  if (roles && (!user.role || !roles.includes(user.role))) {
    console.log(
      `PrivateRoute: Access denied. User role '${user.role}' not in required roles.`
    );
    return <Navigate to="/dashboard" replace />; // Redirect to dashboard if role doesn't match
  }

  console.log("PrivateRoute: Access Granted.");
  return children;
};

// AdminRoute component to protect admin routes
const AdminRoute = ({ children }) => {
  // Prioritize Redux state, but fall back to localStorage if Redux is empty
  let { user, token } = useSelector((state) => state.auth);
  const location = useLocation();

  // If Redux state for user or token is empty, try localStorage
  if (!user || !token) {
    const localStorageAuth = getAuthFromLocalStorage();
    user = localStorageAuth.user;
    token = localStorageAuth.token;
  }

  // --- Add extensive logging here ---
  console.log("--- AdminRoute Check ---");
  console.log("Location:", location.pathname);
  console.log("Token (after lookup):", token ? "Present" : "Missing");
  console.log("User Object (after lookup):", user);
  if (user) {
    console.log("User Role (after lookup):", user.role);
  }
  // --- End logging ---

  if (!token || !user) {
    console.log("AdminRoute: Redirecting to sign-in (no token or user).");
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  // Ensure user.role exists and is strictly 'admin'
  if (user && user.role !== "admin") {
    console.log(
      `AdminRoute: Access denied. User role '${user.role}' is not 'admin'.`
    );
    return <Navigate to="/dashboard" replace />; // Redirect to dashboard if not an admin
  }

  console.log("AdminRoute: Access Granted.");
  return children;
};

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
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/withdraw"
            element={
              <PrivateRoute>
                <Withdraw />
              </PrivateRoute>
            }
          />
          <Route
            path="/withdrawal-pin"
            element={
              <PrivateRoute>
                <WithdrawPin />
              </PrivateRoute>
            }
          />
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
            path="/dh"
            element={
              <PrivateRoute>
                <DashboardPage />
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
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users/:id"
            element={
              <AdminRoute>
                <UserDetail />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/investments"
            element={
              <AdminRoute>
                <AdminInvestmentsDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/transactions"
            element={
              <AdminRoute>
                <AdminTransactions />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminRoute>
                <Setting />
              </AdminRoute>
            }
          />
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
