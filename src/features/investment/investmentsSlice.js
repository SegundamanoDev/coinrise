// src/redux/slices/investmentsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../backendUrl";

export const fetchInvestments = createAsyncThunk(
  "investments/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/investments`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch investments"
      );
    }
  }
);

const investmentsSlice = createSlice({
  name: "investments",
  initialState: {
    investments: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvestments.fulfilled, (state, action) => {
        state.loading = false;
        state.investments = action.payload;
      })
      .addCase(fetchInvestments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default investmentsSlice.reducer;
