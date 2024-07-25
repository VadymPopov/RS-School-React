import { StarShip } from '../types';
import { NavLink, useLocation } from 'react-router-dom';
import Checkbox from './Checkbox';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deleteFromSelected, addToSelected } from '../redux/starShipSlice';

export default function ShipItem({ name, model, manufacturer, url }: StarShip) {
  const match = url.match(/(\d+)/);
  const shipId = match && match[0];
  const location = useLocation();
  const items = useAppSelector((state) => state.starships.items);
  const selected = useAppSelector((state) => state.starships.selectedItems);
  const dispatch = useAppDispatch();

  const item = useMemo(
    () => items.find((item) => item.name === name),
    [items, name]
  );
  const isChecked = item ? selected.includes(item) : false;

  const handleCheckboxChange = () => {
    if (item) {
      if (isChecked) {
        dispatch(deleteFromSelected(name));
      } else {
        dispatch(addToSelected(item));
      }
    }
  };

  return (
    <li>
      <NavLink
        to={`details/${shipId}${location.search}`}
        className={({ isActive, isPending }) =>
          isActive ? 'active' : isPending ? 'pending' : ''
        }
      >
        <div>
          <h2>{name}</h2>
        </div>
      </NavLink>
      <div>
        <p>
          <strong>Model:</strong> {model}
        </p>
        <p>
          <strong>Manufacturer:</strong> {manufacturer}
        </p>
      </div>
      <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} />
    </li>
  );
}
