import { fireEvent, screen, waitFor } from '@testing-library/react';
import StarWarsView from '../components/StarWars';
import { renderWithContext } from '../test-utils/renderWithContext';
import { createMockRouter } from '../test-utils/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

describe('StarWarsView', () => {
  const setup = () => {
    renderWithContext(
      <RouterContext.Provider value={createMockRouter({})}>
        <StarWarsView showSplitScreen={false} />
      </RouterContext.Provider>
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

  it('displays the list of ships when data is available', () => {
    const mockRouter = createMockRouter({ query: { q: 'star', page: '2' } });

    renderWithContext(
      <RouterContext.Provider value={mockRouter}>
        <StarWarsView showSplitScreen={true} />
      </RouterContext.Provider>
    );

    fireEvent.click(screen.getByRole('main'));

    expect(mockRouter.replace).toHaveBeenCalledWith('/?q=star&page=2');
  });
});
