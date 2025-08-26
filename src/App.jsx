import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import verifyToken from "./verifyjwt";
import { ROLES } from "./config";
import 'react-toastify/dist/ReactToastify.css';

// Public pages
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Exclusions from "./pages/Exclusions";
import ExchangePolicy from "./pages/ExchangePolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import ImportantNotes from "./pages/ImportantNotes";
import ContactUsPage from "./pages/ReachUs";
import RequestQuoteForm from "./components/forms/RequestQuoteForm";
import RecruitmentForm from "./components/forms/RecruitmentForm";
import Login from "./components/login/LoginForm";
import ProductDetail from "./components/ProductDetails";
import CartPage from "./components/Cart";
import CheckoutPage from "./components/Checkout";
import Get from "./components/forms/Get";

// Dashboard pages
import AdminLayout from "./layout/Layout";
import CategoryList from "./dashboard/tables/CategoryList";
import AddCategory from "./dashboard/tables/AddCategory";
import ProductListing from "./dashboard/tables/ProductList";
import AddProduct from "./dashboard/tables/AddProduct";
import ProductSliderList from "./components/slider/ProductSliderList";
import ProductSliderForm from "./components/slider/productSliderForm";
import OrderListing from "./dashboard/tables/OrderList";
import OrderDetailsPage from "./dashboard/tables/OrderDatailsPage";
import { ToastContainer } from "react-toastify";

// ✅ ScrollToTop on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const AppRouter = () => {
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user.value);

  const isAdmin = ROLES.ADMIN === user?.role;

  useEffect(() => {
    function checkAuth() {
      try {
        setIsLoading(true);
        if (user?.is_logged_in && user?.access_token) {
          const checkToken = verifyToken(user.access_token);
          setAuth(checkToken?.status === true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.error("Token verification error:", error);
        setAuth(false);
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, [user?.is_logged_in, user?.access_token]);

  if (isLoading || auth === null) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Not logged in → Public Pages */}
        {!auth ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            <Route path="/exchange-policy" element={<ExchangePolicy />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/important-notes" element={<ImportantNotes />} />
            <Route path="/exclusions" element={<Exclusions />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/recruitment" element={<RecruitmentForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/get" element={<Get />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : isAdmin ? (
          /* Logged in as ADMIN */
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<Navigate to="CategoryList" replace />} />
            <Route path="CategoryList" element={<CategoryList />} />
            <Route path="CategoryList/add" element={<AddCategory />} />
            <Route path="CategoryList/edit/:id" element={<AddCategory />} />
            <Route path="ProductSliderList" element={<ProductSliderList />} />
            <Route path="ProductSliderList/add" element={<ProductSliderForm />} />
            <Route path="ProductList" element={<ProductListing />} />
            <Route path="ProductList/add" element={<AddProduct />} />
            <Route path="ProductList/:id" element={<AddProduct />} />
            <Route path="OrderListing" element={<OrderListing />} />
            <Route path="orders/:id" element={<OrderDetailsPage />} />
          </Route>
        ) : (
          /* Logged in but NOT admin */
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AppRouter;
