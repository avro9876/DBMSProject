import React, { useState } from "react";
import axios from "axios";
import "./AddStudent.css";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: "",
    class: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get the user_id from local storage or context
      const userId = localStorage.getItem("token"); // Replace with context if needed

      // Send student data to backend API
      const response = await axios.post("http://localhost:5000/api/add-student", { 
        ...formData,
        user_id: userId,
      });

      if (response.status === 201) {
        setSuccessMessage("Student added successfully!");
        setErrorMessage("");
        setFormData({ name: "", class: "" });
      }
    } catch (error) {
      setErrorMessage("An error occurred while adding the student. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="add-student-container">
      <h2 className="add-student-header">Add Student</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form className="add-student-form" onSubmit={handleSubmit}>
        <label className="add-student-label">Name:</label>
        <input
          className="add-student-input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label className="add-student-label">Class:</label>
        <input
          className="add-student-input"
          type="text"
          name="class"
          value={formData.class}
          onChange={handleChange}
          required
        />
        <button className="add-student-button" type="submit">
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
