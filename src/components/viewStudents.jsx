import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Students.css';
import { useNavigate } from 'react-router-dom';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [lectureDate, setLectureDate] = useState('');
  const [lectureTopic, setLectureTopic] = useState('');
  const [lectures, setLectures] = useState([]);
  const navigate = useNavigate();

  // Fetch students from the server when the component loads
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/student/viewStudent', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Handle adding a new lecture
  const handleAddLecture = async (studentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/student/addLecture',
        {
          student_id: studentId,
          lecture_date: lectureDate,
          lecture_topic: lectureTopic,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(response.data);
      setLectureDate('');
      setLectureTopic('');
      fetchStudents(); // Refresh the students list
    } catch (error) {
      console.error('Error adding lecture:', error);
    }
  };

  // Fetch lectures for the selected student
  const handleViewLectures = async (studentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/student/viewLectures/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLectures(response.data);
      setSelectedStudent(students.find((student) => student.student_id === studentId));
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };
    // Format lecture date to DD-MM-YYYY format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };

  return (
    <div className="students-container">
      <h1>Student List</h1>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Class</th>
            <th>Lecture Per Month</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.lecture_per_month}</td>
              <td>{student.payment}</td>
              <td>
                <button onClick={() => setSelectedStudent(student)}>
                  Add Lecture
                </button>
                <button onClick={() => handleViewLectures(student.student_id)}>
                  View Lectures
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStudent && (
        <div className="lecture-form">
          <h2>Add Lecture for {selectedStudent.name}</h2>
          <label>Lecture Date:</label>
          <input
            type="date"
            value={lectureDate}
            onChange={(e) => setLectureDate(e.target.value)}
            required
          />
          <label>Lecture Topic:</label>
          <input
            type="text"
            value={lectureTopic}
            onChange={(e) => setLectureTopic(e.target.value)}
            required
          />
          <button onClick={() => handleAddLecture(selectedStudent.student_id)}>
            Add Lecture
          </button>
        </div>
      )}

      {lectures.length > 0 && (
        <div className="lectures-list">
          <h3>Lectures for {selectedStudent.name}</h3>
          <ul>
            {lectures.map((lecture) => (
              <li key={lecture.lecture_id}>
                <strong>Date:</strong> {formatDate(lecture.lecture_date)} | <strong>Topic:</strong> {lecture.lecture_topic}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewStudents;
