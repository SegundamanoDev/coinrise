import React from "react";
import Navbar from "./components/Navbar";
import DashboardLayout from "./components/Dashboard";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./components/Home";
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
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import MiningPoolPage from "./components/MiningPool";
import About from "./components/About";
import Contact from "./components/Contact";
const App = () => {
  return (
    <>
      <BrowserRouter>
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

          <Route
            path="/invest/confirm/:planId"
            element={<ConfirmInvestment />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
