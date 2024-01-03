import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addNewOrder = createAsyncThunk('orders/addNewOrder', async () => {
    
})

const initialState = {
    loading: false,
    orders: [],
    error: null,
  };

  const oredersSlice = createSlice({
    name: orders,
    initialState,
    reducers: {},
    extraReducers: {}
  })