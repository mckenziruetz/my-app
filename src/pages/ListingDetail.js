import React, { useState, useEffect } from 'react';

const ListingDetailPage = ({ match }) => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [offer, setOffer] = useState('');

  // Extract listing ID from the URL
  const { listingId } = match.params;

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/listings/${listingId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setListing(data);
      } catch (error) {
        setError('Failed to load listing: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  const handleOfferChange = (e) => {
    setOffer(e.target.value);
  };

  const submitOffer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/listings/${listingId}/offer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include the Authorization header with the token if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ offer })
      });
      if (!response.ok) throw new Error('Failed to submit offer');
      const result = await response.json();
      alert('Offer submitted: ' + result.message);
      // Redirect ?
    } catch (error) {
      alert('Error submitting offer: ' + error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!listing) return <div>Listing not found.</div>;

  return (
    <div>
      <h1>{listing.title}</h1>
      <img src={listing.imageUrl} alt={listing.title} />
      <p>Description: {listing.description}</p>
      <p>Asking Price: {listing.price}</p>

      <form onSubmit={submitOffer}>
        <input
          type="number"
          value={offer}
          onChange={handleOfferChange}
          placeholder="Your offer"
          required
        />
        <button type="submit">Submit Offer</button>
      </form>
    </div>
  );
};

export default ListingDetailPage;
