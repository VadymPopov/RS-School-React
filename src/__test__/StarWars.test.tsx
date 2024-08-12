import { fireEvent, screen, waitFor } from '@testing-library/react';
import StarWarsView from '../components/StarWars';
import { renderWithContext } from '../test-utils/renderWithContext';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
  usePathname: vi.fn(),
}));

const mockReplace = vi.fn();
const useRouterMock = {
  replace: mockReplace,
};

describe('StarWarsView', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(useRouterMock);
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams('page=1&q=star')
    );
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const setup = () => {
    renderWithContext(<StarWarsView showSplitScreen={false} />);
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
    renderWithContext(<StarWarsView showSplitScreen={true} />);

    fireEvent.click(screen.getByRole('main'));

    expect(mockReplace).toHaveBeenCalledWith('/?q=star&page=1');
  });
});
