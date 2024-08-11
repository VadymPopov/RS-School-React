import { screen, waitFor } from '@testing-library/react';
import StarWarsView from '../views/StarWars';
import { renderWithContext } from './test-utils';
import { StarShipsData } from '../types';
import { createRemixStub } from '@remix-run/testing';

const mockShipsData: StarShipsData = {
  count: 1,
  results: [
    {
      name: 'Falcon',
      model: 'YT-1300 light freighter',
      manufacturer: 'Corellian Engineering Corporation',
      url: 'https://swapi.dev/api/starships/10',
    },
  ],
};

describe('StarWarsView', () => {
  const MockComponent = () => {
    return <StarWarsView data={mockShipsData} showSplitScreen={false} />;
  };

  const setup = () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: MockComponent,
      },
    ]);

    renderWithContext(<RemixStub />);
  };

  it('renders the form, dropdown, and showing loader', () => {
    setup();
    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays the list of ships when data is available', async () => {
    setup();

    await waitFor(() => {
      expect(screen.getByText(/Falcon/i)).toBeInTheDocument();
    });
  });
});
