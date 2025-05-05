import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../backendUrl";

export const fetchReferrals = createAsyncThunk(
  "referrals/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/referrals`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch referrals"
      );
    }
  }
);

const referralsSlice = createSlice({
  name: "referrals",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReferrals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReferrals.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchReferrals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default referralsSlice.reducer;
