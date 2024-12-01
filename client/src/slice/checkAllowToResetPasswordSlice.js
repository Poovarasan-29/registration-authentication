import { createSlice } from "@reduxjs/toolkit";

const checkAllowToResetPasswordSlice = createSlice({
  name: "checkAllowToResetPassword",
  initialState: false,
  reducers: {
    setCheckAllowToResetPassword: (state) => {
      return !state;
    },
  },
});

export const { setCheckAllowToResetPassword } =
  checkAllowToResetPasswordSlice.actions;
export default checkAllowToResetPasswordSlice.reducer;
