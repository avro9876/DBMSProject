import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Lectures.css';

function Lectures() {
    const [lectures, setLectures] = useState([]);
    const [formData, setFormData] = useState({ student_id: '', date: '', lecture_id: null });

    useEffect(() => {
        fetchLectures();
    }, []);

    const fetchLectures = async () => {
        const response = await axios.get('http://localhost/your-path/lecture.php');
        setLectures(response.data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.lecture_id) {
            await axios.put('http://localhost/your-path/lecture.php', formData);
        } else {
            await axios.post('http://localhost/your-path/lecture.php', formData);
        }
        setFormData({ student_id: '', date: '', lecture_id: null });
        fetchLectures();
    };

    const handleEdit = (lecture) => {
        setFormData(lecture);
    };

    const handleDelete = async (lecture_id) => {
        await axios.delete('http://localhost/your-path/lecture.php', { data: { lecture_id } });
        fetchLectures();
    };

    return (
        <div className="container">
            <h1>Lectures</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="lecture_id" value={formData.lecture_id || ''} />
                    <label>Student ID:</label>
                    <input type="number" name="student_id" value={formData.student_id} onChange={handleChange} required />
                    <label>Date:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    <button type="submit">{formData.lecture_id ? 'Update' : 'Add'} Lecture</button>
                </form>
            </div>
            
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Lecture ID</th>
                            <th>Student ID</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lectures.map((lecture) => (
                            <tr key={lecture.lecture_id}>
                                <td>{lecture.lecture_id}</td>
                                <td>{lecture.student_id}</td>
                                <td>{lecture.date}</td>
                                <td className="actions">
                                    <button className="edit-button" onClick={() => handleEdit(lecture)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDelete(lecture.lecture_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Lectures;
