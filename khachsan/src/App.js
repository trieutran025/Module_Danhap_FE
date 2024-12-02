import "./App.css";
  import React, { useState, useEffect } from 'react';
  import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
  import HomePage from "../src/components/HomePage";
  import LoginPage from "../src/components/Login";
  import AdminDashboard from "../src/components/AdminDashboard";
  import CustomerManager from "./components/CustomerManagement";
  import Register from "./components/Register";
  import ManagerDashboard from "./components/manager/ManagerDashboard";
  import Receptionist from "./components/receptionist/Receptionist";

  const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('token') !== null);
    const [role, setRole] = useState(sessionStorage.getItem('role')); // Đọc role từ localStorage

    // Lắng nghe sự thay đổi của trạng thái và cập nhật localStorage
    useEffect(() => {
      if (isAuthenticated && role) {
        sessionStorage.setItem('role', role);
      }
    }, [isAuthenticated, role]);

    const handleLogin = (userRole) => {
      setIsAuthenticated(true);
      setRole(userRole);
      sessionStorage.setItem('token', sessionStorage.getItem('token')); // Giả sử token đã được lấy từ API
      sessionStorage.setItem('role', userRole);
    };

    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />

          {/* Điều hướng dựa trên vai trò */}
          <Route
            path="/admin-dashboard"
            element={
              isAuthenticated && role === "ROLE_ADMIN" ? (
                <AdminDashboard/>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/receptionist-dashboard"
            element={
              isAuthenticated && role === "ROLE_RECEPTIONIST" ? (
                <Receptionist/>
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
                < ManagerDashboard/>
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