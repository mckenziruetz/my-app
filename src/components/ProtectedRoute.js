import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children, roles }) {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token'); // or however you're handling auth
  const userRole = localStorage.getItem('role'); // Assuming you're storing the role in localStorage

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect them to the sign-in page
    return <Navigate to="/signin" state={{ from: location }} replace />;
  } else if (roles && !roles.includes(userRole)) {
    // If the user does not have the required role, redirect them to a "not authorized" page or home
    if (userRole === 'admin') {
      return <Navigate to="/admin" state={{ from: location }} replace />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  return children;
}

export default ProtectedRoute;