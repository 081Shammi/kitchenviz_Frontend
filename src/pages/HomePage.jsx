import React from "react";
import HeroSection from "../components/HeroSection";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

const HomePage = () => {
  return <>
    <Header />
    <HeroSection />
    <ProductList/>
    <Footer/>
  </>;
};

export default HomePage;
