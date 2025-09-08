import React from "react";
import "./AuthForm.css";

const AuthForm = () => {
  return (
    <div className="login-container">
      <div className="form-wrapper">
        <h1 style={{ margin: 0, marginBottom: 30 }}>Login</h1>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>
          <button type="submit">Login</button>
          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
