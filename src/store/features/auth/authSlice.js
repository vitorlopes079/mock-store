import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firestore, auth } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userDocRef = doc(firestore, "users", userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("User data not found in Firestore");
      }

      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: userDoc.data().name,
        surname: userDoc.data().surname,
      };
    } catch (error) {
      // Handle different error scenarios
      let errorMessage = "";
      console.log(error.code);
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found" ||
        "auth/invalid-credential"
      ) {
        errorMessage = "Email or password is incorrect";
      } else {
        errorMessage = "An unexpected error occurred. Please try again later.";
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },

    setNewUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { logout, setNewUser } = authSlice.actions;
export default authSlice.reducer;
