import { configureStore } from "@reduxjs/toolkit";
import checkAllowToResetPassword from "./slice/checkAllowToResetPasswordSlice";

const store = configureStore({
  reducer: {
    checkAllowToResetPassword
  },
});

export default store;
