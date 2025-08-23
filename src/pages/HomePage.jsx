import React from "react";
import HeroSection from "../components/HeroSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactUs from "./ContactUs";
import ProductList from "../components/ProductList";

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
