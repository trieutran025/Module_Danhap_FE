import axios from 'axios';

// URL API gốc
const API_URL = 'http://localhost:8080/login';

// Service đăng nhập
const login = async (username, password) => {
  try { 
    // Gọi API đăng nhập
    const response = await axios.post(API_URL, {
      username,
      password,
    });

    // // Kiểm tra và lưu token, vai trò, thời gian hết hạn vào localStorage
    // if (response.access_token) {
    //   localStorage.setItem('access_token', response.access_token);
    // }
    // if (response.data.roles) {
    //   localStorage.setItem('role', response.data.roles[0]); // Giả định có ít nhất 1 vai trò
    // }

    return response.data; // Trả về dữ liệu phản hồi để xử lý vai trò, trạng thái, v.v.
  } catch (error) {
    let errorMessage = 'Không thể kết nối tới máy chủ';

    if (error.response) {
      // Xử lý các mã trạng thái lỗi cụ thể
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

    // Trả về thông báo lỗi để hiển thị ở giao diện
    throw new Error(errorMessage);
  }
};
const logout = async () => {
  try {
    // Gửi yêu cầu POST đến API logout
    const response = await axios.post('http://localhost:8080/logout');

    // Kiểm tra nếu đăng xuất thành công
    if (response.status === 200 ) {
      console.log("Đăng xuất thành công!");

      // Xóa token khỏi localStorage
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');

      // Chuyển hướng về trang login
      window.location.href = '/login';
    } else {
      console.error("Lỗi khi đăng xuất:", response.data);
    }
  } catch (error) {
    console.error("Lỗi khi đăng xuất:", error);
  }
};


export function getToken() {
  let token = sessionStorage.getItem('token');
  if (!token) {
      token = sessionStorage.getItem('token');
  }
  return token;
}

export default {
  login,
  logout
};
