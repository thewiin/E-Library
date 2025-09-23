import React, { useState } from "react";
import { Link } from "react-router-dom"
import AuthForm from "../../components/AuthForm";
import { signup } from "../../services/authService";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(name, email, password);
      console.log("Signup success:", data);
      setMessage("Signup successful! Please login.");
      setError("");
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <>
      <AuthForm
        title="Sign Up"
        fields={[
          { label: "Full Name", type: "text", placeholder: "Enter your name", value: name, onChange: (e) => setName(e.target.value) },
          { label: "Email", type: "email", placeholder: "Enter your email", value: email, onChange: (e) => setEmail(e.target.value) },
          { label: "Password", type: "password", placeholder: "Enter your password", value: password, onChange: (e) => setPassword(e.target.value) },
        ]}
        onSubmit={handleSubmit}
        footer={
          <>
            Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
          </>
        }
      />
      {message && <p className="text-green-500 text-center mt-2">{message}</p>}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </>
  );
};

export default Signup;
