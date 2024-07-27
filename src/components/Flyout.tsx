import { StarShip } from '../types';
import Button from './Button';
import { useAppDispatch } from '../redux/hooks';
import { unselectAll } from '../redux/starShipSlice';
import { useRef } from 'react';

export default function Flyout({ items }: { items: StarShip[] }) {
  const dispatch = useAppDispatch();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const message =
    items.length > 1
      ? `${items.length} items are selected`
      : `${items.length} item is selected`;

  const filename =
    items.length > 1
      ? `${items.length}_starships.csv`
      : `${items.length}_starship.csv`;

  const generateCSV = (data: StarShip[]) => {
    const headers = Object.keys(data[0]) as (keyof StarShip)[];
    const csvContent = [
      headers.join(','),
      ...data.map((row) => headers.map((header) => row[header]).join(',')),
    ].join('\n');
    return csvContent;
  };

  const downloadCSV = (data: StarShip[], filename: string) => {
    const csvContent = generateCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = filename;
      linkRef.current.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flyout">
      <p className="flyout-message">{message}</p>
      <div className="flyout-buttons">
        <Button label="Download" onClick={() => downloadCSV(items, filename)} />
        <Button label="Unselect all" onClick={() => dispatch(unselectAll())} />
      </div>
      <a ref={linkRef} style={{ display: 'none' }} />
    </div>
  );
}
