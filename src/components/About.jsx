import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "../features/investmentPlan/investmentPlan";

const About = () => {
  const dispatch = useDispatch();
  const { plans } = useSelector((state) => state.investmentPlan);
  console.log(plans);
  useEffect(() => {
    dispatch(getAllPlans);
  }, [dispatch]);
  return <div>hello</div>;
};

export default About;
