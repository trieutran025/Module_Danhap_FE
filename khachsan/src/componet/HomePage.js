import React from 'react';
import '../../src/componet/css/homePage.css';  // Import file CSS dành riêng cho HomePage


const HomePage = () => {
  return (
    <div className="container">
      <div className="overlay"></div>
      <div className="content">
        <h1>Chào mừng đến với Trang Chủ</h1>
        <p>Khám phá thế giới mới của chúng tôi. Đăng ký ngay để trải nghiệm những điều tuyệt vời!</p>
        <div className="buttons">
          <a href="/login" className="button button-primary">Đăng nhập</a>
          <a href="/register" className="button button-secondary">Đăng ký</a>
        </div>
      </div>
      <div className="footer">
        © 2024 Công ty của bạn. Tất cả các quyền được bảo lưu.
      </div>
    </div>
  );
};

export default HomePage;

