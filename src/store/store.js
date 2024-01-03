import { configureStore } from "@reduxjs/toolkit";
import bagReducer from "./features/bag/bagSlice"
import productsReducer from "./features/products/productsSlice"
import authReducer from "./features/auth/authSlice"
import addressReducer from "./features/address/addressSlice"

export const store = configureStore({
  reducer: {
    bag: bagReducer,
    products: productsReducer,
    auth: authReducer,
    address: addressReducer,
  },
});
