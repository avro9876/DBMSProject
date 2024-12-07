import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing tokens)
    setIsLoggedIn(false);  // Update the logged-in state to false
    localStorage.removeItem('token'); // Remove the token from localStorage
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo">Tuition Management</span>
        </Link>

        <ul className="nav-links">
          {/* Show different links based on the login status */}
          {isLoggedIn ? (
            <>
              {/* Links for logged-in users */}
              <li>
                <Link to="/" className="nav-link" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
              <li>
                <Link to="/addStudents" className="nav-link">
                  Add Student
                </Link>
              </li>
              <li>
                <Link to="/viewStudents" className="nav-link">
                  View Students
                </Link>
              </li>
            </>
          ) : (
            <>
              {/* Links for logged-out users */}
              <li>
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="nav-link">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
