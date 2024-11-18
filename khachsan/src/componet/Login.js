import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // Đảm bảo authService.login được định nghĩa
import '../componet/css/Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState(''); // Liên kết với input
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn hành vi mặc định của form
    setIsLoading(true);
    setError('');

    try {
      // Gọi hàm đăng nhập từ authService
      const response = await authService.login(username, password);

      console.log('Response:', response);
      onLogin();
      // window.alert("Success");
      navigate('/dashboard'); // Chuyển hướng tới trang Dashboard
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="app-image">
          <div className="app-moon">
            <p
              style={{
                color: 'black',
                fontSize: '28px',
                fontFamily: 'fantasy',
              }}
            >
              The Moon
            </p>
          </div>
        </div>
        <div className="login-container">
          <h1>Login Account</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Cập nhật state username
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="6+ characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Cập nhật state password
              required
            />

            <button
              type="submit"
              className="login-button"
              disabled={isLoading} // Ngăn người dùng nhấn khi đang xử lý
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>} {/* Hiển thị lỗi */}
          <a href="/register">Create Account</a>
        </div>
      </header>
    </div>
  );
};

export default Login;
