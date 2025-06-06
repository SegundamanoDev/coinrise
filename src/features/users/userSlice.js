import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../backendUrl";

const getToken = () => localStorage.getItem("authToken");

// =====================
// Thunks
// =====================

// 1. Fetch all users (Admin only)
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

// 2. Fetch user by ID (Admin only)
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

// 4. Delete user (Admin only)
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

// 5. Top up profit (Admin only)
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

// 6. Fetch JWT user's profile (for the logged-in user)
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

// 7. Change User Password (for the logged-in user)
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

// 8. Update User Profile Info (for logged-in user: name, country, phone, address, city, zip)
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

// 9. Submit KYC Documents (from user frontend)
// This thunk expects FormData, which is necessary for file uploads
export const submitKYCDocuments = createAsyncThunk(
  "users/submitKYCDocuments",
  async (formData, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.post(`${API_URL}/users/kyc/submit`, formData, {
        // Targeting the base /users POST route
        headers: {
          Authorization: `Bearer ${token}`,
          // When sending FormData, browsers automatically set the Content-Type to multipart/form-data
        },
      });
      // The backend should return the updated user profile or a success message
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to submit KYC documents."
      );
    }
  }
);

// 10. Update User KYC Status (Admin action)
export const updateUserKycStatus = createAsyncThunk(
  "users/updateUserKycStatus",
  async ({ id, kycStatus, kycRejectionReason = null }, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.patch(
        `${API_URL}/users/kyc/${id}/status`, // Admin endpoint: PATCH /api/users/kyc/:id/status
        { kycStatus, kycRejectionReason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.user; // Backend should send back the updated user object
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update KYC status."
      );
    }
  }
);

// 11. Upload User Avatar
export const uploadAvatar = createAsyncThunk(
  "users/uploadAvatar",
  async (formData, thunkAPI) => {
    try {
      const token = getToken();
      const res = await axios.put(`${API_URL}/users/profile/avatar`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data; // Backend returns { message: "...", user: { ...updatedUser } }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to upload profile picture."
      );
    }
  }
);

// =====================
// Initial State
// =====================

const initialState = {
  users: [], // Array for all users (Admin view)
  selectedUser: null, // For viewing/editing a specific user by ID (Admin view)
  profile: null, // For the currently logged-in user's profile

  loading: false, // General loading indicator for main fetches (e.g., fetchProfile, fetchUsers)
  error: null, // General error for main fetches
  statusMessage: null, // General success/info message to display (e.g., in toasts)

  // Specific status objects for various async operations
  passwordStatus: { loading: false, success: null, error: null }, // For changePassword
  adminUpdateUserStatus: { loading: false, success: null, error: null }, // For updateUser (Admin)
  updateStatus: { loading: false, success: null, error: null }, // For updateProfile (User's own profile)
  kycSubmissionStatus: {
    // For user submitting KYC documents
    loading: false,
    success: null, // true on success, false on failure
    error: null,
    message: null, // specific success/error message
  },
  adminKycUpdateStatus: {
    // For admin updating a user's KYC status
    loading: false,
    success: null,
    error: null,
    message: null,
  },
  avatarUploadStatus: {
    // For user uploading their profile picture
    loading: false,
    success: null,
    error: null,
    message: null,
  },
};

// =====================
// Slice
// =====================

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Reducer to clear the general status message
    clearStatusMessage: (state) => {
      state.statusMessage = null;
    },
    // Reducer to clear the selected user from state (e.g., after leaving admin user edit page)
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    // Reducers to reset specific operation statuses
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
    resetUpdateStatus: (state) => {
      state.updateStatus = { loading: false, success: null, error: null };
    },
    resetKYCSubmissionStatus: (state) => {
      state.kycSubmissionStatus = {
        loading: false,
        success: null,
        error: null,
        message: null,
      };
    },
    resetAdminKycUpdateStatus: (state) => {
      state.adminKycUpdateStatus = {
        loading: false,
        success: null,
        error: null,
        message: null,
      };
    },
    resetAvatarUploadStatus: (state) => {
      state.avatarUploadStatus = {
        loading: false,
        success: null,
        error: null,
        message: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // --- fetchUsers ---
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

      // --- fetchUserById ---
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedUser = null; // Clear previous selected user
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- updateUser (Admin update) ---
      .addCase(updateUser.pending, (state) => {
        state.adminUpdateUserStatus.loading = true;
        state.adminUpdateUserStatus.error = null;
        state.adminUpdateUserStatus.success = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.adminUpdateUserStatus.loading = false;
        state.adminUpdateUserStatus.success = true;
        state.selectedUser = action.payload; // Update selected user with new data
        // Also update the user in the main 'users' array if it exists
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.statusMessage = "User updated successfully!";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.adminUpdateUserStatus.loading = false;
        state.adminUpdateUserStatus.error = action.payload;
        state.adminUpdateUserStatus.success = false;
      })

      // --- deleteUser ---
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.statusMessage = "User deleted successfully";
        state.users = state.users.filter((user) => user._id !== action.payload); // Remove deleted user
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- topupUserProfit ---
      .addCase(topupUserProfit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topupUserProfit.fulfilled, (state, action) => {
        state.loading = false;
        // Update selected user and users array if a match is found
        if (
          state.selectedUser &&
          state.selectedUser._id === action.payload._id
        ) {
          state.selectedUser = action.payload;
        }
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.statusMessage = "Profit topped up successfully";
      })
      .addCase(topupUserProfit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- fetchProfile ---
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

      // --- updateProfile (Logged-in user's own profile) ---
      .addCase(updateProfile.pending, (state) => {
        state.updateStatus.loading = true;
        state.updateStatus.success = null;
        state.updateStatus.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateStatus.loading = false;
        state.updateStatus.success = true;
        state.profile = action.payload; // Update profile with new data
        state.statusMessage = "Profile updated successfully!";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateStatus.loading = false;
        state.updateStatus.success = false;
        state.updateStatus.error = action.payload;
      })

      // --- changePassword ---
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
      })

      // --- submitKYCDocuments ---
      .addCase(submitKYCDocuments.pending, (state) => {
        state.kycSubmissionStatus.loading = true;
        state.kycSubmissionStatus.success = null;
        state.kycSubmissionStatus.error = null;
        state.kycSubmissionStatus.message = null;
      })
      .addCase(submitKYCDocuments.fulfilled, (state, action) => {
        state.kycSubmissionStatus.loading = false;
        state.kycSubmissionStatus.success = true;
        state.kycSubmissionStatus.message =
          action.payload.message ||
          "KYC documents submitted successfully for review.";
        // Update profile with the new kycStatus (should be 'pending' from backend)
        if (action.payload.user) {
          state.profile = action.payload.user;
        } else if (state.profile) {
          state.profile.kycStatus = "pending"; // Fallback if backend doesn't send user object
        }
        state.statusMessage = state.kycSubmissionStatus.message;
      })
      .addCase(submitKYCDocuments.rejected, (state, action) => {
        state.kycSubmissionStatus.loading = false;
        state.kycSubmissionStatus.success = false;
        state.kycSubmissionStatus.error = action.payload;
        state.kycSubmissionStatus.message =
          action.payload || "Failed to submit KYC documents.";
      })

      // --- updateUserKycStatus (Admin action) ---
      .addCase(updateUserKycStatus.pending, (state) => {
        state.adminKycUpdateStatus.loading = true;
        state.adminKycUpdateStatus.success = null;
        state.adminKycUpdateStatus.error = null;
        state.adminKycUpdateStatus.message = null;
      })
      .addCase(updateUserKycStatus.fulfilled, (state, action) => {
        state.adminKycUpdateStatus.loading = false;
        state.adminKycUpdateStatus.success = true;
        state.adminKycUpdateStatus.message = `KYC status updated to ${action.payload.kycStatus}.`;

        // Update the 'users' array (for admin list views)
        state.users = state.users.map((user) =>
          user._id === action.payload._id
            ? { ...user, ...action.payload }
            : user
        );
        // Update 'selectedUser' if the currently viewed user is the one updated
        if (
          state.selectedUser &&
          state.selectedUser._id === action.payload._id
        ) {
          state.selectedUser = { ...state.selectedUser, ...action.payload };
        }
        // If the admin is updating their *own* profile, update the 'profile' state as well
        if (state.profile && state.profile._id === action.payload._id) {
          state.profile = { ...state.profile, ...action.payload };
        }
        state.statusMessage = state.adminKycUpdateStatus.message; // Use general status message for toasts
      })
      .addCase(updateUserKycStatus.rejected, (state, action) => {
        state.adminKycUpdateStatus.loading = false;
        state.adminKycUpdateStatus.success = false;
        state.adminKycUpdateStatus.error = action.payload;
        state.adminKycUpdateStatus.message =
          action.payload || "Failed to update KYC status.";
        state.statusMessage = state.adminKycUpdateStatus.message; // Use general status message for toasts
      })

      // --- uploadAvatar ---
      .addCase(uploadAvatar.pending, (state) => {
        state.avatarUploadStatus.loading = true;
        state.avatarUploadStatus.success = null;
        state.avatarUploadStatus.error = null;
        state.avatarUploadStatus.message = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.avatarUploadStatus.loading = false;
        state.avatarUploadStatus.success = true;
        state.avatarUploadStatus.message =
          action.payload.message || "Profile picture updated!";
        // Update the profile with the new avatar URL returned from the backend
        if (action.payload.user && action.payload.user.avatar) {
          state.profile.avatar = action.payload.user.avatar;
        }
        state.statusMessage = state.avatarUploadStatus.message; // Use general status message for toast
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.avatarUploadStatus.loading = false;
        state.avatarUploadStatus.success = false;
        state.avatarUploadStatus.error = action.payload;
        state.avatarUploadStatus.message =
          action.payload || "Failed to update profile picture.";
        state.statusMessage = state.avatarUploadStatus.message; // Use general status message for toast
      });
  },
});

// =====================
// Exports
// =====================

export const {
  clearStatusMessage,
  clearSelectedUser,
  resetAdminUpdateUserStatus,
  resetPasswordStatus,
  resetUpdateStatus,
  resetKYCSubmissionStatus,
  resetAdminKycUpdateStatus,
  resetAvatarUploadStatus,
} = userSlice.actions;

export default userSlice.reducer;
