import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API, { endpoints } from "../../services/Apis.js"; // Đảm bảo đường dẫn này đúng
import cookie from "react-cookies";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset lỗi mỗi khi submit

    try {
      // 2. Gọi API trực tiếp, không cần validation bằng JS
      const res = await API.post(endpoints["login"], {
        email: email,
        password: password,
      });

      cookie.save("token", res.data.token);
      navigate("/");

    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      // 3. Cập nhật một lỗi duy nhất
      setError("Email hoặc mật khẩu không chính xác.");
    }
  };

  return (
    <div className="login-page">
      {" "}
      {/* Đổi tên class để dễ quản lý CSS riêng */}
      <div className="login-header-logo">
        {" "}
        <img
          src="/images/logo.png"
          alt="Book Icon"
          className="book-icon"
        />
        <h1 className="app-title">LIBRARY MANAGEMENT</h1>
      </div>

      <div className="layout-wrapper-2-columns">
        
        {/* Cột 1: Form */}
        <div className="auth-form-container">
          {/* 4. Xây dựng form trực tiếp, bỏ AuthForm */}
          <form onSubmit={handleSubmit}>
            <h2 className="form-title">Login</h2>
            
            {/* Hiển thị lỗi duy nhất */}
            {error && <p className="error-message api-error">{error}</p>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                required // Sử dụng validation của trình duyệt
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" 
                required // Sử dụng validation của trình duyệt
              />
            </div>

            <button type="submit" className="submit-button">Login</button>
            
            <div className="form-footer">
              <p>
                Don’t have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </form>
        </div>
        <div className="login-illustration-container">
          <img
            src="images/loginImage.png"
            alt="Login Illustration"
            className="login-illustration-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
