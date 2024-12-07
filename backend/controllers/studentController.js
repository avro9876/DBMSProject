const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const addStudent = (req, res) => {
    const { name, lecture_per_month, payment } = req.body;
    const class_ = req.body.class;
    const user_id = req.user?.user_id; // Safely access req.user.user_id
  
    // console.log(`Adding student: name=${typeof(name)}, class=${typeof(class_)}, lecture_per_month=${typeof(lecture_per_month)}, payment=${typeof(payment)}, user_id=${typeof(user_id)}`);
  
    // Validate inputs
    if (!name || !class_ || !lecture_per_month || !payment || !user_id) {
      return res.status(400).send("All fields are required, including user ID.");
    }
  
    // SQL query to insert data into the 'student' table
    const sql = "INSERT INTO student (name, class, lecture_per_month, payment, user_id) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [name, class_, lecture_per_month, payment, user_id], (err, result) => {
      if (err) {
        console.error("Error adding student:", err);
        return res.status(500).send("Server error. Unable to add student.");
      }
      console.log("Student added successfully:", result);
      res.status(201).send("Student added successfully.");
    });
  };


  const getStudents = (req, res) => {
    const user_id = req.user?.user_id; // Extract user_id from the authenticated request
  
    if (!user_id) {
      return res.status(401).send("Unauthorized. User not found.");
    }
  
    const sql = "SELECT * FROM student WHERE user_id = ?";
    db.query(sql, [user_id], (err, result) => {
      if (err) {
        console.error("Error fetching students:", err);
        return res.status(500).send("Server error. Unable to fetch students.");
      }
      res.status(200).json(result); // Send the list of students as a JSON response
    });
  };

// Add a lecture for a student
const addLecture =  (req, res) => {
    const { student_id, lecture_date, lecture_topic } = req.body;
    const user_id = req.user.user_id;
    // Validate inputs
    if (!student_id || !lecture_date || !lecture_topic) {
      return res.status(400).send('All fields are required');
    }
  
    const sql = 'INSERT INTO lecture (student_id, lecture_date, lecture_topic, user_id) VALUES (?, ?, ?,? )';
    db.query(sql, [student_id, lecture_date, lecture_topic,user_id], (err, result) => {
      if (err) {
        console.error('Error adding lecture:', err);
        return res.status(500).send('Server error');
      }
      res.status(201).send('Lecture added successfully');
    });
};

const viewLectures = (req, res) => {
    const { student_id } = req.params;
    const sql = 'SELECT * FROM lecture WHERE student_id = ?';
    db.query(sql, [student_id], (err, result) => {
      if (err) {
        console.error('Error fetching lectures:', err);
        return res.status(500).send('Server error');
      }
      res.status(200).json(result);
    });
};


module.exports = {addStudent,getStudents, addLecture, viewLectures};