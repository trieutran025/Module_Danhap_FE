import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // Đảm bảo import đúng đường dẫn

import './css/Login.css';
const Login = ({ onLogin }) => {

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');
const navigate = useNavigate();
// Handle login for username and password
const handleSubmit = async (e) => {
e.preventDefault();
setIsLoading(true);
setError('');
try {
const response = await authService.login(username, password);
if (response && response.access_token) {
sessionStorage.setItem("token",response.access_token);
const userRole = response.roles && Array.isArray(response.roles) ? response.roles[0] : null;
console.log(response.token)
if (userRole) {
sessionStorage.setItem('role', userRole);
// console.log('User role:', localStorage.getItem('role'));
// console.log("token",localStorage.getItem('token'))
// console.log(userRole)
// console.log(response.
//   access_token)
console.log(response)
onLogin(userRole); // Cập nhật role khi login thành công
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
// Handle Google login callback
const handleGoogleLogin = async (response) => {
try {
const googleToken = response.credential;
const userInfo = await authService.googleLogin(googleToken); // Backend cần xử lý token này
sessionStorage.setItem('token', userInfo.access_token);
sessionStorage.setItem('role', userInfo.roles[0]);
// Điều hướng theo vai trò
navigate(userInfo.roles.includes('ROLE_ADMIN') ? '/admin-dashboard' : '/');
} catch (err) {
setError('Đăng nhập với Google thất bại.');
console.error('Error:', err);
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
<form onSubmit={handleSubmit} method='post'>
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
{/* Google Login Button */}
<div className="social-login">
<a href="https://www.facebook.com" className="google-login-link">
<i className="fab fa-google"></i> Login with Google
</a>
</div>
<div className="social-login">
<a href="https://www.facebook.com" className="fb-login-link">
<i className="fab fa-facebook"></i> Login with Facebook
</a>
</div>
{error && <p className="error-message">{error}</p>}
<a href="/register">Create Account</a>
</div>
</header>
</div>
  );
};
export default Login;