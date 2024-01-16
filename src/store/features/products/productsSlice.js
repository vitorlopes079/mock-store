import { firestore } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { shuffleArray } from "../../../utilities/suffleFunction";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Promise.all([
        getDocs(collection(firestore, "man-top")),
        getDocs(collection(firestore, "man-bottom")),
        getDocs(collection(firestore, "women-top")),
        getDocs(collection(firestore, "women-bottom")),
        getDocs(collection(firestore, "accessories")),
      ]);
      return {
        menTop: response[0].docs.map((doc) => ({
          ...doc.data(),
          category: "menTop",
        })),
        menBottom: response[1].docs.map((doc) => ({
          ...doc.data(),
          category: "menBottom",
        })),
        womenTop: response[2].docs.map((doc) => ({
          ...doc.data(),
          category: "womenTop",
        })),
        womenBottom: response[3].docs.map((doc) => ({
          ...doc.data(),
          category: "womenBottom",
        })),
        accessories: response[4].docs.map((doc) => ({
          ...doc.data(),
          category: "accessories",
        })),
      };
    } catch (error) {
      console.error("Error in fetchProducts:", error);
      return rejectWithValue(error.message);
    }
  }
);

const menTopAdapter = createEntityAdapter();
const menBottomAdapter = createEntityAdapter();
const womenTopAdapter = createEntityAdapter();
const womenBottomAdapter = createEntityAdapter();
const accessoriesAdapter = createEntityAdapter();

const initialState = {
  menTop: menTopAdapter.getInitialState(),
  menBottom: menBottomAdapter.getInitialState(),
  womenTop: womenTopAdapter.getInitialState(),
  womenBottom: womenBottomAdapter.getInitialState(),
  accessories: accessoriesAdapter.getInitialState(),
  bestSellers: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    shuffleBestSellers: (state) => {
      const combinedProducts = [
        ...Object.values(state.menTop.entities),
        ...Object.values(state.menBottom.entities),
        ...Object.values(state.womenTop.entities),
        ...Object.values(state.womenBottom.entities),
        ...Object.values(state.accessories.entities),
      ];

      if (combinedProducts.length > 0) {
        state.bestSellers = shuffleArray(combinedProducts).slice(0, 6);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";

        menTopAdapter.setAll(state.menTop, action.payload.menTop);
        menBottomAdapter.setAll(state.menBottom, action.payload.menBottom);
        womenTopAdapter.setAll(state.womenTop, action.payload.womenTop);
        womenBottomAdapter.setAll(
          state.womenBottom,
          action.payload.womenBottom
        );
        accessoriesAdapter.setAll(
          state.accessories,
          action.payload.accessories
        );
      });
  },
});

// Define selectors for each product category
const selectMenTopState = (state) => state.products.menTop;
const menTopSelectors = menTopAdapter.getSelectors(selectMenTopState);

const selectMenBottomState = (state) => state.products.menBottom;
const menBottomSelectors = menBottomAdapter.getSelectors(selectMenBottomState);

const selectWomenTopState = (state) => state.products.womenTop;
const womenTopSelectors = womenTopAdapter.getSelectors(selectWomenTopState);

const selectWomenBottomState = (state) => state.products.womenBottom;
const womenBottomSelectors = womenBottomAdapter.getSelectors(
  selectWomenBottomState
);

const selectAccessoriesState = (state) => state.products.accessories;
const accessoriesSelectors = accessoriesAdapter.getSelectors(
  selectAccessoriesState
);

const selectBestSellers = (state) => state.products.bestSellers;

// Export the selectors
export {
  menTopSelectors,
  menBottomSelectors,
  womenTopSelectors,
  womenBottomSelectors,
  accessoriesSelectors,
  selectBestSellers,
};

export const { shuffleBestSellers } = productsSlice.actions;

export default productsSlice.reducer;
