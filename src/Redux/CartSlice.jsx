import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.push(action.payload); 
    },
    deleteProductFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    incrementCount: (state, action) => {
      const existingItem = state.find(item => item.id === action.payload);
      if (existingItem) {
        existingItem.quantity++;
      }
    },
    decrementCount: (state, action) => {
      const existingItem = state.find(item => item.id === action.payload);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
      }
    },
  },
});

export const { addProductToCart, deleteProductFromCart, incrementCount, decrementCount } = CartSlice.actions;

export default CartSlice.reducer;
