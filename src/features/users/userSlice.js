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

// 3. Update user (Admin update of any user by ID)
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

// 7. Fetch JWT user's profile (for the logged-in user)
export const fetchProfile = createAsyncThunk(
  "users/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.get(`${API_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

// Change User Password (for the logged-in user)
export const changePassword = createAsyncThunk(
  "users/changePassword",
  async (passwords, thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.put(`${API_URL}/users/password`, passwords, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return success message or confirmation
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update User Profile Info (e.g., name, country, phone, address for logged-in user)
export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async (userData, thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.put(`${API_URL}/users/profile`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return the updated user object
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// =====================
// Initial State
// =====================

const initialState = {
  users: [],
  selectedUser: null,
  passwordStatus: { loading: false, success: null, error: null },
  adminUpdateUserStatus: { loading: false, success: null, error: null },
  // This `updateStatus` is specifically for the `updateProfile` thunk (user's own profile)
  updateStatus: { loading: false, success: null, error: null },
  profile: null,
  loading: false, // General loading for fetches (fetchUsers, fetchUserById, deleteUser, topupUserProfit, fetchProfile)
  error: null, // General error for fetches
  statusMessage: null, // General success message for various actions
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
    resetAdminUpdateUserStatus: (state) => {
      state.adminUpdateUserStatus = {
        loading: false,
        success: null,
        error: null,
      };
    },
    resetPasswordStatus: (state) => {
      state.passwordStatus = { loading: false, success: null, error: null };
    },
    // Re-added this reducer for the user's own profile update status
    resetUpdateStatus: (state) => {
      state.updateStatus = { loading: false, success: null, error: null };
    },
    // `resetAvatarStatus` is not defined in reducers, so it remains commented out.
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

      // Update User (Admin update of any user by ID)
      .addCase(updateUser.pending, (state) => {
        state.adminUpdateUserStatus.loading = true;
        state.adminUpdateUserStatus.error = null;
        state.adminUpdateUserStatus.success = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.adminUpdateUserStatus.loading = false;
        state.adminUpdateUserStatus.success = true;
        state.selectedUser = action.payload;
        state.statusMessage = "User updated successfully!";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.adminUpdateUserStatus.loading = false;
        state.adminUpdateUserStatus.error = action.payload;
        state.adminUpdateUserStatus.success = false;
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

      // Top Up Profit
      .addCase(topupUserProfit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topupUserProfit.fulfilled, (state, action) => {
        state.loading = false;
        if (
          state.selectedUser &&
          state.selectedUser._id === action.payload._id
        ) {
          state.selectedUser = action.payload;
        }
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id
        );
        if (index !== -1) state.users[index] = action.payload;
        state.statusMessage = "Profit topped up successfully";
      })
      .addCase(topupUserProfit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateProfile (for the logged-in user)
      .addCase(updateProfile.pending, (state) => {
        state.updateStatus.loading = true;
        state.updateStatus.success = null;
        state.updateStatus.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateStatus.loading = false;
        state.updateStatus.success = true;
        state.profile = action.payload;
        state.statusMessage = "Profile updated successfully!";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateStatus.loading = false;
        state.updateStatus.success = false;
        state.updateStatus.error = action.payload;
      })
      // changePassword
      .addCase(changePassword.pending, (state) => {
        state.passwordStatus.loading = true;
        state.passwordStatus.success = null;
        state.passwordStatus.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.passwordStatus.loading = false;
        state.passwordStatus.success = true;
        state.statusMessage = "Password changed successfully!";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.passwordStatus.loading = false;
        state.passwordStatus.success = false;
        state.passwordStatus.error = action.payload;
      });
  },
});

// =====================
// Exports
// =====================

// Re-added resetUpdateStatus to exports
export const {
  clearStatusMessage,
  clearSelectedUser,
  resetAdminUpdateUserStatus,
  resetPasswordStatus,
  resetUpdateStatus,
} = userSlice.actions;

export default userSlice.reducer;
