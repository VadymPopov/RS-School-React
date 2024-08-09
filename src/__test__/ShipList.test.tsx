import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShipsList from '../components/ShipsList';
import { StarShip } from '../types';
import { renderWithContext } from '../test-utils/renderWithContext';

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

describe('ShipsList Component', () => {
  it('renders the specified number of cards', () => {
    renderWithContext(<ShipsList ships={mockShips} />);
    const shipItems = screen.getAllByRole('listitem');
    expect(shipItems).toHaveLength(mockShips.length);
  });

  it('displays an appropriate message if no cards are present', () => {
    renderWithContext(<ShipsList ships={[]} />);
    expect(screen.getByText('Nothing have found')).toBeInTheDocument();
  });
});
