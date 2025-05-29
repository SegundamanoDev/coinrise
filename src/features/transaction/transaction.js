// features/transaction/transaction.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../backendUrl"; // Ensure this path is correct

const getToken = () => localStorage.getItem("authToken");

// Action for creating a deposit (now also used for other transaction types potentially)
export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (data, thunkAPI) => {
    // 'data' here is expected to be a FormData object
    try {
      const token = getToken();
      const res = await axios.post(`${API_URL}/transactions/request`, data, {
        headers: {
          // When sending FormData, axios automatically sets Content-Type to 'multipart/form-data'
          // Do NOT manually set 'Content-Type': 'application/json' for FormData
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

// Action for creating a withdrawal (keeping it separate for clarity, though it uses the same route)
export const createTransactionW = createAsyncThunk(
  "transactions/createTransactionW",
  async (data, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.post(`${API_URL}/transactions/request`, data, {
        headers: {
          "Content-Type": "application/json", // Withdrawals likely don't send files, so JSON is fine
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

export const fetchTransactionById = createAsyncThunk(
  "transactions/fetchTransactionById",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();
      const res = await axios.get(`${API_URL}/transactions/${id}`, {
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

// NEW ASYNC THUNK FOR UPGRADE DEPOSIT
export const initiateUpgradeDeposit = createAsyncThunk(
  "transaction/initiateUpgradeDeposit",
  async (formData, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.post(
        `${API_URL}/transactions/upgrade-request`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch your transactions"
      );
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
    selectedTransaction: null,
    creating: false, // Creating transaction
    createError: null, // Error while creating
    depositStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    depositError: null,
    depositMessage: null,
  },
  reducers: {
    resetDepositStatus: (state) => {
      state.depositStatus = "idle";
      state.depositError = null;
      state.depositMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // User create (Deposit, potentially other types)
      .addCase(createTransaction.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.creating = false;
        state.userTransactions.unshift(action.payload); // Add new transaction to list
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      })

      // User withdrawal (createTransactionW)
      .addCase(createTransactionW.pending, (state) => {
        state.creating = true; // Use 'creating' for consistency
        state.createError = null;
      })
      .addCase(createTransactionW.fulfilled, (state, action) => {
        state.creating = false;
        state.userTransactions.unshift(action.payload); // Add withdrawal to list
      })
      .addCase(createTransactionW.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      })

      // Admin fetch all transactions
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

      // Admin update transaction status
      .addCase(updateTransactionStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        state.items = state.items.map((t) =>
          t._id === updated._id ? updated : t
        );
      })

      // User fetch their own transactions
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

      // Fetch user deposits (specific type)
      .addCase(fetchUserDeposits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDeposits.fulfilled, (state, action) => {
        state.loading = false;
        state.userTransactions = action.payload; // This will overwrite all userTransactions, be careful
      })
      .addCase(fetchUserDeposits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch single transaction by ID
      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous error
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.selectedTransaction = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || action.payload?.message; // Use payload message if available
      })

      // NEW HANDLERS FOR initiateUpgradeDeposit
      .addCase(initiateUpgradeDeposit.pending, (state) => {
        state.loading = true; // You might want a separate 'isSubmitting' state
        state.error = null;
      })
      .addCase(initiateUpgradeDeposit.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally, add the new upgrade transaction to userTransactions or items
        // depending on whether it should immediately appear for the user or only admin
        state.userTransactions.push(action.payload); // Add to user's list
        // If admins should see it immediately without re-fetching, add to items too
        state.items.push(action.payload);
      })
      .addCase(initiateUpgradeDeposit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { resetDepositStatus } = transactionSlice.actions;
export default transactionSlice.reducer;
