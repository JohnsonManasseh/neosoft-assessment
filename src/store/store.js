import { configureStore } from "@reduxjs/toolkit";
import loginFormReducer from "./LoginSlice";
import taskReducer from "./TaskSlice";

const store = configureStore({
  reducer: {
    loginForm: loginFormReducer,
    task: taskReducer,
    devTools: process.env.NODE_ENV !== "production", // Only enable in non-production environment
  },
});

export default store;
