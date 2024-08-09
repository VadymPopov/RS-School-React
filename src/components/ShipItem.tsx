import { StarShip } from '../types';
import Link from 'next/link';
import Checkbox from './Checkbox';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deleteFromSelected, addToSelected } from '../redux/starShipSlice';
import { usePathname } from 'next/navigation';

export default function ShipItem({ name, model, manufacturer, url }: StarShip) {
  const pathname = usePathname();
  const match = url.match(/(\d+)/);
  const shipId = match && match[0];
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
      <Link
        href={`/details/${shipId}${location.search}`}
        className={
          pathname === `/details/${shipId}${location.search}` ? 'active' : ''
        }
      >
        <div>
          <h2>{name}</h2>
        </div>
      </Link>
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
