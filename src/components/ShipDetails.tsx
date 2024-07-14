import { useLoaderData, useNavigation, useNavigate } from 'react-router-dom';
import { StarShipDetails } from '../types';
import Loader from './Loader';

export default function ShipDetails() {
  const { shipDetails } = useLoaderData() as { shipDetails: StarShipDetails };
  const navigation = useNavigation();
  const navigate = useNavigate();

  const {
    name,
    model,
    manufacturer,
    passengers,
    created,
    max_atmosphering_speed: speed,
    cost_in_credits: cost,
    crew,
    length,
  } = shipDetails;

  if (navigation.state === 'loading') {
    return (
      <div className="flex">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <button className="fixed-button" onClick={() => navigate('/')}>
        Close
      </button>
      <div>
        <div>
          <h2>{name}</h2>
        </div>
        <div>
          <p>
            <strong>Model:</strong> {model}
          </p>
          <p>
            <strong>Manufacturer:</strong> {manufacturer}
          </p>
          <p>
            <strong>Passengers:</strong> {passengers}
          </p>
          <p>
            <strong>Created:</strong> {created.split('T')[0]}
          </p>
          <p>
            <strong>Max Atmospheric Speed:</strong> {speed}
          </p>
          <p>
            <strong>Length:</strong> {length}
          </p>
          <p>
            <strong>Crew:</strong> {crew}
          </p>
          <p>
            <strong>Cost:</strong> {cost}
          </p>
        </div>
      </div>
    </div>
  );
}
