import { configureStore } from "@reduxjs/toolkit";
import loginFormReducer from "./LoginSlice";

const store = configureStore({
  reducer: {
    loginForm: loginFormReducer,
  },
});

export default store;
