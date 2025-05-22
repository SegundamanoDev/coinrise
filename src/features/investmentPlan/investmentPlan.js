// src/features/investmentPlan/investmentPlan.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../backendUrl";

const getToken = () => localStorage.getItem("authToken");

// Thunks
export const getAllPlans = createAsyncThunk(
  "plans/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/plans`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch plans"
      );
    }
  }
);

export const createPlan = createAsyncThunk(
  "plans/create",
  async (data, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.post(`${API_URL}/plans/create`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create plan"
      );
    }
  }
);

export const updatePlan = createAsyncThunk(
  "plans/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.put(`${API_URL}/plans/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update plan"
      );
    }
  }
);

export const deletePlan = createAsyncThunk(
  "plans/delete",
  async (id, thunkAPI) => {
    try {
      const token = getToken();
      await axios.delete(`${API_URL}/plans/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete plan"
      );
    }
  }
);

// Slice
const investmentPlanSlice = createSlice({
  name: "investmentPlan",
  initialState: {
    plans: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(getAllPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(getAllPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plans.push(action.payload);
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updatePlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        state.plans = state.plans.map((plan) =>
          plan._id === updated._id ? updated : plan
        );
      })
      .addCase(updatePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deletePlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = state.plans.filter((plan) => plan._id !== action.payload);
      })
      .addCase(deletePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default investmentPlanSlice.reducer;
