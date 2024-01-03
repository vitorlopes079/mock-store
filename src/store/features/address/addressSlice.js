import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firestore } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";


export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ userId, newAddress }, thunkAPI) => {
    try {
      const docRef = doc(firestore, "users", userId);

      // Construct an object with only the address fields
      const addressUpdate = {
        addressLine1: newAddress.addressLine1,
        addressLine2: newAddress.addressLine2,
        postcode: newAddress.postcode,
        city: newAddress.city
      };

      await updateDoc(docRef, addressUpdate);

      return addressUpdate; // Return the updated address
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async (userId, thunkAPI) => {

    console.log("function called")
    try {
      const docRef = doc(firestore, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Assuming the address fields are stored at the root of the user document
        const { addressLine1, addressLine2, postcode, city } = docSnap.data();
        console.log(addressLine1, addressLine2, postcode, city)
        return { addressLine1, addressLine2, postcode, city };
      } else {
        throw new Error("No such document!");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  address: null,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addressSlice.reducer