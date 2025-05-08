import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/adminSlice";
import usersReducer from "../features/users/userSlice";
import investmentReducer from "../features/investment/investmentsSlice";
import referralReducer from "../features/referral/referralSlice";
import logsReducer from "../features/log/logsSlice";
import settingsReducer from "../features/setting/settingSlice";
import authReducer from "../features/users/authSlice";
export const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
    users: usersReducer,
    investment: investmentReducer,
    referral: referralReducer,
    logs: logsReducer,
    settings: settingsReducer,
  },
});
