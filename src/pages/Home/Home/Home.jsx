import React from "react";
import HeroSection from "../HeroSection/HeroSection";
import HowItWorks from "../../../components/HowItWorks/HowItWorks";
import WhyJoin from "../../../components/WhyJoin/WhyJoin";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <HowItWorks></HowItWorks>
      <WhyJoin></WhyJoin>
    </div>
  );
};

export default Home;
