import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleAddStudent = () => {
    navigate("/addStudents");
  };

  const handleViewStudents = () => {
    navigate("/viewStudents");
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Update state to reflect the user is logged out
    localStorage.removeItem("token"); // Clear token or any session data if stored
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="homepage-container">
      <h1 className="homepage-header">Welcome to Personal Tuition Management System</h1>

      {isLoggedIn ? (
        <div className="logged-in-section">
          <button className="homepage-button" onClick={handleAddStudent}>
            Add Student
          </button>
          <button className="homepage-button" onClick={handleViewStudents}>
            View Students
          </button>
          <button className="homepage-button logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="logged-out-section">
          <button className="homepage-button" onClick={handleLogin}>
            Login
          </button>
          <button className="homepage-button" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
