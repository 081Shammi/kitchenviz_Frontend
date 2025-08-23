import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";

export default function CustomCarousel() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef();
  const [pause, setPause] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}slider`)
      .then((res) => setSlides(res.data || []))
      .catch(() => setSlides([]));
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setPause(true);
    setTimeout(() => setPause(false), 3500);
  };

  const goToPrev = () => {
    goToSlide(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };
  const goToNext = () => {
    goToSlide(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    if (slides.length === 0) return;
    if (!pause) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [pause, currentIndex, slides.length]);

  if (!slides.length) {
    return (
      <div className="w-full flex justify-center items-center h-72 bg-gray-50 rounded-2xl shadow my-8">
        Loading sliders...
      </div>
    );
  }

  // Helper to pick an image with a fallback
  const getImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (url.startsWith("assets/")) return `${API_BASE_URL}${url}`;
    return `${API_BASE_URL}${url}`;
  };

  return (
    <div className="relative w-full bg-white rounded-2xl shadow-md overflow-hidden max-w-6xl mx-auto mt-5">
      <div className="relative aspect-[21/9] overflow-hidden min-h-[350px]">
        {slides.map((slide, index) => {
          // Pick image safely: thumbnail.low_res > full.low_res > placeholder
          const img =
            slide.image && slide.image.length > 0
              ? (
                slide.image[0].image_url?.thumbnail?.low_res ||
                slide.image.image_url?.thumbnail?.high_res ||
                slide.image.image_url?.full?.low_res ||
                slide.image.image_url?.full?.high_res
              )
              : null;
          const imageUrl = img ? getImageUrl(img) : "/assets/placeholder.jpg";

          return (
            <div
              key={slide._id}
              className={`
                absolute inset-0 w-full h-full transition-all duration-700 ease-in-out 
                ${index === currentIndex ? "opacity-100 z-20 visible scale-100" : "opacity-0 z-10 invisible scale-95"}
              `}
              style={{ transitionProperty: "opacity, transform" }}
            >
              <img
                src={imageUrl}
                className="w-full h-full object-cover object-center rounded-2xl"
                alt={slide.name || `Slide ${index + 1}`}
                draggable="false"
              />
              {/* Overlay */}
              <div className="absolute bottom-10 left-10 z-30 p-0">
                <div className="bg-black/60 rounded-2xl px-7 py-6 shadow-xl max-w-xl backdrop-blur-[2px] flex flex-col gap-2">
                  <h2
                    className="text-3xl md:text-4xl font-extrabold text-white mb-0 leading-tight"
                    style={{
                      textShadow: "0 3px 18px #000, 0 2px 3px #333",
                      letterSpacing: "0.5px",
                      lineHeight: 1.1
                    }}
                  >
                    {slide.name}
                  </h2>
                  {slide.description && (
                    <p
                      className="text-white text-lg md:text-xl font-light opacity-90 mb-0"
                      style={{
                        textShadow: "0 2px 5px #111",
                        maxWidth: 530,
                        lineHeight: 1.4,
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical"
                      }}
                    >
                      {slide.description}
                    </p>
                  )}
                  {slide.product?.name && slide.product?._id && (
                    <Link
                      to={`/product/${slide.product._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <span
                        className="mt-2 inline-block px-5 py-1.5 rounded-full bg-yellow-400 text-black font-semibold text-base shadow cursor-pointer hover:bg-yellow-500 transition"
                        style={{
                          boxShadow: "0 2px 8px #ffd60099",
                        }}
                      >
                        {slide.product.name}
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
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
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`w-7 h-3 rounded-full border border-yellow-400 shadow-md transition-all duration-300 ${idx === currentIndex ? "bg-[#eb3838] scale-125" : "bg-white/80 hover:bg-yellow-200"
              }`}
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
