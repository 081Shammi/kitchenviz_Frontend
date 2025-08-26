import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const cart = useSelector(state => state.cart.items || []);
  const cartCount = cart.reduce((sum, item) => sum + (item.qty || 0), 0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // White color for text/icons if not scrolled, dark on white if scrolled
  const baseText = scrolled ? "text-gray-900" : "text-white";
  const baseHover = scrolled ? "hover:text-yellow-600" : "hover:text-yellow-300";

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-white bg-opacity-95 backdrop-blur-md shadow-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="/assets/logo1.jpg"
            alt="KitchenViz"
            className="h-12 w-auto transition-transform duration-300 hover:scale-110"
            draggable={false}
          />
        </a>

        {/* Desktop menu */}
        <ul className={`hidden md:flex space-x-10 font-semibold ${baseText}`}>
          {/* <li>
            <a href="#" className={`transition ${baseHover}`}>
              Categories
            </a>
          </li> */}
          <li>
            <a
              href=""
              onClick={() => navigate("/exchange-policy")}
              className={`transition cursor-pointer ${baseHover}`}
            >
              Warranty Registration
            </a>
          </li>
          <li>
            <a
              href=""
              onClick={() => navigate("/contact-us")}
              className={`transition cursor-pointer ${baseHover}`}
            >
              Support
            </a>
          </li>
        </ul>

        {/* Action icons */}
        {/* Action icons */}
<div className="flex items-center space-x-6">
  {/* Cart button */}
  <button
    aria-label="Cart"
    onClick={() => navigate("/cart")}
    className={`relative transition ${scrolled ? "text-gray-900 hover:text-yellow-500" : "text-white hover:text-yellow-400"} mr-1 md:mr-0`}
    style={{ minWidth: 44, minHeight: 44 }} // Increase tap area
  >
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      viewBox="0 0 24 24"
      style={{ color: scrolled ? "#1a1a1a" : "#fff" }}
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12" />
    </svg>
    {cartCount > 0 && (
      <span className="absolute -top-2 -right-2 md:-top-1 md:-right-2 bg-red-600 text-xs rounded-full px-2 py-0.5 text-white font-bold shadow-md">
        {cartCount}
      </span>
    )}
  </button>

  {/* Hamburger for mobile */}
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    aria-label="Toggle navigation menu"
    className={`md:hidden flex flex-col space-y-1 w-7 h-7 justify-center items-center cursor-pointer ${scrolled ? "text-gray-900" : "text-white"}`}
    style={{ minWidth: 44, minHeight: 44,color: scrolled ? "#1a1a1a" : "#fff"  }} // Increase tap area
  >
    <span
      className={`block h-0.5 w-full bg-current rounded transform transition duration-300 ease-in-out ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
    />
    <span
      className={`block h-0.5 w-full bg-current rounded transition duration-300 ease-in-out ${menuOpen ? "opacity-0" : "opacity-100"}`}
    />
    <span
      className={`block h-0.5 w-full bg-current rounded transform transition duration-300 ease-in-out ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
    />
  </button>
</div>

      </nav>

      {/* Mobile slide-out menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-6 space-y-4 text-lg font-semibold text-gray-900">
          {/* <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="hover:text-yellow-600"
          >
            Categories
          </a> */}
          <a
            href="#"
            onClick={() => {
              setMenuOpen(false);
              navigate("/exchange-policy");
            }}
            className="hover:text-yellow-600"
          >
            Warranty Registration
          </a>
          <a
            href="#"
            onClick={() => {
              setMenuOpen(false);
              navigate("/contact-us");
            }}
            className="hover:text-yellow-600"
          >
            Support
          </a>
        </nav>
      </div>
      {/* Overlay when menu open */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
        />
      )}
    </header>
  );
}
