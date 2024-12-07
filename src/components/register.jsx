import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
        // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
    axios
    .post('http://localhost:5000/auth/register', formData)
    .then((res) => {
      console.log("Registered successfully");
      //alert(`Registration successful for ${formData.name}!`);
      navigate('/'); // Navigate after successful registration
    })
    .catch((err) => {
      if (err.response) {
        // Server responded with a status code outside the 2xx range
        if (err.response.status === 400) {
          alert("Email is already registered. Please try a different one.");
        } else {
          alert(`Registration failed: ${err.response.data || "Unexpected error"}`);
        }
      }
    })
    ;
  
  };


  return (
    <div className="signup-container">
      <h2 className="signup-header">Sign Up</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form className="signup-form" onSubmit={handleSubmit}>
      <label className="signup-label">Name:</label>
        <input
          className="signup-input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label className="signup-label">Email:</label>
        <input
          className="signup-input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label className="signup-label">Password:</label>
        <input
          className="signup-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label className="signup-label">Confirm Password:</label>
        <input
          className="signup-input"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button className="signup-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
