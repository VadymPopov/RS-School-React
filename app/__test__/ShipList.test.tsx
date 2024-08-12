import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShipsList from '../components/ShipsList';
import { StarShip } from '../types';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
const mockShips: StarShip[] = [
  {
    name: 'Ship 1',
    model: 'Model 1',
    manufacturer: 'Manufacturer 1',
    url: 'http://url.com',
  },
  {
    name: 'Ship 2',

    model: 'Model 2',
    manufacturer: 'Manufacturer 2',
    url: 'http://url.com',
  },
];

const MockShipsList = ({ ships }: { ships: StarShip[] }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ShipsList ships={ships} />
      </BrowserRouter>
    </Provider>
  );
};

describe('ShipsList Component', () => {
  it('renders the specified number of cards', () => {
    render(<MockShipsList ships={mockShips} />);
    const shipItems = screen.getAllByRole('listitem');
    expect(shipItems).toHaveLength(mockShips.length);
  });

  it('displays an appropriate message if no cards are present', () => {
    render(<MockShipsList ships={[]} />);
    expect(screen.getByText('Nothing have found')).toBeInTheDocument();
  });
});
