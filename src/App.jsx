import { useLocation } from "react-router-dom";
// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Routes, Route } from "react-router-dom";
import verifyToken from "./verifyjwt";
import { ROLES } from "./config";

// Public pages
import HomePage from "./pages/HomePage";
import RequestQuoteForm from "./components/forms/RequestQuoteForm";
import RecruitmentForm from "./components/forms/RecruitmentForm";
import Login from "./components/login/LoginForm";
import ProductDetail from "./components/ProductDetails";
// Dashboard pages
import RootOutlet from "./dashboard/RootOutlet";
import DefaultOutlet from "./dashboard/DefaultOutlet";
import GetQuoteinfo from "./dashboard/tables/GetQuoteinfo";
import Recruitmentinfo from "./dashboard/tables/Recruitmentinfo";
import AdminLayout from "./layout/Layout";
import Get from "./components/forms/Get";
import { i } from "motion/react-client";

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
          if (checkToken?.status === true) {
            setAuth(true);
          } else {
            setAuth(false);
          }
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* If NOT logged in → show public pages */}
        {!auth ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/request-quote" element={<RequestQuoteForm />} />
            <Route path="/recruitment" element={<RecruitmentForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/get" element={<Get />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : isAdmin ? (
          /* If logged in & admin → allow dashboard */
          <>
            <Route path="/dashboard" element={<AdminLayout />}>
              <Route index element={<Navigate to="getquote" replace />} />
              <Route path="getquote" element={<GetQuoteinfo />} />
              <Route path="recruitment" element={<Recruitmentinfo />} />
            </Route>
          </>
        ) : (
          /* If logged in but NOT admin → redirect to home or logout */
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRouter;
