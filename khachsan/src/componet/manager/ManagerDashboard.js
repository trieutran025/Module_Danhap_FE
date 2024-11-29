import React, { useState } from "react";
import "./ManagerDashboard.css";

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("employees");

  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", position: "Nhân viên" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", position: "Quản lý" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", position: "Giám đốc" },
  ]);

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;

  const displayedEmployees = employees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((e) => (e.id === updatedEmployee.id ? updatedEmployee : e))
    );
    setEditingEmployee(null);
  };

  return (
    <div className="admin-dashboard">
      <nav className="navbar">
        <h1 className="navbar-title">ManagerDashboard </h1>
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
          className={`tab ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Thông tin cá nhân
        </button>
      </div>

      {activeTab === "employees" && (
        <div className="employees">
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
                      onClick={() => {
                        setEditingEmployee(employee);
                      }}
                      className="edit-button"
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            {Array.from({ length: Math.ceil(employees.length / itemsPerPage) }, (_, i) => (
              <button
                key={i}
                className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === "profile" && (
        <div className="profile">
          <h2>Thông tin cá nhân</h2>
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

export default ManagerDashboard;
