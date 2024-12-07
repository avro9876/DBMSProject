import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css'; // Import the CSS file for styling

const Users = () => {
  const [teacher, setTeacher] = useState({
    user_id: null,
    email: '',
    password: ''
  });

  // Fetch the teacher's details from the backend API
  useEffect(() => {
    fetchTeacherDetails();
  }, []);

  const fetchTeacherDetails = async () => {
    try {
      const response = await axios.get('http://localhost/your-path/user.php');
      if (response.data && response.data.length > 0) {
        setTeacher(response.data[0]); // Assuming the API returns the teacher's details as the first entry
      }
    } catch (error) {
      console.error('Error fetching teacher details:', error);
    }
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({
      ...teacher,
      [name]: value
    });
  };

  // Handle form submission to update the teacher's details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost/your-path/user.php', teacher);
      alert('Teacher details updated successfully!');
    } catch (error) {
      console.error('Error updating teacher details:', error);
      alert('Failed to update teacher details. Please try again.');
    }
  };

  return (
    <div className="users-container">
      <h1 className="users-header">Teacher Profile</h1>
      <form className="users-form" onSubmit={handleSubmit}>
        <label className="users-form-label">User ID:</label>
        <input
          className="users-form-input"
          type="text"
          name="user_id"
          value={teacher.user_id || ''}
          disabled
        />
        <label className="users-form-label">Email:</label>
        <input
          className="users-form-input"
          type="email"
          name="email"
          value={teacher.email}
          onChange={handleChange}
          required
        />
        <label className="users-form-label">Password:</label>
        <input
          className="users-form-input"
          type="password"
          name="password"
          value={teacher.password}
          onChange={handleChange}
          required
        />
        <button className="users-form-button" type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Users;
