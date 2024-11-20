import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "../src/componet/HomePage";
import LoginPage from "../src/componet/Login";
import AdminDashboard from "../src/componet/AdminDashboard";
import CustomerManager from "./componet/CustomerManagement";
import Register from "./componet/Register";

import EmployeeManagement from "./componet/EmployeeManagement";
import CustomerManagement from "./componet/CustomerManagement"; // Make sure the path is correct

const App = () => {
  // The error 'no-unused-expressions' could occur if you had an unused expression, 
  // make sure any expressions are part of a valid statement like a function call or assignment
  
  // Example of avoiding an unused expression
  let s = "This is a string"; // Now 's' is properly defined and used.
  
  // Fixing any unused expression issue by calling a function with 's'
  console.log(s); // This would not trigger the "no-unused-expressions" error
  
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

    <div>
      <EmployeeManagement />
    <CustomerManagement />
  </div>

  );
};

export default App;
