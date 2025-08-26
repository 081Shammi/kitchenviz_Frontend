import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Carousel, Spin, message } from "antd";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useDispatch } from "react-redux";
import { addToCart } from "../reducers/cart";

// Utility to get full image URL
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
    return <div className="w-full text-center text-gray-600 mt-10">No products found.</div>;
  }

  // Add to Cart handler with toast
  const handleAddToCart = (product) => {
    dispatch(addToCart({ id: product._id, qty: 1 }));
    message.success(`${product.name} added to cart!`);

  };

  // Buy Now handler: add and redirect to cart
  const handleBuyNow = (product) => {
    dispatch(addToCart({ id: product._id, qty: 1 }));
    navigate("/cart");
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
        {/* <Button onClick={() => message.success('Test message!')}>Test Toast</Button> */}

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

          return (
            <>
              <div
                key={product._id}
                className="flex flex-col h-full bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden group hover:shadow-xl transition-all"
              >
                <div
                  className="flex items-center justify-center h-48 w-full bg-white border-b"
                  style={{ minHeight: 190 }}
                >
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
                        <Link
                          to={`/product/${product._id}`}
                          key={img._id || idx}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <img
                            src={getImageUrl(img.image_url?.thumbnail?.low_res)}
                            alt={product.name}
                            style={{
                              width: 150,
                              height: 150,
                              objectFit: "contain",
                              background: "#fff",
                              borderRadius: 14,
                              border: "1px solid #eee",
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
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
                <div className="flex flex-col flex-1 p-4">
                  <div className="font-bold font-serif text-base sm:text-lg text-black mb-0.5">
                    {product.name}
                  </div>
                  <div className="text-[13px] font-mono text-gray-600 mb-3 truncate">{product.description}</div>
                  <div className="flex items-end flex-wrap mb-2">
                    <span className="text-xl sm:text-2xl font-bold font-serif text-black mr-2">₹{sellingPrice}</span>
                    {hasDiscount && (
                      <span className="text-gray-400 font-serif line-through text-sm mt-1 mr-2">₹{product.price}</span>
                    )}
                    {hasDiscount && (
                      <span className="bg-[#EB1F27] text-white text-xs px-2 py-0.5 font-semibold font-mono rounded-md mr-2">
                        You Save ₹{discountAmount} {discountPercent > 0 ? `(${discountPercent}% OFF)` : ""}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    Stock: <span className="text-green-600 font-semibold">{product.countInStock}</span>
                  </div>
                  <div className="flex flex-col gap-2 mt-auto">
                    <button
                      className="w-full font-mono text-white rounded-xl py-2 text-base bg-yellow-400 hover:bg-yellow-700 transition"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.countInStock <= 0}
                      style={{ fontFamily: "monospace" ,color:"white"}}
                    >
                      ADD TO CART
                    </button>

                    <button
                      className="w-full font-mono text-white rounded-xl py-2 text-base bg-red-600 hover:bg-red-900 transition"
                      onClick={() => handleBuyNow(product)}
                      disabled={product.countInStock <= 0}
                      style={{ fontFamily: "monospace" ,color:"white"}}
                    >
                      BUY NOW
                    </button>

                  </div>
                </div>
              </div>

            </>

          );
        })}
      </div>
    </div>
  );
}




// import React, { useState, useEffect } from "react";
// import { Carousel, Rate, Spin, Button, message } from "antd";
// import { ShoppingCartOutlined } from "@ant-design/icons";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../reducers/cart";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { API_BASE_URL } from "../config";

// const getImageUrl = (url) => {
//   if (!url) return "";
//   if (url.startsWith("http")) return url;
//   if (url.startsWith("assets/")) return `${API_BASE_URL}${url}`;
//   return `${API_BASE_URL}${url}`;
// };

// export default function ProductList() {
//   const [products, setProducts] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${API_BASE_URL}product`)
//       .then((res) => setProducts(res.data))
//       .catch(() => {
//         message.error("Failed to fetch products");
//         setProducts([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[300px]">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   if (!products || products.length === 0) {
//     return (
//       <div className="text-center text-gray-500 mt-10">
//         No products found.
//       </div>
//     );
//   }

//   const handleAddToCart = (product) => {
//     dispatch(addToCart({ id: product._id, qty: 1 }));
//     message.success(`${product.name} added to cart`);
//   };

//   const handleBuyNow = (product) => {
//     dispatch(addToCart({ id: product._id, qty: 1 }));
//     navigate("/cart");
//   };

//   return (
//     <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product) => {
//           const hasDiscount =
//             product.productDiscountedPrice &&
//             product.productDiscountedPrice < product.price;

//           const sellingPrice = hasDiscount
//             ? product.price - product.productDiscountedPrice
//             : product.price;

//           const discountPercent = hasDiscount
//             ? Math.round(
//                 (product.productDiscountedPrice / product.price) * 100
//               )
//             : 0;

//           return (
//             <div
//               key={product._id}
//               className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden group flex flex-col"
//             >
//               <Link
//                 to={`/product/${product._id}`}
//                 className="relative block overflow-hidden rounded-t-2xl"
//               >
//                 {product.image?.length ? (
//                   <Carousel
//                     dots={product.image.length > 1}
//                     arrows={product.image.length > 1}
//                     autoplay={product.image.length > 1}
//                     autoplaySpeed={3000}
//                     effect="fade"
//                     className="h-48 flex justify-center items-center"
//                   >
//                     {product.image.map((img, idx) => (
//                       <img
//                         key={idx}
//                         src={getImageUrl(
//                           img.image_url?.thumbnail?.high_res ||
//                             img.image_url?.thumbnail?.low_res
//                         )}
//                         alt={product.name}
//                         loading="lazy"
//                         className="object-contain w-40 h-40 mx-auto bg-white rounded-lg border border-gray-100 transform transition duration-300 group-hover:scale-105"
//                         onError={(e) => (e.currentTarget.style.display = "none")}
//                       />
//                     ))}
//                   </Carousel>
//                 ) : (
//                   <div className="flex justify-center items-center h-48 bg-gray-100">
//                     <span className="text-gray-400">No Image</span>
//                   </div>
//                 )}
//               </Link>
//               <div className="flex flex-col flex-grow p-4">
//                 <h2
//                   title={product.name}
//                   className="text-lg font-semibold text-gray-800 truncate"
//                 >
//                   {product.name}
//                 </h2>
//                 <p className="text-sm text-gray-500 mt-1 truncate line-clamp-2">
//                   {product.description}
//                 </p>
//                 <div className="mt-3 flex items-center space-x-2">
//                   <Rate
//                     disabled
//                     allowHalf
//                     defaultValue={product.rating || 0}
//                     style={{ color: "#FBBF24" }} // Amber 400
//                   />
//                   <span className="text-xs text-gray-400">
//                     ({product.numReviews || 0})
//                   </span>
//                 </div>
//                 <div className="mt-4">
//                   <span className="text-xl font-bold text-green-600">
//                     ₹{sellingPrice.toLocaleString("en-IN")}
//                   </span>
//                   {hasDiscount && (
//                     <span className="ml-2 text-sm line-through text-gray-400">
//                       ₹{product.price.toLocaleString("en-IN")}
//                     </span>
//                   )}
//                   {hasDiscount && (
//                     <span className="ml-2 px-2 py-0.5 text-xs rounded bg-red-100 text-red-600">
//                       Save {discountPercent}%
//                     </span>
//                   )}
//                 </div>
//                 <div className="mt-auto flex flex-col space-y-2">
//                   <button
//   disabled={product.countInStock === 0}
//   onClick={() => handleAddCart(product)}
//   className={`w-full rounded-md py-2 font-semibold transition ${
//     product.countInStock > 0
//       ? "bg-[#F97316] hover:bg-[#EA580C] text-white"
//       : "bg-gray-200 text-gray-400 cursor-not-allowed"
//   }`}
//   aria-label={`Add ${product.name} to cart`}
// >
//   Add to Cart
// </button>

// <button
//   disabled={product.countInStock === 0}
//   onClick={() => handleBuyNow(product)}
//   className={`w-full rounded-md py-2 font-semibold transition ${
//     product.countInStock > 0
//       ? "bg-[#3B82F6] hover:bg-[#2563EB] text-white"
//       : "bg-gray-200 text-gray-400 cursor-not-allowed"
//   }`}
//   aria-label={`Buy ${product.name} now`}
// >
//   Buy Now
// </button>

//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

