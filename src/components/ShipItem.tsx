import { StarShip } from '../views/StarWars';

export default function ShipItem({
  name,
  model,
  manufacturer,
  passengers,
  created,
  max_atmosphering_speed: speed,
}: StarShip) {
  return (
    <li>
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
      </div>
    </li>
  );
}
