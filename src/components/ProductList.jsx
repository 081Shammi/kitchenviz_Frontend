import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Carousel, Spin, message } from "antd";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useDispatch } from "react-redux";
import { addToCart } from "../reducers/cart"; // make sure path is correct

const getImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("assets/")) return `${API_BASE_URL}${url}`;
  return `${API_BASE_URL}${url}`;
};

export default function ProductList() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}product`)
      .then((res) => setProducts(res.data))
      .catch(() => {
        message.error("Failed to fetch products");
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[300px]">
        <Spin size="large" />
      </div>
    );
  }
  if (!products || products.length === 0) {
    return (
      <div className="w-full text-center text-gray-600 mt-10">No products found.</div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20 bg-gray-50">
      {/* <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"> */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
        {products.map((product) => {
          let hasDiscount =
            typeof product.productDiscountedPrice === "number" &&
            product.productDiscountedPrice > 0 &&
            product.productDiscountedPrice < product.price;
          let sellingPrice = hasDiscount
            ? product.price - product.productDiscountedPrice
            : product.price;
          let discountAmount = hasDiscount ? product.productDiscountedPrice : 0;
          let discountPercent = hasDiscount
            ? Math.round((discountAmount / product.price) * 100)
            : 0;

          const handleAddToCart = (product) => {
            console.log("Adding to cart:", product);

            dispatch(addToCart({ id: product._id, qty: 1 }));
            navigate("/cart");  // redirect to cart page after adding
          };

          return (
            <div
              key={product._id}
              className="flex flex-col h-full bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden group hover:shadow-xl transition-all"
            >
              {/* Product Image Carousel */}
              {/* <div className="flex justify-center items-center bg-white px-4 pt-4" style={{ height: 185 }}>
                {Array.isArray(product.image) && product.image.length > 0 ? (
                  <Carousel
                    dots={product.image.length > 1}
                    arrows={product.image.length > 1}
                    autoplay={product.image.length > 1}
                    autoplaySpeed={2500}
                    draggable
                    style={{ width: 170, height: 170 }}
                  >
                    {product.image.map((img, idx) => (
                      <Link to={`/product/${product._id}`} key={img._id || idx} style={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                          src={getImageUrl(img.image_url?.thumbnail?.low_res)}
                          alt={product.name}
                          style={{
                            width: 150,
                            height: 150,
                            objectFit: "contain",
                            background: "#fff",
                            borderRadius: 10,
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </Link>
                    ))}
                  </Carousel>
                ) : (
                  <div className="h-36 flex items-center justify-center w-full">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div> */}
              <div className="flex items-center justify-center h-48 w-full bg-white border-b" style={{ minHeight: 190 }}>
                {Array.isArray(product.image) && product.image.length > 0 ? (
                  <Carousel
                    dots={product.image.length > 1}
                    arrows={product.image.length > 1}
                    autoplay={product.image.length > 1}
                    autoplaySpeed={2500}
                    draggable
                    style={{ width: 170, height: 170 }}
                  >
                    {product.image.map((img, idx) => (
                      <Link to={`/product/${product._id}`} key={img._id || idx} style={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                          src={getImageUrl(img.image_url?.thumbnail?.low_res)}
                          alt={product.name}
                          style={{
                            width: 150,
                            height: 150,
                            objectFit: "contain",
                            background: "#fff",
                            borderRadius: 14,
                            border: '1px solid #eee'
                          }}
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      </Link>
                    ))}
                  </Carousel>
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-1 p-4">
                <div className="font-bold text-base sm:text-lg text-black mb-0.5">{product.name}</div>
                <div className="text-[13px] text-gray-600 mb-3 truncate">
                  {product.description}
                </div>
                {/* Pricing Section */}
                <div className="flex items-end flex-wrap mb-2">
                  <span className="text-xl sm:text-2xl font-bold text-black mr-2">
                    ₹{sellingPrice}
                  </span>
                  {hasDiscount && (
                    <span className="text-gray-400 line-through text-sm mt-1 mr-2">
                      ₹{product.price}
                    </span>
                  )}
                  {hasDiscount && (
                    <span className="bg-[#EB1F27] text-white text-xs px-2 py-0.5 font-semibold rounded-md mr-2">
                      You Save ₹{discountAmount} {discountPercent > 0 ? `(${discountPercent}% OFF)` : ""}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  Stock: <span className="text-green-600 font-semibold">{product.countInStock}</span>
                </div>
                {/* Add to Cart Button */}
                <button
                  className="mt-auto w-full text-white rounded-xl py-2 font-bold text-base bg-yellow-400 hover:text-black transition"
                  onClick={() => handleAddToCart(product)} // pass product here
                  disabled={product.countInStock <= 0}
                >
                  {product.countInStock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
