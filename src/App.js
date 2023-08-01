import React from "react";
import "./App.css";
import RegisterForm from "./pages/Register";
import LoginForm from "./pages/Login";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TaskManagement from "./pages/TaskManagement";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";

const App = () => {
  const isLoggedIn = useSelector((state) => state.loginForm.isLoggedIn);

  return (
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <div>
          <Routes>
            <Route path="/" element={<RegisterForm />} />
            <Route path="login" element={<LoginForm />} />
            {isLoggedIn && (
              <Route path="/login/dashboard" element={<Dashboard />} />
            )}
            {isLoggedIn && (
              <Route
                path="/login/dashboard/taskmanagement"
                element={<TaskManagement />}
              />
            )}
          </Routes>
        </div>
      </DndProvider>
    </BrowserRouter>
  );
};

export default App;
