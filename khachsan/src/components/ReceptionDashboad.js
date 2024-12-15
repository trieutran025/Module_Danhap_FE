import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../components/css/AdminDashboard.css";
import { fetchCustomer } from "../services/ReceptionService";
import { debounce } from "lodash";
import authService from "../services/authService"
// Component hiển thị bảng nhân viên
const CustomerTable = ({ customers }) => (
  <table className="employee-table">
    <thead>
      <tr>
        <th>Tên</th>
        <th>Email</th>
        <th>Vai trò</th>
        <th>Số điện thoại</th>
        <th>Địa chỉ</th>
      </tr>
    </thead>
    <tbody>
      {customers.map((customer) => (
        <tr key={customer.id}>
          <td>{customer.name}</td>
          <td>{customer.email}</td>
          <td>{customer.roleName?.[0]?.roleName || "Không có vai trò"}</td>
          <td>{customer.phone}</td>
          <td>{customer.address}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
const ReceptionDashboad = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const [customers, setcustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingcustomer, setEditingcustomer] = useState(null);
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
    const loadcustomers = async () => {
      setLoading(true);
      try {
        if (currentPage > totalPages) setCurrentPage(1);
        const data = await fetchCustomer(currentPage, itemsPerPage);
        setcustomers(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };
    loadcustomers();
  }, [currentPage, totalPages]);
  const filteredcustomers = useMemo(
    () =>
      customers.filter((customer) => {
        const name = customer.name || "";
        const email = customer.email || "";
        return (
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }),
    [customers, searchTerm]
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
        <h1>Receptionist Dashboard</h1>
        <button className="button logout-button" onClick={handleLogout}>
          Đăng xuất
        </button>
      </header>


      <div
        className={`tab-content ${activeTab === "customers" ? "active" : ""}`}
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
            <CustomerTable
              customers={filteredcustomers}
              onEdit={(customer) => {
                setEditingcustomer(customer);
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

export default ReceptionDashboad;
