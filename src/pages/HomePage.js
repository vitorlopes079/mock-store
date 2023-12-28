import React from "react";
import BestSellers from "../components/BestSellers";
import AboutUs from "../components/AboutUs";
import Hero from "../components/Hero";

function HomePage() {
  return (
    <div>
      <Hero />
      <BestSellers />
      <AboutUs />
    </div>
  );
}

export default HomePage;
