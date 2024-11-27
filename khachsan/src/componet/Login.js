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
      const response = await authService.login(username, password);

      if (response && response.access_token) {
        localStorage.setItem('token', response.access_token);
        const userRole = response.roles && Array.isArray(response.roles) ? response.roles[0] : null;

        if (userRole) {
          localStorage.setItem('role', userRole);
          onLogin(userRole);

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
          setError('User role not identified.');
        }
      } else {
        setError('Login failed. Token not received.');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card-header">
          <h1>Welcome Back</h1>
          <p>Login to continue</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className="login-footer">
          <a href="/forgot-password">Forgot your password?</a>
          <a href="/register">Create a new account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
