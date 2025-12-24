/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  color: string;
  count: number;
}

interface CartState {
  isCartOpen: boolean;
  cart: CartItem[];
  items: any[];
}

const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const initialState: CartState = {
  isCartOpen: false,
  cart: loadCartFromLocalStorage(),
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    },
    addToCart: (state, action: PayloadAction<{ item: CartItem }>) => {
      const existingItem = state.cart.find(
        (item) =>
          item.id === action.payload.item.id &&
          item.size === action.payload.item.size &&
          item.color === action.payload.item.color
      );

      if (existingItem) {
        existingItem.count += action.payload.item.count;
      } else {
        state.cart.push(action.payload.item);
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    increaseCount: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.count++;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    decreaseCount: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item && item.count > 1) {
        item.count--;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
