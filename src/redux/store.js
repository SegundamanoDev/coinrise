import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/admin/adminSlice";
import usersReducer from "../features/users/userSlice";
import investmentReducer from "../features/investment/investmentsSlice";
import settingsReducer from "../features/setting/settingSlice";
import authReducer from "../features/users/authSlice";
import dashboardReducer from "../features/dashboard/dashboard";
import depositReducer from "../features/deposit/deposit";
import transactionsReducer from "../features/transaction/transaction";
import withdrawalsReducer from "../features/withdraw/withdraw";
import investmentPlansReducer from "../features/investmentPlan/investmentPlan";
export const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
    users: usersReducer,
    investment: investmentReducer,
    setting: settingsReducer,
    dashboard: dashboardReducer,
    deposit: depositReducer,
    transaction: transactionsReducer,
    withdraw: withdrawalsReducer,
    investmentPlan: investmentPlansReducer,
  },
});
