import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../backendUrl";

const getToken = () => localStorage.getItem("authToken");

export const createWithdrawal = createAsyncThunk(
  "withdrawals/create",
  async ({ amount, method, details }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.post(
        `${API_URL}/withdrawals/withdraw`,
        { amount, method, details },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const getAllWithdrawals = createAsyncThunk(
  "withdrawals/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.get(`${API_URL}/withdrawals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateWithdrawal = createAsyncThunk(
  "withdrawals/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.put(`${API_URL}/withdrawals/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteWithdrawal = createAsyncThunk(
  "withdrawals/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      await axios.delete(`${API_URL}/withdrawals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const approveWithdrawal = createAsyncThunk(
  "withdrawals/approve",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.post(
        `${API_URL}/withdrawals/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { id, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// New: Decline Withdrawal
export const declineWithdrawal = createAsyncThunk(
  "withdrawals/decline",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.post(
        `${API_URL}/withdrawals/decline/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { id, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const withdrawalsSlice = createSlice({
  name: "withdrawals",
  initialState: {
    withdrawals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createWithdrawal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWithdrawal.fulfilled, (state, action) => {
        state.loading = false;
        state.withdrawals.push(action.payload);
      })
      .addCase(createWithdrawal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(getAllWithdrawals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllWithdrawals.fulfilled, (state, action) => {
        state.loading = false;
        state.withdrawals = action.payload;
      })
      .addCase(getAllWithdrawals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateWithdrawal.fulfilled, (state, action) => {
        const index = state.withdrawals.findIndex(
          (w) => w._id === action.payload._id
        );
        if (index !== -1) {
          state.withdrawals[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteWithdrawal.fulfilled, (state, action) => {
        state.withdrawals = state.withdrawals.filter(
          (w) => w._id !== action.payload
        );
      })

      // Approve
      .addCase(approveWithdrawal.fulfilled, (state, action) => {
        const withdrawal = state.withdrawals.find(
          (w) => w._id === action.payload.id
        );
        if (withdrawal) {
          withdrawal.status = "approved";
        }
      })

      // Decline
      .addCase(declineWithdrawal.fulfilled, (state, action) => {
        const withdrawal = state.withdrawals.find(
          (w) => w._id === action.payload.id
        );
        if (withdrawal) {
          withdrawal.status = "declined";
        }
      });
  },
});

export default withdrawalsSlice.reducer;
