import React from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import CryptoTicker from "./CryptoTicker";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div
        className=" text-center font-semibold font-sans"
        onClick={() => navigate("/dashboard")}
      >
        Goto Dashboard
      </div>
      <CryptoTicker />
    </>
  );
};

export default Home;
