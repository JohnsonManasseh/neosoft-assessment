import React from "react";
import "./App.css";
import RegisterForm from "./components/Register";
import LoginForm from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import TaskManagement from "./components/TaskManagement";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
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
      </DndProvider>
    </BrowserRouter>
  );
};

export default App;
