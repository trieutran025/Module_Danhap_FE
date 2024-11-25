import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // Đảm bảo import đúng đường dẫn
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
        // Gọi API đăng nhập
        const response = await authService.login(username, password);

        // Kiểm tra response hợp lệ
        if (response && response.access_token) {
            // Lưu token và vai trò vào localStorage
            localStorage.setItem('token', response.access_token);
            const userRole = response.roles && Array.isArray(response.roles) ? response.roles[0] : null;

            if (userRole) {
                localStorage.setItem('role', userRole);
                console.log('User Role:', userRole);

                // Gọi onLogin trước khi điều hướng
                onLogin(userRole); // Cập nhật role khi login thành công

                // Điều hướng dựa trên vai trò
                switch (userRole) {
                    case 'ROLE_ADMIN':
                        navigate('/admin-dashboard');
                        break;
                    case 'ROLE_CUSTOMER':
                        navigate('/customer-dashboard');
                        break;
                    case 'ROLE_MANAGER':
                        navigate('/manager-dashboard');
                        break;
                    default:
                        navigate('/');
                }
            } else {
                setError('Vai trò người dùng không xác định.');
            }
        } else {
            setError('Đăng nhập thất bại. Không nhận được token.');
        }
    } catch (err) {
        setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
        console.error('Error:', err);
    } finally {
        setIsLoading(false);
    }
};


  return (
    <div className="App">
      <header className="App-header">
        <div className="app-image">
          <div className="app-moon">
            <p style={{ color: 'black', fontSize: '28px', fontFamily: 'fantasy' }}>
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
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="6+ characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
          <a href="/register">Create Account</a>
        </div>
      </header>
    </div>
  );
};

export default Login;
