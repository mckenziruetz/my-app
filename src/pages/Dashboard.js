import React from 'react';
import DashboardHeader from '../components/DashboardHeader';

const Dashboard = () => {
  const userName = localStorage.getItem('userName');

  return (
    <div>
      <DashboardHeader userName={userName} />
      <p>Welcome to your dashboard. Here you can manage your mortgages, view your documents, and monitor your payments.</p>
    </div>
  );
};

export default Dashboard;