import React, { useState, useEffect, useRef, Suspense } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";

// Lazy image component with blur fallback
const LazyImage = ({ src, alt, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={
        "w-full h-full object-cover object-center transition duration-700" +
        (loaded ? "" : " blur-sm bg-gray-200")
      }
      {...rest}
    />
  );
};

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
      }, 5500);
    }
    return () => clearInterval(intervalRef.current);
  }, [pause, currentIndex, slides.length]);

  if (!slides.length) {
    return (
      <div className="w-full flex justify-center items-center h-[350px] md:h-[400px] bg-gray-100 rounded-2xl shadow my-8">
        Loading sliders...
      </div>
    );
  }

  const getImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (url.startsWith("assets/")) return `${API_BASE_URL}${url}`;
    return `${API_BASE_URL}${url}`;
  };

  return (
    <div className="relative w-full bg-black">
      <div className="relative w-full h-[400px] md:h-[58vh] overflow-hidden">
        {slides.map((slide, idx) => {
          // Use highest resolution possible for hero!
          const imgUrl =
            slide.image && slide.image.length > 0
              ? getImageUrl(
                  slide.image[0].image_url?.full?.high_res ||
                  slide.image[0].image_url?.thumbnail?.high_res ||
                  slide.image[0].image_url?.full?.low_res ||
                  slide.image[0].image_url?.thumbnail?.low_res
                )
              : "/assets/placeholder.jpg";
          const active = idx === currentIndex;
          return (
            <div
              key={slide._id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                active ? "opacity-100 z-20" : "opacity-0 z-10 pointer-events-none"
              }`}
              aria-hidden={!active}
            >
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <span className="text-lg text-gray-600">Loading…</span>
                  </div>
                }
              >
                <LazyImage src={imgUrl} alt={slide.name || `slide-${idx}`} />
              </Suspense>
              {/* Overlay Text, directly on image */}
              <div className="absolute left-0 bottom-[16%] md:bottom-[22%] pl-[7vw] text-left max-w-[53vw]">
                <h1
                  className="uppercase font-extrabold text-white/95 text-3xl md:text-5xl tracking-[.34em] drop-shadow-lg mb-2"
                  style={{
                    letterSpacing: ".24em",
                    fontFamily: "'Inter',sans-serif",
                  }}
                >
                  {slide.name}
                </h1>
                {slide.description && (
                  <div
                    className="text-white/80 text-xl md:text-2xl font-light tracking-wide mb-1 drop-shadow"
                    style={{
                      letterSpacing: ".13em",
                      textShadow: "0 2px 16px #000",
                    }}
                  >
                    {slide.description}
                  </div>
                )}
              </div>
              {/* Floating price + Shop badge, bottom-right */}
              {slide.product?.name && slide.product?._id && (
                <Link
                  to={`/product/${slide.product._id}`}
                  className="absolute bottom-[8%] right-[7vw] flex items-center gap-3 px-6 py-2 rounded-2xl bg-white/90 shadow-lg text-black font-semibold text-lg hover:bg-yellow-400 hover:text-black border border-white/60 transition"
                >
                  {slide.product.discountPrice ? (
                    <>
                      <span className="font-bold text-[#2E9248] text-lg">
                        ₹{slide.product.discountPrice}
                      </span>
                      <span className="line-through text-gray-400 text-base ml-1">
                        ₹{slide.product.price}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-black text-xl">
                      ₹{slide.product.price}
                    </span>
                  )}
                  <span className="ml-2 text-[1.13rem] font-bold">Shop Now</span>
                </Link>
              )}
            </div>
          );
        })}

        {/* Improved Left Arrow */}
        <button
          type="button"
          className="absolute top-1/2 left-4 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-yellow-400 transition"
          onClick={goToPrev}
          aria-label="Previous slide"
          style={{ padding: 0 }}
        >
          <svg
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: "block", margin: "auto" }}
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        {/* Improved Right Arrow */}
        <button
          type="button"
          className="absolute top-1/2 right-4 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-yellow-400 transition"
          onClick={goToNext}
          aria-label="Next slide"
          style={{ padding: 0 }}
        >
          <svg
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: "block", margin: "auto" }}
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute z-30 bottom-5 left-1/2 -translate-x-1/2 flex gap-7">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`w-6 h-1 rounded-full border border-gray-300 transition-all duration-200 ${
                i === currentIndex ? "bg-red-600 shadow-sm" : "bg-white"
              }`}
              onClick={() => goToSlide(i)}
              aria-current={i === currentIndex}
              aria-label={`Slide ${i + 1}`}
              style={{ outline: "none" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
