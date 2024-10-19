import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const AttorneyDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [attorney, setAttorney] = useState(null);
  const [priceMaps, setPriceMaps] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchAttorney();
      fetchPriceMaps();
    }
  }, [id]);

  const fetchAttorney = async () => {
    try {
      const response = await fetch(`/api/attorney-data/${id}`);
      const data = await response.json();
      if (response.ok) {
        setAttorney(data.data);
      } else {
        setError('Failed to load attorney details');
      }
    } catch (error) {
      setError('Error during connection to server');
    }
  };

  const fetchPriceMaps = async () => {
    try {
      const response = await fetch(`/api/attorney-price-map?attorney=${id}`);
      const data = await response.json();
      if (response.ok) {
        setPriceMaps(data.data);
      } else {
        setError('Failed to load price maps');
      }
    } catch (error) {
      setError('Error during connection to server');
    }
  };

  const handleDeletePriceMap = async (priceMapId) => {
    if (window.confirm('Are you sure you want to delete this price map ?')) {
      try {
        const response = await fetch(`/api/attorney-price-map/${priceMapId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchPriceMaps();
        } else {
          setError('Failed to delete price map');
        }
      } catch (error) {
        setError('Error during connection to server');
      }
    }
  };

  if (error) return <p>Error : {error}</p>;
  if (!attorney) return <p>Loading...</p>;

  return (
    <div>
      <h1>Attorney Details</h1>
      <div>
        <h2>{attorney.name}</h2>
        <p>Email : {attorney.email}</p>
        <p>Phone : {attorney.phone}</p>
        <p>Adress : {attorney.address}</p>
      </div>

      <h2>Price maps</h2>
      <Link href={`/attorney-price-maps/create?attorney=${id}`}>
        <button>Add a new price map</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Court</th>
            <th>County</th>
            <th>Violation</th>
            <th>Points</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {priceMaps.map((priceMap) => (
            <tr key={priceMap._id}>
              <td>{priceMap.court?.name || 'N/A'}</td>
              <td>{priceMap.county?.name || 'N/A'}</td>
              <td>{priceMap.violation?.name || 'N/A'}</td>
              <td>{priceMap.points}</td>
              <td>{priceMap.price}</td>
              <td>
                <Link href={`/attorney-price-maps/${priceMap._id}/edit`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDeletePriceMap(priceMap._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/attorneys-panel">Back to Attorneys Panel</Link>
    </div>
  );
};

export default AttorneyDetails;