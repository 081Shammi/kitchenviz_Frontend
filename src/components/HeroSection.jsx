import React, { useState, useEffect } from "react";

const images = [
  "/assets/logo1.jpg",
  "/assets/logo1.jpg",
  "/assets/logo1.jpg",
  "/assets/logo1.jpg",
  "/assets/logo1.jpg",
];

export default function CustomCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => setCurrentIndex(index);

  const goToPrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const goToNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  // Add automatic slide change every 3 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    // Cleanup on unmount or when currentIndex changes
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div id="indicators-carousel" className="relative w-full bg-white rounded-lg overflow-hidden">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden md:h-96">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            <img
              src={src}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-cover h-full"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Pill-shaped Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-2 bottom-3 left-1/2">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`w-8 h-2 transition-all duration-300 rounded-full ${
              idx === currentIndex ? "bg-[#eb3838]" : "bg-gray-300"
            }`}
            aria-current={idx === currentIndex}
            aria-label={`Slide ${idx + 1}`}
            onClick={() => goToSlide(idx)}
          ></button>
        ))}
      </div>

      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToPrev}
        aria-label="Previous slide"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white focus:outline-none">
          <svg
            className="w-4 h-4 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 1L1 5l4 4" />
          </svg>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white focus:outline-none">
          <svg
            className="w-4 h-4 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m1 9 4-4-4-4" />
          </svg>
        </span>
      </button>
    </div>
  );
}
