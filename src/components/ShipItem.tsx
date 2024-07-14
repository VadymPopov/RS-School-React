import { StarShip } from '../types';
import { NavLink } from 'react-router-dom';

export default function ShipItem({ name, model, manufacturer, url }: StarShip) {
  const match = url.match(/(\d+)/);
  const shipId = match && match[0];

  return (
    <NavLink
      to={`details/${shipId}`}
      className={({ isActive, isPending }) =>
        isActive ? 'active' : isPending ? 'pending' : ''
      }
    >
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
        </div>
      </li>
    </NavLink>
  );
}
