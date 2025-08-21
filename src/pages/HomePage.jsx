import React from "react";
import HeroSection from "../components/HeroSection";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import ContactUs from "./ContactUs";

const HomePage = () => {
  return <>
    <Header />
    <HeroSection />
    <ProductList/>
    <ContactUs />
    <Footer/>
  </>;
};

export default HomePage;
