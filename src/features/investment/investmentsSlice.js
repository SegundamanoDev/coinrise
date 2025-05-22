// features/investment/investmentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../backendUrl";

const getToken = () => localStorage.getItem("authToken");

// === USER THUNK ===
export const investInPlan = createAsyncThunk(
  "investment/investInPlan",
  async ({ amount, planId, roi, duration }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.post(
        `${API_URL}/investments/create`,
        { amount, planId, duration, roi },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Investment placed successfully");
      return res.data.investment;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to place investment";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// === ADMIN THUNKS ===

// GET /admin/investments
export const fetchAdminInvestments = createAsyncThunk(
  "investment/fetchAdminInvestments",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const token = getToken();
      const params = new URLSearchParams(filters).toString();
      const res = await axios.get(`${API_URL}/admin/investments?${params}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to fetch investments";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// PATCH /admin/investments/:id/complete
export const markInvestmentComplete = createAsyncThunk(
  "investment/markInvestmentComplete",
  async (investmentId, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.patch(
        `${API_URL}/admin/investments/${investmentId}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Investment marked as completed");
      return res.data.investment;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to complete investment";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// DELETE /admin/investments/:id
export const deleteInvestment = createAsyncThunk(
  "investment/deleteInvestment",
  async (investmentId, { rejectWithValue }) => {
    try {
      const token = getToken();
      await axios.delete(`${API_URL}/admin/investments/${investmentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Investment deleted successfully");
      return investmentId;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to delete investment";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// === SLICE ===
const investmentSlice = createSlice({
  name: "investment",
  initialState: {
    investments: [],
    summary: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // USER investment
      .addCase(investInPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(investInPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.investments.push(action.payload);
      })
      .addCase(investInPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADMIN fetch investments
      .addCase(fetchAdminInvestments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminInvestments.fulfilled, (state, action) => {
        state.loading = false;
        state.investments = action.payload.investments;
        state.summary = action.payload.summary;
      })
      .addCase(fetchAdminInvestments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADMIN complete investment
      .addCase(markInvestmentComplete.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.investments.findIndex(
          (inv) => inv._id === updated._id
        );
        if (index !== -1) state.investments[index] = updated;
      })

      // ADMIN delete investment
      .addCase(deleteInvestment.fulfilled, (state, action) => {
        state.investments = state.investments.filter(
          (inv) => inv._id !== action.payload
        );
      });
  },
});

export default investmentSlice.reducer;
