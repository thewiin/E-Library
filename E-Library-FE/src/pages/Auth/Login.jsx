import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import Apis, { authApis, endpoints } from "../../configs/Apis";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Gọi API login
      const response = await Apis.post(endpoints["login"], {
        email,
        password
      });

      // Lưu token vào cookies
      cookie.save("token", response.data.token, { path: "/" });
      
      // Lấy thông tin user profile (sau khi đã có token)
      const profileResponse = await authApis().get(endpoints.profile);
      const userData = profileResponse.data;
      
      // Lưu thông tin user vào localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      
      // Chuyển hướng đến trang chủ
      navigate("/");
      window.location.reload(); // Reload để cập nhật context

    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Sai email hoặc mật khẩu");
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Lỗi kết nối đến server");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-header-logo">
        <img
          src="/images/logo.png"
          alt="Book Icon"
          className="book-icon"
        />
        <h1 className="app-title">LIBRARY MANAGEMENT</h1>
      </div>
      
      <div className="login-content-wrapper">
        <div className="login-form-container">
          <div className="auth-form">
            <h2 className="auth-form-title">Đăng Nhập</h2>
            
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Đang đăng nhập...
                  </>
                ) : (
                  "Đăng Nhập"
                )}
              </button>
            </form>
            
            <div className="auth-form-footer mt-3">
              <p className="text-center">
                Chưa có tài khoản? <Link to="/signup">Đăng ký ngay</Link>
              </p>
            </div>
          </div>
        </div>
        
        <div className="login-illustration-container">
          <img
            src="/images/loginImage.png"
            alt="Login Illustration"
            className="login-illustration-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;