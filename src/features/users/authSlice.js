import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API URL
const API_URL = "https://coinrise-backend.onrender.com";

// Sign Up User
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        userData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to sign up"
      );
    }
  }
);

// Sign In User
export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, userData);
      // Persist user and token
      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to sign in"
      );
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("authUser")) || null,
  token: localStorage.getItem("authToken") || null,
  loading: false,
  error: null,
  statusMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthMessage: (state) => {
      state.statusMessage = null;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    },
  },
  extraReducers: (builder) => {
    // SignUp
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.statusMessage = "User signed up successfully!";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SignIn
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.statusMessage = "User signed in successfully!";
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuthMessage, logout } = authSlice.actions;

export default authSlice.reducer;
