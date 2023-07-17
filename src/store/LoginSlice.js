// LoginFormSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  name: "",
  password: "",
  recaptcha: "",
};

const loginFormSlice = createSlice({
  name: "loginForm",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setRecaptcha: (state, action) => {
      state.recaptcha = action.payload;
    },
  },
});

export const { loginUser, setName, setPassword, setRecaptcha } =
  loginFormSlice.actions;
export default loginFormSlice.reducer;
