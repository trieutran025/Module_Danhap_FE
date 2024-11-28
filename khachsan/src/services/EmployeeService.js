import axios from 'axios';

// URL của API
const API_URL = 'http://localhost:8080/api/employees';
// Tạo instance axios đã cấu hình
const axiosInstance = axios.create({
  baseURL: API_URL, // Địa chỉ cơ sở của API
  headers: {
    'Content-Type': 'application/json', // Đảm bảo dữ liệu gửi là JSON
  },
});

// Thêm interceptor để gắn token trước mỗi yêu cầu


// Các hàm dịch vụ sử dụng axiosInstance

// Lấy danh sách nhân viên
export const fetchEmployees = async () => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(
      `http://localhost:8080/api/employees`, {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    return response.data;  // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Lỗi khi lấy danh sách nhân viên:', error.response ? error.response.data : error.message); // In ra lỗi nếu có
    throw error;  // Ném lại lỗi để có thể xử lý ở nơi gọi
  }
};


// Thêm nhân viên mới
export const addEmployee = async (employeeData) => {
  try {
    const response = await axiosInstance.post('/', employeeData); // Gọi API để thêm nhân viên mới
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Lỗi khi thêm nhân viên:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Chỉnh sửa thông tin nhân viên
export const updateEmployee = async (employeeId, updatedData) => {
  try {
    const response = await axiosInstance.put(`/${employeeId}`, updatedData); // Gọi API để chỉnh sửa thông tin nhân viên
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Lỗi khi chỉnh sửa nhân viên:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Xóa nhân viên
export const deleteEmployee = async (employeeId) => {
  try {
    const response = await axiosInstance.delete(`/${employeeId}`); // Gọi API để xóa nhân viên
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Lỗi khi xóa nhân viên:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Xuất toàn bộ axiosInstance và các hàm dịch vụ
export default {
  axiosInstance,
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};