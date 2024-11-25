import axios from 'axios';

const API_URL = 'http://localhost:8080/api/employees';  // URL của API

// Tạo instance axios
const axiosInstance = axios.create({
  baseURL: API_URL,  // Địa chỉ cơ sở của API
  headers: {
    'Content-Type': 'application/json',  // Đảm bảo dữ liệu gửi là JSON
  },
});

// Thêm interceptor để gắn token trước mỗi yêu cầu
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');  // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Thêm token vào header
    }
    return config;  // Trả về config đã được chỉnh sửa
  },
  (error) => {
    return Promise.reject(error);  // Trả về lỗi nếu có
  }
);

export default axiosInstance;  // Xuất instance axios đã cấu hình
