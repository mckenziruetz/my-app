import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Create a mounted flag that will keep track if the component is mounted or not.
    let mounted = true;

    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found, please sign in');
        }
        const response = await fetch('/api/check-admin', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // Handle authorization errors differently than network errors.
          if (response.status === 401 || response.status === 403) {
            throw new Error('Not authorized as admin');
          } else {
            throw new Error('Network response was not ok.');
          }
        }

        const data = await response.json();
        if (mounted) {
          setIsAdmin(data.isAdmin);
        }
      } catch (error) {
        console.error(error.message);
        if (error.message === 'Not authorized as admin') {
          navigate('/signin');
        } else {
          // show an error message to the user - could not get admin auth working
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkAdminStatus();

    // Clean-up function to set the mounted flag to false when the component unmounts.
    return () => {
      mounted = false;
    };
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAdmin ? (
        <div>
          <h1>Admin Dashboard</h1>
          <Link to="/admin/add-listing">Add Listing</Link>
          {/* Add other admin links or functionalities.. */}
        </div>
      ) : (
        <p>You are not authorized to view this page</p>
      )}
    </div>
  );
};

export default Admin;