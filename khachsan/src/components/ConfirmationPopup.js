import React from 'react';

const ConfirmationPopup = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-popup">
        <p>{message}</p>
        <div className="confirmation-buttons">
          <button className="button confirm-button" onClick={onConfirm}>Xác nhận</button>
          <button className="button cancel-button" onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
