import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../componet/css/Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.login(username, password);
      console.log('Response:', response);
      // alert('Đăng nhập thành công!');
      onLogin(); // Cập nhật trạng thái đăng nhập
      navigate('/dashboard'); // Chuyển hướng đến Dashboard
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="background-pattern"></div>
      <div className="content">
        <div className="header">
          <h1>Chào mừng trở lại!</h1>
          <p>Đăng nhập để trải nghiệm những điều tuyệt vời!</p>
        </div>
        <div className="card">
          <form id="login-form" onSubmit={handleSubmit}>
            <h2>Đăng nhập</h2>
            <div className="input-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="jane_doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" name="remember" />
                <label htmlFor="remember">Ghi nhớ đăng nhập</label>
              </div>
              <a href="#" className="forgot-password">Quên mật khẩu?</a>
            </div>
            <button type="submit" id="login-button" disabled={isLoading}>
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>
          <div className="social-login">
            <p>Hoặc đăng nhập bằng</p>
            <div className="social-buttons">
              <button className="social-button google">
                <i className="fab fa-google"></i> Google
              </button>
              <button className="social-button facebook">
                <i className="fab fa-facebook-f"></i> Facebook
              </button>
            </div>
          </div>
          <div className="signup-prompt">
            Chưa có tài khoản? <a href="#">Đăng ký ngay</a>
          </div>
        </div>
        <div className="footer">
          © 2024 Your Company. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </div>
  );
};

export default Login;