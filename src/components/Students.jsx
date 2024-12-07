import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Students.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    class_: '',
    lecture_per_month: 0,
    payment: 0,
  });
  const navigate = useNavigate();

  // Fetch all students from the server
  useEffect(() => {
    // fetchStudents(); -- Uncomment this if you plan to fetch students
  }, []);

  // const fetchStudents = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/students');
  //     setStudents(response.data);
  //   } catch (error) {
  //     console.error('Error fetching students:', error);
  //   }
  // };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission for adding or updating a student
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Ensure the token is retrieved properly

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/student/addStudent", 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data);
      navigate("/"); // Redirect after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        alert(error.response.data.message || "Error occurred while adding student");
      } else {
        alert("Network or server error. Please try again later.");
      }
    }
  };

  // Uncomment below code to display a list of students
  // const handleEdit = (student) => {
  //   setFormData(student);
  // };

  // const handleDelete = async (student_id) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/student/${student_id}`);
  //     fetchStudents();
  //   } catch (error) {
  //     console.error("Error deleting student:", error);
  //   }
  // };

  return (
    <div className="students-container">
      <h1>Student Management</h1>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="student_id" value={formData.student_id || ''} />
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Class:</label>
        <input
          type="text"
          name="class"
          value={formData.class}
          onChange={handleChange}
        />
        <label>Lecture Per Month:</label>
        <input
          type="number"
          name="lecture_per_month"
          value={formData.lecture_per_month}
          onChange={handleChange}
        />
        <label>Payment:</label>
        <input
          type="number"
          name="payment"
          value={formData.payment}
          onChange={handleChange}
        />
        <button type="submit">{formData.student_id ? 'Update' : 'Add'} Student</button>
      </form>

      {/* <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Lecture/Month</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.user_id}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.lecture_per_month}</td>
              <td>{student.payment}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student.student_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Students;
