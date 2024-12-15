import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./ManagerDashboard.css";
import { fetchReceptionist } from "../../services/MangaerService";
import { debounce } from "lodash";
import authService from "../../services/authService"
// Component hiển thị bảng nhân viên
const EmployeeTable = ({ employees, onEdit, onDelete }) => (
  <table className="employee-table">
    <thead>
      <tr>
        <th>Tên</th>
        <th>Email</th>
        <th>Chức vụ</th>
        <th>Số điện thoại</th>
        <th>Địa chỉ</th>
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
        </tr>
      ))}
    </tbody>
  </table>
);
const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("employees");
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageTimeout, setMessageTimeout] = useState(null);
  const navigate = useNavigate();
  const itemsPerPage = 3;

  const handleSearch = debounce((term) => setSearchTerm(term), 500);
  useEffect(() => {
    const loadEmployees = async () => {
      setLoading(true);
      try {
        if (currentPage > totalPages) setCurrentPage(1);
        const data = await fetchReceptionist(currentPage, itemsPerPage);
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
        <h1>Manager Dashboard</h1>
        <button className="button logout-button" onClick={handleLogout}>
          Đăng xuất
        </button>
      </header>



      <div
        className={`tab-content ${activeTab === "employees" ? "active" : ""}`}
      >
        {loading ? (
          <p>Đang tải danh sách nhân viên...</p>
        ) : (
          <>
            <div className="actions">
              <input
                type="text"
                placeholder="Tìm kiếm nhân viên..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="search-input"
              />
            </div>
            <EmployeeTable
              employees={filteredEmployees}
              onEdit={(employee) => {
                setEditingEmployee(employee);
                setIsFormVisible(true);
              }}
            />
            {message && <p className="message">{message}</p>}
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
    </div>
  );
};

export default ManagerDashboard;
