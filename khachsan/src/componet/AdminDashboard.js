import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from "../services/EmployeeService";
import { debounce } from "lodash";
import "../componet/css/AdminDashboard.css";
import authService from "../services/authService";

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
          <td>{employee.position}</td>
          <td>{employee.phone}</td>
          <td>{employee.address}</td>
          <td>
            <button className="edit-button" onClick={() => onEdit(employee)}>
              Sửa
            </button>
            <button className="delete-button" onClick={() => onDelete(employee.id)}>
              Xóa
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const EmployeeForm = ({ onSubmit, onClose, employee = {} }) => {
  const isEditing = !!employee?.id;

  return (
    <div className="form-container">
      <h2>{isEditing ? "Sửa nhân viên" : "Thêm nhân viên"}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const employeeData = Object.fromEntries(formData.entries());
          onSubmit(isEditing ? { ...employee, ...employeeData } : employeeData);
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Tên nhân viên"
          defaultValue={employee?.name || ""}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          defaultValue={employee?.email || ""}
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Chức vụ"
          defaultValue={employee?.position || ""}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          defaultValue={employee?.phone || ""}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Địa chỉ"
          defaultValue={employee?.address || ""}
          required
        />
        <button type="submit">{isEditing ? "Cập nhật nhân viên" : "Thêm nhân viên"}</button>
      </form>
      <button className="close-button" onClick={onClose}>
        Đóng
      </button>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("employees");
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const itemsPerPage = 3;

  const handleSearch = debounce((term) => setSearchTerm(term), 500);

  useEffect(() => {
    const loadEmployees = async () => {
      setLoading(true);
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };
    loadEmployees();
  }, []);

  const filteredEmployees = useMemo(
    () =>
      employees.filter(
        (employee) =>
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [employees, searchTerm]
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const displayedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFormSubmit = async (employee) => {
    try {
      if (employee.id) {
        const updated = await updateEmployee(employee);
        setEmployees((prev) =>
          prev.map((e) => (e.id === updated.id ? updated : e))
        );
      } else {
        const added = await addEmployee(employee);
        setEmployees((prev) => [...prev, added]);
      }
      setIsFormVisible(false);
      setEditingEmployee(null);
    } catch (error) {
      console.error("Error submitting employee form:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      console.log("Deleting employee with id:", id); // Kiểm tra giá trị của id
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((employee) => employee.id !== id));
      setMessage('Nhân viên đã được xoá thành công!');
    } catch (error) {
      console.error("Error deleting employee:", error);
      setMessage('Lỗi khi xoá nhân viên!');
    }
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
      <nav className="navbar">
        <h1 className="navbar-title">Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Đăng xuất
        </button>
      </nav>

      <div className="tabs">
        <div className="tab-container">
          <button
            className={`tab ${activeTab === "employees" ? "active" : ""}`}
            onClick={() => setActiveTab("employees")}
          >
            Quản lý nhân viên
          </button>
        </div>
        <div className="tab-container">
          <button
            className={`tab ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            Cài đặt tài khoản
          </button>
        </div>
      </div>

      {activeTab === "employees" && (
        <div className="employees">
          {loading ? (
            <p>Loading employees...</p>
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
                    className="add-button"
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
                employees={displayedEmployees}
                onEdit={(employee) => {
                  setEditingEmployee(employee);
                  setIsFormVisible(true);
                }}
                onDelete={handleDeleteEmployee}
              />
              {message && <p>{message}</p>} {/* Hiển thị thông báo */}
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === "settings" && (
        <div className="settings">
          <h2>Cài đặt tài khoản</h2>
          <form>
            <label>
              Tên:
              <input type="text" name="name" placeholder="Tên của bạn" />
            </label>
            <label>
              Email:
              <input type="email" name="email" placeholder="Email của bạn" />
            </label>
            <label>
              password:
              <input type="password" name="password" placeholder="pass của bạn" />
            </label>
      
            <button type="submit">Lưu thay đổi</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
 // code mới ở đây