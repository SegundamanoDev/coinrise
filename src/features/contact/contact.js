// src/features/contact/contactSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../backendUrl";
import axios from "axios";
// ------------------------------------
// Async Thunk for sending contact message
// ------------------------------------
export const sendContactMessage = createAsyncThunk(
  "contact/sendMessage",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(`${API_URL}/send-message`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ------------------------------------
// Contact Slice Definition
// ------------------------------------
const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false, // True when a message is being sent
    success: false, // True if the last message was sent successfully
    error: null, // Stores error message if submission fails
    statusMessage: null, // Stores success message if submission succeeds
  },
  reducers: {
    // Action to clear all status messages (success/error)
    clearContactStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.statusMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state when sendContactMessage is dispatched
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.statusMessage = null;
      })
      // Handle fulfilled state when sendContactMessage succeeds
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.statusMessage = action.payload; // Payload is the success message from the backend
      })
      // Handle rejected state when sendContactMessage fails
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "An unknown error occurred."; // Payload is the error message from rejectWithValue
        state.statusMessage = null;
      });
  },
});

// Export the reducer and actions
export const { clearContactStatus } = contactSlice.actions;
export default contactSlice.reducer;
