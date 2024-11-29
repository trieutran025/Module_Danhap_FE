import React from "react";
import "../../componet/manager/Modal.css";

const Modal = ({ isOpen, onClose, employee }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Thông tin nhân viên</h2>
        <p><strong>Tên:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Chức vụ:</strong> {employee.position}</p>
      </div>
    </div>
  );
};

export default Modal;
