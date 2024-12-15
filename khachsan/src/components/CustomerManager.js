import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import '../components/css/CustomerManagement.css';
import authService from "../services/authService"

const CustomerManager = () => {
  const [customer, setCustomer] = useState({
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    address: '123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh',
  });
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="customer-dashboard">
      <header className="header">
        <h1>Customer Dashboard</h1>
        <button className="button logout-button" onClick={handleLogout}>
          Đăng xuất
        </button>
      </header>
      <div className="customer-info-container">
        <div className="customer-info-card">
          <h2 className="customer-info-title">Thông tin cá nhân</h2>
          <div className="customer-info-field">
            <FaUser className="customer-info-icon" />
            <input
              className="customer-info-input"
              id="name"
              type="text"
              value={customer.name}
              readOnly
              placeholder=" "
            />
            <label className="customer-info-label" htmlFor="name">
              Họ và tên
            </label>
          </div>
          <div className="customer-info-field">
            <FaEnvelope className="customer-info-icon" />
            <input
              className="customer-info-input"
              id="email"
              type="email"
              value={customer.email}
              readOnly
              placeholder=" "
            />
            <label className="customer-info-label" htmlFor="email">
              Email
            </label>
          </div>
          <div className="customer-info-field">
            <FaPhone className="customer-info-icon" />
            <input
              className="customer-info-input"
              id="phone"
              type="tel"
              value={customer.phone}
              readOnly
              placeholder=" "
            />
            <label className="customer-info-label" htmlFor="phone">
              Số điện thoại
            </label>
          </div>
          <div className="customer-info-field">
            <FaMapMarkerAlt className="customer-info-icon" />
            <input
              className="customer-info-input"
              id="address"
              type="text"
              value={customer.address}
              readOnly
              placeholder=" "
            />
            <label className="customer-info-label" htmlFor="address">
              Địa chỉ
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerManager;

