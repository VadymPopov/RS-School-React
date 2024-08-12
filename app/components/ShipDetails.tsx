import { useNavigate } from '@remix-run/react';
import { StarShipDetails } from '../types';

export default function ShipDetails({ data }: { data: StarShipDetails }) {
  const navigate = useNavigate();

  return (
    <div data-testid="details">
      <button className="fixed-button" onClick={() => navigate(-1)}>
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
