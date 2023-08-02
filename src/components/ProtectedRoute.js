import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   let login = localStorage.getItem("login");
  //   if (!login) {
  //     navigate("/login");
  //   }
  // }, []);
  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default ProtectedRoute;
