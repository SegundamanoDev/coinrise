import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../backendUrl";

const getToken = () => localStorage.getItem("authToken");

// =====================
// Thunks
// =====================

// 1. Fetch all users
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

// 2. Fetch user by ID
export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (id, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.get(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// 3. Update user
export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, updates }, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.put(`${API_URL}/users/${id}`, updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update user"
      );
    }
  }
);

// 4. Delete user
export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, thunkAPI) => {
    try {
      const token = getToken();
      await axios.delete(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

// 5. Toggle user status (block/unblock)
export const toggleUserStatus = createAsyncThunk(
  "users/toggleStatus",
  async (id, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.patch(
        `${API_URL}/users/${id}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { id, message: res.data.message };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to toggle status"
      );
    }
  }
);

// 6. Top up profit
export const topupUserProfit = createAsyncThunk(
  "users/topupProfit",
  async ({ id, amount }, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.post(
        `${API_URL}/users/topup-profit/${id}`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to top up profit"
      );
    }
  }
);

// =====================
// Initial State
// =====================

const initialState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  statusMessage: null,
};

// =====================
// Slice
// =====================

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearStatusMessage: (state) => {
      state.statusMessage = null;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch User By ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedUser = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.statusMessage = "User updated successfully";
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id
        );
        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.statusMessage = "User deleted successfully";
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle User Status
      .addCase(toggleUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.statusMessage = action.payload.message;
        const user = state.users.find((u) => u._id === action.payload.id);
        if (user) user.isBlocked = !user.isBlocked;
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Top Up Profit
      .addCase(topupUserProfit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topupUserProfit.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id
        );
        if (index !== -1) state.users[index] = action.payload;
        state.statusMessage = "Profit topped up successfully";
      })
      .addCase(topupUserProfit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// =====================
// Exports
// =====================

export const { clearStatusMessage, clearSelectedUser } = userSlice.actions;

export default userSlice.reducer;
