import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Teachers.css'; // Import the CSS file for styling

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    user_id: '',
    teacher_id: null
  });

  // Fetch all teachers from the server
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const response = await axios.get('http://localhost/your-path/teacher.php');
    setTeachers(response.data);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission for adding or updating a teacher
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.teacher_id) {
      // Update teacher
      await axios.put('http://localhost/your-path/teacher.php', formData);
    } else {
      // Add new teacher
      await axios.post('http://localhost/your-path/teacher.php', formData);
    }
    // Reset form and refetch teachers
    setFormData({ user_id: '', teacher_id: null });
    fetchTeachers();
  };

  // Pre-fill form for editing
  const handleEdit = (teacher) => {
    setFormData(teacher);
  };

  // Handle deleting a teacher
  const handleDelete = async (teacher_id) => {
    await axios.delete('http://localhost/your-path/teacher.php', { data: { teacher_id } });
    fetchTeachers();
  };

  return (
    <div className="teachers-container">
      <h1 className="teachers-header">Teachers</h1>
      <form className="teachers-form" onSubmit={handleSubmit}>
        <input type="hidden" name="teacher_id" value={formData.teacher_id || ''} />
        <label className="teachers-form-label">User ID:</label>
        <input
          className="teachers-form-input"
          type="number"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          required
        />
        <button className="teachers-form-button" type="submit">{formData.teacher_id ? 'Update' : 'Add'} Teacher</button>
      </form>

      <table className="teachers-table">
        <thead>
          <tr>
            <th className="teachers-table-th">Teacher ID</th>
            <th className="teachers-table-th">User ID</th>
            <th className="teachers-table-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr className="teachers-table-tr" key={teacher.teacher_id}>
              <td className="teachers-table-td">{teacher.teacher_id}</td>
              <td className="teachers-table-td">{teacher.user_id}</td>
              <td className="teachers-table-td">
                <button
                  className="teachers-table-action-button"
                  onClick={() => handleEdit(teacher)}
                >
                  Edit
                </button>
                <button
                  className="teachers-table-action-button"
                  onClick={() => handleDelete(teacher.teacher_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teachers;
