import React from 'react';
import { useNavigate } from 'react-router-dom';
import Students from './Students'; // Import the Students component
import './Dashboard.css'; // Import the CSS file for dashboard styling

const Dashboard = () => {
  const navigate = useNavigate();

  // Handle logout action
  const handleLogout = () => {
    // Clear any authentication data (e.g., token or session info)
    localStorage.removeItem('authToken'); // Example of clearing a token
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to the Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        <h2>Manage Students</h2>
        <Students /> {/* Include the Students table component */}
      </main>
    </div>
  );
};

export default Dashboard;
