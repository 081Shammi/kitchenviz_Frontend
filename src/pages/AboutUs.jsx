import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const aboutText = [
  "At Kitchen Viz, we are reimagining the modern kitchen for today’s fast-paced, space-conscious, and tech-savvy lifestyle. Our mission is to simplify home cooking through smart, sustainable, and space-saving appliances that blend innovation with everyday convenience.",
  "Whether you're living in a compact urban home or just seeking smarter solutions, our products are crafted to make cooking faster, easier, and more efficient without compromising on style or functionality.",
  "Founded by Suhas Kori, Kitchen Viz brings together cutting-edge technology, ergonomic design, and eco-friendly principles to create a new standard in kitchen living. We’re not just building appliances—we’re building smarter homes, one kitchen at a time.",
];

const highlights = [
  {
    title: "Who We Serve",
    content:
      "Millennials, small families, and tech-savvy individuals who value quality and innovation in their kitchen experience.",
  },
  {
    title: "Our Vision",
    content:
      "The global smart kitchen market is growing rapidly, and Kitchen Viz is ready to lead with fresh ideas and cutting-edge designs.",
  },
  {
    title: "What We Offer",
    content:
      "Sleek, multi-functional, and smart kitchen devices that save time, energy, and space. Appliances that think for you—so you can focus on what matters most.",
  },
  {
    title: "Our Approach",
    content:
      "From direct-to-consumer sales to strategic B2B partnerships, our approach is both agile and scalable. We're more than just a kitchen brand: we’re a lifestyle choice for the modern cook.",
  },
  {
    title: "Our Team",
    content:
      "Small, creative, and committed to delivering meaningful innovation and stylish solutions for modern kitchens.",
  },
];

const problem = `In today’s urban homes, limited space, busy lifestyles, and inefficient appliances make home cooking a hassle. Traditional kitchen setups are bulky, outdated, and not designed for the needs of modern users.`;

const mission = `Our mission is to transform everyday cooking by delivering sleek, multi-functional, and smart kitchen devices that save time, energy, and space.`;

const AboutUsPage = () => {
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center pt-10 pb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-600 text-center mb-8 drop-shadow-sm">
          Welcome to Kitchen Viz
        </h1>
        <div className="max-w-3xl w-full mx-auto mb-10 space-y-7">
          {aboutText.map((para, i) => (
            <p
              key={i}
              className="text-lg md:text-xl leading-relaxed text-gray-800 text-left sm:text-justify"
            >
              {para}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full mb-12">
          {highlights.map((block, idx) => (
            <div
              key={block.title}
              className="bg-yellow-100 border-l-8 border-yellow-400 rounded-2xl p-7 shadow-md transition hover:shadow-lg"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-2 text-yellow-900">{block.title}</h2>
              <p className="text-gray-700 text-base sm:text-lg">{block.content}</p>
            </div>
          ))}
        </div>
        {/* Problem Section */}
        <div className="w-full max-w-3xl mx-auto mb-7">
          <h2 className="text-2xl font-bold mb-2 text-red-600 tracking-tight">The Problem</h2>
          <p className="text-lg text-gray-700">{problem}</p>
        </div>
        {/* Mission Section */}
        <div className="w-full max-w-3xl mx-auto mb-0">
          <h2 className="text-2xl font-bold mb-2 text-indigo-700 tracking-tight">Our Mission</h2>
          <p className="text-lg text-gray-700">{mission}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
