import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firestore } from "../../../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";



// Async thunk for adding a new order
export const addNewOrder = createAsyncThunk(
  "orders/addNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(firestore, "orders"), orderData);
      return { id: docRef.id, ...orderData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const ordersQuery = query(
        collection(firestore, "orders"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(ordersQuery);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      return orders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
        state.error = null;
      })
      .addCase(addNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; // Replace existing orders with the fetched orders
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default ordersSlice.reducer;
