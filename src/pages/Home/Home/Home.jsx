import React from "react";
import HeroSection from "../HeroSection/HeroSection";
import HowItWorks from "../../../components/HowItWorks/HowItWorks";
import WhyJoin from "../../../components/WhyJoin/WhyJoin";
import FeaturedClubs from "../FeaturedClubs/FeaturedClubs";
import PopularClubs from "../../../components/PopularClubs/PopularClubs";
import HomeStatistics from "../../../components/HomeStatistics/HomeStatistics";
import Testimonials from "../../../components/Testimonials/Testimonials";
import CTASection from "../../../components/CTASection/CTASection";
import FAQSection from "../../../components/FAQSetion/FAQSection";
import ContactSection from "../../../components/ContactSection/ContactSection";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <FeaturedClubs></FeaturedClubs>
      <HowItWorks></HowItWorks>
      <WhyJoin></WhyJoin>
      <PopularClubs></PopularClubs>
      <HomeStatistics></HomeStatistics>
      <Testimonials></Testimonials>
      <CTASection></CTASection>
      <FAQSection></FAQSection>
      <ContactSection></ContactSection>
    </div>
  );
};

export default Home;
