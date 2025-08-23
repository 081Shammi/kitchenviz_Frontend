// src/reducers/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialCart = JSON.parse(localStorage.getItem("cart") || "[]");

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: initialCart },  // items = [{ id, qty }]
  reducers: {
    addToCart: (state, action) => {
      const { id, qty = 1 } = action.payload;
      const found = state.items.find(item => item.id === id);
      if (found) {
        found.qty += qty;
      } else {
        state.items.push({ id, qty });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateCartQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) item.qty = qty;
      state.items = state.items.filter(item => item.qty > 0);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", "[]");
    },
  },
});

export const { addToCart, removeFromCart, updateCartQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
