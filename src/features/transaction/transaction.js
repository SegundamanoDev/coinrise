import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../backendUrl";

const getToken = () => localStorage.getItem("authToken");

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (data, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.post(`${API_URL}/transactions/request`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Transaction creation failed"
      );
    }
  }
);

export const createTransactionW = createAsyncThunk(
  "transactions/createTransactionW",
  async (data, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.post(`${API_URL}/transactions/request`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Transaction creation failed"
      );
    }
  }
);

// Admin: Fetch all transactions (optionally filtered)
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (params = {}, thunkAPI) => {
    try {
      const token = getToken();
      const query = new URLSearchParams(params).toString();
      const res = await axios.get(`${API_URL}/transactions/admin?${query}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch"
      );
    }
  }
);

// Admin: Approve or decline a transaction
export const updateTransactionStatus = createAsyncThunk(
  "transactions/updateStatus",
  async ({ id, action }, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.patch(
        `${API_URL}/transactions/transactions-update`,
        { id, action },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.transaction;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Update failed"
      );
    }
  }
);

// User: Fetch their own transactions
export const fetchUserTransactions = createAsyncThunk(
  "transactions/fetchUserTransactions",
  async (_, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.get(`${API_URL}/transactions/my`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch your transactions"
      );
    }
  }
);
export const fetchUserDeposits = createAsyncThunk(
  "transactions/fetchUserDeposits",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.get(`${API_URL}/transactions/deposits-history`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    items: [], // Admin view
    userTransactions: [], // User's view
    loading: false, // Fetch/update loading
    error: null, // Fetch/update error

    creating: false, // Creating transaction
    createError: null, // Error while creating
  },

  reducers: {},
  extraReducers: (builder) => {
    builder

      // User create
      .addCase(createTransaction.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.creating = false;
        state.userTransactions.unshift(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      })

      // Admin fetch
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Admin update
      .addCase(updateTransactionStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        state.items = state.items.map((t) =>
          t._id === updated._id ? updated : t
        );
      })

      // User fetch
      .addCase(fetchUserTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserTransactions.fulfilled, (state, action) => {
        state.userTransactions = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchUserDeposits
      .addCase(fetchUserDeposits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDeposits.fulfilled, (state, action) => {
        state.loading = false;
        state.userTransactions = action.payload;
      })
      .addCase(fetchUserDeposits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // User withdraw (createTransactionW)
      .addCase(createTransactionW.pending, (state) => {
        state.createError = true;
        state.createError = null;
      })
      .addCase(createTransactionW.fulfilled, (state, action) => {
        state.createError = false;
        state.userTransactions.unshift(action.payload); // Add withdrawal to list
      })
      .addCase(createTransactionW.rejected, (state, action) => {
        state.createError = false;
        state.createError = action.payload;
      });
  },
});

export default transactionSlice.reducer;
