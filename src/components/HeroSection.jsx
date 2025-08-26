import React, { useState, useEffect, useRef, Suspense } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Link } from "react-router-dom";

const LazyImage = ({ src, alt, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={
        "w-full h-full object-cover object-center transition duration-700 ease-in-out " +
        (loaded ? "opacity-100 blur-0" : "opacity-0 blur-sm bg-gray-200")
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
  const [defaultIndex, setDefaultIndex] = React.useState(0);
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}slider`)
      .then((res) => setSlides(res.data || []))
      .catch(() => setSlides([]));
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setDefaultIndex((prev) => (prev + 1) % defaultImages.length);
    }, 5000); // slide every 3 seconds
    return () => clearInterval(timer);
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
  }, [pause, slides.length]);
  const defaultImages = [
    "/assets/sliderpro2.png",
    "/assets/sliderpro3.png",
    // "/assets/default3.jpg",
    // add more default images if you like
  ];


  const getImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (url.startsWith("assets/")) return `${API_BASE_URL}${url}`;
    return `${API_BASE_URL}${url}`;
  };
 if (!slides.length) {
  return (
    <section className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] xl:h-[700px] flex items-center justify-center overflow-hidden bg-transparent">
      <div className="relative w-full h-full shadow-lg bg-transparent rounded-xl overflow-hidden">
        {defaultImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === defaultIndex ? "opacity-100 z-20" : "opacity-0 z-10 pointer-events-none"
            }`}
            aria-hidden={idx !== defaultIndex}
          >
            <img
              src={img}
              alt={`Default slide ${idx + 1}`}
              className="w-full h-full object-cover object-center"
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/25" />
            {/* Optional overlay text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-30">
              <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">Welcome</h1>
              <p className="text-lg text-white mt-2 drop-shadow-lg">Explore our amazing products</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
  // Transparent bg, overlay, and text as in flowbite-react
  return (
    <section className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] xl:h-[700px] flex items-center justify-center overflow-hidden bg-transparent">
      <div className="relative w-full h-full shadow-lg bg-transparent rounded-2xl overflow-hidden">
        {slides.map((slide, idx) => {
          const imgUrl =
            slide.image && slide.image.length > 0
              ? getImageUrl(
                slide.image[0].image_url?.full?.high_res ||
                slide.image[0].image_url?.thumbnail?.high_res ||
                slide.image[0].image_url?.full?.low_res ||
                slide.image[0].image_url?.thumbnail?.low_res
              )
              : "/assets/hero3.jpg";

          const active = idx === currentIndex;

          return (
            <div
              key={slide._id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${active ? "opacity-100 z-20" : "opacity-0 z-10 pointer-events-none"
                }`}
              aria-hidden={!active}
            >
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center bg-gray-300 rounded-2xl">
                    <span className="text-lg text-gray-600">Loading…</span>
                  </div>
                }
              >
                <LazyImage src={imgUrl} alt={slide.name || `slide-${idx}`} />
              </Suspense>

              {/* Semi-transparent black overlay for text contrast */}
              <div className="absolute inset-0 bg-black/25" />
              {/* Centered, styled overlay text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-8">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-200 to-orange-200 drop-shadow-2xl mb-6 tracking-tight leading-tight" style={{ fontFamily: "'Inter',sans-serif", textShadow: '0 4px 24px rgba(0,0,0,0.7)' }}>
                  {slide.name}
                </h1>
                {slide.description && (
                  <p className="text-white/90 max-w-3xl mx-auto font-medium drop-shadow-xl text-lg sm:text-2xl md:text-3xl lg:text-4xl tracking-wide mb-4" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
                    {slide.description}
                  </p>
                )}
              </div>
              {slide.product?.name && slide.product?._id && (
                console.log(slide.product),

                <Link
                  to={`/product/${slide.product?._id}`}
                  className="absolute bottom-[8%] right-[7vw] flex items-center gap-4 px-6 py-3 rounded-3xl bg-white/90 shadow-lg text-black font-semibold text-lg hover:bg-yellow-400 hover:text-black border border-white/60 transition select-none"
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
                  <span className="text-lg font-bold">Shop Now</span>
                </Link>
              )}
            </div>
          );
        })}
        {/* Navigation arrows */}
        <button
          type="button"
          className="absolute top-1/2 left-4 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-yellow-400 focus:outline-none transition"
          onClick={goToPrev}
          aria-label="Previous slide"
        >
          <svg
            className="w-7 h-7 stroke-black"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-4 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-yellow-400 focus:outline-none transition"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <svg
            className="w-7 h-7 stroke-black"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
        {/* Dots */}
        <div className="absolute z-30 bottom-5 left-1/2 -translate-x-1/2 flex gap-6">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`w-6 h-1 rounded-full border border-gray-300 transition-all duration-300 ${i === currentIndex ? "bg-red-600 shadow-md" : "bg-white"}`}
              onClick={() => goToSlide(i)}
              aria-current={i === currentIndex}
              aria-label={`Slide ${i + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );


}
