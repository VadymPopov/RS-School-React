import { useNavigate, useParams } from 'react-router-dom';
import { StarShipDetails } from '../types';
import Loader from './Loader';
import { getStarShipDetails } from '../services';
import { useEffect, useState } from 'react';

export default function ShipDetails() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [shipDetails, setStarShipDetails] = useState<StarShipDetails>();
  const { shipId } = useParams();

  useEffect(() => {
    const fetchStarShipDetails = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getStarShipDetails(shipId || '1');
        setStarShipDetails(data);
      } catch (error: unknown) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchStarShipDetails();
  }, [shipId]);

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex" data-testid="loader">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div data-testid="details">
      <button className="fixed-button" onClick={() => navigate('/')}>
        Close
      </button>
      <div>
        <div>
          <h2>{shipDetails?.name}</h2>
        </div>
        <div>
          <p>
            <strong>Model:</strong> {shipDetails?.model}
          </p>
          <p>
            <strong>Manufacturer:</strong> {shipDetails?.manufacturer}
          </p>
          <p>
            <strong>Passengers:</strong> {shipDetails?.passengers}
          </p>
          <p>
            <strong>Created:</strong> {shipDetails?.created?.split('T')[0]}
          </p>
          <p>
            <strong>Max Atmospheric Speed:</strong>{' '}
            {shipDetails?.max_atmosphering_speed}
          </p>
          <p>
            <strong>Length:</strong> {shipDetails?.length}
          </p>
          <p>
            <strong>Crew:</strong> {shipDetails?.crew}
          </p>
          <p>
            <strong>Cost:</strong> {shipDetails?.cost_in_credits}
          </p>
        </div>
      </div>
    </div>
  );
}
