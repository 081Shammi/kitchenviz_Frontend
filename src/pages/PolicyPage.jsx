import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PolicyPage({ title, content }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-blue-50/30 via-white to-white py-12 px-4 sm:px-6 lg:px-8 font-sans mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-xl rounded-2xl p-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-7 text-yellow-600 tracking-tight">
              {title}
            </h1>
            <article
              className="prose prose-indigo prose-lg max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
