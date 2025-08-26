import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel, Spin, message } from "antd";
import { API_BASE_URL } from "../config";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { addToCart } from "../reducers/cart"; // make sure this path is correct
import { toast } from "react-toastify";

const getImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("assets/")) return `${API_BASE_URL}${url}`;
  return `${API_BASE_URL}${url}`;
};

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => {
        message.error("Failed to load product.");
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full text-center text-gray-600 mt-10">
        Product not found.
      </div>
    );
  }

  const images = Array.isArray(product.image) ? product.image : [];
  const mainImage =
    images[activeImageIdx]?.image_url?.full?.high_res ||
    images[activeImageIdx]?.image_url?.full?.low_res ||
    images[activeImageIdx]?.image_url?.thumbnail?.high_res ||
    images[activeImageIdx]?.image_url?.thumbnail?.low_res ||
    "";

  const hasDiscount =
    typeof product.productDiscountedPrice === "number" &&
    product.productDiscountedPrice > 0 &&
    product.productDiscountedPrice < product.price;
  const sellingPrice = hasDiscount
    ? product.price - product.productDiscountedPrice
    : product.price;
  const discountPercent = hasDiscount
    ? Math.round((product.productDiscountedPrice / product.price) * 100)
    : 0;

  // Correct, cross-compatible add to cart logic
  const handleAddToCart = () => {
  // Use product.id if available, fall back to _id just in case
  const productId = product.id || product._id;
  console.log("Adding to cart:", productId, "Quantity:", quantity);
  
  dispatch(addToCart({ id: productId, qty: quantity }));
  toast.success(`Added ${quantity} to cart!`);
  navigate("/cart");
};
  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto bg-white shadow rounded-xl my-8 flex flex-col md:flex-row overflow-hidden">
        {/* Left Column: Thumbnails and Main Image */}
        <div className="w-full md:w-5/12 flex bg-gray-50">
          {images.length > 1 && (
            <div className="flex flex-col gap-2 py-6 px-2">
              {images.map((img, idx) => {
                const thumb =
                  img.image_url?.thumbnail?.low_res ||
                  img.image_url?.full?.low_res ||
                  "";
                return (
                  <img
                    key={img._id || idx}
                    src={getImageUrl(thumb)}
                    alt={`thumb-${idx}`}
                    className={`w-14 h-14 object-contain bg-white 
                      border rounded-lg cursor-pointer
                      ${activeImageIdx === idx ? "border-yellow-400 ring-2 ring-yellow-400" : "border-gray-200"}`}
                    onClick={() => setActiveImageIdx(idx)}
                    style={{
                      transition: "all 0.1s",
                      boxShadow: activeImageIdx === idx ? "0 0 8px 0 #FFD60044" : "none",
                    }}
                  />
                );
              })}
            </div>
          )}

          <div className="flex-1 flex items-center justify-center p-6 bg-white">
            <img
              src={getImageUrl(mainImage)}
              alt={product.name}
              className="max-h-80 md:max-h-[420px] w-full object-contain rounded-xl bg-white"
              style={{ border: "1px solid #eee", maxWidth: "360px" }}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="w-full md:w-7/12 flex flex-col p-6 md:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-semibold">{product.name}</h2>
          </div>
          <div className="text-gray-500 text-sm mt-1 mb-1">{product.description}</div>

          <div className="flex items-center gap-4 mt-2 mb-2">
            <span className="text-3xl font-bold text-black">₹{sellingPrice}</span>
            {hasDiscount && (
              <span className="text-lg text-gray-400 line-through">₹{product.price}</span>
            )}
            {hasDiscount && (
              <span className="bg-[#EB1F27] text-white text-base px-3 py-1 font-semibold rounded-md">
                  {discountPercent}% OFF
              </span>
            )}
          </div>
          <div className="text-green-700 font-medium mb-3">
            {product.countInStock > 0 ? (
              <>In Stock: {product.countInStock}</>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </div>

          {/* Ratings, tax info, etc. */}
          <div className="mb-2">
            {product.rating ? (
              <span>
                <span className="text-yellow-400">★</span>
                <span className="font-bold ml-1">{product.rating.toFixed(1)}</span>
                {product.numReviews ? (
                  <span className="ml-1 text-gray-500">
                    ({product.numReviews} review{product.numReviews > 1 ? "s" : ""})
                  </span>
                ) : null}
              </span>
            ) : (
              <span className="text-gray-400">No ratings yet</span>
            )}
          </div>
          <div className="mb-3 text-gray-500">Tax included.</div>

          {/* Quantity selector */}
          <div className="flex items-center gap-2 mb-5">
            <label className="text-gray-700 font-medium" htmlFor="quantity">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              className="w-16 p-2 border rounded"
              min={1}
              max={product.countInStock}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, Math.min(product.countInStock, Number(e.target.value))))
              }
            />
          </div>

          <button
            className={`w-full py-3 rounded-lg text-lg font-bold shadow-sm transition
              ${
                product.countInStock > 0
                  ? "bg-yellow-400 text-black hover:bg-yellow-500"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            disabled={product.countInStock <= 0}
            onClick={handleAddToCart}
          >
            {product.countInStock > 0 ? "ADD TO CART" : "COMING SOON"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
