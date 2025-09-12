import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API, { endpoints } from "../../services/Apis";
import './SignUp.css'; 

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp!");
      return;
    }

    try {
      await API.post(endpoints["signup"], {
        full_name: name,
        email: email,
        password: password,
      });

      setMessage("Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.error("Lỗi đăng ký:", err);
      setError(err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-header">
        <img
          src="/images/logo.png"
          alt="Book Icon"
          className="book-icon"
        />
        <h1 className="app-title">LIBRARY MANAGEMENT</h1>
      </div>

      <div className="layout-wrapper-2-columns">
      
        <div className="auth-form-container">
          <form onSubmit={handleSubmit}>
            <h2 className="form-title">Sign Up</h2>
            
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text" id="name" value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name" required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email" id="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password" id="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password" required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password" id="confirmPassword" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password" required
              />
            </div>

            <button type="submit" className="submit-button">Sign Up</button>
            
            <div className="form-footer">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>

        {/* Cột 2: Ảnh minh họa */}
        <div className="auth-illustration-container">
          <img
            src="/images/book-icon.png"
            alt="Illustration"
            className="illustration-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;