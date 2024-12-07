import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
const Login = ({setIsLoggedIn}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission (login logic)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", formData);
      const token = response.data.token;
      localStorage.setItem("token", token); // Save token for authenticated sessions
      //alert("Login Successful!");
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">Email:</label>
        <input
          className="login-input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label className="login-label">Password:</label>
        <input
          className="login-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
