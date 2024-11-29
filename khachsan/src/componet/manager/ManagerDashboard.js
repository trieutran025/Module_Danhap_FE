import React, { useState } from "react";
import "./ManagerDashboard.css";
import Modal from "./Modal"; // Import Modal component

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("employees");
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", position: "Nhân viên" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", position: "Quản lý" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", position: "Giám đốc" },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(false); // Add state for editing
  const [updatedEmployee, setUpdatedEmployee] = useState({}); // State for updated employee data

  const itemsPerPage = 3;
  const displayedEmployees = employees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee); // Set employee for the modal
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedEmployee(null);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(true); // Open the edit modal
    setUpdatedEmployee(employee); // Set the employee data for editing
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee({ ...updatedEmployee, [name]: value }); // Update the employee data
  };

  const handleUpdateEmployee = () => {
    // Handle saving the updated employee data
    const updatedEmployees = employees.map((emp) =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    setEmployees(updatedEmployees);
    setEditingEmployee(false); // Close the edit modal
  };

  return (
    <div className="manager-dashboard">
      <nav className="navbar">
        <h1 className="navbar-title">ManagerDashboard</h1>
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
                      onClick={() => handleViewEmployee(employee)} // Open modal with employee data
                      className="view-button"
                    >
                      Xem
                    </button>
                    <button
                      onClick={() => handleEditEmployee(employee)} // Open modal for editing employee
                      className="edit-button"
                    >
                      Sửa
                    </button>
                    <button className="delete-button">Xóa</button>
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
          <button>Chỉnh sửa thông tin</button>
        </div>
      )}

      {/* Modal for viewing employee details */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        employee={selectedEmployee} // Pass selected employee to Modal
      />

      {/* Modal for editing employee */}
      {editingEmployee && updatedEmployee && (
        <div className="modal">
          <div className="modal-content">
            <h2>Sửa thông tin nhân viên</h2>
            <form>
              <label>
                Tên:
                <input
                  type="text"
                  name="name"
                  value={updatedEmployee.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={updatedEmployee.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Chức vụ:
                <input
                  type="text"
                  name="position"
                  value={updatedEmployee.position}
                  onChange={handleChange}
                />
              </label>
              <button
                type="button"
                onClick={handleUpdateEmployee}
                className="save-button"
              >
                Lưu thay đổi
              </button>
              <button
                type="button"
                onClick={() => setEditingEmployee(false)}
                className="cancel-button"
              >
                Hủy
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;
