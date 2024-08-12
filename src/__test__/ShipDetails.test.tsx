import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShipDetails from '../components/ShipDetails';
import { renderWithContext } from '../test-utils/renderWithContext';
import { createMockRouter } from '../test-utils/createMockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

describe('ShipDetails', () => {
  it('detailed card component correctly displays the detailed card data', async () => {
    renderWithContext(
      <RouterContext.Provider
        value={createMockRouter({ query: { page: '1', shipId: '10' } })}
      >
        <ShipDetails />
      </RouterContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Falcon/)).toBeInTheDocument();
      expect(screen.getByText(/YT-1300 light freighter/)).toBeInTheDocument();
      expect(
        screen.getByText(/Corellian Engineering Corporation/)
      ).toBeInTheDocument();
      expect(screen.getByText(/6/)).toBeInTheDocument();
      expect(screen.getByText(/2014-12-10/)).toBeInTheDocument();
      expect(screen.getByText(/1050/)).toBeInTheDocument();
      expect(screen.getByText(/34.37/)).toBeInTheDocument();
      expect(screen.getByText(/Crew:/)).toBeInTheDocument();
      expect(screen.getByText(/100000/)).toBeInTheDocument();
    });
  });

  it('clicking the close button hides the component', async () => {
    const mockRouter = createMockRouter({ query: { page: '2', shipId: '10' } });
    renderWithContext(
      <RouterContext.Provider value={mockRouter}>
        <ShipDetails />
      </RouterContext.Provider>
    );

    const btn = screen.findByRole('button', { name: /Close/i });

    fireEvent.click(await btn);
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/?page=2');
    });
  });
});
