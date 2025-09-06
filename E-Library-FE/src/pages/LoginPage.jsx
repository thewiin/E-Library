import React from 'react';
import Login from '../pages/Auth/Login.jsx'; // Đường dẫn tới component Login của bạn

const LoginPage = () => {
  return (
    <div className="login-page-container">
      {/* Có thể thêm logo hoặc các yếu tố khác ở đây */}
      <Login />
    </div>
  );
};

export default LoginPage;