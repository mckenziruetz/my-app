import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddListingForm = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form input changes including files
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: files[0]
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Prepare form data for sending images
    const formData = new FormData();
    for (const [key, value] of Object.entries(form)) {
      formData.append(key, value);
    }

    try {
      // Adjust
      const response = await fetch('/api/listings', {
        method: 'POST',
        // Do not set Content-Type header for FormData
        body: formData,
      });

      if (!response.ok) {
        // If the server responds with a status code that is not a success code (e.g., 200), throw an error
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create listing.');
      }

      // Assuming the server returns the created listing, you might want to handle it here
      const createdListing = await response.json();
      
      // Reset form and navigate to dashboard or listings page
      setForm({
        title: '',
        description: '',
        price: '',
        image: null,
      });
      navigate('/dashboard'); // Update the navigate path as needed
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // The form UI with image upload
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Add New Listing</h2>
      {/* Other form fields */}
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Listing'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default AddListingForm;
