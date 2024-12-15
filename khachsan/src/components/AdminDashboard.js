import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/EmployeeService";
import { debounce } from "lodash";
import "../components/css/AdminDashboard.css";
import authService from "../services/authService";
import ConfirmationPopup from "./ConfirmationPopup";

const EmployeeTable = ({ employees, onEdit, onDelete }) => (
  <table className="employee-table">
    <thead>
      <tr>
        <th>Tên</th>
        <th>Email</th>
        <th>Chức vụ</th>
        <th>Số điện thoại</th>
        <th>Địa chỉ</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      {employees.map((employee) => (
        <tr key={employee.id}>
          <td>{employee.name}</td>
          <td>{employee.email}</td>
          <td>{employee.roleName?.[0]?.roleName || "Không có vai trò"}</td>
          <td>{employee.phone}</td>
          <td>{employee.address}</td>
          <td>
            <button
              className="button edit-button"
              onClick={() => onEdit(employee)}
            >
              Sửa
            </button>
            <button
              className="button delete-button"
              onClick={() => onDelete(employee)}
            >
              Xóa
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const EmployeeForm = ({ onSubmit, onClose, employee = {} }) => {
  const navigate = useNavigate();
  const isEditing = !!employee?.id;
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    const newErrors = {};
    
    if (formData.get('name').trim().length < 2) {
      newErrors.name = 'Tên phải có ít nhất 2 ký tự';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.get('email'))) {
      newErrors.email = 'Email không hợp lệ';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.get('phone'))) {
      newErrors.phone = 'Số điện thoại phải có 10 chữ số';
    }

    if (formData.get('username').trim().length < 4) {
      newErrors.username = 'Tên đăng nhập phải có ít nhất 4 ký tự';
    }

    if (!isEditing || formData.get('password')) {
      if (formData.get('password').length < 6) {
        newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>{isEditing ? 'Sửa nhân viên' : 'Thêm nhân viên'}</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            if (validateForm(formData)) {
              const employeeData = {
                accountReqDTO: {
                  username: formData.get('username'),
                  password: formData.get('password')
                },
                userDto: {
                  name: formData.get('name'),
                  email: formData.get('email'),
                  phone: formData.get('phone'),
                  address: formData.get('address')
                },
                roleName: formData.get('roleName')
              };

              if (isEditing && !employeeData.accountReqDTO.password) {
                delete employeeData.accountReqDTO.password;
              }

              try {
                await onSubmit(isEditing ? { ...employee, ...employeeData } : employeeData);
                onClose();
              } catch (error) {
                if (error.message === 'Unauthorized') {
                  // navigate('/login');
                }
              }
            }
          }}
        >
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Tên nhân viên"
              defaultValue={employee?.name || ''}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              defaultValue={employee?.email || ''}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              defaultValue={employee?.phone || ''}
              required
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="address"
              placeholder="Địa chỉ"
              defaultValue={employee?.address || ''}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Tài khoản"
              defaultValue={employee?.username || ''}
              required
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <div className="form-group">
            {!isEditing && (
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                required
              />
            )}
            {isEditing && (
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu (để trống nếu không đổi)"
              />
            )}
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <select
              name="roleName"
              required
              defaultValue={employee?.roleName || 'RECEPTION'}
            >
              <option value="MANAGER">MANAGER</option>
              <option value="RECEPTIONIST">RECEPTIONIST</option>
            </select>
          </div>
          <button className="button" type="submit">
            {isEditing ? 'Cập nhật nhân viên' : 'Thêm nhân viên'}
          </button>
        </form>
        <button className="button close-button" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "success" });
  const [messageTimeout, setMessageTimeout] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const navigate = useNavigate();
  const itemsPerPage = 3;

  const handleSearch = debounce((term) => setSearchTerm(term), 500);

  useEffect(() => {
    const loadEmployees = async () => {
      setLoading(true);
      try {
        if (currentPage > totalPages) setCurrentPage(1);
        const data = await fetchEmployees(currentPage, itemsPerPage);
        setEmployees(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };
    loadEmployees();
  }, [currentPage, totalPages]);

  const filteredEmployees = useMemo(
    () =>
      employees.filter((employee) => {
        const name = employee.name || "";
        const email = employee.email || "";
        return (
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }),
    [employees, searchTerm]
  );

  const handleFormSubmit = async (employee) => {
    try {
      const employeeData = { ...employee };
      if (!employeeData.password) {
        delete employeeData.password;  // Remove password field if empty
      }
  
      let response;
      if (employee.id) {
        // Update employee
        response = await updateEmployee(employee.id, employeeData);
        setEmployees(prev => prev.map(emp => emp.id === response.id ? response : emp));
        showMessage("Nhân viên đã được cập nhật thành công!", "success");
      } else {
        // Add new employee
        response = await addEmployee(employeeData);
        setEmployees(prev => [...prev, response]);
        showMessage("Nhân viên mới đã được thêm thành công!", "success");
      }
  
      setIsFormVisible(false);
      setEditingEmployee(null);
    } catch (error) {
      console.error("Error while submitting form:", error);
      showMessage("Có lỗi xảy ra, vui lòng thử lại!", "error");
    }
  };
  
  const handleDeleteEmployee = (employee) => {
    setEmployeeToDelete(employee);
    setIsConfirmationOpen(true);
  };

  const confirmDeleteEmployee = async () => {
    if (employeeToDelete) {
      try {
        await deleteEmployee(employeeToDelete.id);
        setEmployees((prev) => prev.filter((employee) => employee.id !== employeeToDelete.id));
        showMessage("Nhân viên đã được xoá thành công!");
      } catch (error) {
        console.error("Error deleting employee:", error);
        showMessage("Lỗi khi xoá nhân viên!");
      }
    }
    setIsConfirmationOpen(false);
    setEmployeeToDelete(null);
  };

  const showMessage = (msg, type = "success") => {
    setMessage({ text: msg, type });
    if (messageTimeout) {
      clearTimeout(messageTimeout);
    }
    const timeout = setTimeout(() => setMessage({ text: "", type: "success" }), 3000);
    setMessageTimeout(timeout);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="header">
        <h1>Admin Dashboard</h1>
        <button className="button logout-button" onClick={handleLogout}>
          Đăng xuất
        </button>
      </header>

      <div className="tab-content active">
        {loading ? (
          <p className="loading-message">Đang tải danh sách nhân viên...</p>
        ) : (
          <>
            {isFormVisible && (
              <EmployeeForm
                employee={editingEmployee}
                onSubmit={handleFormSubmit}
                onClose={() => {
                  setIsFormVisible(false);
                  setEditingEmployee(null);
                }}
              />
            )}
            <div className="actions">
              <input
                type="text"
                placeholder="Tìm kiếm nhân viên..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="search-input"
              />
              {!isFormVisible && (
                <button
                  className="button add-button"
                  onClick={() => {
                    setIsFormVisible(true);
                    setEditingEmployee(null);
                  }}
                >
                  Thêm nhân viên
                </button>
              )}
            </div>
            <EmployeeTable
              employees={filteredEmployees}
              onEdit={(employee) => {
                setEditingEmployee(employee);
                setIsFormVisible(true);
              }}
              onDelete={handleDeleteEmployee}
            />
            {message.text && (
              <p className={`message ${message.type === "error" ? "error" : "success"}`}>
                {message.text}
              </p>
            )}
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`page-button ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </div>
      <ConfirmationPopup
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={confirmDeleteEmployee}
        message={`Bạn có chắc chắn muốn xóa nhân viên ${employeeToDelete?.name || ''}?`}
      />
    </div>
  );
};

export default AdminDashboard;

