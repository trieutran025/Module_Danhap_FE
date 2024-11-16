import React, { useState } from "react";
import "../componet/css/AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("employees");
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", position: "Nhân viên" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", position: "Quản lý" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", position: "Giám đốc" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", position: "Nhân viên" },
    { id: 5, name: "Emily White", email: "emily@example.com", position: "Quản lý" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const handleAddEmployee = (newEmployee) => {
    const id = employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
    setEmployees([...employees, { ...newEmployee, id }]);
    setIsAddingEmployee(false);
  };

  const handleEditEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((e) => (e.id === updatedEmployee.id ? updatedEmployee : e))
    );
    setEditingEmployee(null);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((e) => e.id !== id));
  };

  const displayedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="admin-dashboard">
      <nav className="navbar">
        <h1 className="navbar-title">Admin Dashboard</h1>
        <button className="logout-button" onClick={() => alert("Đăng xuất...")}>
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
              onClick={() => setIsAddingEmployee(true)}
            >
              Thêm nhân viên
            </button>
          </div>

          {isAddingEmployee && (
            <form
              className="add-employee-form"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleAddEmployee({
                  name: formData.get("name"),
                  email: formData.get("email"),
                  position: formData.get("position"),
                });
              }}
            >
              <input type="text" name="name" placeholder="Tên" required />
              <input type="email" name="email" placeholder="Email" required />
              <input type="text" name="position" placeholder="Chức vụ" required />
              <button type="submit">Thêm</button>
            </form>
          )}

          <table className="employee-table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Chức vụ</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {displayedEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.position}</td>
                  <td>
                    <button
                      onClick={() => setEditingEmployee(employee)}
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
