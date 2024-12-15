import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../src/components/HomePage";
import LoginPage from "../src/components/Login";
import AdminDashboard from "../src/components/AdminDashboard";
import Register from "./components/Register";
import ManagerDashboard from "./components/manager/ManagerDashboard";
import Receptionist from "./components/ReceptionDashboad";
import CustomerManager from "./components/CustomerManager";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("token") !== null);
  const [role, setRole] = useState(sessionStorage.getItem("role")); // Đọc role từ sessionStorage

  // Lắng nghe sự thay đổi của trạng thái và cập nhật sessionStorage
  useEffect(() => {
    if (isAuthenticated && role) {
      sessionStorage.setItem("role", role);
    }
  }, [isAuthenticated, role]);

  const handleLogin = (userRole) => {
    setIsAuthenticated(true);
    setRole(userRole);
    sessionStorage.setItem("token", sessionStorage.getItem("token")); // Giả sử token đã được lấy từ API
    sessionStorage.setItem("role", userRole);
  };

  const redirectBasedOnRole = () => {
    switch (role) {
      case "ROLE_ADMIN":
        return "/admin-dashboard";
      case "ROLE_RECEPTIONIST":
        return "/receptionist-dashboard";
      case "ROLE_CUSTOMER":
        return "/customer-dashboard";
      case "ROLE_MANAGER":
        return "/manager-dashboard";
      default:
        return "/";
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to={redirectBasedOnRole()} />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <Register />
            ) : (
              <Navigate to={redirectBasedOnRole()} />
            )
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            isAuthenticated && role === "ROLE_ADMIN" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/receptionist-dashboard"
          element={
            isAuthenticated && role === "ROLE_RECEPTIONIST" ? (
              <Receptionist />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/customer-dashboard"
          element={
            isAuthenticated && role === "ROLE_CUSTOMER" ? (
              <CustomerManager />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/manager-dashboard"
          element={
            isAuthenticated && role === "ROLE_MANAGER" ? (
              <ManagerDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
