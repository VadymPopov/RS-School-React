import { StarShip } from '../types';
import { NavLink, useLocation } from 'react-router-dom';

export default function ShipItem({ name, model, manufacturer, url }: StarShip) {
  const match = url.match(/(\d+)/);
  const shipId = match && match[0];
  const location = useLocation();

  return (
    <NavLink
      to={`details/${shipId}${location.search}`}
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
