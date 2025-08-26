import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCartQty } from "../reducers/cart";
import { API_BASE_URL } from "../config";
import Header from "./Header";
import Footer from "./Footer";
import { toast } from "react-toastify";

const getImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("assets/")) return `${API_BASE_URL}${url}`;
  return `${API_BASE_URL}${url}`;
};

export default function CartPage() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cart.length) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all(
      cart.map(({ id }) =>
        fetch(`${API_BASE_URL}product/${id}`)
          .then((res) => res.json())
          .catch((e) => {
            console.error("Failed to load product", id, e);
            return null;
          })
      )
    )
      .then((products) => {
        const validProducts = products.filter(Boolean);
        setProducts(validProducts);
        if (validProducts.length === 0) {
          toast.warning("No products found for items in cart");
        }
      })
      .catch(() => {
        toast.error("Failed to load products.");
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [cart]);

  const getCartQuantity = (id) => cart.find((item) => item.id === id)?.qty || 1;

  const updateQuantity = (id, qty, stock) => {
    if (qty < 1) return; // Block zero from UI; Remove uses button
    if (qty <= stock) dispatch(updateCartQty({ id, qty }));
  };

  const removeItem = (id) => dispatch(removeFromCart(id));

  const displayedProducts = products.filter(product =>
    cart.some(cartItem => cartItem.id === product.id)
  );

  const subTotal = displayedProducts.reduce((acc, product) => {
    const qty = getCartQuantity(product.id);
    const hasDiscount =
      typeof product.productDiscountedPrice === "number" &&
      product.productDiscountedPrice > 0 &&
      product.productDiscountedPrice < product.price;
    const price = hasDiscount ? product.price - product.productDiscountedPrice : product.price;
    return acc + price * qty;
  }, 0);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[300px] text-lg">Loading...</div>
    );
  }

  if (!displayedProducts.length) {
    return (
      <>
        <Header />
        <div className="w-full min-h-[50vh] flex flex-col justify-center items-center py-16 bg-white px-2">
          <div className="bg-white border border-gray-200 shadow-lg rounded-2xl px-4 py-8 sm:px-10 sm:py-10 flex flex-col items-center max-w-xl w-full">
            {/* Icon */}
            <div className="mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.344 2M7 13h10l3-8H5.344M7 13a3 3 0 00-3 3v5a2 2 0 002 2h12a2 2 0 002-2v-5a3 3 0 00-3-3" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h2 className="text-2xl font-extrabold mb-3 text-center">Your cart is empty</h2>
            <p className="text-gray-500 mb-7 text-center">
              Looks like you haven’t added any products yet.<br />Start shopping for amazing deals and products!
            </p>
            <Link to="/products">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-black rounded-lg px-7 py-2 text-base font-semibold shadow-lg transition w-full sm:w-auto">
                Shop Products
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto my-6 px-2 w-full">
        <div className="bg-white rounded-xl shadow p-2 sm:p-4 md:p-7">
          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">Shopping Cart</h2>
          <div className="divide-y border rounded-lg shadow-sm">
            {displayedProducts.map((product) => {
              const qty = getCartQuantity(product.id);
              const img = product.image?.[0]?.image_url?.thumbnail?.low_res || "";
              const stock = product.countInStock;
              const hasDiscount =
                typeof product.productDiscountedPrice === "number" &&
                product.productDiscountedPrice > 0 &&
                product.productDiscountedPrice < product.price;
              const sellingPrice = hasDiscount
                ? product.price - product.productDiscountedPrice
                : product.price;

              return (
                <div key={product.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 px-2"
                >
                  <Link to={`/product/${product.id}`} className="flex-shrink-0">
                    <img
                      src={getImageUrl(img)}
                      alt={product.name}
                      className="w-20 h-20 object-contain rounded-lg border bg-white"
                      style={{ boxShadow: "0 2px 8px 0 #eee" }}
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${product.id}`}
                      className="font-semibold text-lg text-black truncate block"
                      title={product.name}
                    >
                      {product.name}
                    </Link>
                    <div className="text-gray-600 text-sm truncate">{product.description}</div>
                    <div className="flex items-center gap-1 text-xs mt-1">
                      <span className="text-gray-500">In Stock:</span>
                      <span className="font-semibold text-green-700">{stock}</span>
                    </div>
                    {hasDiscount && (
                      <span className="mt-1 mb-2 block text-xs bg-[#EB1F27] text-white px-2 py-0.5 rounded font-medium w-fit">
                        You Save ₹{product.productDiscountedPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-row sm:flex-col items-center min-w-[120px] sm:items-end gap-2 sm:gap-0">
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        className="w-8 h-8 rounded-full bg-gray-100 text-xl font-bold"
                        onClick={() => updateQuantity(product.id, qty - 1, stock)}
                        disabled={qty <= 1}
                      >−</button>
                      <input
                        type="number"
                        min={1}
                        max={stock}
                        value={qty}
                        onChange={(e) => {
                          let val = Number(e.target.value);
                          if (isNaN(val) || val < 1) val = 1;
                          if (val > stock) val = stock;
                          updateQuantity(product.id, val, stock);
                        }}
                        className="w-10 text-center border rounded"
                      />
                      <button
                        className="w-8 h-8 rounded-full bg-gray-100 text-xl font-bold"
                        onClick={() => updateQuantity(product.id, qty + 1, stock)}
                        disabled={qty >= stock}
                      >+</button>
                    </div>
                    <span className="block text-black font-bold text-lg mb-1">
                      ₹{sellingPrice}
                    </span>
                    <span className="block text-xs text-gray-500 mb-2">
                      Subtotal: ₹{(sellingPrice * qty).toFixed(2)}
                    </span>
                    <button
                      aria-label="Delete item from cart"
                      className="p-2 rounded-full hover:bg-red-100 transition group"
                      onClick={() => removeItem(product.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 8
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-600 group-hover:text-red-800">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
            <div>
              <div className="text-xl font-bold text-center sm:text-left">
                Total: <span className="text-green-600">₹{subTotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-lg shadow hover:bg-yellow-300 text-base w-full sm:w-auto"
              onClick={() => navigate("/CheckoutPage")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
