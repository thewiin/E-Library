import React from 'react';
import './AuthForm.css';

const AuthForm = () => {
  return (
    <div className="login-container">
      <div className="header">
        <h1>LIBRARY MANAGEMENT</h1>
      </div>
      <div className="content">
        <div className="form-wrapper">
          <h2>Login</h2>
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
    </div>
  );
};

export default AuthForm;