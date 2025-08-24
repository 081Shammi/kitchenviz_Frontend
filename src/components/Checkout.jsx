import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CheckoutForm from "./CheckoutForm";
import { API_BASE_URL } from "../config";
import Footer from "./Footer";
import Header from "./Header";
import { message } from "antd";
import { ToastContainer } from 'react-toastify';

export default function CheckoutPage() {
  const cart = useSelector((state) => state.cart?.items || []);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  // Fetch products to enrich cart with validated info
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}product`);
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        message.error("Failed to fetch products for checkout");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Enrich cart items with product details ensuring image is an array of ObjectId strings
  const enrichedCartItems = cart.map((cartItem) => {
    const product = products.find((p) => p._id === cartItem.id);
    const name =
      typeof product?.name === "string" && product.name.trim()
        ? product.name.trim()
        : "Unknown product";

    const price =
      product?.productDiscountedPrice && product?.productDiscountedPrice < product?.price
        ? Number(product.price - product.productDiscountedPrice)
        : Number(product?.price || 0);

    // image: array of ObjectId strings or empty array fallback
    const image =
      Array.isArray(product?.image) && product.image.length > 0
        ? product.image.map((img) => (typeof img === "string" ? img : img._id || "")).filter(Boolean)
        : [];

    const productId = typeof product?._id === "string" ? product._id : cartItem.id;

    return {
      ...cartItem,
      name,
      price,
      image,
      productId,
    };
  });

  const totalAmount = enrichedCartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // Prepare order object matching backend validation requirements exactly
  const getOrderObject = (values) => {
    const orderItems = enrichedCartItems.map((item) => ({
      name: item.name,
      quantity: Number(item.qty) > 0 ? Number(item.qty) : 1,
      image: Array.isArray(item.image) ? item.image.filter((id) => id) : [],
      price: Number(item.price) >= 0 ? Number(item.price) : 0,
      product: item.productId,
    }));

    return {
      orderItems,
      shippingAddress: {
        fullName: values.fullName.trim(),
        address: values.address.trim(),
        city: values.city.trim(),
        postalCode: values.postalCode.trim(),
        country: values.country.trim(),
      },
      contactDetails: {
        email: values.email.trim(),
        phoneNumber: values.phoneNumber.trim(),
        address: values.address.trim(),
        postalCode: values.postalCode.trim(),
        country: values.country.trim(),
        city: values.city.trim(),
        age: values.age ? values.age.trim() : "",
      },
      paymentMethod: values.paymentMethod.trim(),
      itemsPrice: totalAmount,
      shippingPrice: 0,
      totalPrice: totalAmount,
    };
  };

  // Submit order to backend with proper headers and JSON content
  const handleOrderSubmit = async (values) => {
    setPlacingOrder(true);
    try {
      const orderData = getOrderObject(values);
      const res = await fetch(`${API_BASE_URL}order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Order placement failed");
      }

      const data = await res.json();
      message.success("Order placed successfully!");
      toast.success("Order placed successfully!"); // Show Toastify success message
      window.location.href = `/order-confirmation/${data.order._id || ""}`;
    } catch (e) {
      message.error(e.message || "Could not place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <CheckoutForm
        cartItems={enrichedCartItems}
        totalAmount={totalAmount}
        onSubmit={handleOrderSubmit}
        loading={placingOrder}
      />
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />

    </>
  );
}
