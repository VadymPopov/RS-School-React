import { Component } from 'react';
import { StarShip } from '../views/StarWars';
import ShipItem from './ShipItem';

interface ShipsListProps {
  ships: StarShip[];
}

class ShipsList extends Component<ShipsListProps> {
  render() {
    const { ships } = this.props;
    return (
      <ul>
        {ships.map((ship) => {
          return <ShipItem {...ship} />;
        })}
      </ul>
    );
  }
}

export default ShipsList;
