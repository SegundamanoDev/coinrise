import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../backendUrl";

const getToken = () => localStorage.getItem("authToken");

export const createDeposit = createAsyncThunk(
  "deposits/createDeposit",
  async (depositData, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post(`${API_URL}/deposits`, depositData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// New: Fetch all deposits (for AdminTransactions list)
export const fetchDeposits = createAsyncThunk(
  "deposits/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${API_URL}/deposits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// New: Approve a deposit
export const approveDeposit = createAsyncThunk(
  "deposits/approve",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post(
        `${API_URL}/deposits/approve/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { id, message: response.data.message };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to approve deposit"
      );
    }
  }
);

// New: Decline a deposit
export const declineDeposit = createAsyncThunk(
  "deposits/decline",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post(
        `${API_URL}/deposits/decline/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { id, message: response.data.message };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to decline deposit"
      );
    }
  }
);

const depositSlice = createSlice({
  name: "deposits",
  initialState: {
    deposits: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Deposit
      .addCase(createDeposit.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createDeposit.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createDeposit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Fetch All Deposits
      .addCase(fetchDeposits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeposits.fulfilled, (state, action) => {
        state.loading = false;
        state.deposits = action.payload;
      })
      .addCase(fetchDeposits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Approve Deposit
      .addCase(approveDeposit.fulfilled, (state, action) => {
        const deposit = state.deposits.find((d) => d._id === action.payload.id);
        if (deposit) {
          deposit.status = "approved";
        }
      })

      // Decline Deposit
      .addCase(declineDeposit.fulfilled, (state, action) => {
        const deposit = state.deposits.find((d) => d._id === action.payload.id);
        if (deposit) {
          deposit.status = "declined";
        }
      });
  },
});

export default depositSlice.reducer;
