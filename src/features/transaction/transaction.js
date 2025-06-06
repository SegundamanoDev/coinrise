import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../backendUrl"; // Ensure this path is correct

const getToken = () => localStorage.getItem("authToken");

// Action for creating a deposit (now also used for other transaction types potentially)
export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async (data, thunkAPI) => {
    // 'data' here is expected to be a FormData object for deposit with paymentProof
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
        err.response?.data?.message || "Failed to fetch transactions"
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
      // The backend should return the updated transaction object
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

// User: Fetch their deposit history (specific route)
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

// Fetch single transaction by ID
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

// NEW ASYNC THUNK FOR UPGRADE DEPOSIT (uses FormData for file)
export const initiateUpgradeDeposit = createAsyncThunk(
  "transaction/initiateUpgradeDeposit",
  async (formData, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.post(
        `${API_URL}/transactions/upgrade-request`,
        formData, // Sending FormData
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data; // Backend should return a message like { message: "Upgrade request submitted!" }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to submit upgrade request"
      );
    }
  }
);

// --- Transaction Slice Definition ---
const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    items: [], // Admin view: stores all transactions
    userTransactions: [], // User's view: stores transactions for the logged-in user
    loading: false, // General loading indicator for fetches (e.g., fetchTransactions, fetchUserTransactions)
    error: null, // General error for fetches
    selectedTransaction: null, // For viewing a single transaction by ID

    creating: false, // Loading indicator for creating new transactions (deposits, withdrawals)
    createError: null, // Error for transaction creation

    // Specific state for the upgrade deposit flow (can be reused if desired)
    depositStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    depositError: null,
    depositMessage: null,
  },
  reducers: {
    // Resets the status of a new deposit/upgrade request
    resetDepositStatus: (state) => {
      state.depositStatus = "idle";
      state.depositError = null;
      state.depositMessage = null;
    },
    // You can add more specific resets here if needed, e.g., resetCreateStatus
    resetCreateStatus: (state) => {
      state.creating = false;
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- createTransaction (User deposit/transaction creation) ---
      .addCase(createTransaction.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.creating = false;
        state.createMessage =
          action.payload.message ||
          "Transaction request submitted successfully!"; // Assuming backend sends message
        // Add new transaction to the user's list (if applicable, ensure payload is the transaction object)
        state.userTransactions.unshift(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      })

      // --- createTransactionW (User withdrawal creation) ---
      .addCase(createTransactionW.pending, (state) => {
        state.creating = true; // Use 'creating' for consistency
        state.createError = null;
      })
      .addCase(createTransactionW.fulfilled, (state, action) => {
        state.creating = false;
        state.createMessage =
          action.payload.message || "Withdrawal request submitted!"; // Assuming backend sends message
        // Add new withdrawal to the user's list
        state.userTransactions.unshift(action.payload);
      })
      .addCase(createTransactionW.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      })

      // --- fetchTransactions (Admin fetch all) ---
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

      // --- updateTransactionStatus (Admin approve/decline) ---
      .addCase(updateTransactionStatus.fulfilled, (state, action) => {
        const updatedTransaction = action.payload;
        // Update the transaction in the admin's 'items' list
        state.items = state.items.map((t) =>
          t._id === updatedTransaction._id ? updatedTransaction : t
        );
        // Also update if it's the selected transaction being viewed
        if (
          state.selectedTransaction &&
          state.selectedTransaction._id === updatedTransaction._id
        ) {
          state.selectedTransaction = updatedTransaction;
        }
      })
      .addCase(updateTransactionStatus.rejected, (state, action) => {
        // Handle rejection specific to update status, if needed
        console.error("Failed to update transaction status:", action.payload);
      })

      // --- fetchUserTransactions (User's own general transactions) ---
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

      // --- fetchUserDeposits (User's specific deposit history) ---
      .addCase(fetchUserDeposits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDeposits.fulfilled, (state, action) => {
        state.loading = false;
        state.userTransactions = action.payload; // This will overwrite all userTransactions, ensure desired behavior
      })
      .addCase(fetchUserDeposits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- fetchTransactionById ---
      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous error
        state.selectedTransaction = null;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.selectedTransaction = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || action.payload?.message;
      })

      // --- initiateUpgradeDeposit ---
      .addCase(initiateUpgradeDeposit.pending, (state) => {
        state.depositStatus = "loading"; // Correctly set the depositStatus for this specific flow
        state.depositError = null;
        state.depositMessage = null;
      })
      .addCase(initiateUpgradeDeposit.fulfilled, (state, action) => {
        state.depositStatus = "succeeded";
        // Assuming action.payload contains a `message` property from the backend
        state.depositMessage =
          action.payload.message || "Upgrade request submitted successfully!";
        // Optionally add the new upgrade transaction to the user's list if the payload contains it
        if (action.payload.transaction) {
          state.userTransactions.unshift(action.payload.transaction);
        }
      })
      .addCase(initiateUpgradeDeposit.rejected, (state, action) => {
        state.depositStatus = "failed";
        state.depositError =
          action.payload || "An unknown error occurred during upgrade request.";
        state.depositMessage = null;
      });
  },
});

export const { resetDepositStatus, resetCreateStatus } =
  transactionSlice.actions;
export default transactionSlice.reducer;
