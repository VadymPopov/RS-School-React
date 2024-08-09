import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShipDetails from '../components/ShipDetails';
import Details from '../app/details/[shipId]/page';
import { renderWithContext } from '../test-utils/renderWithContext';

import { useSearchParams, useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
  usePathname: vi.fn(),
}));

describe('ShipDetails', () => {
  const mockPush = vi.fn();
  const useRouterMock = {
    push: mockPush,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(useRouterMock);
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams('page=1')
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('detailed card component correctly displays the detailed card data', async () => {
    renderWithContext(<ShipDetails shipId="10" />);
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
    renderWithContext(<Details params={{ shipId: '10' }} />);

    const btn = screen.findByRole('button', { name: /Close/i });

    fireEvent.click(await btn);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/?page=1');
    });
  });
});
