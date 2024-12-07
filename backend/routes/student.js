// auth.js
const express = require("express");
const { addStudent , getStudents, addLecture, viewLectures } = require("../controllers/studentController");
const router = express.Router();
const {authenticate} = require('../middlewares/authMiddleware')


router.post("/addStudent",authenticate,addStudent);
router.get('/viewStudent',authenticate,getStudents);
router.post('/addLecture',authenticate,addLecture);
router.get('/viewLectures/:student_id',viewLectures)
module.exports = router;
