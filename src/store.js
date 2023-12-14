import { configureStore } from '@reduxjs/toolkit';
import bagReducer from "./pages/bag/bagSlice"


export const store = configureStore({
    reducer: {
      bag: bagReducer
    },
  });