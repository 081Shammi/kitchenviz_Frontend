import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HowToReachUs() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-center mb-3 text-gray-900 tracking-tight">
            How to Reach Us
          </h1>
          <p className="text-lg text-gray-500 text-center mb-8">
            For any concerns regarding returns, exchanges, or product functionality, please contact:
          </p>
          <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-5 items-center">
            <div className="w-full">
              <span className="block text-gray-700 font-semibold text-base mb-1">Customer Service Email</span>
              <a
                href="mailto:kitchenvission@gmail.com"
                className="text-indigo-700 font-bold text-base underline break-all"
              >
                kitchenvission@gmail.com
              </a>
            </div>
            <div className="w-full">
              <span className="block text-gray-700 font-semibold text-base mb-1">
                Working Hours
              </span>
              <span className="text-gray-900 text-base">
                Monday to Saturday, 10:00 AM – 6:00 PM
              </span>
            </div>
            <div className="w-full">
              <span className="block text-gray-700 font-semibold text-base mb-1">
                Response Time
              </span>
              <span className="text-gray-900 text-base">
                Within 24–48 hours (working days)
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
