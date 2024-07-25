import { useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader';
import Error from './Error';
import { starshipApi } from '../redux/swapi';

export default function ShipDetails() {
  const { shipId } = useParams();
  const { data, error, isLoading } = starshipApi.useGetStarShipDetailsQuery(
    shipId || '1'
  );
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex" data-testid="loader">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div data-testid="details">
      <button className="fixed-button" onClick={() => navigate('/')}>
        Close
      </button>
      <div>
        <div>
          <h2>{data?.name}</h2>
        </div>
        <div>
          <p>
            <strong>Model:</strong> {data?.model}
          </p>
          <p>
            <strong>Manufacturer:</strong> {data?.manufacturer}
          </p>
          <p>
            <strong>Passengers:</strong> {data?.passengers}
          </p>
          <p>
            <strong>Created:</strong> {data?.created?.split('T')[0]}
          </p>
          <p>
            <strong>Max Atmospheric Speed:</strong>{' '}
            {data?.max_atmosphering_speed}
          </p>
          <p>
            <strong>Length:</strong> {data?.length}
          </p>
          <p>
            <strong>Crew:</strong> {data?.crew}
          </p>
          <p>
            <strong>Cost:</strong> {data?.cost_in_credits}
          </p>
        </div>
      </div>
    </div>
  );
}
