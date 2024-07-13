import { StarShip } from '../views/StarWars';
import ShipItem from './ShipItem';

interface ShipsListProps {
  ships: StarShip[];
}

export default function ShipsList({ ships }: ShipsListProps) {
  if (ships.length === 0) {
    return (
      <div className="nothing-found">
        <h2>Nothing have found</h2>
      </div>
    );
  }

  return (
    <ul>
      {ships.map((ship) => {
        return <ShipItem key={ship.name} {...ship} />;
      })}
    </ul>
  );
}
