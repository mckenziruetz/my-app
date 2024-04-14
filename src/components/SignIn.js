import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    const backendUrl = process.env.REACT_APP_BACKEND_URL + '/api/users/signin';
  
    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        // Store the token and user role in localStorage or manage the session state as needed
        localStorage.setItem('token', result.token);
        localStorage.setItem('role', result.role); // Assuming the role is part of the response
        localStorage.setItem('userName', result.firstName);
        
        // Redirect based on role
        if(result.role === 'admin') {
          navigate('/admin'); // Redirect to the admin dashboard
        } else {
          navigate('/dashboard'); // Redirect to the user dashboard
        }
      } else {
        const result = await response.json();
        setError(result.message || 'Failed to sign in. Please try again.');
      }
    } catch (error) {
      setError('There was an error signing in. Please try again later.');
    }
  };

  return (
    <>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </>
  );
}

export default SignIn;
