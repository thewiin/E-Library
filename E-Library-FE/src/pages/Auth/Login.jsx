import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm"; // Giữ nguyên AuthForm nếu bạn đang sử dụng nó
import { login } from "../../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      // Giả sử có chức năng chuyển hướng sau khi đăng nhập thành công
      // navigate('/books/some-default-book-id');
      alert("Login success: " + JSON.stringify(res));
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className="login-page"> {/* Đổi tên class để dễ quản lý CSS riêng */}
      <div className="login-header-logo"> {/* Header logo trên cùng */}
          <img src="../../assets/library-icon1.jpg" alt="Book Icon" className="book-icon" />
        <h1 className="app-title">LIBRARY MANAGEMENT</h1>
      </div>

      <div className="login-content-wrapper"> {/* Container chứa form và ảnh minh họa */}
        <div className="login-form-container">
          {/* Thay thế AuthForm bằng cấu trúc trực tiếp nếu muốn kiểm soát hoàn toàn giao diện */}
          <AuthForm
            title="Login"
            fields={[
              { label: "Email", type: "email", value: email, onChange: setEmail },
              { label: "Password", type: "password", value: password, onChange: setPassword },
            ]}
            onSubmit={handleSubmit}
            footer={
              <p>
                Don’t have an account? <Link to="/signup">Sign up</Link>
              </p>
            }
          />
        </div>
        
        <div className="login-illustration-container">
          <img src="../../assets/library-icon2.jpg" alt="Login Illustration" className="login-illustration-image" />
        </div>
      </div>
    </div>
  );
};

export default Login;