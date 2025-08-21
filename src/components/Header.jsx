import React, { useState } from "react";

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="w-full bg-black text-white shadow z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-16">
        {/* Logo Left */}
        <a href="/" className="flex items-center flex-shrink-0">
          <img
            src="/assets/logo1.jpg"
            alt="KitchenViz logo"
            className="h-10 w-auto rounded-lg bg-yellow-300"
          />
        </a>

        {/* Desktop Nav Links Center */}
        <div className="hidden md:flex flex-1 justify-center gap-8 font-medium text-base">
          <a href="#" className="hover:text-yellow-400 transition">Categories</a>
          <a href="#" className="hover:text-yellow-400 transition">New Arrivals</a>
          <a href="#" className="hover:text-yellow-400 transition">Corporate Gifting</a>
          <a href="#" className="hover:text-yellow-400 transition">Warranty Registration</a>
          <a href="#" className="hover:text-yellow-400 transition">Support</a>
        </div>

        {/* Action Buttons Right + Hamburger */}
        <div className="flex items-center gap-6">
          {/* Search Icon */}
          <button className="p-0 focus:outline-none" aria-label="Search">
            <svg className="w-7 h-7 text-gray-200 hover:text-yellow-400 transition"
              fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          {/* Cart Icon with Badge */}
          <button className="p-0 relative focus:outline-none" aria-label="Cart">
            <svg className="w-7 h-7 text-gray-200 hover:text-yellow-400 transition"
              fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12" />
            </svg>
            <span className="absolute -top-1 -right-2 bg-red-600 text-xs rounded-full px-1.5 py-0.5 text-white font-bold">2</span>
          </button>
          {/* Hamburger Icon */}
          <button
            className="md:hidden p-0 ml-2 focus:outline-none"
            aria-label="Toggle navigation"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            {mobileNavOpen ? (
              // Close icon
              <svg className="w-7 h-7 text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-7 h-7 text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>
      {/* Mobile Nav Drawer */}
      {mobileNavOpen && (
        <div className="md:hidden bg-black text-white px-4 pb-4 pt-2 rounded-b-lg shadow-lg">
          <a href="#" className="block py-2 hover:text-yellow-400">Categories</a>
          <a href="#" className="block py-2 hover:text-yellow-400">New Arrivals</a>
          <a href="#" className="block py-2 hover:text-yellow-400">Corporate Gifting</a>
          <a href="#" className="block py-2 hover:text-yellow-400">Warranty Registration</a>
          <a href="#" className="block py-2 hover:text-yellow-400">Support</a>
        </div>
      )}
    </header>
  );
}
