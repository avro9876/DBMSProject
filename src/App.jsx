import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Payments from './components/Payment';
import Footer from './components/Footer';
import Lectures from './components/Lectures';
import Students from './components/Students';
import Teachers from './components/Teachers';
import Users from './components/Users';
import Login from './components/Login';
import SignUp from './components/register';
import Navbar from './components/Navbar';
import Dashboard from './components/dashboard';
import HomePage from './components/HomePage';
import AddStudent from './components/addStudent';
import ViewStudents from './components/viewStudents';
const App = () => {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  return (
    <Router>
      <div>
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
          <Route path='/' element={<HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
          { <Route path="/payments" element={<Payments />} /> }
          {/* <Route path="/footer" element={<Footer />} /> */}
          {/* Add more routes here if needed */}
          {/* <Route path="/lectures" element={<Lectures/>}/> */}
          <Route path="/addStudents" element={<Students/>}/>
          <Route path="/teachers" element={<Teachers/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/addStudent' element={<AddStudent/>}/>
          <Route path='/viewStudents' element={<ViewStudents/>}/>
        </Routes>
        <Footer /> {/* Add Footer outside of Routes if you want it to always display */}
      </div>
    </Router>
  );
};

export default App;
