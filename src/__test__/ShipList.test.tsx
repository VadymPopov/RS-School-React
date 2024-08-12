import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShipsList from '../components/ShipsList';
import { StarShip } from '../types';
import { renderWithContext } from '../test-utils/renderWithContext';
import { createMockRouter } from '../test-utils/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

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
    renderWithContext(
      <RouterContext.Provider
        value={createMockRouter({ asPath: '/details/10' })}
      >
        <ShipsList ships={mockShips} />
      </RouterContext.Provider>
    );
    const shipItems = screen.getAllByRole('listitem');
    expect(shipItems).toHaveLength(mockShips.length);
  });

  it('displays an appropriate message if no cards are present', () => {
    renderWithContext(
      <RouterContext.Provider value={createMockRouter({})}>
        <ShipsList ships={[]} />
      </RouterContext.Provider>
    );
    expect(screen.getByText('Nothing have found')).toBeInTheDocument();
  });
});
