import React from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

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
    </>
  );
};

export default Home;
