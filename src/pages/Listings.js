import React, { useEffect, useState } from 'react';

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/listings'); 
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setListings(data);
      } catch (error) {
        setError('Failed to load listings: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Current Listings</h1>
      {listings.length > 0 ? (
        <ul>
          {listings.map((listing) => (
            <li key={listing._id}>
              <img src={listing.images} alt={listing.title} />
              <h2>{listing.title}</h2>
              <p>Asking Price: {listing.price}</p>
              <a href={`/listings/${listing._id}`}>View Listing</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No listings available.</p>
      )}
    </div>
  );
};

export default ListingsPage;
