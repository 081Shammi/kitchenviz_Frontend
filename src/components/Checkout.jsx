import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CheckoutForm from "./CheckoutForm";
import { API_BASE_URL } from "../config";
import Footer from "./Footer";
import Header from "./Header";

export default function CheckoutPage() {
  const cart = useSelector((state) => state.cart?.items || []);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products from backend (or only products in cart)
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${API_BASE_URL}product`);
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        console.error("Failed to fetch products for checkout", e);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Build enriched cart items with product info
  const enrichedCartItems = cart.map((cartItem) => {
    const product = products.find((p) => p._id === cartItem.id);
    return {
      ...cartItem,
      name: product?.name || "Unknown product",
      price:
        product && product.productDiscountedPrice && product.productDiscountedPrice < product.price
          ? product.price - product.productDiscountedPrice
          : product?.price || 0,
    };
  });

  const totalAmount = enrichedCartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Header />
    <CheckoutForm
      cartItems={enrichedCartItems}
      totalAmount={totalAmount}
      onSubmit={(data) => {
        console.log("Checkout submitted:", data);
        // Process checkout here
      }}
    />
    <Footer />
    </>
  );
}
