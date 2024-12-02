import React, { useState } from "react";
import "./Receptionist.css";

const Receptionist = () => {
  const [activeTab, setActiveTab] = useState("customers");

  // Thông tin khách hàng
  const [customers, setCustomers] = useState([
    { id: 1, name: "Nguyễn Văn A", email: "a@example.com", room: "101", address: "Hà Nội", phone: "0123456789" },
    { id: 2, name: "Trần Thị B", email: "b@example.com", room: "102", address: "Hồ Chí Minh", phone: "0987654321" },
    { id: 3, name: "Phạm Văn C", email: "c@example.com", room: "103", address: "Đà Nẵng", phone: "0112233445" },
  ]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Thông tin tài khoản Receptionist
  const [receptionistInfo, setReceptionistInfo] = useState({
    name: "Nguyễn Văn Quân",
    email: "quan@example.com",
    position: "Receptionist",
    phone: "0981123456",
  });
  const [editingReceptionistInfo, setEditingReceptionistInfo] = useState({ ...receptionistInfo });

  // Trạng thái hiển thị popup
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState({ visible: false, onConfirm: null });

  // Phân trang khách hàng
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Lấy danh sách khách hàng hiển thị theo trang
  const displayedCustomers = customers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Xử lý thay đổi thông tin trong form khách hàng
  const handleChangeCustomer = (e) => {
    const { name, value } = e.target;
    setEditingCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý thay đổi thông tin tài khoản Receptionist
  const handleChangeReceptionist = (e) => {
    const { name, value } = e.target;
    setEditingReceptionistInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Lưu thay đổi thông tin khách hàng
  const handleEditCustomer = () => {
    setCustomers(
      customers.map((c) => (c.id === editingCustomer.id ? editingCustomer : c))
    );
    setShowEditPopup(false);
  };

  // Lưu thay đổi thông tin Receptionist
  const handleSaveReceptionistInfo = () => {
    setReceptionistInfo(editingReceptionistInfo);
  };

  // Hiển thị popup xác nhận hành động
  const handleShowConfirmPopup = (onConfirm) => {
    setConfirmPopup({
      visible: true,
      onConfirm,
    });
  };

  // Đóng popup xác nhận
  const handleCloseConfirmPopup = () => {
    setConfirmPopup({ visible: false, onConfirm: null });
  };

  return (
    <div className="admin-dashboard">
      <nav className="navbar">
        <h1 className="navbar-title">ReceptionistDashboard</h1>
        <button className="logout-button" onClick={() => alert("Đăng xuất...")}>
          Đăng xuất
        </button>
      </nav>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "customers" ? "active" : ""}`}
          onClick={() => setActiveTab("customers")}
        >
          Quản lý khách hàng
        </button>
        <button
          className={`tab ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Thông tin cá nhân
        </button>
      </div>

      {/* Quản lý khách hàng */}
      {activeTab === "customers" && (
        <div className="customers">
          <table className="customer-table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Số phòng</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {displayedCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.room}</td>
                  <td>{customer.address}</td>
                  <td>{customer.phone}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditingCustomer(customer);
                        setShowEditPopup(true);
                      }}
                      className="edit-button"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() =>
                        handleShowConfirmPopup(() =>
                          setCustomers(customers.filter((c) => c.id !== customer.id))
                        )
                      }
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
            {Array.from({ length: Math.ceil(customers.length / itemsPerPage) }, (_, i) => (
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

      {/* Thông tin cá nhân */}
      {activeTab === "profile" && (
        <div className="profile">
          <h2>Thông tin cá nhân</h2>
          <form>
            <label>
              Tên:
              <input
                type="text"
                name="name"
                value={editingReceptionistInfo.name}
                onChange={handleChangeReceptionist}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={editingReceptionistInfo.email}
                onChange={handleChangeReceptionist}
              />
            </label>
            <label>
              Chức vụ:
              <input
                type="text"
                name="position"
                value={editingReceptionistInfo.position}
                onChange={handleChangeReceptionist}
              />
            </label>
            <label>
              Số điện thoại:
              <input
                type="text"
                name="phone"
                value={editingReceptionistInfo.phone}
                onChange={handleChangeReceptionist}
              />
            </label>
          </form>
        </div>
      )}

      {/* Popup chỉnh sửa khách hàng */}
      {showEditPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Sửa thông tin khách hàng</h3>
            <form>
              <label>
                Tên:
                <input
                  type="text"
                  name="name"
                  value={editingCustomer?.name || ""}
                  onChange={handleChangeCustomer}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={editingCustomer?.email || ""}
                  onChange={handleChangeCustomer}
                />
              </label>
              <label>
                Số phòng:
                <input
                  type="text"
                  name="room"
                  value={editingCustomer?.room || ""}
                  onChange={handleChangeCustomer}
                />
              </label>
              <label>
                Địa chỉ:
                <input
                  type="text"
                  name="address"
                  value={editingCustomer?.address || ""}
                  onChange={handleChangeCustomer}
                />
              </label>
              <label>
                Số điện thoại:
                <input
                  type="text"
                  name="phone"
                  value={editingCustomer?.phone || ""}
                  onChange={handleChangeCustomer}
                />
              </label>
              <div className="popup-actions">
                <button
                  type="button"
                  className="confirm-button"
                  onClick={handleEditCustomer}
                >
                  Lưu thay đổi
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowEditPopup(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup xác nhận */}
      {confirmPopup.visible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>Bạn có chắc chắn muốn thực hiện hành động này?</p>
            <div className="popup-actions">
              <button
                className="confirm-button"
                onClick={() => {
                  confirmPopup.onConfirm();
                  handleCloseConfirmPopup();
                }}
              >
                Đồng ý
              </button>
              <button
                className="cancel-button"
                onClick={handleCloseConfirmPopup}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Receptionist;
