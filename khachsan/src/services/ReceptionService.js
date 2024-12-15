import axios from 'axios';

// URL của API
const API_URL = 'http://localhost:8080/api/customer/';
// Tạo instance axios đã cấu hình
const axiosInstance = axios.create({
  baseURL: API_URL, // Địa chỉ cơ sở của API
  headers: {
    'Content-Type': 'application/json', // Đảm bảo dữ liệu gửi là JSON
  },
});
export const fetchCustomer = async (page=0,size=3) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(
        `${API_URL}`, {
          headers: { Authorization: `Bearer ${token}` },
          params:{
            page:page-1,
            size:size,
          }
        }
      );
  
      return response.data;  // Trả về dữ liệu từ API
    } catch (error) {
      console.error('Lỗi khi lấy danh sách nhân viên:', error.response ? error.response.data : error.message); // In ra lỗi nếu có
      throw error;  // Ném lại lỗi để có thể xử lý ở nơi gọi
    }
  };
  export default {
    axiosInstance,
    fetchCustomer
  };
  