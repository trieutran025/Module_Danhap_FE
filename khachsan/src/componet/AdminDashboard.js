import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/EmployeeService";
import { debounce } from "lodash";
import "../componet/css/AdminDashboard.css";
import authService from "../services/authService"; // Import authService để gọi logout
import { data } from "autoprefixer";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("employees");
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();
  const itemsPerPage = 3;

  const handleSearch = debounce((term) => {
    setSearchTerm(term);
  }, 500);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const loadEmployees = async () => {
      setLoading(true); // Set loading to true
      try {
        const data = await fetchEmployees();
        console.log("Fetched employees:", data); // Check data in the console
        setEmployees(data);
      } catch (error) {
        console.log(data);
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false); // Set loading to false
      }
    };
    loadEmployees();
  }, []);

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const handleAddEmployee = async (newEmployee) => {
    try {
      const addedEmployee = await addEmployee(newEmployee);
      setEmployees([...employees, addedEmployee]);
      setIsAddingEmployee(false);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleEditEmployee = async (updatedEmployee) => {
    try {
      const updated = await updateEmployee(updatedEmployee);
      setEmployees(employees.map((e) => (e.id === updated.id ? updated : e)));
      setEditingEmployee(null);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };
  const handleLogout = async () => {
    try {
      await authService.logout(); // Gọi hàm logout trong service
      // Điều hướng về trang đăng nhập
      if (!sessionStorage.getItem("token") || sessionStorage.getItem("role")) {
        navigate("/login");
      } else {
        console.log("Xoa chua thanh cong");
      }
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  const displayedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="admin-dashboard">
      <nav className="navbar">
        <h1 className="navbar-title">Admin Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Đăng xuất
        </button>
      </nav>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "employees" ? "active" : ""}`}
          onClick={() => setActiveTab("employees")}
        >
          Quản lý nhân viên
        </button>
        <button
          className={`tab ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          Cài đặt tài khoản
        </button>
      </div>

      {activeTab === "employees" && (
        <div className="employees">
          {loading ? (
            <p>Loading employees...</p> // Display loading message
          ) : (
            <>
              <div className="actions">
                <input
                  type="text"
                  placeholder="Tìm kiếm nhân viên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button
                  className="add-button"
                  onClick={() => {
                    setIsAddingEmployee(true);
                    setEditingEmployee(null);
                  }}
                >
                  Thêm nhân viên
                </button>
              </div>

              {isAddingEmployee && !editingEmployee && (
                <form
                  className="add-employee-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    handleAddEmployee({
                      name: formData.get("name"),
                      email: formData.get("email"),
                      position: formData.get("position"),
                      phone: formData.get("phone"),
                      address: formData.get("address"),
                    });
                  }}
                >
                  <input type="text" name="name" placeholder="Tên" required />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <input
                    type="text"
                    name="position"
                    placeholder="Chức vụ"
                    required
                  />
                  <input type="text" name="phone" placeholder="Số điện thoại" />
                  <input type="text" name="address" placeholder="Địa chỉ" />
                  <button type="submit">Thêm</button>
                  <button
                    type="button"
                    onClick={() => setIsAddingEmployee(false)}
                  >
                    Hủy
                  </button>
                </form>
              )}

              <table className="employee-table">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Chức vụ</th>
                    <th>Địa chỉ</th>
                    <th>Số điện thoại</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>
                        {employee.roleName.length > 0
                          ? employee.roleName[0].roleName
                          : "Không có vai trò"}
                      </td>
                      <td>{employee.address}</td>
                      <td>{employee.phone}</td>
                      <td className="action-buttons">
                        <button
                          onClick={() => {
                            setEditingEmployee(employee);
                            setIsAddingEmployee(false);
                          }}
                          className="edit-button"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="delete-button"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`page-button ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
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
            <button type="submit">Lưu thay đổi</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
