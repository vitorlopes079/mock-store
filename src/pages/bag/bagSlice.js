import { createSlice } from "@reduxjs/toolkit";

export const bagSlice = createSlice({
  name: "bag",
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.name === newItem.name && item.size === newItem.size
      );

      if (existingItem) {
        // If the item exists, increase the quantity
        existingItem.quantity += newItem.quantity;
      } else {
        // If the item doesn't exist, add it to the array
        state.items.push(newItem);
      }
      state.totalAmount = calculateTotal(state.items);
    },
    incrementQuantity: (state, action) => {
      const { name, size } = action.payload;
      const existingItem = state.items.find(
        (item) => item.name === name && item.size === size
      );
      if (existingItem) {
        existingItem.quantity += 1;
      }
      state.totalAmount = calculateTotal(state.items);
    },

    decrementQuantity: (state, action) => {
      const { name, size } = action.payload;
      const existingItem = state.items.find(
        (item) => item.name === name && item.size === size
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
      state.totalAmount = calculateTotal(state.items);
    },

    removeItem: (state, action) => {
      const { name, size } = action.payload;
      state.items = state.items.filter(item => item.name !== name || item.size !== size);
      state.totalAmount = calculateTotal(state.items);
    }
  },
});

const calculateTotal = (items) => {
  return items.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return total + (item.quantity * price);
  }, 0);
};

export const { addItem, incrementQuantity, decrementQuantity,  removeItem } =
  bagSlice.actions;

export default bagSlice.reducer;
