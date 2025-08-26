// import React from "react";
// import HeroSection from "../components/HeroSection";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import ContactUs from "./ContactUs";
// import ProductList from "../components/ProductList";

// const HomePage = () => {
//   return <>
//     <Header />
//     <HeroSection />
//     <ProductList/>
//     <ContactUs />
//     <Footer/>
//   </>;
// };

// export default HomePage;
import React from "react";
import HeroSection from "../components/HeroSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactUs from "./ContactUs";
import ProductList from "../components/ProductList";

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[6.30rem] space-y-12">
        <HeroSection />
        <ProductList />
        <ContactUs />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;