import axiosInstance from './axiosInstance';  // Import instance axios đã cấu hình

// Lấy danh sách nhân viên
export const fetchEmployees = async () => {
  try {
    const response = await axiosInstance.get('/');  // Gọi API để lấy danh sách nhân viên
    return response.data;  // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Lỗi khi lấy danh sách nhân viên:', error.response ? error.response.data : error.message);  // In ra lỗi nếu có
    throw error;  // Ném lại lỗi
  }
};

// Thêm nhân viên mới
export const addEmployee = async (employeeData) => {
  try {
    const response = await axiosInstance.post('/', employeeData);  // Gọi API để thêm nhân viên mới
    return response.data;  // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Lỗi khi thêm nhân viên:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Chỉnh sửa thông tin nhân viên
export const updateEmployee = async (employeeId, updatedData) => {
  try {
    const response = await axiosInstance.put(`/${employeeId}`, updatedData);  // Gọi API để chỉnh sửa thông tin nhân viên
    return response.data;  // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Lỗi khi chỉnh sửa nhân viên:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Xóa nhân viên
export const deleteEmployee = async (employeeId) => {
  try {
    const response = await axiosInstance.delete(`/${employeeId}`);  // Gọi API để xóa nhân viên
    return response.data;  // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Lỗi khi xóa nhân viên:', error.response ? error.response.data : error.message);
    throw error;
  }
};
