import React from "react";
import "./App.css";
import RegisterForm from "./components/Register";
import LoginForm from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import TaskManagement from "./components/TaskManagement";

// import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <div>
        <Routes>
          <Route path="/" element={<RegisterForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="login/dashboard" element={<Dashboard />} />
          <Route
            path="login/dashboard/taskmanagement"
            element={<TaskManagement />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
