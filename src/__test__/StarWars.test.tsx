import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StarWarsView from '../views/StarWars';
import { renderWithContext } from './test-utils';

describe('StarWarsView', () => {
  const setup = () => {
    renderWithContext(
      <MemoryRouter>
        <StarWarsView showSplitScreen={false} />
      </MemoryRouter>
    );
  };

  it('renders the form, dropdown, and showing loader', () => {
    setup();
    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays the list of ships when data is available', async () => {
    setup();

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
      expect(screen.getByText(/Falcon/i)).toBeInTheDocument();
    });
  });
});
