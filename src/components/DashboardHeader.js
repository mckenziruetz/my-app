import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ userName }) => {
  return (
    <div>
      <h1>Welcome, {userName}</h1>
      <Link to="/listings">Current Listings</Link>
      {/* Rest of the dashboard content */}
    </div>
  );
};

export default Dashboard;