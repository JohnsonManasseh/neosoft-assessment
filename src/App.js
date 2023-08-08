import React from "react";
import "./App.css";
import RegisterForm from "./pages/Register";
import LoginForm from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TaskManagement from "./pages/TaskManagement";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const isLoggedIn = useSelector((state) => state.loginForm.isLoggedIn);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />

          <Route
            path="/login/dashboard"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login/dashboard/taskmanagement"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <TaskManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
