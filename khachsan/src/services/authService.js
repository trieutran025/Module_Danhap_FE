import axios from 'axios';

// URL API gốc
const API_URL = 'http://localhost:8080';

// Service đăng nhập
const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });

    return response.data; // Trả về dữ liệu phản hồi
  } catch (error) {
    let errorMessage = 'Không thể kết nối tới máy chủ';

    if (error.response) {
      switch (error.response.status) {
        case 401:
          errorMessage = 'Sai tên đăng nhập hoặc mật khẩu';
          break;
        case 400:
          errorMessage = 'Yêu cầu không hợp lệ';
          break;
        case 403:
          errorMessage = 'Bạn không có quyền truy cập';
          break;
        default:
          errorMessage = `Lỗi: ${error.response.statusText}`;
      }
      console.error(errorMessage);
    } else {
      console.error(errorMessage);
    }

    throw new Error(errorMessage);
  }
};

// Service đăng ký
const register = async (accountReqDTO, inforUserDto) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      accountReqDTO,
      inforUserDto,
    });
    return response.data; // Return the response data if successful
  } catch (error) {
    let errorMessage = 'Không thể kết nối tới máy chủ';

    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = 'Dữ liệu đăng ký không hợp lệ';
          break;
        case 409:
          errorMessage = 'Tên người dùng hoặc email đã tồn tại';
          break;
        default:
          errorMessage = `Lỗi: ${error.response.statusText}`;
      }
    }

    throw new Error(errorMessage); // Throw the error so it can be caught in the component
  }
};

// Service đăng xuất
const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);

    if (response.status === 200) {
      console.log('Đăng xuất thành công!');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      window.location.href = '/login';
    } else {
      console.error('Lỗi khi đăng xuất:', response.data);
    }
  } catch (error) {
    console.error('Lỗi khi đăng xuất:', error);
  }
};

// Lấy token từ sessionStorage
export function getToken() {
  let token = sessionStorage.getItem('token');
  return token;
}

// Xuất các service
export default {
  login,
  logout,
  register, // Thêm hàm register vào export
};
