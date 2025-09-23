import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import Apis, { endpoints } from "../../configs/Apis";
import '../../styles/SignupPage.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    avatar: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData({
        ...formData,
        avatar: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Tạo FormData object để gửi file
      const submitData = new FormData();
      submitData.append("email", formData.email);
      submitData.append("password", formData.password);
      submitData.append("first_name", formData.first_name);
      submitData.append("last_name", formData.last_name);
      if (formData.dob) submitData.append("dob", formData.dob);
      if (formData.gender) submitData.append("gender", formData.gender);
      if (formData.avatar) submitData.append("avatar", formData.avatar);

      // Gọi API register
      const response = await Apis.post(endpoints.register, submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Đăng ký thành công! Vui lòng đăng nhập.");
      
      // Tự động chuyển hướng sau 2 giây
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Lỗi kết nối đến server");
      }
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-header-logo">
        <img
          src="/images/logo.png"
          alt="Book Icon"
          className="book-icon"
        />
        <h1 className="app-title">LIBRARY MANAGEMENT</h1>
      </div>
      
      <div className="signup-content-wrapper">
        <div className="signup-form-container">
          <div className="auth-form">
            <h2 className="auth-form-title">Đăng Ký Tài Khoản</h2>
            
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            
            {message && (
              <div className="alert alert-success" role="alert">
                {message}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">Họ *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Tên *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Mật khẩu *</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  minLength="6"
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="dob" className="form-label">Ngày sinh</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Giới tính</label>
                    <select
                      className="form-control"
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={loading}
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="MALE">Nam</option>
                      <option value="FEMALE">Nữ</option>
                      <option value="OTHER">Khác</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="avatar" className="form-label">Ảnh đại diện</label>
                <input
                  type="file"
                  className="form-control"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={handleChange}
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
                    Đang đăng ký...
                  </>
                ) : (
                  "Đăng Ký"
                )}
              </button>
            </form>
            
            <div className="auth-form-footer mt-3">
              <p className="text-center">
                Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
              </p>
            </div>
          </div>
        </div>
        
        <div className="signup-illustration-container">
          <img
            src="/images/loginImage.png"
            alt="Signup Illustration"
            className="signup-illustration-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;