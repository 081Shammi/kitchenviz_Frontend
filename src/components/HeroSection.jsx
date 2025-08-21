import React, { useState, useEffect, useRef } from "react";

const images = [
  "/assets/hero1.jpg",
  "/assets/hero2.jpg",
  "/assets/image4.jpg",
  "/assets/hero4.jpg",
  "/assets/hero3.jpg",
];

export default function CustomCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef();

  // Pause auto-slide a bit after manual change
  const [pause, setPause] = useState(false);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setPause(true);
    setTimeout(() => setPause(false), 3500);
  };

  const goToPrev = () => {
    goToSlide(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };
  const goToNext = () => {
    goToSlide(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  // Auto slide every 5s
  useEffect(() => {
    if (!pause) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [pause, currentIndex]);

  return (
    <div className="relative w-full bg-white rounded-2xl shadow-md overflow-hidden max-w-6xl mx-auto mt-5">
      <div className="relative aspect-[21/9] overflow-hidden">
        {images.map((src, index) => (
          <div
            key={index}
            className={`
              absolute inset-0 w-full h-full transition-all duration-700 ease-in-out
              ${index === currentIndex ? "opacity-100 z-20 visible scale-100" : "opacity-0 z-10 invisible scale-95"}
            `}
            style={{ transitionProperty: "opacity, transform" }}
          >
            <img
              src={src}
              className="w-full h-full object-cover object-center"
              alt={`Slide ${index + 1}`}
              draggable="false"
            />
            {/* Optional: <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none z-30"></div> */}
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        type="button"
        className="absolute top-1/2 left-5 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-white/70 hover:bg-yellow-400 shadow-lg hover:shadow-2xl group transition"
        onClick={goToPrev}
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-black group-hover:text-yellow-800" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        className="absolute top-1/2 right-5 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-white/70 hover:bg-yellow-400 shadow-lg hover:shadow-2xl group transition"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-black group-hover:text-yellow-800" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicator Dots */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 gap-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`w-7 h-3 rounded-full border border-yellow-400 shadow-md transition-all duration-300 ${idx === currentIndex ? "bg-[#eb3838] scale-125" : "bg-white/80 hover:bg-yellow-200"}`}
            style={{ outline: "none" }}
            aria-current={idx === currentIndex}
            aria-label={`Slide ${idx + 1}`}
            onClick={() => goToSlide(idx)}
          ></button>
        ))}
      </div>
    </div>
  );
}
