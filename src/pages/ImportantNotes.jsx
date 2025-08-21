import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ImportantNotes() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-7 text-yellow-600 tracking-tight">
            Important Notes
          </h1>
          <ul className="list-disc list-inside space-y-4 text-lg text-gray-800">
            <li>
              <span className="font-medium text-gray-900">Kitchen Viz</span> reserves the right to reject a return or exchange request if the conditions of this policy are not met.
            </li>
            <li>
              In case of product unavailability for exchange, we may offer a suitable replacement or credit note.
            </li>
            <li>
              Shipping costs (if any) for exchanges outside damage-related claims will be communicated transparently in advance.
            </li>
            <li>
              This policy is subject to change without prior notice. The version applicable will be the one in effect at the time of your order.
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
