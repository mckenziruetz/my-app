import React from 'react';

const DashboardHeader = ({ userName }) => {
  return (
    <div>
      <h1>Welcome, {userName}</h1> {/* The first name will be displayed here */}
    </div>
  );
};

export default DashboardHeader;
