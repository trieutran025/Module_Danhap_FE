  import axios from 'axios';

  // URL của API
  const API_URL = 'http://localhost:8080/api/employees/';
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
  export const fetchEmployees = async (page=1,size=3) => {
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


  // Thêm nhân viên mới
  export const addEmployee = async (employeeData) => {
    try {
      const token = sessionStorage.getItem('token'); // Get the token from sessionStorage
      console.log('Token:', token);
      
      const response = await axios.post(
        `${API_URL}`, // The API URL
        employeeData, // The data to be sent in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      
      console.log('Response:', response);
      console.log('Employee Data:', employeeData);
      return response.data; // Return the response data from the API
    } catch (error) {
      // Log detailed error information
      console.error('Error Details:');
      if (error.response) {
        console.error('Response Status:', error.response.status);
        console.error('Response Data:', error.response.data);
        console.error('Response Headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
      throw error; // Throw error to be handled upstream
    }
  };




  // Chỉnh sửa thông tin nhân viên
  export const updateEmployee = async (employeeId, updatedData) => {
    try {
      const token = sessionStorage.getItem('token'); // Get the token from sessionStorage
      console.log(employeeId)
      const response = await axiosInstance.put(`${API_URL}/${employeeId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return data from API
    } catch (error) {
      // Log detailed error information
      console.error('Error Details:');
      if (error.response) {
        console.error('Response Status:', error.response.status);
        console.error('Response Data:', error.response.data);
        console.error('Response Headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
      throw error; // Throw error to be handled upstream
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
