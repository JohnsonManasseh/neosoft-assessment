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
    logout: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

export const { loginUser, setName, setPassword, setRecaptcha, logout } =
  loginFormSlice.actions;
export default loginFormSlice.reducer;
