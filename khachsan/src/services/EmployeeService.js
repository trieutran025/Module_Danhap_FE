import axios from "axios";

const API_URL = "http://localhost:8080/api";

// src/services/EmployeeService.js

// Hàm lấy danh sách nhân viên
export const fetchEmployees = async () => {
  // Ví dụ: Gọi API để lấy danh sách nhân viên
  const response = await fetch('/api/employees');
  const data = await response.json();
  return data;
};

// Hàm thêm nhân viên mới
export const addEmployee = async (employeeData) => {
  const response = await fetch('/api/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employeeData),
  });
  const data = await response.json();
  return data;
};

// Hàm cập nhật thông tin nhân viên
export const updateEmployee = async (employeeId, employeeData) => {
  const response = await fetch(`/api/employees/${employeeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employeeData),
  });
  const data = await response.json();
  return data;
};

// Hàm xóa nhân viên
export const deleteEmployee = async (employeeId) => {
  const response = await fetch(`/api/employees/${employeeId}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
};
