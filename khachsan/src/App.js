  import "./App.css";
  import React, { useState, useEffect } from 'react';
  import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
  import HomePage from "../src/componet/HomePage";
  import LoginPage from "../src/componet/Login";
  import AdminDashboard from "../src/componet/AdminDashboard";
  import CustomerManager from "./componet/CustomerManagement";
  import Register from "./componet/Register";
  import EmployeeManagement from "./componet/EmployeeManagement";

  const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') !== null);
    const [role, setRole] = useState(localStorage.getItem('role')); // Đọc role từ localStorage

    // Lắng nghe sự thay đổi của trạng thái và cập nhật localStorage
    useEffect(() => {
      if (isAuthenticated && role) {
        localStorage.setItem('role', role);
      }
    }, [isAuthenticated, role]);

    const handleLogin = (userRole) => {
      setIsAuthenticated(true);
      setRole(userRole);
      localStorage.setItem('token', localStorage.getItem('token')); // Giả sử token đã được lấy từ API
      localStorage.setItem('role', userRole);
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
            path="/employee-dashboard"
            element={
              isAuthenticated && role === "ROLE_MANAGER" ? (
                <EmployeeManagement />
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
