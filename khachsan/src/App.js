import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "../src/componet/HomePage";
import LoginPage from "../src/componet/Login";
import AdminDashboard from "../src/componet/AdminDashboard";
import CustomerManager from "./componet/CustomerManagement";
import Register from "./componet/Register";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Hàm xử lý đăng nhập
  const handleLogin = () => {
    setIsAuthenticated(true); // Đánh dấu người dùng đã đăng nhập
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<Register/>} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />}
        />
         <Route
          path="/dashboard"
          element={isAuthenticated ? <CustomerManager /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
