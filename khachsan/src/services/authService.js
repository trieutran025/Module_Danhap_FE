import axios from 'axios';

// Đặt URL API gốc
const API_URL = 'http://localhost:8080/login';

// Service đăng nhập
const login = async (username, password) => {
  try { 
    // Gọi API đăng nhập
    const response = await axios.post(`${API_URL}`, {
      username,
      password,
    });

    // Lưu token vào local storage nếu đăng nhập thành công
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return response.data;
  } catch (error) {
    // Kiểm tra và in ra lỗi
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Đăng nhập không thành công: Sai tên đăng nhập hoặc mật khẩu');
      } else {
        console.error(`Lỗi đăng nhập: ${error.response.statusText}`);
      }
    } else {
      console.error('Không thể kết nối tới máy chủ');
    }
    throw error;
  }
};

export default {
  login,
};
