import React from "react";
import HeroSection from "../HeroSection/HeroSection";
import HowItWorks from "../../../components/HowItWorks/HowItWorks";
import WhyJoin from "../../../components/WhyJoin/WhyJoin";
import FeaturedClubs from "../FeaturedClubs/FeaturedClubs";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <FeaturedClubs></FeaturedClubs>
      <HowItWorks></HowItWorks>
      <WhyJoin></WhyJoin>
    </div>
  );
};

export default Home;
